// Data validation utilities for localStorage corruption handling

/**
 * Validates that a value is an array, returns empty array if not
 */
export const ensureArray = <T = unknown>(
  value: unknown,
  fallback: T[] = []
): T[] => {
  return Array.isArray(value) ? value : fallback;
};
