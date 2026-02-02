import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PricingPlan } from "@/types";

interface SuccessPageProps {
  plan: PricingPlan;
  onGoHome: () => void;
}

export function SuccessPage({ plan, onGoHome }: SuccessPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mx-auto mb-8 flex items-center justify-center glow-cyan"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl font-bold mb-4"
          >
            Welcome to <span className="gradient-text">Zora!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Your subscription is now active. Get ready to transform your child's
            education journey!
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 mb-8 text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">Order Details</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {plan.durationMonths} months
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Students</span>
                <span className="font-medium">Up to {plan.studentQuota}</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-bold gradient-text">
                    {plan.priceAED} AED
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6 mb-8"
          >
            <h3 className="font-semibold mb-4">What's Next?</h3>
            <div className="space-y-4 text-left">
              {[
                "Check your email for login credentials",
                "Download the Zora app from the App Store or Google Play",
                "Set up your child's learning profile",
                "Start exploring AI-powered lessons!",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {i + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={onGoHome}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              size="lg"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default SuccessPage;
