'use client';

import { motion } from 'framer-motion';
import { Code, Video, Palette, Coffee } from 'lucide-react';
import content from '@/config/content.json';

const skills = [
  {
    icon: Code,
    title: 'Mod Development',
    description: 'Specialized in Fabric API for Minecraft 1.21+, creating performance-optimized mods with clean code architecture',
  },
  {
    icon: Palette,
    title: 'Texture Pack Review',
    description: 'In-depth analysis of resource packs, evaluating aesthetics, performance impact, and compatibility',
  },
  {
    icon: Video,
    title: 'Content Creation',
    description: 'YouTube videos showcasing mod reviews, development tutorials, and gameplay demonstrations',
  },
  {
    icon: Coffee,
    title: 'Community Engagement',
    description: 'Active contributor to the Minecraft modding community, providing support and sharing knowledge',
  },
];

export default function About() {
  const { about } = content;
  return (
    <section id="about" className="min-h-screen py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gradient sm:text-5xl">
            {about.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-dark-muted">
            {about.description}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="mb-4 text-2xl font-bold text-coffee-400">
                {about.journeyTitle}
              </h3>
              <div className="space-y-4 text-dark-muted">
                {about.journeyText.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="mb-1 text-2xl font-bold text-coffee-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-dark-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass group rounded-xl p-6 transition-all duration-300 hover:border-coffee-500/50 hover:shadow-lg hover:shadow-coffee-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-coffee-500/20 p-3 transition-colors duration-300 group-hover:bg-coffee-500/30">
                      <Icon className="h-6 w-6 text-coffee-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg font-semibold text-dark-text">
                        {skill.title}
                      </h4>
                      <p className="text-sm text-dark-muted">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* FAQ / Quick Facts Section for SEO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-coffee-400">
            {about.faqTitle || 'Quick Facts'}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.faq.questions.map((item, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <h4 className="mb-2 font-bold text-dark-text">{item.q}</h4>
                <p className="text-sm text-dark-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
