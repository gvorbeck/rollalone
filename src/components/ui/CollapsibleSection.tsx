import React, { useState, useRef, useEffect } from "react";
import { UIIcons } from "./Icons";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  isCollapsible?: boolean;
  defaultCollapsed?: boolean;
  titleClassName?: string;
  buttonClassName?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  isCollapsible = false,
  defaultCollapsed = false,
  titleClassName = "",
  buttonClassName = "",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [height, setHeight] = useState<number | undefined>(
    defaultCollapsed ? 0 : undefined
  );
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!isCollapsible) return;

    const updateHeight = () => {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(isCollapsed ? 0 : scrollHeight);
      }
    };

    // Update height when collapsed state changes
    updateHeight();

    // Update height when content changes (for dynamic content)
    const resizeObserver = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isCollapsed, isCollapsible]);

  if (!isCollapsible) {
    return (
      <div>
        <h3 className={titleClassName}>{title}</h3>
        {children}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-2 items-start">
        <h3 className={titleClassName}>{title}</h3>
        <button
          onClick={toggleCollapsed}
          className={`ml-2 mt-0.5 p-1 rounded hover:bg-gray-700/50 transition-colors flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 ${buttonClassName}`}
          aria-label={isCollapsed ? "Expand section" : "Collapse section"}
        >
          <UIIcons.ChevronDown
            className={`transition-transform duration-300 ${
              isCollapsed ? "-rotate-90" : "rotate-0"
            }`}
            size="sm"
          />
          {isCollapsed ? "Show" : "Hide"}
        </button>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: height !== undefined ? `${height}px` : "auto" }}
      >
        <div
          ref={contentRef}
          className={
            isCollapsed
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-200 delay-100"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
