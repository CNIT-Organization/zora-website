import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Users, GraduationCap, Target, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pricingPlans } from '@/data/mockData';
import type { WizardAnswers, PricingPlan, SubscriptionDuration } from '@/types';

interface RecommendationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: PricingPlan) => void;
}

const steps = [
  {
    id: 1,
    title: 'How many children will use Zora?',
    icon: Users,
    options: [
      { value: 1, label: '1 Child' },
      { value: 2, label: '2 Children' },
      { value: 3, label: '3 Children' },
      { value: 4, label: '4+ Children' },
    ],
  },
  {
    id: 2,
    title: "What's their grade level?",
    icon: GraduationCap,
    options: [
      { value: 'kg-k4', label: 'KG - Grade 4' },
      { value: 'k5-k8', label: 'Grade 5 - Grade 8' },
      { value: 'k9-k12', label: 'Grade 9 - Grade 12' },
      { value: 'mixed', label: 'Multiple Grades' },
    ],
  },
  {
    id: 3,
    title: 'What are your main goals?',
    icon: Target,
    multiSelect: true,
    options: [
      { value: 'academic', label: 'Academic Excellence' },
      { value: 'engagement', label: 'More Engagement' },
      { value: 'personalized', label: 'Personalized Learning' },
      { value: 'future', label: 'Future-Ready Skills' },
    ],
  },
  {
    id: 4,
    title: 'How long do you want to commit?',
    icon: Clock,
    options: [
      { value: 3, label: '3 Months - Try it out' },
      { value: 6, label: '6 Months - Best Value' },
      { value: 12, label: '1 Year - Maximum Savings' },
    ],
  },
];

export function RecommendationWizard({ isOpen, onClose, onSelectPlan }: RecommendationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({
    numberOfChildren: 1,
    gradeLevel: '',
    learningGoals: [],
    preferredDuration: 6,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string | number) => {
    const step = steps[currentStep];

    if (step.id === 1) {
      setAnswers((prev) => ({ ...prev, numberOfChildren: value as number }));
    } else if (step.id === 2) {
      setAnswers((prev) => ({ ...prev, gradeLevel: value as string }));
    } else if (step.id === 3) {
      const goals = answers.learningGoals || [];
      const newGoals = goals.includes(value as string)
        ? goals.filter((g) => g !== value)
        : [...goals, value as string];
      setAnswers((prev) => ({ ...prev, learningGoals: newGoals }));
      return; // Don't auto-advance for multi-select
    } else if (step.id === 4) {
      setAnswers((prev) => ({ ...prev, preferredDuration: value as SubscriptionDuration }));
    }

    // Auto-advance for single-select questions
    if (!step.multiSelect) {
      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setShowResult(true);
        }
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getRecommendedPlan = (): PricingPlan => {
    const needsFamily = (answers.numberOfChildren || 1) > 3;
    const duration = answers.preferredDuration || 6;

    const matchingPlans = pricingPlans.filter(
      (plan) =>
        plan.studentQuota === (needsFamily ? 6 : 3) &&
        plan.durationMonths === duration
    );

    return matchingPlans[0] || pricingPlans[1]; // Default to Growth plan
  };

  const recommendedPlan = getRecommendedPlan();

  const resetWizard = () => {
    setCurrentStep(0);
    setAnswers({
      numberOfChildren: 1,
      gradeLevel: '',
      learningGoals: [],
      preferredDuration: 6,
    });
    setShowResult(false);
  };

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-card p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span className="text-sm text-primary">
                    {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-zora-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      {(() => {
                        const Icon = steps[currentStep].icon;
                        return <Icon className="w-6 h-6 text-primary" />;
                      })()}
                    </div>
                    <h3 className="font-display text-2xl font-bold">
                      {steps[currentStep].title}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {steps[currentStep].options.map((option) => {
                      const isSelected =
                        steps[currentStep].id === 1
                          ? answers.numberOfChildren === option.value
                          : steps[currentStep].id === 2
                          ? answers.gradeLevel === option.value
                          : steps[currentStep].id === 3
                          ? answers.learningGoals?.includes(option.value as string)
                          : answers.preferredDuration === option.value;

                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/10'
                              : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <span className="font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="border-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                {steps[currentStep].multiSelect && (
                  <Button
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {currentStep === steps.length - 1 ? 'See My Plan' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Result */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-zora-purple mx-auto mb-6 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display text-3xl font-bold mb-2">
                Perfect Match Found!
              </h3>
              <p className="text-muted-foreground mb-8">
                Based on your answers, we recommend:
              </p>

              {/* Recommended Plan Card */}
              <div className="glass-card p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-zora-purple" />
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-display text-2xl font-bold">
                      {recommendedPlan.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {recommendedPlan.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">
                      {recommendedPlan.priceAED} AED
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {recommendedPlan.pricePerMonthAED} AED/month
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 mb-6">
                  {recommendedPlan.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                {recommendedPlan.discountPercentage && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm">
                    <Sparkles className="w-4 h-4" />
                    Save {recommendedPlan.discountPercentage}%
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={resetWizard}
                  className="flex-1 border-white/10"
                >
                  Start Over
                </Button>
                <Button
                  onClick={() => onSelectPlan(recommendedPlan)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Select This Plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RecommendationWizard;
