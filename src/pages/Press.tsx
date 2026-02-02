import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Mail,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ZoraLogo, ParentCompanyLogo } from "@/components/Logo";

const Press = () => {
  const navigate = useNavigate();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              Press <span className="text-primary">Kit</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Resources and information for media professionals covering Zora
              and our mission to transform education through AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Quick Facts
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "2024", label: "Founded" },
              { number: "UAE", label: "Headquarters" },
              { number: "AI-Powered", label: "Technology" },
              { number: "K-12", label: "Focus" },
            ].map((fact, index) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <p className="font-display text-4xl font-bold text-primary mb-2">
                  {fact.number}
                </p>
                <p className="text-muted-foreground">{fact.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Brand Assets
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Official Zora logos, colors, and typography for use in media
              coverage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Image className="w-8 h-8 text-primary" />
                <h3 className="font-display text-xl font-bold">Zora Logo</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-8 mb-6 flex items-center justify-center min-h-[200px]">
                <ZoraLogo 
                  variant="wordmark" 
                  size="custom" 
                  width={180} 
                  height={180}
                />
              </div>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleDownload("/logos/zora/logo-wordmark-light.svg", "zora-logo-wordmark.svg")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  SVG Wordmark (Vector)
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/10"
                  onClick={() => handleDownload("/logos/zora/logo-icon-512x512-light.svg", "zora-logo-icon.svg")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  SVG Icon (Vector)
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Image className="w-8 h-8 text-zora-purple" />
                <h3 className="font-display text-xl font-bold">
                  Parent Company Logo
                </h3>
              </div>
              <div className="bg-white/5 rounded-xl p-8 mb-6 flex items-center justify-center min-h-[200px]">
                <ParentCompanyLogo size="xl" />
              </div>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleDownload("/logos/parent-company/cnits-icon.svg", "cnits-icon.svg")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  SVG Icon (Vector)
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Use CNITS icon + "CNIT Solutions" text
                </p>
              </div>
            </motion.div>
          </div>

          {/* Logo Variations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <h3 className="font-display text-2xl font-bold mb-6 text-center">
              Logo Variations
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Icon Only */}
              <div className="glass-card p-6 rounded-xl">
                <p className="text-sm text-muted-foreground mb-4">Icon Only</p>
                <div className="bg-white/5 rounded-lg p-6 flex items-center justify-center mb-4 h-32">
                  <ZoraLogo variant="icon" size="xl" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/10"
                  onClick={() => handleDownload("/logos/zora/logo-icon-128x128-light.svg", "zora-icon.svg")}
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download SVG
                </Button>
              </div>

              {/* Wordmark */}
              <div className="glass-card p-6 rounded-xl">
                <p className="text-sm text-muted-foreground mb-4">Wordmark</p>
                <div className="bg-white/5 rounded-lg p-6 flex items-center justify-center mb-4 h-32">
                  <ZoraLogo variant="wordmark" size="custom" width={120} height={120} />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/10"
                  onClick={() => handleDownload("/logos/zora/logo-wordmark-light.svg", "zora-wordmark.svg")}
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download SVG
                </Button>
              </div>

              {/* Full Logo */}
              <div className="glass-card p-6 rounded-xl">
                <p className="text-sm text-muted-foreground mb-4">Full Logo</p>
                <div className="bg-white/5 rounded-lg p-6 flex items-center justify-center mb-4 h-32">
                  <ZoraLogo variant="full" size="xl" />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/10"
                  onClick={() => handleDownload("/logos/zora/logo-icon-512x512-light.svg", "zora-full.svg")}
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download SVG
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Zora */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-3xl"
          >
            <h2 className="font-display text-3xl font-bold mb-6">About Zora</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Zora is an AI-powered educational platform designed to
                revolutionize learning for students in the UAE and beyond.
                Developed by Cloud Native IT Solutions in Dubai, Zora combines
                cutting-edge artificial intelligence with engaging content to
                create personalized learning experiences.
              </p>
              <p className="text-muted-foreground mb-4">
                Our platform adapts to each student's unique learning style,
                providing customized curriculum paths, real-time progress
                tracking, and interactive content that makes learning enjoyable
                and effective.
              </p>
              <p className="text-muted-foreground">
                From AI-powered customization to innovative AR features, Zora is
                committed to making world-class education accessible to every
                student.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-3xl text-center"
          >
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-4">
              Media Contact
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For press inquiries, interview requests, or additional
              information, please reach out to our media relations team.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              onClick={() => navigate("/contact")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Media Team
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
