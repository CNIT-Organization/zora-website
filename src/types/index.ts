// Zora Types - Backend Ready Interfaces
// These interfaces are designed for Python backend compatibility

// ============ User & Auth Types ============
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

// ============ Subscription & Pricing Types ============
export type SubscriptionDuration = 3 | 6 | 12; // months
export type StudentQuota = 3 | 6;

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  durationMonths: SubscriptionDuration;
  studentQuota: StudentQuota;
  priceAED: number;
  pricePerMonthAED: number;
  features: string[];
  isPopular?: boolean;
  discountPercentage?: number;
}

export interface SubscriptionRequest {
  planId: string;
  userId: string;
  paymentMethodId: string;
  currency: 'AED';
}

export interface SubscriptionResponse {
  success: boolean;
  subscriptionId?: string;
  clientSecret?: string; // Stripe client secret
  error?: string;
}

// ============ Wizard Types ============
export interface WizardStep {
  id: number;
  title: string;
  description: string;
}

export interface WizardAnswers {
  numberOfChildren: number;
  gradeLevel: string;
  learningGoals: string[];
  preferredDuration: SubscriptionDuration;
}

export interface RecommendationResult {
  recommendedPlan: PricingPlan;
  reasoning: string;
  alternativePlans: PricingPlan[];
}

// ============ B2B Types ============
export type InstitutionType = 'school' | 'university' | 'training_center' | 'other';

export interface B2BInquiry {
  institutionName: string;
  institutionType: InstitutionType;
  contactName: string;
  email: string;
  phone: string;
  estimatedStudents: number;
  requirements: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
}

export interface B2BInquiryResponse {
  success: boolean;
  inquiryId?: string;
  message?: string;
  error?: string;
}

// ============ Feature Types ============
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'available' | 'coming_soon';
  expectedDate?: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'coming_soon';
  features: string[];
  image?: string;
}

// ============ Testimonial Types ============
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution?: string;
  content: string;
  rating: number;
  avatar?: string;
  isB2B: boolean;
}

// ============ API Response Types ============
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ============ Payment Types ============
export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: 'AED';
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
}

export interface CheckoutSession {
  planId: string;
  plan: PricingPlan;
  user?: Partial<User>;
  paymentIntent?: PaymentIntent;
}
