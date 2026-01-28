import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Building2,
  TrendingDown,
  Users,
  BarChart3,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { b2bBenefits } from '@/data/mockData';
import type { B2BInquiry, InstitutionType } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  'trending-down': TrendingDown,
  users: Users,
  building: Building2,
  chart: BarChart3,
};

export function B2BSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<B2BInquiry>>({
    institutionName: '',
    institutionType: 'school',
    contactName: '',
    email: '',
    phone: '',
    estimatedStudents: 0,
    requirements: '',
    preferredContactMethod: 'email',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="b2b" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-zora-purple/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Building2 className="w-4 h-4 text-zora-purple" />
            <span className="text-sm font-medium text-zora-purple">For Institutions</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Transform Your
            <br />
            <span className="gradient-text">Educational Institution</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Partner with Zora to reduce costs, optimize operations, and deliver
            world-class education at scale.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {b2bBenefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Building2;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 text-center group hover:border-zora-purple/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zora-purple to-pink-500 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {benefit.stat}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {benefit.statLabel}
                </div>
                <h3 className="font-display text-lg font-bold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Two Column: Info + Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Value Props */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-display text-3xl font-bold mb-6">
              Why Schools & Universities Choose Zora
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Complete Ecosystem Management',
                  description:
                    'From admissions to graduation, manage your entire educational operation from one platform.',
                },
                {
                  title: 'AI-Powered Analytics',
                  description:
                    'Get deep insights into student performance, identify at-risk students, and optimize learning outcomes.',
                },
                {
                  title: 'Seamless Integration',
                  description:
                    'Zora integrates with your existing systems — LMS, SIS, and administrative tools.',
                },
                {
                  title: 'Dedicated Support',
                  description:
                    'Our enterprise team provides hands-on onboarding, training, and 24/7 priority support.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zora-purple/10 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-zora-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trusted By */}
            <div className="mt-10 p-6 glass-card">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 100+ institutions across the UAE
              </p>
              <div className="flex items-center gap-6">
                {['🏫', '🎓', '📚', '🏛️'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {!isSubmitted ? (
              <div className="glass-card p-8">
                <h3 className="font-display text-2xl font-bold mb-2">
                  Request a Demo
                </h3>
                <p className="text-muted-foreground mb-6">
                  See how Zora can transform your institution.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="institutionName">Institution Name</Label>
                      <Input
                        id="institutionName"
                        name="institutionName"
                        placeholder="Dubai Academy"
                        value={formData.institutionName}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="institutionType">Type</Label>
                      <Select
                        value={formData.institutionType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            institutionType: value as InstitutionType,
                          }))
                        }
                      >
                        <SelectTrigger className="mt-2 bg-white/5 border-white/10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="training_center">Training Center</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Your Name</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        placeholder="John Doe"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@school.ae"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedStudents">Estimated Students</Label>
                      <Input
                        id="estimatedStudents"
                        name="estimatedStudents"
                        type="number"
                        placeholder="500"
                        value={formData.estimatedStudents || ''}
                        onChange={handleInputChange}
                        required
                        className="mt-2 bg-white/5 border-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements / Questions</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      placeholder="Tell us about your needs..."
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-2 bg-white/5 border-white/10"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-zora-purple to-pink-500 hover:opacity-90 text-white font-semibold h-12"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Request Demo
                      </>
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">
                  Thank You!
                </h3>
                <p className="text-muted-foreground mb-6">
                  We've received your inquiry. Our enterprise team will contact you
                  within 24 hours to schedule your demo.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-white/10"
                >
                  Submit Another Inquiry
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default B2BSection;
