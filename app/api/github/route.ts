import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'SarthakNawali';

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    fork: boolean;
    archived: boolean;
    visibility: string;
    owner: {
        login: string;
        avatar_url: string;
        type: string;
    };
}

interface GitHubOrg {
    login: string;
    id: number;
    avatar_url: string;
    description: string | null;
    url: string;
}

interface ContributionDay {
    contributionCount: number;
    date: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

async function fetchAllRepos(): Promise<GitHubRepo[]> {
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github+json',
    };
    if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const allRepos: GitHubRepo[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        const res = await fetch(
            `https://api.github.com/user/repos?per_page=${perPage}&page=${page}&sort=pushed&direction=desc&type=all`,
            { headers, next: { revalidate: 300 } }
        );

        if (!res.ok) {
            console.error('GitHub API error (repos):', res.status, await res.text());
            break;
        }

        const repos: GitHubRepo[] = await res.json();
        if (repos.length === 0) break;

        allRepos.push(...repos);
        if (repos.length < perPage) break;
        page++;
    }

    return allRepos.filter(r => !r.fork && !r.archived);
}

async function fetchOrganizations(): Promise<GitHubOrg[]> {
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github+json',
    };
    if (GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const res = await fetch(
        `https://api.github.com/user/orgs`,
        { headers, next: { revalidate: 300 } }
    );

    if (!res.ok) {
        console.error('GitHub API error (orgs):', res.status, await res.text());
        return [];
    }

    return res.json();
}

async function fetchContributionData(): Promise<{
    totalContributions: number;
    weeks: ContributionWeek[];
}> {
    if (!GITHUB_TOKEN) {
        return { totalContributions: 0, weeks: [] };
    }

    const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: { username: GITHUB_USERNAME },
        }),
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        console.error('GitHub GraphQL error:', res.status, await res.text());
        return { totalContributions: 0, weeks: [] };
    }

    const data = await res.json();
    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;

    return {
        totalContributions: calendar?.totalContributions || 0,
        weeks: calendar?.weeks || [],
    };
}

function calculateStreaks(weeks: ContributionWeek[]) {
    const allDays: ContributionDay[] = [];
    for (const week of weeks) {
        for (const day of week.contributionDays) {
            allDays.push(day);
        }
    }

    // Sort by date
    allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Calculate current streak (from today backwards)
    const today = new Date().toISOString().split('T')[0];
    const todayIdx = allDays.findIndex(d => d.date === today);

    // Start from today or the last available day
    const startIdx = todayIdx >= 0 ? todayIdx : allDays.length - 1;

    for (let i = startIdx; i >= 0; i--) {
        if (allDays[i].contributionCount > 0) {
            currentStreak++;
        } else {
            // Allow today to be zero (day not over yet)
            if (i === startIdx && allDays[i].date === today) {
                continue;
            }
            break;
        }
    }

    // Calculate longest streak
    for (const day of allDays) {
        if (day.contributionCount > 0) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 0;
        }
    }

    // Calculate total active days
    const activeDays = allDays.filter(d => d.contributionCount > 0).length;

    return {
        currentStreak,
        longestStreak,
        activeDays,
        totalDays: allDays.length,
    };
}

export async function GET() {
    try {
        const [repos, orgs, contributionData] = await Promise.all([
            fetchAllRepos(),
            fetchOrganizations(),
            fetchContributionData(),
        ]);

        const streaks = calculateStreaks(contributionData.weeks);

        // Calculate language stats across all repos
        const languageMap: Record<string, number> = {};
        for (const repo of repos) {
            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }
        }

        const topLanguages = Object.entries(languageMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([name, count]) => ({ name, count }));

        const derivedOrgsMap = new Map<string, GitHubOrg>();
        for (const r of repos) {
            if (r.owner.type === 'Organization') {
                if (!derivedOrgsMap.has(r.owner.login)) {
                    derivedOrgsMap.set(r.owner.login, {
                        login: r.owner.login,
                        id: r.id,
                        avatar_url: r.owner.avatar_url,
                        description: null, // We might not have description from repo owner
                        url: `https://github.com/${r.owner.login}`,
                    });
                }
            }
        }

        // Merge fetched orgs and derived orgs
        for (const o of orgs) {
            derivedOrgsMap.set(o.login, o);
        }

        const finalOrgs = Array.from(derivedOrgsMap.values());
        const personalRepos = repos.filter(r => r.owner.type === 'User');

        return NextResponse.json({
            repos: personalRepos.map(r => ({
                id: r.id,
                name: r.name,
                fullName: r.full_name,
                description: r.description,
                url: r.html_url,
                homepage: r.homepage,
                language: r.language,
                stars: r.stargazers_count,
                forks: r.forks_count,
                topics: r.topics || [],
                createdAt: r.created_at,
                updatedAt: r.updated_at,
                pushedAt: r.pushed_at,
                owner: r.owner.login,
                ownerType: r.owner.type,
            })),
            organizations: finalOrgs.map(o => ({
                login: o.login,
                avatarUrl: o.avatar_url,
                description: o.description,
            })),
            contributions: {
                totalContributions: contributionData.totalContributions,
                weeks: contributionData.weeks,
            },
            streaks,
            topLanguages,
            username: GITHUB_USERNAME,
        });
    } catch (error) {
        console.error('GitHub API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch GitHub data' },
            { status: 500 }
        );
    }
}
