import React from "react";
import { scrollToCard } from "./scrollToCard";

/**
 * Parses markdown-style bold// List of terms that should be converted to internal card links
const INTERNAL_LINK_TERMS = [
  "PLOT HOOK",
  "RANDOM EVENT", 
  "SET THE SCENE",
  "GM MOVES"
];ing (**text**), links ([text](url)), and internal card links and returns React elements
 * @param text - The text to parse
 * @returns Array of React elements with proper bold formatting, links, and internal card links
 */
export const parseMarkdownBold = (
  text: string
): (string | React.ReactElement)[] => {
  const result: (string | React.ReactElement)[] = [];

  // First handle external links [text](url)
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
      // Handle internal links first, then bold formatting
      const internalLinkParts = parseInternalLinks(part);
      internalLinkParts.forEach((linkPart, linkIndex) => {
        if (typeof linkPart === "string") {
          // Handle bold formatting for string parts
          const boldParts = linkPart.split(/(\*\*.*?\*\*)/g);
          boldParts.forEach((boldPart, boldIndex) => {
            if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
              const boldText = boldPart.slice(2, -2);
              result.push(
                <strong key={`bold-${partIndex}-${linkIndex}-${boldIndex}`}>
                  {boldText}
                </strong>
              );
            } else if (boldPart !== "") {
              result.push(boldPart);
            }
          });
        } else {
          // This is already a React element (internal link)
          result.push(linkPart);
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

// List of terms that should be converted to internal card links
const INTERNAL_LINK_TERMS = [
  "PLOT HOOK",
  "RANDOM EVENT",
  "SET THE SCENE",
  "ORACLE (FOCUS)",
  "ORACLE (HOW)",
  "ORACLE (YES/NO)",
  "ORACLE",
  "GM MOVES",
  "ACTION FOCUS",
  "DETAIL FOCUS",
  "TOPIC FOCUS",
];

/**
 * Parses text for internal card links (uppercase terms) and makes them clickable
 * @param text - The text to parse for internal links
 * @returns Array of React elements with clickable internal links
 */
export const parseInternalLinks = (
  text: string
): (string | React.ReactElement)[] => {
  const result: (string | React.ReactElement)[] = [];
  let remaining = text;
  let elementKey = 0;

  while (remaining.length > 0) {
    let foundMatch = false;

    // Check for each internal link term
    for (const term of INTERNAL_LINK_TERMS) {
      const index = remaining.indexOf(term);
      if (index !== -1) {
        // Add text before the match
        if (index > 0) {
          result.push(remaining.substring(0, index));
        }

        // Add the clickable link
        result.push(
          <button
            key={`internal-link-${elementKey++}`}
            onClick={() => scrollToCard(term)}
            className="text-red-400 hover:text-red-300 underline cursor-pointer font-semibold transition-colors"
            type="button"
          >
            {term}
          </button>
        );

        // Update remaining text
        remaining = remaining.substring(index + term.length);
        foundMatch = true;
        break;
      }
    }

    // If no matches found, add remaining text and break
    if (!foundMatch) {
      if (remaining.length > 0) {
        result.push(remaining);
      }
      break;
    }
  }

  return result;
};
