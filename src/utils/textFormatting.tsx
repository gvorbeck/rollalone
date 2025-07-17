import React from "react";

/**
 * Parses markdown-style bold formatting (**text**) and returns React elements
 * @param text - The text to parse
 * @returns Array of React elements with proper bold formatting
 */
export const parseMarkdownBold = (
  text: string
): (string | React.ReactElement)[] => {
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
