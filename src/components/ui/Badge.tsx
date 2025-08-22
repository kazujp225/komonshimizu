'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  pulse?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  pulse = false,
  removable = false,
  onRemove,
  className,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        'inline-flex items-center font-medium',
        variantClasses[variant],
        sizeClasses[size],
        rounded ? 'rounded-full' : 'rounded',
        pulse && 'animate-pulse',
        className
      )}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 -mr-1 hover:opacity-75 transition-opacity"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </motion.span>
  );
}

// Tag Component
interface TagProps {
  label: string;
  color?: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ label, color = 'gray', icon, onRemove, className }: TagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm',
        `bg-${color}-100 text-${color}-800`,
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 hover:opacity-75 transition-opacity"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

// Notification Badge
interface NotificationBadgeProps {
  count: number;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  className?: string;
}

export function NotificationBadge({
  count,
  max = 99,
  showZero = false,
  dot = false,
  className,
}: NotificationBadgeProps) {
  if (!showZero && count === 0) return null;

  if (dot) {
    return (
      <span className={cn(
        'absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full',
        className
      )} />
    );
  }

  const displayCount = count > max ? `${max}+` : count;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        'absolute -top-2 -right-2 min-w-[20px] h-5 px-1 flex items-center justify-center',
        'bg-red-500 text-white text-xs font-bold rounded-full',
        className
      )}
    >
      {displayCount}
    </motion.span>
  );
}

// Status Indicator
interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

export function StatusIndicator({
  status,
  size = 'md',
  pulse = false,
  className,
}: StatusIndicatorProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <span className="relative inline-flex">
      {pulse && status === 'online' && (
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
            statusColors[status]
          )}
        />
      )}
      <span
        className={cn(
          'relative inline-flex rounded-full',
          statusColors[status],
          sizeClasses[size],
          className
        )}
      />
    </span>
  );
}