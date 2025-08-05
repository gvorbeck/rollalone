import React from "react";
import { UIIcons } from "./Icons";

interface CollapsibleToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
  showText?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Reusable toggle button for collapsible content
 */
const CollapsibleToggle: React.FC<CollapsibleToggleProps> = ({
  isCollapsed,
  onToggle,
  showText = true,
  className = "",
  ariaLabel,
}) => {
  const defaultClassName =
    "ml-2 mt-0.5 p-1 rounded hover:bg-gray-700/50 transition-colors flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200";

  return (
    <button
      onClick={onToggle}
      className={`${defaultClassName} ${className}`}
      aria-label={
        ariaLabel || (isCollapsed ? "Expand content" : "Collapse content")
      }
    >
      <UIIcons.ChevronDown
        className={`transition-transform duration-300 ${
          isCollapsed ? "-rotate-90" : "rotate-0"
        }`}
        size="sm"
      />
      {showText && (isCollapsed ? "Show" : "Hide")}
    </button>
  );
};

export default CollapsibleToggle;
