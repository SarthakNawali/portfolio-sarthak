// page.tsx (Home)
import Navbar from './Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

export default function Home() {
  return (
    <div className="page-wrapper noise-overlay">
      {/* Background Effects */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '759px',
          height: '798px',
          background: 'conic-gradient(from 186deg at 56.15% 45.98%, #5305D9 0deg, #737373 360deg)',
          boxShadow: '337.3px 337.3px 337.3px rgba(0, 0, 0, 0.5)',
          filter: 'blur(168.65px)',
          top: '30%',
          right: '0%',
          transform: 'translateY(-50%)',
          zIndex: 0
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-40" />
      <div className="absolute top-40 left-[20%] w-1 h-1 bg-violet-300 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-[15%] w-1.5 h-1.5 bg-purple-500 rounded-full animate-float opacity-20" style={{ animationDelay: '4s' }} />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <main id="home" className="min-h-screen flex items-center relative overflow-hidden">
          <div className="w-full px-6 sm:px-8 lg:px-12 lg:pr-[45vw]">
            <div className="max-w-7xl mx-auto">
              {/* Left Content */}
              <div className="text-white relative z-10">
                {/* Greeting badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in-up">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Available for work</span>
                </div>

                <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <h1 className="text-4xl lg:text-5xl xl:text-5xl font-serif leading-tight font-normal text-gray-200">
                    Hey, I&apos;m
                  </h1>
                  <h2 className="text-5xl lg:text-7xl xl:text-7xl font-serif leading-tight font-bold">
                    Sarthak
                    <span className="text-purple-400">.</span>
                  </h2>
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-serif leading-tight gradient-text font-normal">
                    Full Stack Developer
                  </h3>
                </div>

                <div className="space-y-1 text-gray-400 text-sm lg:text-base pt-6 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <p>Passionate about <span className="text-purple-300">AI/ML</span> and <span className="text-purple-300">Software Development</span></p>
                  <p>Exploring the world of Machine Learning & Data Science</p>
                  <p className="text-xs text-gray-500 pt-2 tracking-wider uppercase">
                    Web • Python • AI/ML • GenAI • App Dev • Design
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <Link
                    href="/projects"
                    className="group flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    View My Work
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-6 py-3 glass glass-hover rounded-full text-gray-300 text-sm font-medium transition-all duration-300"
                  >
                    <HiDownload className="text-lg" />
                    Get in Touch
                  </Link>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-5 pt-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                  <a
                    href="https://github.com/SarthakNawali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-xl glass glass-hover transition-all duration-300">
                      <FaGithub className="text-xl" />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sarthak-nawali-4a76b631a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-gray-400 hover:text-[#0A66C2] transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-xl glass glass-hover transition-all duration-300">
                      <FaLinkedin className="text-xl" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Content - Profile Image */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-end justify-end overflow-hidden">
                <div className="relative h-full w-full flex items-end justify-end">
                  {/* Decorative ring */}
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-purple-500/10 animate-spin-slow" />
                  <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-purple-500/5 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

                  <div className="relative h-full flex items-end" style={{ zIndex: 1 }}>
                    <Image
                      src="/profile.jpg"
                      alt="Sarthak - Full Stack Developer"
                      width={697}
                      height={807}
                      className="h-full w-auto object-cover object-bottom"
                      priority
                    />
                    {/* Image gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-purple-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}