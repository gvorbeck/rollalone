import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

// Reusable button component with consistent styling
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = [
    "font-medium",
    "rounded-lg",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
  ];

  const variantClasses = {
    primary: [
      "bg-blue-600",
      "hover:bg-blue-700",
      "text-white",
      "focus:ring-blue-500",
      "active:bg-blue-800",
    ],
    secondary: [
      "bg-gray-600",
      "hover:bg-gray-700",
      "text-white",
      "focus:ring-gray-500",
      "active:bg-gray-800",
    ],
    danger: [
      "bg-red-600",
      "hover:bg-red-700",
      "text-white",
      "focus:ring-red-500",
      "active:bg-red-800",
    ],
    ghost: [
      "text-gray-400",
      "hover:text-gray-200",
      "hover:bg-gray-700",
      "focus:ring-gray-500",
      "active:bg-gray-600",
    ],
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        widthClass,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
