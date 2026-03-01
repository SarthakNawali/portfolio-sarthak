'use client';

import Navbar from '../Navbar';
import AnimatedSection from '../components/AnimatedSection';
import { FaCode, FaBrain, FaPalette, FaMobileAlt, FaGraduationCap, FaMapMarkerAlt, FaBookOpen } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function AboutPage() {
    const highlights = [
        { icon: <FaCode className="text-2xl" />, label: 'Full Stack Dev', desc: 'Building end-to-end web applications' },
        { icon: <FaBrain className="text-2xl" />, label: 'AI / ML', desc: 'Machine Learning & Data Science' },
        { icon: <FaPalette className="text-2xl" />, label: 'UI/UX Design', desc: 'Crafting beautiful interfaces' },
        { icon: <FaMobileAlt className="text-2xl" />, label: 'App Dev', desc: 'Android mobile applications' },
    ];

    const education = [
        {
            degree: 'B.Tech in Information Technology',
            school: 'Pillai University',
            year: '2025 - Present',
            description: 'Focusing on AI/ML, Data Science, and Full Stack Development',
        },
        {
            degree: 'Diploma in Computer Engineering',
            school: 'Pillai HOC College of Engineering & Technology (Rasayani)',
            year: '2022 - 2025',
            description: 'Percentage: 83.94% — Focused on developing technical skills in programming and software development',
        },
        {
            degree: 'SSC (Secondary School Certificate)',
            school: 'Jawaharlal Nehru Port Vidyalaya, JNPT',
            year: '2022',
            description: 'Percentage: 81% — Science stream with focus on Mathematics',
        },
    ];

    const coursework = [
        'Deep Learning', 'Data Structures and Algorithms', 'Databases',
        'Operating Systems', 'Computer Networks',
    ];


    return (
        <div className="page-wrapper noise-overlay">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/20 via-violet-700/10 to-transparent rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-purple-600/15 via-indigo-700/10 to-transparent rounded-full blur-[150px]" />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
                    {/* Page Header */}
                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <HiSparkles className="text-purple-400" />
                            <span className="text-xs text-gray-400 uppercase tracking-widest">Get to know me</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif gradient-text mb-4">
                            About Me
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            A passionate developer who loves building innovative solutions
                        </p>
                    </AnimatedSection>

                    {/* Bio Section */}
                    <AnimatedSection className="mb-20" delay={200}>
                        <div className="glass rounded-3xl p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-10 items-center">
                                <div>
                                    <h2 className="text-3xl font-serif text-white mb-6">
                                        Hello! I&apos;m <span className="text-purple-400">Sarthak Nawali</span>
                                    </h2>
                                    <div className="space-y-4 text-gray-300 leading-relaxed">
                                        <p>
                                            I&apos;m a Full Stack Developer and AI/ML enthusiast with a passion for building
                                            innovative and impactful digital solutions. I love exploring the intersection
                                            of technology and creativity.
                                        </p>
                                        <p>
                                            My journey in tech started with a curiosity about how things work, and it
                                            has evolved into a deep passion for creating applications that solve real-world
                                            problems. From web development to machine learning, I enjoy pushing the
                                            boundaries of what&apos;s possible.
                                        </p>
                                        <p>
                                            When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                                            contributing to open source, or designing intuitive user experiences.
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass rounded-2xl p-6 text-center card-lift">
                                        <div className="text-3xl font-bold text-purple-400 mb-1">10+</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Projects Built</div>
                                    </div>
                                    <div className="glass rounded-2xl p-6 text-center card-lift">
                                        <div className="text-3xl font-bold text-purple-400 mb-1">7+</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Technologies</div>
                                    </div>
                                    <div className="glass rounded-2xl p-6 text-center card-lift">
                                        <div className="text-3xl font-bold text-purple-400 mb-1">5+</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Years Coding</div>
                                    </div>
                                    <div className="glass rounded-2xl p-6 text-center card-lift">
                                        <div className="text-3xl font-bold text-purple-400 mb-1">∞</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">Curiosity</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* What I Do */}
                    <AnimatedSection className="mb-20" delay={100}>
                        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">
                            What I <span className="gradient-text">Do</span>
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {highlights.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="glass rounded-2xl p-6 text-center card-lift group cursor-default"
                                >
                                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">{item.label}</h3>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>


                    {/* Education */}
                    <AnimatedSection className="mb-20" delay={100}>
                        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">
                            <FaGraduationCap className="inline-block mr-3 text-purple-400" />
                            Education
                        </h2>
                        <div className="space-y-6 max-w-3xl mx-auto">
                            {education.map((edu, idx) => (
                                <div key={idx} className="glass rounded-2xl p-6 md:p-8 card-lift relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-violet-600 rounded-full" />
                                    <div className="pl-4">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                                            <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                                {edu.year}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                            <FaMapMarkerAlt className="text-purple-400" />
                                            {edu.school}
                                        </div>
                                        <p className="text-gray-300 text-sm">{edu.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>

                    {/* Relevant Coursework */}
                    <AnimatedSection className="mb-20" delay={100}>
                        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-10">
                            <FaBookOpen className="inline-block mr-3 text-purple-400" />
                            Relevant Coursework
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {coursework.map((course, idx) => (
                                <span
                                    key={idx}
                                    className="px-5 py-2.5 rounded-full glass glass-hover text-sm text-gray-300 hover:text-purple-300 transition-all duration-300 cursor-default"
                                >
                                    {course}
                                </span>
                            ))}
                        </div>
                    </AnimatedSection>


                    {/* Interests */}
                    <AnimatedSection delay={100}>
                        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-10">
                            Interests & <span className="gradient-text">Passions</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Machine Learning', 'Web Development', 'Open Source', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'GenAI', 'Problem Solving'].map((interest, idx) => (
                                <span
                                    key={idx}
                                    className="px-5 py-2.5 rounded-full glass glass-hover text-sm text-gray-300 hover:text-purple-300 transition-all duration-300 cursor-default"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
}
