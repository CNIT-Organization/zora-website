// Environment Configuration
// All major variables controlled via environment

interface EnvConfig {
  // API Configuration
  API_BASE_URL: string;
  API_VERSION: string;

  // Authentication
  AUTH_ENABLED: boolean;
  AUTH_PROVIDER: "supabase" | "custom";

  // Payment
  STRIPE_PUBLISHABLE_KEY: string;
  PAYMENT_ENABLED: boolean;
  DEFAULT_CURRENCY: "AED";

  // Feature Flags
  FEATURE_WIZARD_ENABLED: boolean;
  FEATURE_B2B_ENABLED: boolean;
  FEATURE_AR_PREVIEW: boolean;
  FEATURE_HOLOGRAPHIC_PREVIEW: boolean;

  // Analytics
  ANALYTICS_ENABLED: boolean;

  // External Links
  CNIT_WEBSITE: string;
  SUPPORT_EMAIL: string;
  WHATSAPP_NUMBER: string;
}

// Default configuration (can be overridden by .env)
export const env: EnvConfig = {
  // API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.zora-edu.ae",
  API_VERSION: import.meta.env.VITE_API_VERSION || "v1",

  // Auth
  AUTH_ENABLED: import.meta.env.VITE_AUTH_ENABLED === "true" || false,
  AUTH_PROVIDER:
    (import.meta.env.VITE_AUTH_PROVIDER as "supabase" | "custom") || "supabase",

  // Payment
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
  PAYMENT_ENABLED: import.meta.env.VITE_PAYMENT_ENABLED === "true" || false,
  DEFAULT_CURRENCY: "AED",

  // Feature Flags
  FEATURE_WIZARD_ENABLED:
    import.meta.env.VITE_FEATURE_WIZARD_ENABLED !== "false",
  FEATURE_B2B_ENABLED: import.meta.env.VITE_FEATURE_B2B_ENABLED !== "false",
  FEATURE_AR_PREVIEW:
    import.meta.env.VITE_FEATURE_AR_PREVIEW === "true" || false,
  FEATURE_HOLOGRAPHIC_PREVIEW:
    import.meta.env.VITE_FEATURE_HOLOGRAPHIC_PREVIEW === "true" || false,

  // Analytics
  ANALYTICS_ENABLED: import.meta.env.VITE_ANALYTICS_ENABLED === "true" || false,

  // External Links
  CNIT_WEBSITE: "https://cnit-solutions.com/",
  SUPPORT_EMAIL: "support@zora-edu.ae",
  WHATSAPP_NUMBER: "+971-XX-XXX-XXXX",
};

// API Endpoints
export const endpoints = {
  auth: {
    login: `${env.API_BASE_URL}/${env.API_VERSION}/auth/login`,
    register: `${env.API_BASE_URL}/${env.API_VERSION}/auth/register`,
    logout: `${env.API_BASE_URL}/${env.API_VERSION}/auth/logout`,
  },
  subscription: {
    plans: `${env.API_BASE_URL}/${env.API_VERSION}/plans`,
    create: `${env.API_BASE_URL}/${env.API_VERSION}/subscriptions`,
    cancel: `${env.API_BASE_URL}/${env.API_VERSION}/subscriptions/cancel`,
  },
  payment: {
    createIntent: `${env.API_BASE_URL}/${env.API_VERSION}/payments/intent`,
    confirm: `${env.API_BASE_URL}/${env.API_VERSION}/payments/confirm`,
  },
  b2b: {
    inquiry: `${env.API_BASE_URL}/${env.API_VERSION}/b2b/inquiry`,
    demo: `${env.API_BASE_URL}/${env.API_VERSION}/b2b/demo-request`,
  },
};
