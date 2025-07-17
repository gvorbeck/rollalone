import React from "react";
import clsx from "clsx";
import { CardProps } from "../data/definitions";

const Card: React.FC<CardProps> = ({
  title,
  contentType,
  content,
  preContent,
  postContent,
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
      case "table":
        const tableData = content as import("../data/definitions").TableData;
        return (
          <div className="overflow-x-auto">
            {tableData.title && (
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                {tableData.title}
              </h3>
            )}
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <tbody>
                {tableData.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-3 border-r border-gray-300 dark:border-gray-600 ${
                          cellIndex === 0
                            ? "font-semibold text-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      <header>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        {preContent && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{preContent}</p>
        )}
      </header>
      {renderContent()}
      <footer>
        {postContent && (
          <p className="text-gray-600 dark:text-gray-400 mt-4">{postContent}</p>
        )}
      </footer>
    </article>
  );
};

export default Card;
