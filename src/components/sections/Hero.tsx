'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import content from '@/config/content.json';

export default function Hero() {
  const { hero } = content;
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-coffee-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-coffee-600/20 blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-coffee-500/30 bg-coffee-500/10 px-4 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coffee-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-coffee-500" />
          </span>
          <span className="text-sm font-medium text-coffee-300">
            {hero.badge}
          </span>
        </motion.div>

        {/* Main heading with staggered animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">{hero.title1}</span>
          <br />
          <span className="text-dark-text">{hero.title2}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-dark-muted sm:text-xl"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#mods"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden rounded-lg bg-coffee-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-coffee-500/50 focus-ring"
          >
            <span className="relative z-10">{hero.cta1}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-coffee-600 to-coffee-400"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border-2 border-coffee-500 px-8 py-4 font-semibold text-coffee-400 transition-all duration-300 hover:bg-coffee-500/10 focus-ring"
          >
            {hero.cta2}
          </motion.a>
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {['Fabric API', 'Java', 'Minecraft 1.21+', 'Modrinth', 'GitHub'].map(
            (tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="rounded-full border border-dark-border bg-dark-surface/50 px-4 py-2 text-sm font-medium text-dark-muted backdrop-blur-sm transition-colors duration-300 hover:border-coffee-500/50 hover:text-coffee-400"
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dark-muted transition-colors duration-300 hover:text-coffee-400 focus-ring"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
