'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', external: false },
    { name: 'About', href: '/about', external: false },
    { name: 'Skills', href: '/skills', external: false },
    { name: 'Projects', href: '/projects', external: false },
    { name: 'Experience', href: '/experience', external: false },
    { name: 'Contact', href: '/contact', external: false },
    { name: 'Resume', href: '/resume.pdf', external: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif text-white hover:text-purple-300 transition-colors duration-300">
            S<span className="text-purple-400">.</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-purple-300 text-gray-400"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`relative text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:text-purple-300 ${pathname === item.href
                      ? 'text-white'
                      : 'text-gray-400'
                      }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) =>
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileOpen(false)}
                className="text-3xl font-serif transition-all duration-300 hover:text-purple-300 text-gray-300"
                style={{
                  transitionDelay: isMobileOpen ? `${index * 80}ms` : '0ms',
                  transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isMobileOpen ? 1 : 0,
                }}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`text-3xl font-serif transition-all duration-300 hover:text-purple-300 ${pathname === item.href ? 'text-purple-400' : 'text-gray-300'
                  }`}
                style={{
                  transitionDelay: isMobileOpen ? `${index * 80}ms` : '0ms',
                  transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isMobileOpen ? 1 : 0,
                }}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
}