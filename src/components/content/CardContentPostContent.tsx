import React from "react";

interface CardContentPostContentProps {
  postContent: string[];
}

const CardContentPostContent: React.FC<CardContentPostContentProps> = ({
  postContent,
}) => {
  const renderFormattedText = (text: string) => {
    // Split by **bold** markers and render with proper formatting
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Remove the ** markers and render as bold
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  if (!postContent || postContent.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500">
      {postContent.map((paragraph, index) => (
        <p
          key={index}
          className={`text-gray-700 dark:text-gray-300 ${
            index < postContent.length - 1 ? "mb-3" : ""
          }`}
        >
          {renderFormattedText(paragraph)}
        </p>
      ))}
    </div>
  );
};

export default CardContentPostContent;
