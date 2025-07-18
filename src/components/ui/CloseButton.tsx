import React from "react";
import { cn } from "@/utils/cn";
import { HOVER_EFFECTS, FOCUS_EFFECTS } from "@/utils/animations";

interface CloseButtonProps {
  onClick: () => void;
  title?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  title = "Close",
  className,
  size = "md",
}) => {
  const baseClasses = [
    "text-gray-400",
    "cursor-pointer",
    "transition-colors",
    "duration-200",
    "flex",
    "items-center",
    "justify-center",
  ];

  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-base",
    lg: "w-10 h-10 text-lg",
  };

  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        baseClasses,
        sizeClasses[size],
        HOVER_EFFECTS.opacity,
        FOCUS_EFFECTS.ring,
        className
      )}
    >
      ✕
    </button>
  );
};
