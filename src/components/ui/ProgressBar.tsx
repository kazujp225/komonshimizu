'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'striped';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-primary-600',
    gradient: 'bg-gradient-to-r from-primary-500 to-accent-500',
    striped: 'bg-primary-600 bg-striped',
  };

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <motion.div
          className={cn('h-full rounded-full', variantClasses[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  steps: {
    id: string;
    label: string;
    description?: string;
  }[];
  currentStep: number;
  variant?: 'numbered' | 'dot' | 'icon';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  variant = 'numbered',
  orientation = 'horizontal',
  className,
}: StepIndicatorProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        'flex',
        isHorizontal ? 'flex-row items-center' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.id}
            className={cn(
              'flex items-center',
              isHorizontal ? 'flex-1' : 'w-full'
            )}
          >
            <div className="flex items-center">
              {/* Step Circle */}
              <motion.div
                className={cn(
                  'relative flex items-center justify-center rounded-full transition-all',
                  variant === 'dot' ? 'w-3 h-3' : 'w-10 h-10',
                  isCompleted
                    ? 'bg-primary-600 text-white'
                    : isActive
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                    : 'bg-gray-200 text-gray-600'
                )}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {variant === 'numbered' && (
                  <>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </>
                )}
              </motion.div>

              {/* Step Label */}
              {variant !== 'dot' && (
                <div className={cn('ml-3', isHorizontal ? 'mr-8' : 'mb-8')}>
                  <p className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-primary-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                  )}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div
                className={cn(
                  isHorizontal ? 'flex-1 h-0.5 mx-4' : 'w-0.5 h-16 mx-5 my-2',
                  isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  className,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-primary-600"
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}