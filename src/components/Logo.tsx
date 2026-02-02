import { cn } from "@/lib/utils";

/**
 * Logo variant types for the Zora logo component
 * - icon: Small square logo (32px, 48px, 64px, 128px)
 * - wordmark: Full logo with text/branding
 * - full: Complete logo in 512x512 format
 */
export type ZoraLogoVariant = "icon" | "wordmark" | "full";

/**
 * Logo size presets
 * - xs: 24px
 * - sm: 32px
 * - md: 48px (default)
 * - lg: 64px
 * - xl: 96px
 * - 2xl: 128px
 */
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "custom";

export interface ZoraLogoProps {
  /**
   * Logo variant to display
   * @default "icon"
   */
  variant?: ZoraLogoVariant;

  /**
   * Logo size preset or custom
   * @default "md"
   */
  size?: LogoSize;

  /**
   * Custom width (only used when size="custom")
   */
  width?: number | string;

  /**
   * Custom height (only used when size="custom")
   */
  height?: number | string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Alt text for accessibility
   * @default "Zora Logo"
   */
  alt?: string;
}

const sizeMap: Record<Exclude<LogoSize, "custom">, number> = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
  "2xl": 128,
};

const variantPathMap: Record<ZoraLogoVariant, string> = {
  icon: "/logos/zora/logo-icon-64x64-light.svg",
  wordmark: "/logos/zora/logo-wordmark-light.svg",
  full: "/logos/zora/logo-icon-512x512-light.svg",
};

/**
 * ZoraLogo Component
 * 
 * Renders the Zora logo with various size and variant options.
 * Optimized for performance using SVG format with proper aspect ratios.
 * 
 * @example
 * ```tsx
 * // Small icon logo
 * <ZoraLogo variant="icon" size="sm" />
 * 
 * // Large wordmark
 * <ZoraLogo variant="wordmark" size="xl" />
 * 
 * // Custom size
 * <ZoraLogo variant="full" size="custom" width={200} height={200} />
 * ```
 */
export function ZoraLogo({
  variant = "icon",
  size = "md",
  width,
  height,
  className,
  alt = "Zora Logo",
}: ZoraLogoProps) {
  const logoPath = variantPathMap[variant];

  const dimensions =
    size === "custom"
      ? { width, height }
      : { width: sizeMap[size], height: sizeMap[size] };

  return (
    <img
      src={logoPath}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={cn("object-contain", className)}
      loading="lazy"
    />
  );
}

/**
 * Parent Company (CNIT Solutions) logo component
 * Combines the CNITS icon with "CNIT Solutions" text
 */
export interface ParentCompanyLogoProps {
  /**
   * Logo size preset or custom
   * @default "md"
   */
  size?: LogoSize;

  /**
   * Custom width (only used when size="custom")
   */
  width?: number | string;

  /**
   * Custom height (only used when size="custom")
   */
  height?: number | string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Alt text for accessibility
   * @default "CNIT Solutions"
   */
  alt?: string;

  /**
   * Show company name text alongside icon
   * @default true
   */
  showText?: boolean;
}

/**
 * ParentCompanyLogo Component
 * 
 * Renders the CNIT Solutions logo (CNITS icon + company name text).
 * The icon and text are displayed side by side with proper spacing.
 * 
 * @example
 * ```tsx
 * // Default with icon and text
 * <ParentCompanyLogo size="lg" />
 * 
 * // Icon only
 * <ParentCompanyLogo size="md" showText={false} />
 * 
 * // Custom size
 * <ParentCompanyLogo size="custom" width={200} height={60} />
 * ```
 */
export function ParentCompanyLogo({
  size = "md",
  width,
  height,
  className,
  alt = "CNIT Solutions",
  showText = true,
}: ParentCompanyLogoProps) {
  const iconSize = size === "custom" ? height : sizeMap[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src="/logos/parent-company/cnits-icon.svg"
        alt={alt}
        width={iconSize}
        height={iconSize}
        className="object-contain flex-shrink-0"
        loading="lazy"
      />
      {showText && (
        <span className="font-semibold text-foreground whitespace-nowrap">
          CNIT Solutions
        </span>
      )}
    </div>
  );
}
