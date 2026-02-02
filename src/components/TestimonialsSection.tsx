import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/mockData";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-accent">
              Loved by Thousands
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            What Our Community
            <br />
            <span className="gradient-text">Says About Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied parents and institutions who have
            transformed their educational experience with Zora.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-card p-6 relative group hover:border-primary/30 transition-colors ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-zora-purple/30 flex items-center justify-center text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.institution &&
                      ` at ${testimonial.institution}`}
                  </div>
                </div>
                {testimonial.isB2B && (
                  <div className="ml-auto">
                    <span className="text-xs bg-zora-purple/20 text-zora-purple px-2 py-1 rounded">
                      B2B
                    </span>
                  </div>
                )}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/5 to-zora-purple/5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-card p-8"
        >
          <div className="grid sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "50,000+", label: "Active Students" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "100+", label: "Partner Schools" },
              { value: "15+", label: "Countries" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
