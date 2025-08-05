import React from "react";
import { cn } from "@/utils/cn";

// Base icon props
interface IconProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

// Size mapping for consistent icon sizing
const sizeMap = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

// Base icon component
const BaseIcon: React.FC<
  IconProps & { children: React.ReactNode; viewBox?: string }
> = ({ children, className, size = "md", viewBox = "0 0 24 24" }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox={viewBox}
    fill="currentColor"
  >
    {children}
  </svg>
);

// Dice icons
export const DiceIcons = {
  D2: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" fill="currentColor" />
    </BaseIcon>
  ),

  D4: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <path
        d="M12 2l10 18H2L12 2z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
    </BaseIcon>
  ),

  D6: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </BaseIcon>
  ),

  D8: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <path
        d="M12 2l8 8-8 12L4 10l8-8z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </BaseIcon>
  ),

  D10: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <path
        d="M12 2l7 6v8l-7 6-7-6V8l7-6z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="9" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </BaseIcon>
  ),

  D12: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <path
        d="M12 2l4 3 4-1 2 4-2 4 2 4-2 4-4-1-4 3-4-3-4 1-2-4 2-4-2-4 2-4 4 1 4-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </BaseIcon>
  ),

  D20: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <path
        d="M12 2l6 4 2 6-2 6-6 4-6-4-2-6 2-6 6-4z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
    </BaseIcon>
  ),

  D100: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size}>
      <path
        d="M12 2l5 3 3 5-3 5 3 5-3 5-5 3-5-3-3-5 3-5-3-5 3-5 5-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <text x="12" y="14" textAnchor="middle" fontSize="8" fill="currentColor">
        %
      </text>
    </BaseIcon>
  ),
};

// UI icons
export const UIIcons = {
  Menu: ({ className, size = "lg" }: IconProps) => (
    <BaseIcon className={className} size={size} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </BaseIcon>
  ),

  ChevronDown: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        d="M6 9l6 6 6-6"
      />
    </BaseIcon>
  ),

  PlayingCard: ({ className, size = "lg" }: IconProps) => (
    <BaseIcon className={className} size={size} viewBox="0 0 24 24">
      {/* Playing card shape */}
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Spade symbol */}
      <path
        d="M12 6.5c-1.5 2-3 3-3 4.5 0 1 0.5 1.5 1.5 1.5h3c1 0 1.5-0.5 1.5-1.5 0-1.5-1.5-2.5-3-4.5z"
        fill="currentColor"
      />
      <rect x="11.5" y="12" width="1" height="2" fill="currentColor" />
      {/* Small corner marks */}
      <circle cx="7.5" cy="7" r="0.5" fill="currentColor" />
      <circle cx="16.5" cy="17" r="0.5" fill="currentColor" />
    </BaseIcon>
  ),

  DiceRoller: ({ className, size = "lg" }: IconProps) => (
    <BaseIcon className={className} size={size} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        d="M4 4h16v16H4z"
      />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="8" cy="16" r="1" fill="currentColor" />
      <circle cx="16" cy="16" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </BaseIcon>
  ),

  Close: ({ className, size = "md" }: IconProps) => (
    <BaseIcon className={className} size={size} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        d="M6 18L18 6M6 6l12 12"
      />
    </BaseIcon>
  ),

  Refresh: ({ className, size = "sm" }: IconProps) => (
    <BaseIcon className={className} size={size} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </BaseIcon>
  ),

  ErrorTriangle: ({ className, size = "lg" }: IconProps) => (
    <BaseIcon className={className} size={size} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </BaseIcon>
  ),
};
