'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function FloatingCard({ children, className = '', intensity = 15 }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `${-intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`${-intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({ 
  children, 
  className = '', 
  strength = 50,
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < strength * 2) {
        const force = (strength * 2 - distance) / (strength * 2);
        const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        
        x.set(Math.cos(angleRad) * force * strength);
        y.set(Math.sin(angleRad) * force * strength);
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, strength, x, y]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative transform-gpu ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      
      {/* Magnetic field visualization */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="w-full h-full rounded-full border-2 border-primary-500 animate-ping" />
        </motion.div>
      )}
    </motion.button>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({ children, speed = 0.5, className = '' }: ParallaxScrollProps) {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`transform-gpu ${className}`}
      style={{
        y: scrollY * speed
      }}
    >
      {children}
    </motion.div>
  );
}

interface MorphingShapeProps {
  className?: string;
  color?: string;
}

export function MorphingShape({ className = '', color = '#D63E6C' }: MorphingShapeProps) {
  const shapes = [
    'M20,20 L20,80 L80,80 L80,20 Z', // Square
    'M50,20 L80,80 L20,80 Z', // Triangle  
    'M50,20 A30,30 0 1,1 49,20 Z', // Circle
    'M20,50 Q20,20 50,20 Q80,20 80,50 Q80,80 50,80 Q20,80 20,50 Z', // Rounded square
  ];

  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [shapes.length]);

  return (
    <div className={`w-24 h-24 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={shapes[currentShape]}
          fill={color}
          initial={false}
          animate={{ d: shapes[currentShape] }}
          transition={{ 
            duration: 1,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

interface GlowingOrbProps {
  size?: number;
  color?: string;
  intensity?: number;
  className?: string;
}

export function GlowingOrb({ 
  size = 100, 
  color = '#D63E6C',
  intensity = 0.8,
  className = ''
}: GlowingOrbProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
          filter: 'blur(10px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          backgroundColor: color,
          filter: 'blur(5px)'
        }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div
        className="absolute inset-4 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 ${size / 2}px ${color}66`
        }}
      />
    </div>
  );
}

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
}

export function LiquidButton({ 
  children, 
  onClick, 
  className = '',
  color = '#D63E6C'
}: LiquidButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 ${className}`}
      style={{ backgroundColor: color }}
    >
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Liquid effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `linear-gradient(45deg, ${color}dd, ${color}ff)`,
          transform: 'scale(0)'
        }}
        animate={isClicked ? {
          scale: [0, 1.5, 0],
          rotate: [0, 180, 360]
        } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </button>
  );
}

// Particle system
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function ParticleField({ 
  count = 50, 
  className = '',
  colors = ['#D63E6C', '#0F766E', '#0A2540']
}: { 
  count?: number; 
  className?: string;
  colors?: string[];
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const initialParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 100,
      maxLife: 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.vx;
        const newY = particle.y + particle.vy;
        
        return {
          ...particle,
          x: newX > rect.width || newX < 0 ? Math.random() * rect.width : newX,
          y: newY > rect.height || newY < 0 ? Math.random() * rect.height : newY,
          life: particle.life > 0 ? particle.life - 1 : particle.maxLife
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [count, colors]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
            opacity: particle.life / particle.maxLife
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}