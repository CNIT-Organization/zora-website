import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Fingerprint, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Customization",
    subtitle: "Adapts to Your Child's IQ",
    description:
      "Our advanced AI analyzes each student's learning patterns, strengths, and areas for improvement to create truly personalized educational paths.",
    highlights: [
      "Real-time difficulty adjustment",
      "Learning style detection",
      "Personalized curriculum",
      "Progress optimization",
    ],
    gradient: "from-primary to-zora-cyan-glow",
    status: "available",
  },
  {
    icon: Fingerprint,
    title: "Study Finger AR",
    subtitle: "KG-K4 Gamification",
    description:
      "Revolutionary AR technology that transforms learning into an interactive adventure. Watch as your child engages with 3D educational content through hand gestures.",
    highlights: [
      "Gesture-based learning",
      "3D interactive models",
      "Gamified lessons",
      "Real-world integration",
    ],
    gradient: "from-zora-purple to-pink-500",
    status: "coming_soon",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-zora-purple/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Powered by Innovation
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Technology That
            <br />
            <span className="gradient-text">Transforms Learning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of education with AI and AR
            technologies designed specifically for the modern learner.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="glass-card p-8 lg:p-10 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/30">
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  {feature.status === "available" ? (
                    <span className="badge-available">Available Now</span>
                  ) : (
                    <span className="badge-coming-soon">Coming Soon</span>
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl lg:text-3xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p
                  className={`text-lg font-medium mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                >
                  {feature.subtitle}
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-3">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}
                      />
                      <span className="text-sm text-foreground/80">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-10 blur-xl`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Virtual Avatars Feature */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <div className="glass-card p-8 lg:p-12 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="badge-available mb-4 inline-block">
                  Available Now
                </span>
                <h3 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                  Virtual Avatar Companions
                </h3>
                <p className="text-xl text-muted-foreground mb-6">
                  AI-powered learning companions that understand your child's
                  personality and make education an engaging adventure.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Sparkles, text: "Personalized Teaching Style" },
                    { icon: Brain, text: "Emotional Intelligence" },
                    { icon: Zap, text: "Real-time Motivation" },
                    { icon: Fingerprint, text: "Progress Tracking" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avatar Illustration Placeholder */}
              <div className="relative h-64 lg:h-80 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-zora-purple/30 animate-pulse" />
                </div>
                <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary to-zora-purple flex items-center justify-center animate-float">
                  <span className="text-6xl">🤖</span>
                </div>
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-rotate-slow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-lg">
                    📚
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-lg">
                    🎯
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 rounded-full bg-zora-purple flex items-center justify-center text-lg">
                    ⭐
                  </div>
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-lg">
                    🏆
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
