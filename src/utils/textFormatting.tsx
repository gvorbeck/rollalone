import React from "react";

/**
 * Parses markdown-style bold formatting (**text**) and links ([text](url)) and returns React elements
 * @param text - The text to parse
 * @returns Array of React elements with proper bold formatting and links
 */
export const parseMarkdownBold = (
  text: string
): (string | React.ReactElement)[] => {
  const result: (string | React.ReactElement)[] = [];

  // First handle links [text](url)
  const linkRegex = /(\[.*?\]\(.*?\))/g;
  const parts = text.split(linkRegex);

  parts.forEach((part, partIndex) => {
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      result.push(
        <a
          key={`link-${partIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200 underline"
        >
          {linkText}
        </a>
      );
    } else {
      // Handle bold formatting for non-link parts
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      boldParts.forEach((boldPart, boldIndex) => {
        if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
          const boldText = boldPart.slice(2, -2);
          result.push(
            <strong key={`bold-${partIndex}-${boldIndex}`}>{boldText}</strong>
          );
        } else if (boldPart !== "") {
          result.push(boldPart);
        }
      });
    }
  });

  return result;
};

/**
 * Converts newline characters to <br> elements for React rendering
 * @param text - The text containing newline characters
 * @returns Array of React elements with line breaks
 */
export const parseLineBreaks = (
  text: string
): (string | React.ReactElement)[] => {
  return text.split("\n").map((line, index, array) => {
    if (index === array.length - 1) {
      return line; // Don't add <br> after the last line
    }
    return (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    );
  });
};

/**
 * Combines markdown bold parsing with line break handling
 * @param text - The text to parse
 * @returns Array of React elements with both bold formatting and line breaks
 */
export const parseFormattedText = (
  text: string
): (string | React.ReactElement)[] => {
  // First handle line breaks, then bold formatting
  const lines = text.split("\n");
  const result: (string | React.ReactElement)[] = [];

  lines.forEach((line, lineIndex) => {
    const formattedLine = parseMarkdownBold(line);
    result.push(...formattedLine);

    // Add line break if not the last line
    if (lineIndex < lines.length - 1) {
      result.push(<br key={`br-${lineIndex}`} />);
    }
  });

  return result;
};
