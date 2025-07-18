import React, { ReactNode } from "react";
import { cn } from "@/utils/cn";

// Reusable animated panel component
export interface AnimatedPanelProps {
  children: ReactNode;
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  className?: string;
  position?: "right" | "left" | "center";
  width?: "sm" | "md" | "lg" | "xl";
  variant?: "overlay" | "floating";
}

export const AnimatedPanel: React.FC<AnimatedPanelProps> = ({
  children,
  isOpen,
  title,
  onClose,
  className,
  position = "right",
  width = "md",
  variant = "overlay",
}) => {
  // For floating variant, return a simple animated div
  if (variant === "floating") {
    return (
      <div
        className={cn(
          "bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 transition-all duration-300 ease-out transform",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none",
          className
        )}
        role="dialog"
        aria-labelledby={title ? `${title.toLowerCase().replace(/\s+/g, "-")}-title` : undefined}
      >
        {children}
      </div>
    );
  }

  // Original overlay variant
  const baseClasses = [
    "fixed",
    "inset-0",
    "z-40",
    "transition-all",
    "duration-300",
    "ease-out",
    "transform",
  ];

  const visibilityClasses = isOpen
    ? ["opacity-100", "scale-100", "translate-y-0"]
    : ["opacity-0", "scale-95", "translate-y-2", "pointer-events-none"];

  const positionClasses = {
    right: "flex justify-end items-start p-4",
    left: "flex justify-start items-start p-4",
    center: "flex justify-center items-center p-4",
  };

  const widthClasses = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[32rem]",
    xl: "w-[40rem]",
  };

  const panelClasses = [
    "bg-gray-800",
    "rounded-lg",
    "shadow-2xl",
    "border",
    "border-gray-700",
    "max-h-[90vh]",
    "overflow-y-auto",
    "transition-all",
    "duration-300",
    "ease-out",
  ];

  return (
    <div
      className={cn(
        baseClasses,
        positionClasses[position],
        visibilityClasses,
        className
      )}
      role="dialog"
      aria-labelledby={title ? `${title.toLowerCase().replace(/\s+/g, "-")}-title` : undefined}
    >
      <div className={cn(panelClasses, widthClasses[width])}>
        {/* Header - only render if title and onClose are provided */}
        {title && onClose && (
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3
              id={`${title.toLowerCase().replace(/\s+/g, "-")}-title`}
              className="text-lg font-semibold text-white"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              title={`Close ${title.toLowerCase()}`}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content */}
        <div className={title && onClose ? "p-4" : ""}>{children}</div>
      </div>
    </div>
  );
};
