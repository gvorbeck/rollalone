import { FC, ReactNode, useState } from "react";
import { cn } from "@/utils/cn";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  activeTab?: string; // Controlled active tab
  onTabChange?: (tabId: string) => void; // Callback when tab changes
  className?: string;
}

const Tabs: FC<TabsProps> = ({
  items,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  className,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || items[0]?.id
  );

  // Use controlled active tab if provided, otherwise use internal state
  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="mb-8">
        <nav
          className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start"
          aria-label="Card categories"
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "relative px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-lg sm:text-md",
                "transition-all duration-300 ease-out transform hover:scale-105",
                "shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50",
                "border-2 backdrop-blur-sm",
                activeTab === item.id
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white border-red-400 shadow-red-500/25"
                  : "bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-300 border-gray-600 hover:from-gray-700/90 hover:to-gray-600/90 hover:text-white hover:border-gray-500"
              )}
              aria-selected={activeTab === item.id}
              role="tab"
            >
              {/* Active tab indicator */}
              {activeTab === item.id && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/20 to-red-500/20 animate-pulse" />
              )}

              {/* Tab icon based on category */}
              <span className="relative flex items-center gap-2">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="animate-fade-in"
      >
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;
