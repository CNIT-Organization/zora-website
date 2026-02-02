import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZoraLogo } from "@/components/Logo";
import { env } from "@/config/env";

interface NavbarProps {
  onGetStarted: () => void;
}

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Pricing", href: "#pricing" },
  { label: "For Schools", href: "#b2b" },
  { label: "Reviews", href: "#testimonials" },
];

export function Navbar({ onGetStarted }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(href.slice(1));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <ZoraLogo variant="icon" size="md" className="w-10 h-10" />
              <span className="font-display text-2xl font-bold text-foreground">
                Zora
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={env.CNIT_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                by CNIT Solutions
              </a>
              <Button
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10 md:hidden"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-lg font-medium text-foreground py-2 text-left bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onGetStarted();
                }}
                className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Navbar;
