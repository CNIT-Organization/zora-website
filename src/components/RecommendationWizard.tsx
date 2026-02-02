import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Users,
  GraduationCap,
  Target,
  Clock,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/mockData";
import type { WizardAnswers, PricingPlan, SubscriptionDuration } from "@/types";

interface RecommendationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: PricingPlan) => void;
}

const steps = [
  {
    id: 1,
    title: "How many children will use Zora?",
    icon: Users,
    field: "numberOfChildren" as keyof WizardAnswers,
    options: [
      { value: 1, label: "1 Child" },
      { value: 2, label: "2 Children" },
      { value: 3, label: "3 Children" },
      { value: 4, label: "4+ Children" },
    ],
  },
  {
    id: 2,
    title: "What's their grade level?",
    icon: GraduationCap,
    field: "gradeLevel" as keyof WizardAnswers,
    options: [
      { value: "kg-k4", label: "KG - Grade 4" },
      { value: "k5-k8", label: "Grade 5 - Grade 8" },
      { value: "k9-k12", label: "Grade 9 - Grade 12" },
      { value: "mixed", label: "Multiple Grades" },
    ],
  },
  {
    id: 3,
    title: "What are your main goals?",
    icon: Target,
    field: "learningGoals" as keyof WizardAnswers,
    description: "Select all that apply",
    multiSelect: true,
    options: [
      { value: "academic", label: "Academic Excellence" },
      { value: "engagement", label: "More Engagement" },
      { value: "personalized", label: "Personalized Learning" },
      { value: "future", label: "Future-Ready Skills" },
    ],
  },
  {
    id: 4,
    title: "How long do you want to commit?",
    icon: Clock,
    field: "preferredDuration" as keyof WizardAnswers,
    options: [
      { value: 3, label: "3 Months", subtitle: "Try it out" },
      {
        value: 6,
        label: "6 Months",
        subtitle: "Best Value",
        recommended: true,
      },
      { value: 12, label: "1 Year", subtitle: "Maximum Savings" },
    ],
  },
];

export function RecommendationWizard({
  isOpen,
  onClose,
  onSelectPlan,
}: RecommendationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({
    numberOfChildren: undefined,
    gradeLevel: undefined,
    learningGoals: [],
    preferredDuration: undefined,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string | number) => {
    const step = steps[currentStep];

    // Handle multi-select differently
    if (step.multiSelect && step.field === "learningGoals") {
      const goals = answers.learningGoals || [];
      const newGoals = goals.includes(value as string)
        ? goals.filter((g) => g !== value)
        : [...goals, value as string];
      setAnswers((prev) => ({ ...prev, learningGoals: newGoals }));
      return; // Don't auto-advance
    }

    // Single select - update answer
    setAnswers((prev) => ({ ...prev, [step.field]: value }));

    // Auto-advance after a short delay for smooth UX
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 400);
  };

  const handleNext = () => {
    // Only used for multi-select step
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
      setCurrentStep(steps.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getRecommendedPlan = (): PricingPlan | null => {
    // Ensure we have all required answers
    if (!answers.numberOfChildren || !answers.preferredDuration) {
      return null;
    }

    const needsFamily = answers.numberOfChildren > 3;
    const duration = answers.preferredDuration;

    const matchingPlans = pricingPlans.filter(
      (plan) =>
        plan.studentQuota === (needsFamily ? 6 : 3) &&
        plan.durationMonths === duration,
    );

    return matchingPlans[0] || pricingPlans[1]; // Default to Growth plan
  };

  const recommendedPlan = getRecommendedPlan();

  const resetWizard = () => {
    setCurrentStep(0);
    setAnswers({
      numberOfChildren: undefined,
      gradeLevel: undefined,
      learningGoals: [],
      preferredDuration: undefined,
    });
    setShowResult(false);
  };

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  const canProceed = () => {
    const step = steps[currentStep];
    if (step.multiSelect) {
      return (answers.learningGoals?.length || 0) > 0;
    }
    return answers[step.field] !== undefined;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/90 backdrop-blur-lg"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl glass-card rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          {/* Close Button - absolute position */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all z-20"
            aria-label="Close wizard"
          >
            <X className="w-5 h-5" />
          </button>

          {!showResult ? (
            <>
              {/* Progress Bar Container */}
              {/* ADDED: mt-6 or mt-8 here pushes the content down to clear the button */}
              <div className="mb-6 mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {currentStep + 1} of {steps.length}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                    Complete
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-zora-purple to-pink-500"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / steps.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-zora-purple/20 flex items-center justify-center flex-shrink-0">
                      {(() => {
                        const Icon = steps[currentStep].icon;
                        return <Icon className="w-6 h-6 text-primary" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-1">
                        {steps[currentStep].title}
                      </h3>
                      {steps[currentStep].description && (
                        <p className="text-muted-foreground text-sm">
                          {steps[currentStep].description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {steps[currentStep].options.map((option) => {
                      const step = steps[currentStep];
                      const isSelected = step.multiSelect
                        ? answers.learningGoals?.includes(
                            option.value as string,
                          )
                        : answers[step.field] === option.value;

                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group relative p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                              : "border-white/10 hover:border-primary/50 hover:bg-white/5"
                          }`}
                        >
                          {/* Checkmark for selected */}
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}

                          {/* Recommended badge */}
                          {option.recommended && (
                            <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold shadow-lg">
                              Recommended
                            </div>
                          )}

                          <div className="font-semibold mb-1">
                            {option.label}
                          </div>
                          {option.subtitle && (
                            <div className="text-sm text-muted-foreground">
                              {option.subtitle}
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="border-white/10 hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {/* Show Next button only for multi-select */}
                {steps[currentStep].multiSelect && (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-primary to-zora-purple hover:opacity-90 text-white shadow-lg"
                  >
                    {currentStep === steps.length - 1
                      ? "See My Plan"
                      : "Continue"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Result - Detailed Plan Display */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-zora-purple to-pink-500 mx-auto mb-4 flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 gradient-text">
                  Perfect Match Found!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Based on your preferences, here's the ideal plan
                </p>
              </div>

              {/* Detailed Plan Card */}
              {recommendedPlan && (
                <div className="glass-card rounded-xl p-6 mb-6 relative overflow-hidden border-2 border-primary/30">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-zora-purple to-pink-500" />

                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-display text-2xl font-bold mb-1">
                        {recommendedPlan.name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {recommendedPlan.description}
                      </p>
                    </div>
                    {recommendedPlan.discountPercentage && (
                      <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold whitespace-nowrap">
                        Save {recommendedPlan.discountPercentage}%
                      </div>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <div className="text-3xl font-bold gradient-text">
                      {recommendedPlan.priceAED} AED
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ({recommendedPlan.pricePerMonthAED} AED/month)
                    </div>
                  </div>

                  {/* Plan Details - Compact Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">Students</div>
                        <div className="text-xs text-muted-foreground truncate">
                          Up to {recommendedPlan.studentQuota}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold">Duration</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {recommendedPlan.durationMonths} months
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why This Plan - Compact */}
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Why this plan is perfect for you
                    </h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {answers.numberOfChildren &&
                        answers.numberOfChildren > 3 && (
                          <li>
                            ✓ Supports your {answers.numberOfChildren} children
                            with the Family plan
                          </li>
                        )}
                      {answers.numberOfChildren &&
                        answers.numberOfChildren <= 3 && (
                          <li>
                            ✓ Ideal quota for {answers.numberOfChildren}{" "}
                            {answers.numberOfChildren === 1
                              ? "child"
                              : "children"}
                          </li>
                        )}
                      {answers.preferredDuration && (
                        <li>
                          ✓ {answers.preferredDuration} month commitment gives
                          you best value
                        </li>
                      )}
                      {answers.learningGoals &&
                        answers.learningGoals.length > 0 && (
                          <li>
                            ✓ Aligned with your goals:{" "}
                            {answers.learningGoals.slice(0, 2).join(", ")}
                          </li>
                        )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 border-white/10 hover:bg-white/5 text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  variant="outline"
                  onClick={resetWizard}
                  className="flex-1 border-white/10 hover:bg-white/5 text-sm"
                >
                  Start Over
                </Button>
                {recommendedPlan && (
                  <Button
                    onClick={() => onSelectPlan(recommendedPlan)}
                    className="flex-1 bg-gradient-to-r from-primary via-zora-purple to-pink-500 hover:opacity-90 text-white font-semibold text-sm"
                  >
                    Select Plan
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RecommendationWizard;
