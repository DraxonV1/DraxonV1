'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import content from '@/config/content.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export type UnifiedProject = {
  id: string | number;
  title: string;
  description: string;
  downloads: number;
  icon_url: string;
  slug: string;
  source: 'CurseForge' | 'Modrinth';
  url: string;
  categories: string[];
};

interface ModsProps {
  mods: UnifiedProject[];
}

export default function Mods({ mods }: ModsProps) {
  const { mods: modsContent } = content;

  return (
    <section id="mods" className="min-h-screen py-20">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gradient sm:text-5xl">
            {modsContent.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-dark-muted">
            {modsContent.description}
          </p>
        </motion.div>

        {/* Mods grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {mods.map((mod) => (
            <ModCard key={`${mod.source}-${mod.id}`} mod={mod} />
          ))}
        </motion.div>

        {/* Empty state */}
        {mods.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-dark-muted">
              No projects found. Check back soon for new projects!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ModCard({ mod }: { mod: UnifiedProject }) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl border border-dark-border bg-dark-surface transition-all duration-300 hover:border-coffee-500/50 hover:shadow-xl hover:shadow-coffee-500/10"
    >
      {/* Mod icon/thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-coffee-900 to-dark-elevated">
        {mod.icon_url ? (
          <img
            src={mod.icon_url}
            alt={`${mod.title} icon`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            📦
          </div>
        )}
        
        {/* Source Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-dark-bg/80 px-3 py-1 text-xs font-bold text-coffee-400 backdrop-blur-sm">
          {mod.source}
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-dark-text transition-colors duration-300 group-hover:text-coffee-400">
          {mod.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-dark-muted">
          {mod.description}
        </p>

        {/* Categories */}
        <div className="mb-4 flex flex-wrap gap-2">
          {mod.categories.slice(0, 3).map((category) => (
            <span
              key={category}
              className="rounded-full bg-dark-elevated px-3 py-1 text-xs font-medium text-dark-muted"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-dark-muted">
            <Download size={16} />
            <span>{mod.downloads.toLocaleString()} downloads</span>
          </div>
        </div>

        {/* View button */}
        <motion.a
          href={mod.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 rounded-lg bg-coffee-500/20 py-2 font-medium text-coffee-400 transition-colors duration-300 hover:bg-coffee-500/30 focus-ring"
        >
          View on {mod.source}
          <ExternalLink size={16} />
        </motion.a>
      </div>

      {/* Hover glow effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-500/5 to-transparent" />
      </div>
    </motion.article>
  );
}
