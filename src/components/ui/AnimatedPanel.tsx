import React, { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { createPanelStates } from "@/utils/animations";

// Reusable animated panel component
interface AnimatedPanelProps {
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
  const panelStates = createPanelStates(isOpen);

  // For floating variant, return a simple animated div
  if (variant === "floating") {
    return (
      <div
        className={cn(
          "bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-4 ring-4 ring-black/40 ring-offset-2 ring-offset-gray-900",
          panelStates.base,
          panelStates.visible,
          className
        )}
        role="dialog"
        aria-labelledby={
          title
            ? `${title.toLowerCase().replace(/\s+/g, "-")}-title`
            : undefined
        }
      >
        {children}
      </div>
    );
  }

  // Original overlay variant
  const baseClasses = ["fixed", "inset-0", "z-40"];

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
  ];

  return (
    <div
      className={cn(
        baseClasses,
        positionClasses[position],
        panelStates.base,
        panelStates.visible,
        className
      )}
      role="dialog"
      aria-labelledby={
        title ? `${title.toLowerCase().replace(/\s+/g, "-")}-title` : undefined
      }
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
