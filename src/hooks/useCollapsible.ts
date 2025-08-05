import { useState, useRef, useEffect } from "react";

interface UseCollapsibleOptions {
  defaultCollapsed?: boolean;
  disabled?: boolean;
}

interface UseCollapsibleReturn {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  wrapperStyle: React.CSSProperties;
  contentClassName: string;
}

/**
 * Custom hook for collapsible content with smooth animations
 */
export const useCollapsible = ({
  defaultCollapsed = false,
  disabled = false,
}: UseCollapsibleOptions = {}): UseCollapsibleReturn => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [height, setHeight] = useState<number | undefined>(
    defaultCollapsed ? 0 : undefined
  );
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCollapsed = () => {
    if (!disabled) {
      setIsCollapsed(!isCollapsed);
    }
  };

  useEffect(() => {
    if (disabled) return;

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
  }, [isCollapsed, disabled]);

  return {
    isCollapsed,
    toggleCollapsed,
    contentRef,
    wrapperStyle: {
      height: height !== undefined ? `${height}px` : "auto",
    },
    contentClassName: `${
      isCollapsed ? "opacity-0" : "opacity-100"
    } transition-opacity duration-200 delay-100`,
  };
};
