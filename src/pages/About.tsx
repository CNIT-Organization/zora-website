import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Target, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ZoraLogo, ParentCompanyLogo } from "@/components/Logo";

const About = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onGetStarted={handleGetStarted} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-zora-purple/20 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-primary">Zora</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Revolutionizing education in the UAE through innovative AI-powered
              learning solutions. We're on a mission to transform how students
              learn, grow, and succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <Target className="w-12 h-12 text-primary mb-6" />
              <h2 className="font-display text-2xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                To democratize access to world-class education through AI
                technology. We believe every child deserves personalized
                learning experiences that adapt to their unique needs,
                abilities, and learning pace. Our mission is to empower students
                across the UAE and beyond to reach their full potential.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <Globe className="w-12 h-12 text-zora-purple mb-6" />
              <h2 className="font-display text-2xl font-bold mb-4">
                Our Vision
              </h2>
              <p className="text-muted-foreground">
                To be the leading educational technology platform in the Middle
                East, setting new standards for AI-driven learning. We envision
                a future where technology and education work together to create
                engaging, effective, and accessible learning experiences for
                students of all ages.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Zora.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                description:
                  "We strive for excellence in every aspect of our platform, from content quality to user experience.",
              },
              {
                icon: Users,
                title: "Student-First",
                description:
                  "Every decision we make is centered around what is best for students and their learning journey.",
              },
              {
                icon: Globe,
                title: "Innovation",
                description:
                  "We continuously push the boundaries of what is possible in educational technology.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                <h3 className="font-display text-xl font-bold mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-3xl"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">
                  A Product of{" "}
                  <span className="text-primary">
                    Cloud Native IT Solutions
                  </span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Zora is developed and maintained by CNIT Solutions, a leading
                  technology company based in Dubai, UAE. With years of
                  experience in software development and educational technology,
                  our team is dedicated to creating innovative solutions that
                  make a real difference in students' lives.
                </p>
                <p className="text-muted-foreground">
                  Our commitment to quality, innovation, and student success has
                  made us a trusted name in educational technology across the
                  region.
                </p>
              </div>
              <div className="text-center">
                <div className="flex flex-col items-center gap-6">
                  <ZoraLogo 
                    variant="wordmark" 
                    size="custom" 
                    width={200} 
                    height={200}
                    className="mb-4"
                  />
                  <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mb-4" />
                  <ParentCompanyLogo size="lg" />
                  <p className="text-sm text-muted-foreground mt-4">
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold mb-6">
              Ready to Transform Your Child's Education?
            </h2>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
