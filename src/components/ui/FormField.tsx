'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validationRules?: ValidationRule[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  validationRules = [],
  validateOnChange = false,
  validateOnBlur = true,
  options = [],
  rows = 3,
  helpText,
  leftIcon,
  rightIcon,
  className,
}: FormFieldProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validate = (val: string) => {
    if (required && !val) {
      setError(`${label}は必須項目です`);
      setIsValid(false);
      return false;
    }

    for (const rule of validationRules) {
      if (!rule.test(val)) {
        setError(rule.message);
        setIsValid(false);
        return false;
      }
    }

    setError(null);
    setIsValid(true);
    return true;
  };

  useEffect(() => {
    if ((validateOnChange && touched) || (validateOnBlur && touched)) {
      validate(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (validateOnChange && touched) {
      validate(newValue);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validateOnBlur) {
      validate(value);
    }
    onBlur?.();
  };

  const inputClasses = cn(
    'w-full px-3 py-2 border rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    error && touched
      ? 'border-red-500 bg-red-50'
      : isValid && touched && value
      ? 'border-green-500 bg-green-50'
      : 'border-gray-300',
    disabled && 'bg-gray-100 cursor-not-allowed',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10'
  );

  return (
    <div className={cn('space-y-1', className)}>
      {/* Label */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={inputClasses}
          />
        ) : type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={inputClasses}
          >
            <option value="">選択してください</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
          />
        )}

        {/* Right Icon / Validation Status */}
        {(rightIcon || (touched && value)) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {touched && value && !error ? (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </motion.svg>
            ) : touched && error ? (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </motion.svg>
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>

      {/* Help Text */}
      {helpText && !error && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && touched && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Common validation rules
export const validationRules = {
  email: {
    test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: '有効なメールアドレスを入力してください',
  },
  phone: {
    test: (value: string) => /^[0-9-+()]*$/.test(value),
    message: '有効な電話番号を入力してください',
  },
  url: {
    test: (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message: '有効なURLを入力してください',
  },
  minLength: (min: number) => ({
    test: (value: string) => value.length >= min,
    message: `${min}文字以上入力してください`,
  }),
  maxLength: (max: number) => ({
    test: (value: string) => value.length <= max,
    message: `${max}文字以下で入力してください`,
  }),
  pattern: (pattern: RegExp, message: string) => ({
    test: (value: string) => pattern.test(value),
    message,
  }),
};