'use client';

import Navbar from '../Navbar';
import AnimatedSection from '../components/AnimatedSection';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const projects = [
    {
        title: 'SmartEdu',
        description: 'A comprehensive educational platform built with TypeScript and modern web technologies. Features intelligent learning tools and an interactive interface for enhanced education.',
        tags: ['TypeScript', 'Next.js', 'React', 'Firebase'],
        github: 'https://github.com/SarthakNawali/smartedu',
        live: '',
        featured: true,
        gradient: 'from-purple-500/20 to-indigo-500/20',
        icon: '🎓',
        language: 'TypeScript',
        stars: 0,
        forks: 0,
    },
    {
        title: 'AI Word Generator',
        description: 'AI-powered Streamlit app that generates complete academic projects with professional Word formatting, automated content creation via Groq API, and integrated image search using Google Custom Search API.',
        tags: ['Python', 'Streamlit', 'Groq API', 'Google API', 'AI'],
        github: 'https://github.com/SarthakNawali/ai_word_generator',
        live: '',
        featured: true,
        gradient: 'from-emerald-500/20 to-teal-500/20',
        icon: '🤖',
        language: 'Python',
        stars: 0,
        forks: 0,
    },
    {
        title: 'Encryption App',
        description: 'A security-focused Android application for keeping documents and files safe using AES encryption. Built with Android Studio featuring secure data protection and privacy-first design.',
        tags: ['Java', 'Android Studio', 'AES Encryption', 'Kotlin'],
        github: 'https://github.com/SarthakNawali/Encryptionapp',
        live: '',
        featured: true,
        gradient: 'from-blue-500/20 to-cyan-500/20',
        icon: '🔐',
        language: 'Java',
        stars: 0,
        forks: 0,
    },
    {
        title: 'Resume ATS Analyzer',
        description: 'An intelligent resume analyzer built with Jupyter Notebook that scores resumes using ATS (Applicant Tracking System) criteria for better job application outcomes.',
        tags: ['Python', 'Jupyter Notebook', 'ML', 'NLP'],
        github: 'https://github.com/SarthakNawali/resume',
        live: '',
        featured: false,
        gradient: 'from-amber-500/20 to-orange-500/20',
        icon: '📄',
        language: 'Jupyter Notebook',
        stars: 0,
        forks: 0,
    },
    {
        title: 'Portfolio Website',
        description: 'A premium, dark-themed portfolio website with smooth animations, glassmorphism effects, and responsive design. Features resume analysis, GitHub integration, and contact form.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
        github: 'https://github.com/SarthakNawali',
        live: '',
        featured: false,
        gradient: 'from-violet-500/20 to-purple-500/20',
        icon: '🌐',
        language: 'TypeScript',
        stars: 0,
        forks: 0,
    },
];

const languageColors: Record<string, string> = {
    'TypeScript': 'bg-blue-500',
    'Python': 'bg-yellow-500',
    'Java': 'bg-red-500',
    'Jupyter Notebook': 'bg-orange-500',
    'JavaScript': 'bg-yellow-400',
    'Kotlin': 'bg-purple-500',
};

export default function ProjectsPage() {
    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <div className="page-wrapper noise-overlay">
            {/* Background Gradients */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/15 via-violet-700/10 to-transparent rounded-full blur-[150px]" />
            <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-[150px]" />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
                    {/* Page Header */}
                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <HiSparkles className="text-purple-400" />
                            <span className="text-xs text-gray-400 uppercase tracking-widest">My Work</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif gradient-text mb-4">
                            Projects
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            A showcase of my recent work and personal projects from GitHub
                        </p>
                    </AnimatedSection>

                    {/* Featured Projects */}
                    <div className="mb-16">
                        <AnimatedSection>
                            <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                                <FaStar className="text-yellow-400" />
                                Featured Projects
                            </h2>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredProjects.map((project, idx) => (
                                <AnimatedSection key={idx} delay={idx * 150} animation={idx % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}>
                                    <div className={`glass rounded-3xl p-8 card-lift relative overflow-hidden group h-full`}>
                                        {/* Gradient accent */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-4">
                                                <span className="text-4xl">{project.icon}</span>
                                                <div className="flex items-center gap-3">
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                                                        <FaGithub className="text-xl" />
                                                    </a>
                                                    {project.live && (
                                                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                                                            <FaExternalLinkAlt />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.map((tag, tagIdx) => (
                                                    <span
                                                        key={tagIdx}
                                                        className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Language & Stats */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1.5">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${languageColors[project.language] || 'bg-gray-500'}`} />
                                                    {project.language}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaStar className="text-[10px]" />
                                                    {project.stars}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaCodeBranch className="text-[10px]" />
                                                    {project.forks}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>

                    {/* Other Projects */}
                    <div>
                        <AnimatedSection>
                            <h2 className="text-2xl font-serif text-white mb-8">
                                Other Projects
                            </h2>
                        </AnimatedSection>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherProjects.map((project, idx) => (
                                <AnimatedSection key={idx} delay={idx * 100}>
                                    <div className="glass rounded-2xl p-6 card-lift group h-full flex flex-col relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex items-start justify-between mb-3">
                                                <span className="text-3xl">{project.icon}</span>
                                                <div className="flex items-center gap-2">
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                                        <FaGithub />
                                                    </a>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {project.tags.slice(0, 3).map((tag, tagIdx) => (
                                                    <span
                                                        key={tagIdx}
                                                        className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500">
                                                        +{project.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Language */}
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <span className={`w-2 h-2 rounded-full ${languageColors[project.language] || 'bg-gray-500'}`} />
                                                {project.language}
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <AnimatedSection className="text-center mt-16">
                        <div className="glass rounded-3xl p-10 md:p-14">
                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                                Want to see more?
                            </h3>
                            <p className="text-gray-400 mb-6">Check out my GitHub for more projects and contributions</p>
                            <a
                                href="https://github.com/SarthakNawali"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                            >
                                <FaGithub className="text-lg" />
                                View GitHub Profile
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}
