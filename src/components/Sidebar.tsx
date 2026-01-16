'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, User, Code, Terminal, Image, Mail, Menu, X, Github, Youtube } from 'lucide-react';
import content from '@/config/content.json';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'mods', label: 'Mods', icon: Code },
  { id: 'insights', label: 'Tech Insights', icon: Terminal },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect for sidebar background
  const sidebarY = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-lg border border-dark-border bg-dark-surface/80 backdrop-blur-md focus-ring lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        style={{ y: sidebarY }}
        initial={{ x: -300 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -300 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-dark-border bg-dark-surface/80 backdrop-blur-xl"
      >
        {/* Profile section */}
        <div className="border-b border-dark-border p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Profile avatar with glow */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative mb-4"
            >
              <div className="absolute inset-0 rounded-full bg-coffee-500 opacity-30 blur-xl" />
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-coffee-500 bg-gradient-to-br from-coffee-600 to-coffee-800">
                <div className="flex h-full w-full items-center justify-center bg-dark-surface">
                  <img src="/logo.png" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
            </motion.div>

            {/* Name and handle */}
            <h2 className="mb-1 text-xl font-bold text-gradient">Draxon</h2>
            <p className="font-mono text-sm text-dark-muted">@draxon.v9</p>
          </motion.div>
        </div>

        {/* Navigation items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-300 focus-ring ${
                      isActive
                        ? 'bg-coffee-500/20 text-coffee-400'
                        : 'text-dark-muted hover:bg-dark-elevated hover:text-dark-text'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-coffee-500"
                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                      />
                    )}

                    <Icon
                      size={20}
                      className={`transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>

                    {/* Hover glow effect */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-coffee-500/0 transition-colors duration-300 group-hover:bg-coffee-500/5"
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-dark-border p-4">
          <div className="mb-4 flex justify-center gap-4">
            <a href={content.contact.socials.github} target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-coffee-400 transition-colors">
              <Github size={18} />
            </a>
            <a href={content.contact.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-coffee-400 transition-colors">
              <Youtube size={18} />
            </a>
            <a href={content.contact.socials.discord} target="_blank" rel="noopener noreferrer" className="text-dark-muted hover:text-coffee-400 transition-colors">
              <Mail size={18} />
            </a>
          </div>
          <p className="text-center font-mono text-xs text-dark-muted">
            © 2024 DraxonV1
          </p>
        </div>
      </motion.aside>
    </>
  );
}
