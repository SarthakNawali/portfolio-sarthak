'use client';

import Image from 'next/image';
import Navbar from '../Navbar';
import AnimatedSection from '../components/AnimatedSection';
import { HiSparkles } from 'react-icons/hi';
import {
  FaBrain,
  FaPalette,
  FaServer,
  FaTools,
  FaHandsHelping,
  FaComments,
  FaClock,
  FaPuzzlePiece,
  FaSyncAlt,
  FaBullseye,
} from 'react-icons/fa';

export default function SkillsPage() {
  const technologies = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', level: 90, color: 'from-blue-400 to-yellow-400' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', level: 75, color: 'from-red-500 to-orange-600' },
    { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg', level: 70, color: 'from-blue-500 to-indigo-600' },
    { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg', level: 70, color: 'from-purple-500 to-orange-400' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', level: 85, color: 'from-yellow-400 to-amber-500' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', level: 80, color: 'from-blue-500 to-blue-700' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', level: 85, color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', level: 80, color: 'from-gray-300 to-gray-500' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', level: 85, color: 'from-orange-400 to-red-500' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', level: 80, color: 'from-blue-400 to-blue-600' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', level: 80, color: 'from-orange-400 to-red-500' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', level: 70, color: 'from-purple-400 to-pink-500' },
    { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg', level: 70, color: 'from-green-400 to-emerald-600' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', level: 75, color: 'from-amber-400 to-orange-600' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', level: 70, color: 'from-blue-500 to-orange-500' },
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg', level: 75, color: 'from-red-500 to-orange-500' },
    { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg', level: 75, color: 'from-blue-400 to-teal-500' },
    { name: 'Power BI', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', level: 65, color: 'from-yellow-500 to-yellow-700' },
  ];

  const technicalSkills = [
    {
      category: 'Programming Languages',
      skills: ['C', 'Python', 'Java', 'Kotlin', 'JavaScript', 'TypeScript'],
      icon: <FaBrain className="text-2xl text-purple-400" />,
      color: 'purple',
    },
    {
      category: 'Web Technologies',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Figma'],
      icon: <FaPalette className="text-2xl text-blue-400" />,
      color: 'blue',
    },
    {
      category: 'AI / Machine Learning',
      skills: ['PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'LangChain', 'HuggingFace', 'NLP'],
      icon: <FaServer className="text-2xl text-emerald-400" />,
      color: 'green',
    },
    {
      category: 'Tools & Miscellaneous',
      skills: ['Git', 'GitHub', 'MySQL', 'Firebase', 'Android Studio', 'Power BI', 'ChatGPT', 'VS Code'],
      icon: <FaTools className="text-2xl text-amber-400" />,
      color: 'amber',
    },
  ];

  const softSkills = [
    { name: 'Team Work', icon: <FaHandsHelping className="text-2xl" />, desc: 'Collaborative and supportive team player' },
    { name: 'Communication', icon: <FaComments className="text-2xl" />, desc: 'Clear and effective communicator' },
    { name: 'Time Management', icon: <FaClock className="text-2xl" />, desc: 'Efficient at managing deadlines' },
    { name: 'Critical Thinking', icon: <FaPuzzlePiece className="text-2xl" />, desc: 'Analytical and logical problem solver' },
    { name: 'Adaptability', icon: <FaSyncAlt className="text-2xl" />, desc: 'Quick to learn and adapt' },
    { name: 'Leadership', icon: <FaBullseye className="text-2xl" />, desc: 'Taking initiative and guiding teams' },
  ];

  const colorMap: Record<string, string> = {
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  };

  return (
    <div className="page-wrapper noise-overlay">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/15 via-violet-700/10 to-transparent rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-[150px]" />

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          {/* Header */}
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <HiSparkles className="text-purple-400" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">What I know</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif gradient-text mb-4">
              Skills
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Technologies and tools I work with
            </p>
          </AnimatedSection>

          {/* Technologies Grid */}
          <AnimatedSection className="mb-20">
            <h2 className="text-2xl font-serif text-white mb-8">Technologies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {technologies.map((tech, idx) => (
                <AnimatedSection key={idx} delay={idx * 60}>
                  <div className="glass rounded-2xl p-5 text-center card-lift group cursor-default relative overflow-hidden">
                    {/* Hover glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={48}
                          height={48}
                          className="drop-shadow-lg"
                          unoptimized
                        />
                      </div>
                      <h3 className="text-sm font-medium text-white mb-2">{tech.name}</h3>

                      {/* Skill bar */}
                      <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${tech.color} transition-all duration-1000`}
                          style={{ width: `${tech.level}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1 block">{tech.level}%</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Technical Skills Categories */}
          <AnimatedSection className="mb-20">
            <h2 className="text-2xl font-serif text-white mb-8">Technical Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {technicalSkills.map((category, idx) => (
                <AnimatedSection key={idx} delay={idx * 150} animation={idx % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}>
                  <div className="glass rounded-2xl p-6 card-lift h-full">
                    <div className="flex items-center gap-3 mb-5">
                      {category.icon}
                      <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-xs px-3 py-1.5 rounded-full border ${colorMap[category.color]} transition-all duration-300 hover:scale-105`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Soft Skills */}
          <AnimatedSection>
            <h2 className="text-2xl font-serif text-white mb-8 text-center">Soft Skills</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {softSkills.map((skill, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="glass rounded-xl p-5 card-lift group cursor-default">
                    <div className="flex items-center gap-3">
                      <span className="text-purple-400 group-hover:scale-110 transition-transform duration-300">{skill.icon}</span>
                      <div>
                        <h3 className="text-white font-medium text-sm">{skill.name}</h3>
                        <p className="text-xs text-gray-500">{skill.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}