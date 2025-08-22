'use client';

import { motion, useAnimation, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// 高度なスクロール連動アニメーション
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '' 
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  const variants = {
    up: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -60 },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -10 },
      visible: { opacity: 1, rotate: 0 }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[direction]}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// パララックス効果付きコンテナ
interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxContainer({ children, speed = 0.5, className = '' }: ParallaxContainerProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -speed * 1000]);

  return (
    <motion.div
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 複雑なステージングアニメーション
interface StaggeredAnimationProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function StaggeredAnimation({ children, staggerDelay = 0.1, className = '' }: StaggeredAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// 弾性アニメーション
interface ElasticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  intensity?: number;
}

export function ElasticButton({ children, onClick, className = '', intensity = 1.1 }: ElasticButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ 
        scale: intensity,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// 波紋効果
interface RippleEffectProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  rippleColor?: string;
}

export function RippleEffect({ children, onClick, className = '', rippleColor = 'rgba(255, 255, 255, 0.6)' }: RippleEffectProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);
    
    // 1秒後にリップルを削除
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);

    onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'absolute',
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
              borderRadius: '50%',
              backgroundColor: rippleColor,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

// 文字のタイプライター効果
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 50, delay = 0, className = '', onComplete }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(delayTimer);
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex));
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex > text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex <= text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-current ml-1"
        />
      )}
    </span>
  );
}

// 3D カードフリップ
interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export function FlipCard({ frontContent, backContent, className = '' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`perspective-1000 ${className}`} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  );
}

// 複雑なパスアニメーション
interface AnimatedPathProps {
  pathData: string;
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  duration?: number;
}

export function AnimatedPath({ 
  pathData, 
  className = '', 
  strokeWidth = 2, 
  strokeColor = '#D63E6C',
  fillColor = 'transparent',
  duration = 2 
}: AnimatedPathProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const isInView = useInView(pathRef, { once: true });
  
  useEffect(() => {
    if (isInView && pathRef.current) {
      const path = pathRef.current;
      const pathLength = path.getTotalLength();
      
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength}`;
    }
  }, [isInView]);

  return (
    <svg className={className} viewBox="0 0 100 100">
      <motion.path
        ref={pathRef}
        d={pathData}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fillColor}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration, ease: "easeInOut" }}
      />
    </svg>
  );
}

// スプリングアニメーション付きカウンター
interface SpringCounterProps {
  target: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function SpringCounter({ target, duration = 2, className = '', suffix = '', prefix = '' }: SpringCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(target);
    }
  }, [isInView, target, springValue]);

  useEffect(() => {
    return springValue.onChange(latest => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// 複数段階のホバー効果
interface MultiStageHoverProps {
  children: React.ReactNode;
  className?: string;
}

export function MultiStageHover({ children, className = '' }: MultiStageHoverProps) {
  const [hoverStage, setHoverStage] = useState(0);

  const variants = {
    stage0: { scale: 1, rotateZ: 0, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" },
    stage1: { scale: 1.02, rotateZ: 0.5, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" },
    stage2: { scale: 1.05, rotateZ: 1, boxShadow: "0 12px 24px rgba(0,0,0,0.3)" },
    stage3: { scale: 1.08, rotateZ: 0, boxShadow: "0 16px 32px rgba(0,0,0,0.4)" }
  };

  useEffect(() => {
    if (hoverStage > 0) {
      const timer = setTimeout(() => {
        setHoverStage(prev => prev < 3 ? prev + 1 : prev);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [hoverStage]);

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setHoverStage(1)}
      onMouseLeave={() => setHoverStage(0)}
      animate={`stage${hoverStage}` as keyof typeof variants}
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// ジェスチャー認識付きスワイプ
interface SwipeableProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  className?: string;
}

export function Swipeable({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  className = '' 
}: SwipeableProps) {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDragEnd = (event: any, info: any) => {
    const { offset } = info;
    const swipeThreshold = 50;

    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // 横方向のスワイプ
      if (offset.x > swipeThreshold && onSwipeRight) {
        onSwipeRight();
      } else if (offset.x < -swipeThreshold && onSwipeLeft) {
        onSwipeLeft();
      }
    } else {
      // 縦方向のスワイプ
      if (offset.y > swipeThreshold && onSwipeDown) {
        onSwipeDown();
      } else if (offset.y < -swipeThreshold && onSwipeUp) {
        onSwipeUp();
      }
    }
  };

  return (
    <motion.div
      className={className}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragStart={(event, info) => {
        setDragStart({ x: info.point.x, y: info.point.y });
      }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 0.95, rotate: 2 }}
    >
      {children}
    </motion.div>
  );
}