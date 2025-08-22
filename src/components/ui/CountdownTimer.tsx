'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  endDate: Date | string;
  onComplete?: () => void;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  variant?: 'default' | 'flip' | 'minimal';
  className?: string;
}

export function CountdownTimer({
  endDate,
  onComplete,
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  variant = 'default',
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(endDate).getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const timeUnits = [
    { key: 'days', label: '日', value: timeLeft.days, show: showDays },
    { key: 'hours', label: '時間', value: timeLeft.hours, show: showHours },
    { key: 'minutes', label: '分', value: timeLeft.minutes, show: showMinutes },
    { key: 'seconds', label: '秒', value: timeLeft.seconds, show: showSeconds },
  ].filter(unit => unit.show);

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center space-x-1 text-2xl font-mono', className)}>
        {timeUnits.map((unit, index) => (
          <span key={unit.key}>
            {String(unit.value).padStart(2, '0')}
            {index < timeUnits.length - 1 && ':'}
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'flip') {
    return (
      <div className={cn('flex space-x-4', className)}>
        {timeUnits.map((unit) => (
          <FlipCard
            key={unit.key}
            value={unit.value}
            label={unit.label}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex space-x-4', className)}>
      {timeUnits.map((unit) => (
        <div
          key={unit.key}
          className="flex flex-col items-center bg-gray-100 rounded-lg p-4"
        >
          <motion.div
            key={unit.value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-gray-900"
          >
            {String(unit.value).padStart(2, '0')}
          </motion.div>
          <div className="text-xs text-gray-600 mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// Flip Card Component for flip variant
function FlipCard({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayValue}
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            exit={{ rotateX: 90 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-white tabular-nums"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {String(displayValue).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-center text-xs text-gray-600 mt-2">
        {label}
      </div>
    </div>
  );
}

// Countdown Bar
interface CountdownBarProps {
  endDate: Date | string;
  label?: string;
  className?: string;
}

export function CountdownBar({ endDate, label, className }: CountdownBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = new Date().getTime();
    const endTime = new Date(endDate).getTime();
    const totalDuration = endTime - startTime;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{label}</span>
          <span className="text-gray-900 font-medium">
            {(100 - progress).toFixed(0)}%
          </span>
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
          initial={{ width: 0 }}
          animate={{ width: `${100 - progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}