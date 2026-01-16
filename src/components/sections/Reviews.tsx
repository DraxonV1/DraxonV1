'use client';

import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Chen',
    role: 'Server Admin',
    text: 'Draxon\'s mods have completely transformed our player experience. The optimization is incredible, and the new mechanics feel like they belong in vanilla Minecraft.',
    rating: 5,
  },
  {
    name: 'Marcus Thorne',
    role: 'Mod Enthusiast',
    text: 'I\'ve been following Draxon for a year. The attention to detail in every mod is top-notch. Highly recommended for anyone looking for high-quality Fabric mods.',
    rating: 5,
  },
  {
    name: 'Leo Rodriguez',
    role: 'Content Creator',
    text: 'The texture pack reviews are so insightful. I always check Draxon\'s recommendations before starting a new survival series.',
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-dark-bg py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-gradient">Community Feedback</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-dark-muted">
            Hear from server owners, players, and fellow developers about their experience with my mods and content.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-dark-border bg-dark-surface/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-coffee-500/50 hover:bg-dark-surface/50"
            >
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'fill-coffee-500 text-coffee-500' : 'text-dark-muted'}
                  />
                ))}
              </div>
              <p className="mb-8 italic text-dark-text/80">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-500/20 text-coffee-400">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-text">{review.name}</h4>
                  <p className="text-sm text-dark-muted">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
