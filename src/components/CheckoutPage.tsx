import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Lock, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PricingPlan } from "@/types";

interface CheckoutPageProps {
  plan: PricingPlan;
  onBack: () => void;
  onSuccess: () => void;
}

export function CheckoutPage({ plan, onBack, onSuccess }: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onSuccess();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to plans
        </Button>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">
              Order Summary
            </h2>
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                {plan.isPopular && (
                  <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                    Popular
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{plan.durationMonths} months</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Students</span>
                  <span>Up to {plan.studentQuota}</span>
                </div>
                {plan.discountPercentage && (
                  <div className="flex justify-between mb-2 text-green-400">
                    <span>Discount</span>
                    <span>-{plan.discountPercentage}%</span>
                  </div>
                )}
                <div className="border-t border-white/10 mt-4 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold gradient-text">
                        {plan.priceAED} AED
                      </span>
                      <div className="text-xs text-muted-foreground">
                        One-time payment
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                Stripe Protected
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">
              Payment Details
            </h2>
            <form onSubmit={handleSubmit} className="glass-card p-6">
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 bg-white/5 border-white/10"
                  />
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2 bg-white/5 border-white/10"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative mt-2">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/10 pl-12"
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Expiry & CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="mt-2 bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      name="cvc"
                      type="text"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      required
                      className="mt-2 bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 glow-cyan"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Pay {plan.priceAED} AED
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing this purchase, you agree to our Terms of Service
                  and Privacy Policy.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
