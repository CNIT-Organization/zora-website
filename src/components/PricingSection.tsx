import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/mockData";
import type { PricingPlan, SubscriptionDuration, StudentQuota } from "@/types";

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenWizard: () => void;
}

export function PricingSection({
  onSelectPlan,
  onOpenWizard,
}: PricingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedDuration, setSelectedDuration] =
    useState<SubscriptionDuration>(6);
  const [selectedQuota, setSelectedQuota] = useState<StudentQuota>(3);

  const filteredPlans = pricingPlans.filter(
    (plan) =>
      plan.durationMonths === selectedDuration &&
      plan.studentQuota === selectedQuota,
  );

  // Get all plans for selected quota to show duration options
  const plansForQuota = pricingPlans.filter(
    (plan) => plan.studentQuota === selectedQuota,
  );

  const durations: { value: SubscriptionDuration; label: string }[] = [
    { value: 3, label: "3 Months" },
    { value: 6, label: "6 Months" },
    { value: 12, label: "1 Year" },
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zora-purple/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Crown className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Simple Pricing
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Invest in Your Child's
            <br />
            <span className="gradient-text">Future Today</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Flexible plans designed for every family. All plans include full
            access to our AI-powered learning platform.
          </p>

          {/* Wizard CTA */}
          <Button
            variant="outline"
            onClick={onOpenWizard}
            className="border-primary/50 text-primary hover:bg-primary/10 mb-12"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Not sure which plan? Take our 1-minute quiz
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12"
        >
          {/* Quota Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-xl glass-card">
            <button
              onClick={() => setSelectedQuota(3)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedQuota === 3
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              Up to 3 Kids
            </button>
            <button
              onClick={() => setSelectedQuota(6)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedQuota === 6
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              Family (6 Kids)
            </button>
          </div>

          {/* Duration Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-xl glass-card">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedDuration === d.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="flex justify-center">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="w-full max-w-md"
            >
              <div
                className={`glass-card p-8 h-full relative overflow-hidden ${
                  plan.isPopular ? "border-primary/50" : ""
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-px left-0 right-0">
                    <div className="flex justify-center">
                      <div className="bg-gradient-to-r from-primary to-zora-purple px-4 py-1 rounded-b-lg">
                        <span className="text-xs font-semibold text-primary-foreground">
                          Most Popular
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <h3 className="font-display text-2xl font-bold mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold gradient-text">
                        {plan.priceAED}
                      </span>
                      <span className="text-muted-foreground">AED</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {plan.pricePerMonthAED} AED/month
                      {plan.discountPercentage && (
                        <span className="ml-2 text-green-400">
                          Save {plan.discountPercentage}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full font-semibold ${
                      plan.isPopular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
                        : "bg-white/10 hover:bg-white/20 text-foreground"
                    }`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Plans Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-center font-display text-xl font-bold mb-8 text-muted-foreground">
            Compare All Plans
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plansForQuota.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setSelectedDuration(plan.durationMonths);
                }}
                className={`p-4 rounded-xl border transition-all text-left ${
                  selectedDuration === plan.durationMonths
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">{plan.name}</span>
                  {plan.isPopular && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">
                  {plan.priceAED} AED
                </div>
                <div className="text-xs text-muted-foreground">
                  {plan.durationMonths} months • {plan.pricePerMonthAED} AED/mo
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">
                14-day money-back guarantee.
              </span>{" "}
              No questions asked.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
