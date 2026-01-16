'use client';

import { motion } from 'framer-motion';
import { Terminal, Code2, Zap } from 'lucide-react';
import content from '@/config/content.json';

export default function TechInsights() {
  const { techInsights } = content;

  return (
    <section id="insights" className="bg-dark-bg py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-gradient">{techInsights.title}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-muted">
            {techInsights.description}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {techInsights.insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col rounded-2xl border border-dark-border bg-dark-surface/30 p-8 backdrop-blur-sm"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-coffee-500/10 text-coffee-400">
                  {index % 2 === 0 ? <Code2 size={24} /> : <Zap size={24} />}
                </div>
                <h3 className="text-xl font-bold text-dark-text">{insight.title}</h3>
              </div>
              
              <p className="mb-6 text-dark-muted">
                {insight.description}
              </p>

              <div className="mt-auto overflow-hidden rounded-lg bg-black/50 p-4 font-mono text-sm text-coffee-300">
                <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2 opacity-50">
                  <Terminal size={14} />
                  <span>source.java</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap">
                  <code>{insight.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
