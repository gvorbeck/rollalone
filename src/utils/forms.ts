// Reusable form utilities and validation patterns
// Eliminates duplicated form handling code

import { useState, useCallback, ChangeEvent, FormEvent } from "react";

export interface ValidationRule<T = string> {
  test: (value: T) => boolean;
  message: string;
}

export interface FieldConfig<T = string> {
  initialValue: T;
  rules?: ValidationRule<T>[];
  transform?: (value: string) => T;
  format?: (value: T) => string;
}

export interface FieldState<T = string> {
  value: T;
  error: string | null;
  touched: boolean;
  isValid: boolean;
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: <T>(
    message: string = "This field is required"
  ): ValidationRule<T> => ({
    test: (value: T) => {
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "number") return !isNaN(value);
      if (Array.isArray(value)) return value.length > 0;
      return value != null;
    },
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule<string> => ({
    test: (value: string) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    test: (value: string) => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    test: (value: string) => regex.test(value),
    message,
  }),

  diceNotation: (): ValidationRule<string> => ({
    test: (value: string) => {
      if (!value.trim()) return true; // Allow empty (required rule handles this)
      return /^(\d*d\d+(?:[+-]\d+)?(?:\s*[+-]\s*\d*d\d+(?:[+-]\d+)?)*)?$/i.test(
        value.trim()
      );
    },
    message: "Invalid dice notation (e.g., 1d20, 2d6+3, 1d8+1d4)",
  }),

  positiveNumber: (message?: string): ValidationRule<number> => ({
    test: (value: number) => !isNaN(value) && value > 0,
    message: message || "Must be a positive number",
  }),

  range: (
    min: number,
    max: number,
    message?: string
  ): ValidationRule<number> => ({
    test: (value: number) => !isNaN(value) && value >= min && value <= max,
    message: message || `Must be between ${min} and ${max}`,
  }),
};

/**
 * Transform functions for common input types
 */
export const transforms = {
  string: (value: string): string => value,
  number: (value: string): number => parseFloat(value) || 0,
  integer: (value: string): number => parseInt(value, 10) || 0,
  trimmed: (value: string): string => value.trim(),
  lowercase: (value: string): string => value.toLowerCase(),
  uppercase: (value: string): string => value.toUpperCase(),
};

/**
 * Format functions for display
 */
export const formatters = {
  string: (value: string): string => value,
  number: (value: number): string => value.toString(),
  currency: (value: number): string => `$${value.toFixed(2)}`,
  percentage: (value: number): string => `${value}%`,
};

/**
 * Hook for managing individual form fields
 */
export function useField<T = string>(config: FieldConfig<T>) {
  const [state, setState] = useState<FieldState<T>>({
    value: config.initialValue,
    error: null,
    touched: false,
    isValid: true,
  });

  const validate = useCallback(
    (value: T): string | null => {
      if (!config.rules) return null;

      for (const rule of config.rules) {
        if (!rule.test(value)) {
          return rule.message;
        }
      }
      return null;
    },
    [config.rules]
  );

  const setValue = useCallback(
    (newValue: T, shouldTouch: boolean = true) => {
      const error = validate(newValue);
      setState({
        value: newValue,
        error,
        touched: shouldTouch,
        isValid: error === null,
      });
    },
    [validate]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const stringValue = event.target.value;
      const transformedValue = config.transform
        ? config.transform(stringValue)
        : (stringValue as T);
      setValue(transformedValue);
    },
    [config, setValue]
  );

  const handleBlur = useCallback(() => {
    setState((prev) => ({ ...prev, touched: true }));
  }, []);

  const reset = useCallback(() => {
    setState({
      value: config.initialValue,
      error: null,
      touched: false,
      isValid: true,
    });
  }, [config.initialValue]);

  const displayValue = config.format
    ? config.format(state.value)
    : String(state.value);

  return {
    ...state,
    displayValue,
    setValue,
    handleChange,
    handleBlur,
    reset,
    validate: () => validate(state.value),
  };
}

/**
 * Hook for managing complete forms
 */
export function useForm<T extends Record<string, unknown>>(
  fields: Record<keyof T, FieldConfig>,
  onSubmit?: (values: T) => void | Promise<void>
) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form state
  const initialValues = Object.entries(fields).reduce((acc, [key, config]) => {
    acc[key as keyof T] = config.initialValue as T[keyof T];
    return acc;
  }, {} as T);

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: unknown): string | null => {
      const fieldConfig = fields[name];
      if (!fieldConfig.rules) return null;
      for (const rule of fieldConfig.rules) {
        // Use type assertion for rule.test
        if (!(rule.test as (v: unknown) => boolean)(value)) {
          return rule.message;
        }
      }
      return null;
    },
    [fields]
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(fields).forEach((name) => {
      const error = validateField(name as keyof T, values[name as keyof T]);
      if (error) {
        newErrors[name as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [fields, values, validateField]);

  // Update a field value
  const setFieldValue = useCallback(
    (name: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Validate the field
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  // Mark a field as touched
  const setFieldTouched = useCallback(
    (name: keyof T, isTouched: boolean = true) => {
      setTouched((prev) => ({ ...prev, [name]: isTouched }));
    },
    []
  );

  // Handle input changes
  const handleChange = useCallback(
    (name: keyof T) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const stringValue = event.target.value;
        const fieldConfig = fields[name];
        const transformedValue = fieldConfig.transform
          ? fieldConfig.transform(stringValue)
          : stringValue;
        setFieldValue(name, transformedValue);
      },
    [fields, setFieldValue]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (name: keyof T) => () => {
      setFieldTouched(name, true);
    },
    [setFieldTouched]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      // Mark all fields as touched
      const allTouched = Object.keys(fields).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Partial<Record<keyof T, boolean>>);
      setTouched(allTouched);

      // Validate form
      if (!validateForm()) {
        return;
      }

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [fields, validateForm, onSubmit, values]
  );

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Get field props for easy binding
  const getFieldProps = useCallback(
    (name: keyof T) => {
      const value = values[name];
      const fieldConfig = fields[name];
      let displayValue: string;
      if (fieldConfig.format && typeof value !== "undefined") {
        // Only call format if value is string and format expects string
        if (typeof value === "string" && fieldConfig.format.length === 1) {
          displayValue = (fieldConfig.format as (v: string) => string)(value);
        } else if (
          typeof value === "number" &&
          fieldConfig.format.length === 1
        ) {
          // Try to call as number, but only if format is not the default string formatter
          try {
            displayValue = (
              fieldConfig.format as unknown as (v: number) => string
            )(value);
          } catch {
            displayValue = String(value);
          }
        } else {
          displayValue = String(value);
        }
      } else {
        displayValue = String(value ?? "");
      }
      return {
        value: displayValue,
        onChange: handleChange(name),
        onBlur: handleBlur(name),
        error: touched[name] ? errors[name] : undefined,
      };
    },
    [values, fields, handleChange, handleBlur, touched, errors]
  );

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    reset,
    validateForm,
    getFieldProps,
  };
}

/**
 * Common input component props generator
 */
export const createInputProps = (
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onBlur?: () => void,
  error?: string,
  baseClasses: string = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
) => {
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500";

  return {
    value,
    onChange,
    onBlur,
    className: `${baseClasses} ${errorClasses}`,
    "aria-invalid": !!error,
    "aria-describedby": error ? "error-message" : undefined,
  };
};
