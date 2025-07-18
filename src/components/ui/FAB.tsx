import React, { ReactNode } from "react";
import { cn } from "@/utils/cn";

// Base FAB component to eliminate duplication
export interface FABProps {
  children: ReactNode;
  onClick: () => void;
  title: string;
  className?: string;
  position?: "right-6" | "right-23" | "right-40";
  variant?: "red" | "blue" | "gray";
  isOpen?: boolean;
  size?: "sm" | "md" | "lg";
}

export const FAB: React.FC<FABProps> = ({
  children,
  onClick,
  title,
  className,
  position = "right-6",
  variant = "red",
  isOpen = false,
  size = "md",
}) => {
  const baseClasses = [
    "fixed", "bottom-6", "z-50",
    "rounded-full", "shadow-lg",
    "transition-all", "duration-300", "ease-out",
    "flex", "items-center", "justify-center",
    "cursor-pointer", "select-none",
    "hover:shadow-xl", "hover:scale-105"
  ];

  const positionClasses = {
    "right-6": "right-6",
    "right-23": "right-23", 
    "right-40": "right-40"
  };

  const variantClasses = {
    red: "bg-red-600 hover:bg-red-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white", 
    gray: "bg-gray-600 hover:bg-gray-700 text-white"
  };

  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-20 h-20 text-xl"
  };

  const rotationClass = isOpen ? "transform rotate-45" : "";

  return (
    <div className={positionClasses[position]}>
      <button
        onClick={onClick}
        title={title}
        aria-expanded={isOpen}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          rotationClass,
          className
        )}
      >
        {children}
      </button>
    </div>
  );
};
