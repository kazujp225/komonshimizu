'use client';

import { useState, useRef, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = rect.left + rect.width / 2;
        y = rect.top;
        break;
      case 'bottom':
        x = rect.left + rect.width / 2;
        y = rect.bottom;
        break;
      case 'left':
        x = rect.left;
        y = rect.top + rect.height / 2;
        break;
      case 'right':
        x = rect.right;
        y = rect.top + rect.height / 2;
        break;
    }

    setTooltipPosition({ x, y });
  };

  const handleMouseEnter = () => {
    calculatePosition();
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: '-translate-x-1/2 -translate-y-full -mt-2',
    bottom: '-translate-x-1/2 translate-y-full mt-2',
    left: '-translate-x-full -translate-y-1/2 -ml-2',
    right: 'translate-x-full -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'fixed z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded-md pointer-events-none',
              positionClasses[position],
              className
            )}
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
            }}
          >
            {content}
            <div
              className={cn(
                'absolute w-0 h-0 border-4 border-transparent',
                position === 'top' && 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-900',
                position === 'bottom' && 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-900',
                position === 'left' && 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-900',
                position === 'right' && 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-900'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Popover Component
interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'click' | 'hover';
  className?: string;
}

export function Popover({
  content,
  children,
  position = 'bottom',
  trigger = 'click',
  className,
}: PopoverProps) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (trigger === 'click' && isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, trigger]);

  const handleTrigger = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsVisible(false);
    }
  };

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={handleTrigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200',
              positionClasses[position],
              className
            )}
            onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
            onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Help Icon with Tooltip
interface HelpIconProps {
  content: string;
  size?: 'sm' | 'md' | 'lg';
}

export function HelpIcon({ content, size = 'md' }: HelpIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <Tooltip content={content}>
      <svg
        className={cn('text-gray-400 hover:text-gray-600 cursor-help', sizeClasses[size])}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </Tooltip>
  );
}