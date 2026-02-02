import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/config/env";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value || value.length < 2)
          return "Name must be at least 2 characters long";
        if (value.length > 100) return "Name must not exceed 100 characters";
        break;
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please provide a valid email address";
        break;
      case "subject":
        if (!value) return "Subject is required";
        if (value.length > 200) return "Subject must not exceed 200 characters";
        break;
      case "message":
        if (!value || value.length < 10)
          return "Message must be at least 10 characters long";
        if (value.length > 5000)
          return "Message must not exceed 5000 characters";
        break;
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    newErrors.name = validateField("name", formData.name);
    newErrors.email = validateField("email", formData.email);
    newErrors.subject = validateField("subject", formData.subject);
    newErrors.message = validateField("message", formData.message);

    // Remove empty errors
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          "Thank you! Your message has been sent successfully. We will get back to you within 24 hours.",
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Handle backend validation errors
        if (data.errors) {
          const backendErrors: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            backendErrors[err.field] = err.message;
          });
          setErrors(backendErrors);
        } else {
          alert(
            data.message || "Failed to send message. Please try again later.",
          );
        }
      }
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
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
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions or need support? We are here to help. Reach out to
              our team and we will get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      required
                      className={`bg-white/5 border-white/10 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                      required
                      className={`bg-white/5 border-white/10 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.subject ? "border-red-500" : "border-white/10"} text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                    style={{ color: "inherit" }}
                  >
                    <option value="" className="bg-background text-foreground">
                      Select a subject
                    </option>
                    <option
                      value="General Inquiry"
                      className="bg-background text-foreground"
                    >
                      General Inquiry
                    </option>
                    <option
                      value="Sales"
                      className="bg-background text-foreground"
                    >
                      Sales
                    </option>
                    <option
                      value="Support"
                      className="bg-background text-foreground"
                    >
                      Technical Support
                    </option>
                    <option
                      value="Partnership"
                      className="bg-background text-foreground"
                    >
                      Partnership Opportunities
                    </option>
                    <option
                      value="Schools"
                      className="bg-background text-foreground"
                    >
                      For Schools
                    </option>
                    <option
                      value="Feedback"
                      className="bg-background text-foreground"
                    >
                      Feedback
                    </option>
                    <option
                      value="Other"
                      className="bg-background text-foreground"
                    >
                      Other
                    </option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us how we can help you... (minimum 10 characters)"
                    rows={5}
                    required
                    className={`bg-white/5 border-white/10 resize-none ${errors.message ? "border-red-500" : ""}`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.message.length}/5000 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="font-display text-xl font-bold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <a
                    href={`mailto:${env.SUPPORT_EMAIL}`}
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p>{env.SUPPORT_EMAIL}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${env.WHATSAPP_NUMBER}`}
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-zora-purple/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-zora-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p>{env.WHATSAPP_NUMBER}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-12 h-12 rounded-xl bg-zora-cyan-glow/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-zora-cyan-glow" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p>Dubai, United Arab Emirates</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <h3 className="font-display text-xl font-bold mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <h3 className="font-display text-xl font-bold mb-4">
                  Response Time
                </h3>
                <p className="text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
