'use client';

import { useEffect, useState, useMemo } from 'react';
import Navbar from '../Navbar';
import AnimatedSection from '../components/AnimatedSection';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaFire, FaCalendarAlt, FaTrophy, FaBuilding } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

// ---------- types ----------
interface Repo {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    url: string;
    homepage: string | null;
    language: string | null;
    stars: number;
    forks: number;
    topics: string[];
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
    owner: string;
}

interface Organization {
    login: string;
    avatarUrl: string;
    description: string | null;
}

interface ContributionDay {
    contributionCount: number;
    date: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface Streaks {
    currentStreak: number;
    longestStreak: number;
    activeDays: number;
    totalDays: number;
}

interface LanguageStat {
    name: string;
    count: number;
}

interface GitHubData {
    repos: Repo[];
    organizations: Organization[];
    contributions: {
        totalContributions: number;
        weeks: ContributionWeek[];
    };
    streaks: Streaks;
    topLanguages: LanguageStat[];
    username: string;
}

// ---------- constants ----------
const languageColors: Record<string, string> = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Kotlin': '#A97BFF',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'C++': '#f34b7d',
    'C#': '#178600',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Swift': '#F05138',
    'Shell': '#89e051',
    'Dart': '#00B4AB',
    'Jupyter Notebook': '#DA5B0B',
    'Vue': '#41b883',
    'Svelte': '#ff3e00',
    'SCSS': '#c6538c',
};

const projectIcons: Record<string, string> = {
    'smartedu': '🎓',
    'ai_word_generator': '🤖',
    'encryptionapp': '🔐',
    'resume': '📄',
    'portfolio': '🌐',
};

function getProjectIcon(name: string): string {
    const lower = name.toLowerCase();
    for (const [key, icon] of Object.entries(projectIcons)) {
        if (lower.includes(key)) return icon;
    }
    const icons = ['💻', '🚀', '⚡', '🔧', '📦', '🎯', '🌟', '🔮', '🛠️', '📱'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return icons[Math.abs(hash) % icons.length];
}

const gradients = [
    'from-purple-500/20 to-indigo-500/20',
    'from-emerald-500/20 to-teal-500/20',
    'from-blue-500/20 to-cyan-500/20',
    'from-amber-500/20 to-orange-500/20',
    'from-violet-500/20 to-purple-500/20',
    'from-rose-500/20 to-pink-500/20',
    'from-sky-500/20 to-blue-500/20',
    'from-lime-500/20 to-green-500/20',
];

// ---------- helper components ----------

function SkeletonCard() {
    return (
        <div className="glass rounded-2xl p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10" />
                <div className="w-6 h-6 rounded bg-white/10" />
            </div>
            <div className="h-5 w-3/4 bg-white/10 rounded mb-3" />
            <div className="h-3 w-full bg-white/5 rounded mb-2" />
            <div className="h-3 w-2/3 bg-white/5 rounded mb-6" />
            <div className="flex gap-2 mb-4">
                <div className="h-5 w-16 bg-white/5 rounded-full" />
                <div className="h-5 w-12 bg-white/5 rounded-full" />
            </div>
            <div className="h-3 w-1/3 bg-white/5 rounded" />
        </div>
    );
}

function ContributionGraph({ weeks }: { weeks: ContributionWeek[] }) {
    // Use only the last 26 weeks for a compact view
    const recentWeeks = weeks.slice(-26);

    const getColor = (count: number) => {
        if (count === 0) return 'bg-white/[0.04]';
        if (count <= 2) return 'bg-purple-900/60';
        if (count <= 5) return 'bg-purple-700/70';
        if (count <= 9) return 'bg-purple-500/80';
        return 'bg-purple-400';
    };

    return (
        <div className="overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-[3px] min-w-fit">
                {recentWeeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                        {week.contributionDays.map((day, dayIdx) => (
                            <div
                                key={dayIdx}
                                className={`w-[13px] h-[13px] rounded-[3px] ${getColor(day.contributionCount)} transition-all duration-200 hover:ring-1 hover:ring-purple-400/50 hover:scale-125 cursor-pointer`}
                                title={`${day.date}: ${day.contributionCount} contributions`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
                <span>Less</span>
                <div className="w-[11px] h-[11px] rounded-[2px] bg-white/[0.04]" />
                <div className="w-[11px] h-[11px] rounded-[2px] bg-purple-900/60" />
                <div className="w-[11px] h-[11px] rounded-[2px] bg-purple-700/70" />
                <div className="w-[11px] h-[11px] rounded-[2px] bg-purple-500/80" />
                <div className="w-[11px] h-[11px] rounded-[2px] bg-purple-400" />
                <span>More</span>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
    return (
        <div className="glass rounded-2xl p-5 flex flex-col items-center text-center card-lift group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10 flex flex-col items-center">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-[11px] text-gray-500 uppercase tracking-wider">{label}</div>
            </div>
        </div>
    );
}

// ---------- main page ----------

export default function ProjectsPage() {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('/api/github')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch GitHub data');
                return res.json();
            })
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Filter & search
    const filteredRepos = useMemo(() => {
        if (!data) return [];
        let repos = data.repos;

        if (filter !== 'all') {
            repos = repos.filter(r => r.language === filter);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            repos = repos.filter(
                r =>
                    r.name.toLowerCase().includes(q) ||
                    (r.description || '').toLowerCase().includes(q) ||
                    r.topics.some(t => t.toLowerCase().includes(q))
            );
        }

        return repos;
    }, [data, filter, searchQuery]);

    const pinnedNames = ['smartedu', 'ai_word_generator', 'encryptionapp', 'resume', 'Portfolio'];
    const featuredRepos = useMemo(
        () =>
            data
                ? data.repos.filter(r =>
                    pinnedNames.some(p => r.name.toLowerCase() === p.toLowerCase()) ||
                    r.stars > 0
                )
                : [],
        [data]
    );

    const languages = useMemo(() => {
        if (!data) return [];
        const set = new Set(data.repos.map(r => r.language).filter(Boolean) as string[]);
        return Array.from(set).sort();
    }, [data]);

    return (
        <div className="page-wrapper noise-overlay">
            {/* Background Gradients */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/15 via-violet-700/10 to-transparent rounded-full blur-[150px]" />
            <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-[150px]" />
            <div className="absolute top-[60%] right-[10%] w-[300px] h-[300px] bg-gradient-to-tl from-purple-800/10 to-transparent rounded-full blur-[120px]" />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                    {/* ─── Page Header ─── */}
                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <HiSparkles className="text-purple-400" />
                            <span className="text-xs text-gray-400 uppercase tracking-widest">Live from GitHub</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif gradient-text mb-4">
                            Projects
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Every repository I create on GitHub automatically appears here — always up to date
                        </p>
                    </AnimatedSection>

                    {/* ─── Stats & Streaks ─── */}
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="glass rounded-2xl p-5 animate-pulse">
                                    <div className="h-8 w-12 bg-white/10 rounded mx-auto mb-2" />
                                    <div className="h-6 w-16 bg-white/10 rounded mx-auto mb-1" />
                                    <div className="h-3 w-20 bg-white/5 rounded mx-auto" />
                                </div>
                            ))}
                        </div>
                    ) : data ? (
                        <AnimatedSection className="mb-12">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard
                                    icon={<FaFire className="text-orange-400" />}
                                    label="Current Streak"
                                    value={`${data.streaks.currentStreak} days`}
                                    color="from-orange-500/20 to-red-500/20"
                                />
                                <StatCard
                                    icon={<FaTrophy className="text-yellow-400" />}
                                    label="Longest Streak"
                                    value={`${data.streaks.longestStreak} days`}
                                    color="from-yellow-500/20 to-amber-500/20"
                                />
                                <StatCard
                                    icon={<HiLightningBolt className="text-purple-400" />}
                                    label="Total Contributions"
                                    value={data.contributions.totalContributions}
                                    color="from-purple-500/20 to-indigo-500/20"
                                />
                                <StatCard
                                    icon={<FaCalendarAlt className="text-cyan-400" />}
                                    label="Active Days"
                                    value={data.streaks.activeDays}
                                    color="from-cyan-500/20 to-blue-500/20"
                                />
                            </div>
                        </AnimatedSection>
                    ) : null}

                    {/* ─── Contribution Graph ─── */}
                    {data && data.contributions.weeks.length > 0 && (
                        <AnimatedSection className="mb-12">
                            <div className="glass rounded-3xl p-6 md:p-8">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <HiLightningBolt className="text-purple-400" />
                                    Contribution Activity
                                    <span className="text-xs text-gray-500 font-normal ml-2">last 6 months</span>
                                </h2>
                                <ContributionGraph weeks={data.contributions.weeks} />
                            </div>
                        </AnimatedSection>
                    )}

                    {/* ─── Organizations ─── */}
                    {data && data.organizations.length > 0 && (
                        <AnimatedSection className="mb-12">
                            <div className="glass rounded-3xl p-6 md:p-8">
                                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <FaBuilding className="text-purple-400" />
                                    Organizations
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {data.organizations.map((org) => (
                                        <a
                                            key={org.login}
                                            href={`https://github.com/${org.login}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 group"
                                        >
                                            <img
                                                src={org.avatarUrl}
                                                alt={org.login}
                                                className="w-12 h-12 rounded-xl ring-2 ring-white/10 group-hover:ring-purple-500/40 transition-all duration-300"
                                            />
                                            <div>
                                                <div className="text-white font-medium group-hover:text-purple-300 transition-colors">
                                                    {org.login}
                                                </div>
                                                {org.description && (
                                                    <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                                        {org.description}
                                                    </div>
                                                )}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* ─── Top Languages ─── */}
                    {data && data.topLanguages.length > 0 && (
                        <AnimatedSection className="mb-12">
                            <div className="glass rounded-3xl p-6 md:p-8">
                                <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                                    <HiSparkles className="text-purple-400" />
                                    Top Languages
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {data.topLanguages.map((lang) => {
                                        const total = data.topLanguages.reduce((acc, l) => acc + l.count, 0);
                                        const pct = Math.round((lang.count / total) * 100);
                                        return (
                                            <div key={lang.name} className="flex items-center gap-2 text-sm">
                                                <span
                                                    className="w-3 h-3 rounded-full ring-1 ring-white/10"
                                                    style={{ backgroundColor: languageColors[lang.name] || '#8b949e' }}
                                                />
                                                <span className="text-gray-300">{lang.name}</span>
                                                <span className="text-gray-600 text-xs">{pct}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Language bar */}
                                <div className="mt-4 h-2.5 rounded-full overflow-hidden bg-white/[0.04] flex">
                                    {data.topLanguages.map((lang) => {
                                        const total = data.topLanguages.reduce((acc, l) => acc + l.count, 0);
                                        const pct = (lang.count / total) * 100;
                                        return (
                                            <div
                                                key={lang.name}
                                                className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                                                style={{
                                                    width: `${pct}%`,
                                                    backgroundColor: languageColors[lang.name] || '#8b949e',
                                                }}
                                                title={`${lang.name}: ${Math.round(pct)}%`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </AnimatedSection>
                    )}

                    {/* ─── Search & Filter Bar ─── */}
                    <AnimatedSection className="mb-8">
                        <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                            {/* Search */}
                            <div className="relative flex-1 w-full">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                />
                            </div>

                            {/* Language Filters */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filter === 'all'
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                        : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white'
                                        }`}
                                >
                                    All
                                </button>
                                {languages.map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => setFilter(lang)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${filter === lang
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                            : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white'
                                            }`}
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: languageColors[lang] || '#8b949e' }}
                                        />
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* ─── Featured Projects ─── */}
                    {!loading && featuredRepos.length > 0 && (
                        <div className="mb-16">
                            <AnimatedSection>
                                <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                                    <FaStar className="text-yellow-400" />
                                    Featured Projects
                                </h2>
                            </AnimatedSection>

                            <div className="grid md:grid-cols-2 gap-6">
                                {featuredRepos.map((repo, idx) => (
                                    <AnimatedSection key={repo.id} delay={idx * 120} animation={idx % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}>
                                        <div className="glass rounded-3xl p-8 card-lift relative overflow-hidden group h-full">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                            <div className="relative z-10">
                                                <div className="flex items-start justify-between mb-4">
                                                    <span className="text-4xl">{getProjectIcon(repo.name)}</span>
                                                    <div className="flex items-center gap-3">
                                                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                                                            <FaGithub className="text-xl" />
                                                        </a>
                                                        {repo.homepage && (
                                                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                                                                <FaExternalLinkAlt />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                                    {repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                                </h3>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                                    {repo.description || 'No description provided.'}
                                                </p>

                                                {repo.topics.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {repo.topics.slice(0, 5).map((topic) => (
                                                            <span key={topic} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    {repo.language && (
                                                        <span className="flex items-center gap-1.5">
                                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#8b949e' }} />
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1">
                                                        <FaStar className="text-[10px]" />
                                                        {repo.stars}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaCodeBranch className="text-[10px]" />
                                                        {repo.forks}
                                                    </span>
                                                    <span className="text-gray-600 ml-auto text-[10px]">
                                                        Updated {new Date(repo.pushedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ─── All Projects Grid ─── */}
                    <div>
                        <AnimatedSection>
                            <h2 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
                                All Repositories
                                {data && (
                                    <span className="text-sm font-sans font-normal text-gray-500">
                                        ({filteredRepos.length} of {data.repos.length})
                                    </span>
                                )}
                            </h2>
                            <p className="text-gray-500 text-sm mb-8">

                            </p>
                        </AnimatedSection>

                        {loading ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="glass rounded-2xl p-10 text-center">
                                <p className="text-red-400 mb-2">Failed to load projects</p>
                                <p className="text-gray-500 text-sm">{error}</p>
                            </div>
                        ) : filteredRepos.length === 0 ? (
                            <div className="glass rounded-2xl p-10 text-center">
                                <p className="text-gray-400 mb-2">No projects found</p>
                                <p className="text-gray-500 text-sm">
                                    {searchQuery ? 'Try a different search term' : 'No projects match the selected filter'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredRepos.map((repo, idx) => (
                                    <AnimatedSection key={repo.id} delay={idx * 80}>
                                        <div className="glass rounded-2xl p-6 card-lift group h-full flex flex-col relative overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[idx % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="flex items-start justify-between mb-3">
                                                    <span className="text-3xl">{getProjectIcon(repo.name)}</span>
                                                    <div className="flex items-center gap-2">
                                                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                                            <FaGithub />
                                                        </a>
                                                        {repo.homepage && (
                                                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-400 transition-colors">
                                                                <FaExternalLinkAlt className="text-sm" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                                                    {repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                                </h3>
                                                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow line-clamp-2">
                                                    {repo.description || 'No description provided.'}
                                                </p>

                                                {repo.topics.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                                        {repo.topics.slice(0, 3).map((topic) => (
                                                            <span key={topic} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                                                                {topic}
                                                            </span>
                                                        ))}
                                                        {repo.topics.length > 3 && (
                                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                                                                +{repo.topics.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto pt-2 border-t border-white/[0.04]">
                                                    {repo.language && (
                                                        <span className="flex items-center gap-1.5">
                                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#8b949e' }} />
                                                            {repo.language}
                                                        </span>
                                                    )}
                                                    {repo.stars > 0 && (
                                                        <span className="flex items-center gap-1">
                                                            <FaStar className="text-[10px] text-yellow-500" />
                                                            {repo.stars}
                                                        </span>
                                                    )}
                                                    {repo.forks > 0 && (
                                                        <span className="flex items-center gap-1">
                                                            <FaCodeBranch className="text-[10px]" />
                                                            {repo.forks}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ─── CTA ─── */}
                    <AnimatedSection className="text-center mt-16">
                        <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-600/5" />
                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                                    Want to collaborate?
                                </h3>
                                <p className="text-gray-400 mb-6">Check out my GitHub for more projects, contributions, and open source work</p>
                                <a
                                    href={`https://github.com/${data?.username || 'SarthakNawali'}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                                >
                                    <FaGithub className="text-lg" />
                                    View GitHub Profile
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}
