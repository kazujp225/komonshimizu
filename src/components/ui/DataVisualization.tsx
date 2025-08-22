'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '', 
  decimals = 0,
  className = '' 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        setCount(Math.floor(easeOutCubic * end * Math.pow(10, decimals)) / Math.pow(10, decimals));

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };

      animationId = requestAnimationFrame(animate);
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [isInView, end, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString('ja-JP', { 
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals 
      })}{suffix}
    </span>
  );
}

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = '#D63E6C',
  backgroundColor = '#f3f4f6',
  className = '',
  children
}: ProgressRingProps) {
  const normalizedRadius = (size - strokeWidth) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress circle */}
        <motion.circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ 
            strokeDashoffset: isInView ? strokeDashoffset : circumference 
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.2
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  color?: string;
  className?: string;
}

export function MetricCard({
  icon,
  label,
  value,
  suffix = '',
  change,
  changeLabel = '前年比',
  color = 'primary',
  className = ''
}: MetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const colorMap = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    danger: 'from-red-500 to-red-600',
  };

  const gradientClass = colorMap[color as keyof typeof colorMap] || colorMap.primary;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`
        relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100
        ${className}
      `}
    >
      {/* Background gradient */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradientClass} opacity-10 rounded-full transform translate-x-8 -translate-y-8`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="text-3xl"
          >
            {icon}
          </motion.div>
          
          {change && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className={`
                flex items-center text-xs font-medium px-2 py-1 rounded-full
                ${change >= 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }
              `}
            >
              <svg 
                className={`w-3 h-3 mr-1 ${change >= 0 ? 'rotate-0' : 'rotate-180'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l9-9 9 9" />
              </svg>
              {Math.abs(change)}%
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-2"
        >
          <div className="text-3xl font-bold text-gray-900 mb-1">
            <AnimatedCounter 
              end={value} 
              suffix={suffix}
              className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">{label}</div>
          {change && (
            <div className="text-xs text-gray-500 mt-1">{changeLabel}</div>
          )}
        </motion.div>

        {/* Animated progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-gradient-to-r ${gradientClass}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${Math.min(value / 100 * 100, 100)}%` } : {}}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface InteractiveChartProps {
  data: { label: string; value: number; color: string }[];
  type?: 'bar' | 'line' | 'area';
  className?: string;
}

export function InteractiveChart({ data, type = 'bar', className = '' }: InteractiveChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div ref={ref} className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-end justify-between h-64 mb-4">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 200;
          const isHovered = hoveredIndex === index;
          
          return (
            <motion.div
              key={item.label}
              className="flex-1 flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Value tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  y: isHovered ? 0 : 10 
                }}
                className="bg-gray-900 text-white text-xs px-2 py-1 rounded mb-2"
              >
                {item.value.toLocaleString()}
              </motion.div>
              
              {/* Bar */}
              <motion.div
                className="w-8 rounded-t-md relative overflow-hidden"
                style={{ backgroundColor: item.color }}
                initial={{ height: 0 }}
                animate={{ 
                  height: isInView ? height : 0,
                  backgroundColor: isHovered ? item.color : item.color + '88'
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: index * 0.1
                }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.1 + 0.5,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Label */}
              <motion.div
                className="text-xs text-gray-600 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isInView ? 1 : 0, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-700">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Real-time metrics dashboard
export function RealTimeMetrics({ className = '' }: { className?: string }) {
  const [metrics, setMetrics] = useState({
    activeUsers: 127,
    conversions: 23,
    revenue: 2450000,
    avgTime: 3.42
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        conversions: prev.conversions + (Math.random() > 0.8 ? 1 : 0),
        revenue: prev.revenue + Math.floor(Math.random() * 50000),
        avgTime: Math.max(1, prev.avgTime + (Math.random() - 0.5) * 0.1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">リアルタイム指標</h3>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-3 bg-green-500 rounded-full"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            <AnimatedCounter end={metrics.activeUsers} />
          </div>
          <div className="text-xs text-gray-600">現在の訪問者</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            <AnimatedCounter end={metrics.conversions} />
          </div>
          <div className="text-xs text-gray-600">本日のCV</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            <AnimatedCounter end={metrics.revenue} suffix="円" />
          </div>
          <div className="text-xs text-gray-600">本日の売上</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            <AnimatedCounter end={metrics.avgTime} decimals={1} suffix="分" />
          </div>
          <div className="text-xs text-gray-600">平均滞在時間</div>
        </div>
      </div>
    </div>
  );
}