'use client';

import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import content from '@/config/content.json';

export default function Gallery() {
  const { gallery } = content;

  return (
    <section id="gallery" className="bg-dark-bg py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-gradient">{gallery.title}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-muted">
            {gallery.description}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-dark-border bg-dark-surface"
            >
              <div className={`absolute inset-0 flex items-center justify-center ${item.color} opacity-20 transition-opacity duration-500 group-hover:opacity-40`}>
                <ImageIcon size={48} className="text-coffee-500/20" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-6 transition-transform duration-300 group-hover:translate-y-[-4px]">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-coffee-400">
                  {item.category}
                </p>
                <h3 className="text-xl font-bold text-dark-text">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}