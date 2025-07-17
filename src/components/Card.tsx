import React from "react";
import clsx from "clsx";
import { CardProps } from "../data/definitions";

const Card: React.FC<CardProps> = ({
  title,
  contentType,
  content,
  className = "",
}) => {
  const renderContent = () => {
    switch (contentType) {
      case "text":
        return (
          <p className="text-gray-700 dark:text-gray-300">
            {content as string}
          </p>
        );
      case "list":
        return (
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {(content as string[]).map((item, index) => (
              <li key={index} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        );
      case "image":
        return (
          <div className="text-center">
            <img
              src={content as string}
              alt={title}
              className="mx-auto rounded-lg max-w-full h-auto"
            />
          </div>
        );
      default:
        return (
          <p className="text-gray-700 dark:text-gray-300">
            {typeof content === "string" ? content : "Invalid content type"}
          </p>
        );
    }
  };

  return (
    <article
      className={clsx(
        "bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-shadow hover:shadow-lg",
        className
      )}
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {renderContent()}
    </article>
  );
};

export default Card;
