import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onGetStarted={handleGetStarted} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10"
        style={{ top: "80px" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-zora-purple/20 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-display text-5xl font-bold mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {currentYear}
            </p>

            <div className="glass-card p-8 rounded-2xl space-y-8">
              {[
                {
                  title: "1. Introduction",
                  content: `Welcome to Zora. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.`,
                },
                {
                  title: "2. Information We Collect",
                  content: `We collect information that you provide directly to us, including:
                    - Account information (name, email address, password)
                    - Profile information (student grade, learning preferences)
                    - Payment information (processed securely through our payment providers)
                    - Communications with our support team
                    
                    We also automatically collect certain information when you use our platform, including device information, usage data, and cookies.`,
                },
                {
                  title: "3. How We Use Your Information",
                  content: `We use the information we collect to:
                    - Provide, maintain, and improve our educational services
                    - Create and manage your account
                    - Process payments and prevent fraud
                    - Send you technical notices and support messages
                    - Respond to your comments and questions
                    - Analyze usage patterns to improve user experience
                    - Comply with legal obligations`,
                },
                {
                  title: "4. Data Sharing and Disclosure",
                  content: `We do not sell your personal information. We may share your information with:
                    - Service providers who perform services on our behalf
                    - Analytics partners to improve our platform
                    - Legal authorities when required by law
                    - Business transfers in connection with a merger or acquisition
                    
                    All third parties are contractually obligated to protect your information.`,
                },
                {
                  title: "5. Data Security",
                  content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.`,
                },
                {
                  title: "6. Your Rights",
                  content: `Depending on your location, you may have the following rights:
                    - Access to your personal information
                    - Correction of inaccurate information
                    - Deletion of your information
                    - Restriction of processing
                    - Data portability
                    - Objection to processing
                    
                    To exercise these rights, please contact us.`,
                },
                {
                  title: "7. Children Privacy",
                  content: `Zora is designed for students of all ages. For users under the age of 18, we require parental consent before collecting personal information. We do not knowingly collect personal information from children without parental consent.`,
                },
                {
                  title: "8. Cookies and Tracking",
                  content: `We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.`,
                },
                {
                  title: "9. Changes to This Policy",
                  content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.`,
                },
                {
                  title: "10. Contact Us",
                  content: `If you have questions about this Privacy Policy or our data practices, please contact us at: support@zora-edu.ae`,
                },
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <h2 className="font-display text-xl font-bold mb-4">
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
