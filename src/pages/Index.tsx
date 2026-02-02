import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { PricingSection } from "@/components/PricingSection";
import { B2BSection } from "@/components/B2BSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";
import { RecommendationWizard } from "@/components/RecommendationWizard";
import { CheckoutPage } from "@/components/CheckoutPage";
import { SuccessPage } from "@/components/SuccessPage";
import type { PricingPlan } from "@/types";

type PageState = "landing" | "checkout" | "success";

const Index = () => {
  const [pageState, setPageState] = useState<PageState>("landing");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  const handleWatchDemo = () => {
    // Scroll to features section as demo placeholder
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsWizardOpen(false);
    setPageState("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckoutSuccess = () => {
    setPageState("success");
  };

  const handleGoHome = () => {
    setPageState("landing");
    setSelectedPlan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render checkout or success page
  if (pageState === "checkout" && selectedPlan) {
    return (
      <CheckoutPage
        plan={selectedPlan}
        onBack={() => setPageState("landing")}
        onSuccess={handleCheckoutSuccess}
      />
    );
  }

  if (pageState === "success" && selectedPlan) {
    return <SuccessPage plan={selectedPlan} onGoHome={handleGoHome} />;
  }

  // Main landing page
  return (
    <div className="min-h-screen">
      <Navbar onGetStarted={handleGetStarted} />

      <main>
        <HeroSection
          onGetStarted={handleGetStarted}
          onWatchDemo={handleWatchDemo}
        />
        <FeaturesSection />
        <RoadmapSection />
        <PricingSection
          onSelectPlan={handleSelectPlan}
          onOpenWizard={() => setIsWizardOpen(true)}
        />
        <B2BSection />
        <TestimonialsSection />
      </main>

      <Footer />

      {/* Recommendation Wizard Modal */}
      <RecommendationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
};

export default Index;
