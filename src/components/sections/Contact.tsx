'use client';

import { motion } from 'framer-motion';
import { Mail, Send, Github, Twitter, Youtube, Zap } from 'lucide-react';
import content from '@/config/content.json';

export default function Contact() {
  const { contact } = content;
  return (
    <section id="contact" className="bg-dark-bg py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              <span className="text-gradient">{contact.title}</span>
            </h2>
            <p className="mt-4 text-lg text-dark-muted">
              {contact.description}
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-coffee-500/10 text-coffee-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-text">Email</h4>
                  <p className="text-dark-muted">{contact.email}</p>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                {[
                  { icon: <Github size={20} />, label: 'GitHub', href: contact.socials.github },
                  { icon: <Twitter size={20} />, label: 'Twitter', href: contact.socials.twitter },
                  { icon: <Youtube size={20} />, label: 'YouTube', href: contact.socials.youtube },
                  { icon: <Mail size={20} />, label: 'Discord', href: contact.socials.discord },
                  { icon: <Send size={20} />, label: 'CurseForge', href: contact.socials.curseforge },
                  { icon: <Zap size={20} />, label: 'Modrinth', href: contact.socials.modrinth },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-dark-border bg-dark-surface/50 text-dark-muted transition-colors hover:border-coffee-500/50 hover:text-coffee-400"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-dark-border bg-dark-surface/30 p-8 backdrop-blur-sm"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-dark-muted">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition-colors focus:border-coffee-500/50"
                    placeholder="Steve"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-dark-muted">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition-colors focus:border-coffee-500/50"
                    placeholder="steve@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-dark-muted">Subject</label>
                <input
                  id="subject"
                  type="text"
                  className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition-colors focus:border-coffee-500/50"
                  placeholder="How can I help you?"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-dark-muted">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-dark-text outline-none transition-colors focus:border-coffee-500/50 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-coffee-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-coffee-600 hover:shadow-coffee-500/50"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
