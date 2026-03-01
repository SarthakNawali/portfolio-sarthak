'use client';

import { useState, FormEvent } from 'react';
import Navbar from '../Navbar';
import AnimatedSection from '../components/AnimatedSection';
import { HiSparkles } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                const data = await response.json().catch(() => ({}));
                setErrorMessage(data.error || 'Failed to send email. Please try again later.');
                console.error('Failed to send email:', data);
            }
        } catch (error) {
            setErrorMessage('Network error. Please check your connection and try again.');
            console.error('Error sending email:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <FaEnvelope className="text-xl" />,
            label: 'Email',
            value: 'sarthaknawali2007@gmail.com',
            href: 'mailto:sarthaknawali2007@gmail.com',
        },
        {
            icon: <FaGithub className="text-xl" />,
            label: 'GitHub',
            value: 'SarthakNawali',
            href: 'https://github.com/SarthakNawali',
        },
        {
            icon: <FaLinkedin className="text-xl" />,
            label: 'LinkedIn',
            value: 'Sarthak Nawali',
            href: 'https://www.linkedin.com/in/sarthak-nawali-4a76b631a/',
        },
        {
            icon: <FaMapMarkerAlt className="text-xl" />,
            label: 'Location',
            value: 'India',
            href: '#',
        },
    ];

    return (
        <div className="page-wrapper noise-overlay">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-600/15 via-violet-700/10 to-transparent rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-[150px]" />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
                    {/* Header */}
                    <AnimatedSection className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                            <HiSparkles className="text-purple-400" />
                            <span className="text-xs text-gray-400 uppercase tracking-widest">Get in touch</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif gradient-text mb-4">
                            Contact
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Have a project in mind? Let&apos;s work together and create something amazing.
                        </p>
                    </AnimatedSection>

                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Contact Info */}
                        <AnimatedSection className="lg:col-span-2" animation="fade-in-left" delay={200}>
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-serif text-white mb-3">
                                        Let&apos;s <span className="text-purple-400">Connect</span>
                                    </h2>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your story.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {contactInfo.map((info, idx) => (
                                        <a
                                            key={idx}
                                            href={info.href}
                                            target={info.href.startsWith('http') ? '_blank' : undefined}
                                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            className="flex items-center gap-4 p-4 glass rounded-xl glass-hover transition-all duration-300 group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-colors duration-300">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">{info.label}</p>
                                                <p className="text-sm text-white group-hover:text-purple-300 transition-colors duration-300">{info.value}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>

                                {/* Quick connect */}
                                <div className="glass rounded-2xl p-6">
                                    <p className="text-sm text-gray-400 mb-4">Quick connect via socials:</p>
                                    <div className="flex gap-3">
                                        <a
                                            href="https://github.com/SarthakNawali"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                                        >
                                            <FaGithub className="text-lg" />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/sarthak-nawali-4a76b631a/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[#0A66C2]/20 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] transition-all duration-300"
                                        >
                                            <FaLinkedin className="text-lg" />
                                        </a>
                                        <a
                                            href="mailto:sarthaknawali2007@gmail.com"
                                            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all duration-300"
                                        >
                                            <FaEnvelope className="text-lg" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Contact Form */}
                        <AnimatedSection className="lg:col-span-3" animation="fade-in-right" delay={200}>
                            <div className="glass rounded-3xl p-8 md:p-10">
                                <h2 className="text-xl font-serif text-white mb-6">Send a Message</h2>

                                {submitted && (
                                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 text-sm animate-fade-in-up">
                                        ✅ Thank you! Your message has been sent successfully. I&apos;ll get back to you soon.
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm animate-fade-in-up">
                                        ❌ {errorMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="name" className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300"
                                                placeholder="abc@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300"
                                            placeholder="Project Collaboration"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-300 resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed rounded-xl text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-white/5 py-8">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            © 2025 Sarthak Nawali. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-600">
                            Built with <span className="text-purple-400">♥</span> using Next.js & Tailwind CSS
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
