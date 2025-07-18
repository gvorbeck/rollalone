import React, { useEffect, useRef, useState } from "react";

interface MasonryProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
}

const Masonry: React.FC<MasonryProps> = ({
  children,
  className = "",
  itemClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(() => {
    // Initialize with correct column count based on window width
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) return 1;
      else if (width < 1024) return 2;
      else return 3;
    }
    return 1; // Safe fallback - start with 1 column for SSR/mobile-first
  });
  const [supportsMasonry, setSupportsMasonry] = useState(false);

  useEffect(() => {
    // Check for native masonry support
    const testElement = document.createElement("div");
    testElement.style.gridTemplateRows = "masonry";
    const masonry = testElement.style.gridTemplateRows === "masonry";
    setSupportsMasonry(masonry);

    if (!masonry) {
      // Calculate columns based on window width
      const updateColumns = () => {
        const width = window.innerWidth;
        if (width < 768) setColumns(1);
        else if (width < 1024) setColumns(2);
        else setColumns(3);
      };

      updateColumns();
      window.addEventListener("resize", updateColumns);
      return () => window.removeEventListener("resize", updateColumns);
    }
  }, []);

  // If browser supports masonry, use simple grid
  if (supportsMasonry) {
    return (
      <div className={`masonry-grid ${className}`}>
        {children.map((child, index) => (
          <div key={index} className={`masonry-item ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  // Fallback: Distribute items across columns
  const columnArrays: React.ReactNode[][] = Array.from(
    { length: columns },
    () => []
  );

  children.forEach((child, index) => {
    const columnIndex = index % columns;
    columnArrays[columnIndex].push(child);
  });

  return (
    <div
      ref={containerRef}
      className={`grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        alignItems: "start",
      }}
    >
      {columnArrays.map((columnItems, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {columnItems.map((child, itemIndex) => (
            <div key={`${columnIndex}-${itemIndex}`} className={itemClassName}>
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
