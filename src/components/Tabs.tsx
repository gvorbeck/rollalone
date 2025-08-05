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
  className?: string;
}

const Tabs: FC<TabsProps> = ({ items, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-8" aria-label="Card categories">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                activeTab === item.id
                  ? "border-red-500 text-red-400"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
              )}
              aria-selected={activeTab === item.id}
              role="tab"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;
