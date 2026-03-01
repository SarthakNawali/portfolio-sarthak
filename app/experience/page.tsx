'use client';

import Navbar from '../Navbar';
import AnimatedSection from '../components/AnimatedSection';
import { HiSparkles } from 'react-icons/hi';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCertificate, FaTrophy } from 'react-icons/fa';

const experiences = [
    {
        role: 'Intern / AI-ML Engineer',
        company: 'Hyperstealler Technologies',
        location: 'India',
        period: 'June 2025 – August 2025',
        description: 'Worked on building and deploying AI/ML models for real-world applications, including stock market strategies and data-driven solutions.',
        highlights: [
            'Worked on 10 AI-ML models with accuracy more than 85%',
            'Built Stock Market threshold strategy',
            'Utilized Python, Scikit-learn, Transformer, Pandas, NumPy, LangChain',
        ],
        color: 'from-purple-500 to-violet-600',
    },
    {
        role: 'Intern / Data Analysis',
        company: 'Reva Technologies',
        location: 'India',
        period: 'June 2024 – July 2024',
        description: 'Gained hands-on experience in data visualization and business intelligence using Power BI to create actionable insights.',
        highlights: [
            'Gained hands-on experience in data visualization using Power BI',
            'Designed interactive dashboards and created meaningful visual reports',
            'Learned data modeling, DAX functions, and visual storytelling',
            'Skills: Power BI, Dashboard, Data Cleaning, Data Analysis',
        ],
        color: 'from-emerald-500 to-teal-600',
    },
];

const projects = [
    {
        role: 'Lead Developer',
        company: 'Encryption & Decryption Application (Final Year Project)',
        location: 'Pillai HOC College of Engineering & Technology',
        period: 'August 2024 – March 2025',
        description: 'Led the development of a security-focused Android application using AES encryption for safe communication and data protection.',
        highlights: [
            'Developed an application based on the security domain using AES encryption',
            'Ensured privacy and safe communication with strong data protection',
            'Focused on simple UI, real-world security, and effective implementation',
            'Led a team of 2 members to successfully complete the project on time',
            'Skills: Java, Kotlin, Figma',
        ],
        color: 'from-blue-500 to-indigo-600',
    },
];

const certifications = [
    { name: 'Generative AI with LangChain & HuggingFace', issuer: 'Udemy (Krish Naik)', year: '2025' },
];

const achievements = [
    'Successfully built and deployed 10+ projects',
    'Worked on 10 AI-ML models with accuracy more than 85%',
    'Led a team of 2 members for the final-year project',
    'Active GitHub contributor with consistent coding streak',
    'Combined expertise in both frontend and backend development',
    'Proficient in multiple programming languages and frameworks',
];

export default function ExperiencePage() {
    return (
        <div className="page-wrapper noise-overlay">
            {/* Background */}
            <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/15 via-violet-700/10 to-transparent rounded-full blur-[150px]" />
            <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-indigo-600/10 to-transparent rounded-full blur-[150px]" />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
                    {/* Header */}
                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <HiSparkles className="text-purple-400" />
                            <span className="text-xs text-gray-400 uppercase tracking-widest">My Journey</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif gradient-text mb-4">
                            Experience
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            My professional journey and continuous learning path
                        </p>
                    </AnimatedSection>

                    {/* Work Experience Timeline */}
                    <AnimatedSection className="mb-6">
                        <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                            <FaBriefcase className="text-purple-400" />
                            Work Experience
                        </h2>
                    </AnimatedSection>
                    <div className="relative mb-20">
                        {/* Timeline line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent" />

                        <div className="space-y-10">
                            {experiences.map((exp, idx) => (
                                <AnimatedSection key={idx} delay={idx * 200} animation="fade-in-left">
                                    <div className="relative pl-16 md:pl-20">
                                        {/* Timeline dot */}
                                        <div className={`absolute left-3.5 md:left-5.5 top-2 w-5 h-5 rounded-full bg-gradient-to-br ${exp.color} ring-4 ring-black shadow-lg`}>
                                            <div className="absolute inset-1 rounded-full bg-white/20" />
                                        </div>

                                        <div className="glass rounded-2xl p-6 md:p-8 card-lift group relative overflow-hidden">
                                            {/* Hover gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                            <div className="relative z-10">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <FaBriefcase className="text-purple-400" />
                                                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                                </div>

                                                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="text-purple-300">{exp.company}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FaMapMarkerAlt className="text-xs text-purple-400" />
                                                        {exp.location}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FaCalendarAlt className="text-xs text-purple-400" />
                                                        {exp.period}
                                                    </span>
                                                </div>

                                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                                    {exp.description}
                                                </p>

                                                <ul className="space-y-2">
                                                    {exp.highlights.map((highlight, hIdx) => (
                                                        <li key={hIdx} className="flex items-start gap-2 text-sm text-gray-400">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>

                    {/* Projects */}
                    <AnimatedSection className="mb-6">
                        <h2 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
                            <FaTrophy className="text-yellow-400" />
                            Key Projects
                        </h2>
                    </AnimatedSection>
                    <div className="relative mb-20">
                        {/* Timeline line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />

                        <div className="space-y-10">
                            {projects.map((proj, idx) => (
                                <AnimatedSection key={idx} delay={idx * 200} animation="fade-in-left">
                                    <div className="relative pl-16 md:pl-20">
                                        {/* Timeline dot */}
                                        <div className={`absolute left-3.5 md:left-5.5 top-2 w-5 h-5 rounded-full bg-gradient-to-br ${proj.color} ring-4 ring-black shadow-lg`}>
                                            <div className="absolute inset-1 rounded-full bg-white/20" />
                                        </div>

                                        <div className="glass rounded-2xl p-6 md:p-8 card-lift group relative overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${proj.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                            <div className="relative z-10">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <FaBriefcase className="text-blue-400" />
                                                    <h3 className="text-xl font-semibold text-white">{proj.role}</h3>
                                                </div>

                                                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="text-blue-300">{proj.company}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FaMapMarkerAlt className="text-xs text-blue-400" />
                                                        {proj.location}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FaCalendarAlt className="text-xs text-blue-400" />
                                                        {proj.period}
                                                    </span>
                                                </div>

                                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                                    {proj.description}
                                                </p>

                                                <ul className="space-y-2">
                                                    {proj.highlights.map((highlight, hIdx) => (
                                                        <li key={hIdx} className="flex items-start gap-2 text-sm text-gray-400">
                                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <AnimatedSection className="mb-20">
                        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-10">
                            <FaCertificate className="inline-block mr-3 text-purple-400" />
                            Certifications
                        </h2>
                        <div className="grid sm:grid-cols-1 gap-4 max-w-3xl mx-auto">
                            {certifications.map((cert, idx) => (
                                <AnimatedSection key={idx} delay={idx * 100}>
                                    <div className="glass rounded-xl p-5 card-lift group">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 group-hover:bg-purple-500/20 transition-colors">
                                                <FaCertificate />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-medium text-sm">{cert.name}</h3>
                                                <p className="text-xs text-gray-400 mt-1">{cert.issuer} • {cert.year}</p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>

                    {/* Achievements */}
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-10">
                            <FaTrophy className="inline-block mr-3 text-yellow-400" />
                            Achievements
                        </h2>
                        <div className="glass rounded-3xl p-8 md:p-10">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {achievements.map((achievement, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3">
                                        <span className="mt-0.5 text-yellow-400">★</span>
                                        <p className="text-gray-300 text-sm">{achievement}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}
