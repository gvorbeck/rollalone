import React, { ReactNode } from "react";
import { cn } from "@/utils/cn";
import {
  createFABStates,
  HOVER_EFFECTS,
  FOCUS_EFFECTS,
} from "@/utils/animations";

// Base FAB component to eliminate duplication
interface FABProps {
  children: ReactNode;
  onClick: () => void;
  title: string;
  className?: string;
  position?:
    | "right-6"
    | "right-23"
    | "right-24"
    | "right-40"
    | "right-42"
    | "right-44";
  variant?: "red" | "blue" | "gray";
  isOpen?: boolean;
  size?: "sm" | "md" | "lg";
}

export const FAB: React.FC<FABProps> = ({
  children,
  onClick,
  title,
  className,
  variant = "red",
  isOpen = false,
  size = "md",
}) => {
  const baseClasses = [
    "rounded-full",
    "shadow-lg",
    "flex",
    "items-center",
    "justify-center",
    "cursor-pointer",
    "select-none",
    "z-50",
  ];

  const variantClasses = {
    red: "bg-red-600 hover:bg-red-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    gray: "bg-gray-600 hover:bg-gray-700 text-white",
  };

  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-20 h-20 text-xl",
  };

  const animationStates = createFABStates(isOpen);

  return (
    <button
      onClick={onClick}
      title={title}
      aria-expanded={isOpen}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        animationStates.base,
        animationStates.rotation,
        HOVER_EFFECTS.lift,
        FOCUS_EFFECTS.ring,
        className
      )}
    >
      {children}
    </button>
  );
};
