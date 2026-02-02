import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
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
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: {currentYear}
            </p>

            <div className="glass-card p-8 rounded-2xl space-y-8">
              {[
                {
                  title: "1. Acceptance of Terms",
                  content: `By accessing and using Zora's educational platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.`,
                },
                {
                  title: "2. Description of Service",
                  content: `Zora provides an AI-powered educational platform offering personalized learning experiences, interactive content, and progress tracking for students. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.`,
                },
                {
                  title: "3. User Accounts",
                  content: `To use certain features of Zora, you must create an account. You are responsible for:
                    - Maintaining the confidentiality of your account credentials
                    - All activities that occur under your account
                    - Notifying us immediately of any unauthorized use
                    
                    Users under 18 years old require parental consent to create an account.`,
                },
                {
                  title: "4. Subscription and Payments",
                  content: `Some features of Zora require a paid subscription. By subscribing, you agree to:
                    - Pay all fees associated with your selected plan
                    - Automatic renewal unless cancelled before the renewal date
                    - Refund policies as specified at the time of purchase
                    
                    We reserve the right to change subscription fees with 30 days notice.`,
                },
                {
                  title: "5. Acceptable Use",
                  content: `You agree to use Zora only for lawful purposes and in accordance with these Terms. You agree NOT to:
                    - Attempt to gain unauthorized access to our systems
                    - Interfere with or disrupt the service
                    - Transmit viruses or malicious code
                    - Reverse engineer or decompile any part of the service
                    - Use the service for any illegal or unauthorized purpose`,
                },
                {
                  title: "6. Intellectual Property",
                  content: `All content, features, and functionality of Zora (including but not limited to text, graphics, logos, icons, images, audio clips, and software) are owned by Zora or its licensors and are protected by copyright, trademark, and other intellectual property laws.`,
                },
                {
                  title: "7. User Content",
                  content: `You retain ownership of any content you submit to Zora. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content for the purpose of providing our services.`,
                },
                {
                  title: "8. Disclaimers",
                  content: `Zora is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, timely, secure, or error-free.`,
                },
                {
                  title: "9. Limitation of Liability",
                  content: `To the maximum extent permitted by law, Zora and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.`,
                },
                {
                  title: "10. Termination",
                  content: `We may terminate or suspend your account and access to Zora at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.`,
                },
                {
                  title: "11. Governing Law",
                  content: `These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.`,
                },
                {
                  title: "12. Changes to Terms",
                  content: `We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the service after any changes constitutes acceptance of the new Terms.`,
                },
                {
                  title: "13. Contact Information",
                  content: `If you have any questions about these Terms of Service, please contact us at: support@zora-edu.ae`,
                },
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.03 }}
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

export default Terms;
