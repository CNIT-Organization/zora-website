import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { ZoraLogo, ParentCompanyLogo } from "@/components/Logo";
import { env } from "@/config/env";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleScroll = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(href.slice(1));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const footerLinks = {
    product: [
      {
        label: "Features",
        href: "#features",
        onClick: () => handleScroll("#features"),
      },
      {
        label: "Roadmap",
        href: "#roadmap",
        onClick: () => handleScroll("#roadmap"),
      },
      {
        label: "Pricing",
        href: "#pricing",
        onClick: () => handleScroll("#pricing"),
      },
      {
        label: "For Schools",
        href: "#b2b",
        onClick: () => handleScroll("#b2b"),
      },
    ],
    company: [
      { label: "About Us", href: "/about", onClick: () => navigate("/about") },
      { label: "Press Kit", href: "/press", onClick: () => navigate("/press") },
    ],
    support: [
      {
        label: "Contact Us",
        href: "/contact",
        onClick: () => navigate("/contact"),
      },
      {
        label: "Privacy Policy",
        href: "/privacy",
        onClick: () => navigate("/privacy"),
      },
      {
        label: "Terms of Service",
        href: "/terms",
        onClick: () => navigate("/terms"),
      },
    ],
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    setSubscriptionStatus("idle");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscriptionStatus("success");
        setEmail("");
      } else {
        setSubscriptionStatus("error");
      }
    } catch (error) {
      setSubscriptionStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="relative py-20 border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6">
              <ZoraLogo variant="icon" size="md" className="w-10 h-10" />
              <span className="font-display text-2xl font-bold text-foreground">
                Zora
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Revolutionizing education in the UAE with AI-powered learning,
              virtual avatars, and next-generation technologies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${env.SUPPORT_EMAIL}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                {env.SUPPORT_EMAIL}
              </a>
              <a
                href={`tel:${env.WHATSAPP_NUMBER}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                {env.WHATSAPP_NUMBER}
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Dubai, United Arab Emirates
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.onClick}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-card p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-display text-xl font-bold mb-2">
                Stay Updated
              </h4>
              <p className="text-muted-foreground text-sm">
                Get the latest news on new features and educational insights.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
          {subscriptionStatus === "success" && (
            <p className="text-green-400 text-sm mt-3">
              Successfully subscribed to our newsletter!
            </p>
          )}
          {subscriptionStatus === "error" && (
            <p className="text-red-400 text-sm mt-3">
              Failed to subscribe. Please try again later.
            </p>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Zora Education. All rights reserved.
          </p>

          {/* CNIT Solutions Attribution */}
          <a
            href={env.CNIT_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm group transition-opacity hover:opacity-80"
          >
            <span className="text-muted-foreground">A Product of</span>
            <ParentCompanyLogo size="sm" />
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
