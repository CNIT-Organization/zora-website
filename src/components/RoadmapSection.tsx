import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Clock, Rocket, Sparkles } from 'lucide-react';
import { roadmapItems } from '@/data/mockData';

export function RoadmapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="roadmap" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Rocket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Product Roadmap</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Our Journey to
            <br />
            <span className="gradient-text">Transform Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what's available today and what's coming next in our mission to
            revolutionize learning.
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-zora-purple to-primary/30 hidden lg:block" />

          <div className="space-y-16 lg:space-y-24">
            {roadmapItems.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative lg:flex ${isLeft ? 'lg:justify-end' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center hidden lg:flex z-10">
                    {item.status === 'available' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : (
                      <Clock className="w-6 h-6 text-zora-purple" />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`lg:w-[calc(50%-60px)] ${
                      isLeft ? 'lg:mr-[60px]' : 'lg:ml-[60px]'
                    }`}
                  >
                    <div className="glass-card p-8 relative overflow-hidden group hover:border-primary/30 transition-colors">
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-6">
                        {item.status === 'available' ? (
                          <span className="badge-available flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Available Now
                          </span>
                        ) : (
                          <span className="badge-coming-soon flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-2xl lg:text-3xl font-bold mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Features List */}
                      <ul className="space-y-3">
                        {item.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Glow Effect */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                          item.status === 'available'
                            ? 'bg-gradient-to-br from-green-500/5 to-transparent'
                            : 'bg-gradient-to-br from-zora-purple/5 to-transparent'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="glass-card p-8 lg:p-12 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-zora-purple/5 to-accent/5" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4">
                The Future is <span className="gradient-text-gold">Limitless</span>
              </h3>
              <p className="text-muted-foreground text-lg">
                We're constantly innovating to bring you the latest in educational
                technology. Stay tuned for holographic classrooms, AI tutors, and more.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default RoadmapSection;
