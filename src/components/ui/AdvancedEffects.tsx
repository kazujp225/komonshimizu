'use client';

import { motion, useAnimation, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

// 高度なパーティクルシステム
interface AdvancedParticleSystemProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
  interactive?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  gravity: number;
  bounce: number;
}

export function AdvancedParticleSystem({ 
  particleCount = 100, 
  colors = ['#D63E6C', '#0F766E', '#0A2540'],
  className = '',
  interactive = true 
}: AdvancedParticleSystemProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // パーティクル初期化
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const initialParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 200 + 100,
      maxLife: 300,
      gravity: Math.random() * 0.02 + 0.01,
      bounce: Math.random() * 0.8 + 0.2
    }));

    setParticles(initialParticles);
  }, [particleCount, colors]);

  // アニメーションループ
  useEffect(() => {
    if (!containerRef.current || particles.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, vx, vy, life, gravity } = particle;

          // マウスとの相互作用
          if (interactive) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const force = (100 - distance) / 100;
              vx += (dx / distance) * force * 0.1;
              vy += (dy / distance) * force * 0.1;
            }
          }

          // 重力と移動
          vy += gravity;
          x += vx;
          y += vy;

          // 境界での跳ね返り
          if (x <= 0 || x >= rect.width) {
            vx *= -particle.bounce;
            x = Math.max(0, Math.min(rect.width, x));
          }
          if (y <= 0 || y >= rect.height) {
            vy *= -particle.bounce;
            y = Math.max(0, Math.min(rect.height, y));
          }

          // 摩擦
          vx *= 0.99;
          vy *= 0.99;

          // ライフサイクル
          life -= 1;
          if (life <= 0) {
            return {
              ...particle,
              x: Math.random() * rect.width,
              y: Math.random() * rect.height,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: particle.maxLife,
              color: colors[Math.floor(Math.random() * colors.length)]
            };
          }

          return { ...particle, x, y, vx, vy, life };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles.length, mousePos, interactive, colors]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      onMouseMove={handleMouseMove}
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
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

// グラディエント波アニメーション
interface WaveBackgroundProps {
  colors?: string[];
  speed?: number;
  amplitude?: number;
  className?: string;
}

export function WaveBackground({ 
  colors = ['#D63E6C', '#0F766E', '#0A2540'],
  speed = 0.02,
  amplitude = 50,
  className = ''
}: WaveBackgroundProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + speed);
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  const createWavePath = (offset: number, frequency: number) => {
    const points = [];
    for (let x = 0; x <= 100; x += 2) {
      const y = 50 + Math.sin((x * frequency + time + offset) * Math.PI / 180) * amplitude / 2;
      points.push(`${x},${y}`);
    }
    return `M0,100 L${points.join(' L')} L100,100 Z`;
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors[1]} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[1]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors[2] || colors[0]} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        <motion.path
          d={createWavePath(0, 0.02)}
          fill="url(#wave-gradient-1)"
          animate={{ d: createWavePath(time, 0.02) }}
          transition={{ duration: 0 }}
        />
        
        <motion.path
          d={createWavePath(90, 0.015)}
          fill="url(#wave-gradient-2)"
          animate={{ d: createWavePath(time + 90, 0.015) }}
          transition={{ duration: 0 }}
        />
      </svg>
    </div>
  );
}

// 幾何学パターン生成器
interface GeometricPatternProps {
  pattern: 'hexagon' | 'triangle' | 'circle' | 'diamond';
  size?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
  className?: string;
  animated?: boolean;
}

export function GeometricPattern({ 
  pattern,
  size = 20,
  spacing = 40,
  color = '#D63E6C',
  opacity = 0.1,
  className = '',
  animated = true
}: GeometricPatternProps) {
  const patterns = {
    hexagon: (
      <polygon 
        points="10,0 20,6 20,14 10,20 0,14 0,6"
        fill={color}
        opacity={opacity}
      />
    ),
    triangle: (
      <polygon 
        points="10,0 20,17 0,17"
        fill={color}
        opacity={opacity}
      />
    ),
    circle: (
      <circle 
        cx="10" 
        cy="10" 
        r="8"
        fill={color}
        opacity={opacity}
      />
    ),
    diamond: (
      <polygon 
        points="10,0 20,10 10,20 0,10"
        fill={color}
        opacity={opacity}
      />
    )
  };

  const rows = Math.ceil(window.innerHeight / spacing) + 1;
  const cols = Math.ceil(window.innerWidth / spacing) + 1;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => (
            <motion.g
              key={`${row}-${col}`}
              transform={`translate(${col * spacing}, ${row * spacing})`}
              animate={animated ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                opacity: [opacity, opacity * 1.5, opacity]
              } : {}}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: (row + col) * 0.1,
                ease: "easeInOut"
              }}
            >
              {patterns[pattern]}
            </motion.g>
          ))
        )}
      </svg>
    </div>
  );
}

// 高度なローディングアニメーション
interface AdvancedLoaderProps {
  type?: 'spiral' | 'morphing' | 'particles' | 'wave';
  size?: number;
  color?: string;
  className?: string;
}

export function AdvancedLoader({ 
  type = 'spiral',
  size = 80,
  color = '#D63E6C',
  className = ''
}: AdvancedLoaderProps) {
  const loaders = {
    spiral: (
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: color,
              left: '50%',
              top: '50%',
              transformOrigin: `0 ${size / 2}px`,
              transform: `rotate(${i * 30}deg) translateY(-${size / 2}px)`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    ),
    
    morphing: (
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color
        }}
        animate={{
          borderRadius: [
            "50% 50% 50% 50%",
            "50% 20% 50% 20%",
            "20% 50% 20% 50%",
            "50% 50% 50% 50%"
          ],
          rotate: [0, 180, 360],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ),
    
    particles: (
      <div className="relative" style={{ width: size, height: size }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * Math.PI / 4) * size / 2],
              y: [0, Math.sin(i * Math.PI / 4) * size / 2],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    ),
    
    wave: (
      <div className="flex items-end justify-center space-x-1" style={{ height: size }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              height: [size * 0.2, size * 0.8, size * 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loaders[type]}
    </div>
  );
}

// インタラクティブなライティング効果
interface InteractiveLightingProps {
  children: React.ReactNode;
  lightColor?: string;
  intensity?: number;
  className?: string;
}

export function InteractiveLighting({ 
  children, 
  lightColor = '#ffffff',
  intensity = 0.3,
  className = ''
}: InteractiveLightingProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const lightStyle = {
    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${lightColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
    pointerEvents: 'none' as const,
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={lightStyle}
      />
    </div>
  );
}

// 複雑なクリッピングパス効果
interface ClippingPathEffectProps {
  children: React.ReactNode;
  shape?: 'circle' | 'polygon' | 'wave' | 'custom';
  customPath?: string;
  animated?: boolean;
  className?: string;
}

export function ClippingPathEffect({ 
  children, 
  shape = 'circle',
  customPath,
  animated = true,
  className = ''
}: ClippingPathEffectProps) {
  const [clipPath, setClipPath] = useState('');

  const shapes = {
    circle: [
      'circle(0% at 50% 50%)',
      'circle(50% at 50% 50%)',
      'circle(70% at 50% 50%)'
    ],
    polygon: [
      'polygon(0% 0%, 0% 0%, 0% 0%)',
      'polygon(0% 0%, 100% 0%, 50% 100%)',
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    ],
    wave: [
      'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      'polygon(0% 80%, 25% 60%, 50% 80%, 75% 60%, 100% 80%, 100% 100%, 0% 100%)',
      'polygon(0% 0%, 25% 20%, 50% 0%, 75% 20%, 100% 0%, 100% 100%, 0% 100%)'
    ]
  };

  useEffect(() => {
    if (customPath) {
      setClipPath(customPath);
      return;
    }

    const currentShapes = shapes[shape];
    let index = 0;

    const interval = setInterval(() => {
      if (animated) {
        setClipPath(currentShapes[index]);
        index = (index + 1) % currentShapes.length;
      } else {
        setClipPath(currentShapes[currentShapes.length - 1]);
        clearInterval(interval);
      }
    }, animated ? 1000 : 0);

    return () => clearInterval(interval);
  }, [shape, customPath, animated]);

  return (
    <div
      className={className}
      style={{
        clipPath: clipPath,
        transition: animated ? 'clip-path 0.8s ease-in-out' : 'none'
      }}
    >
      {children}
    </div>
  );
}

// データフロー可視化
interface DataFlowVisualizationProps {
  nodes: Array<{ id: string; x: number; y: number; label: string }>;
  connections: Array<{ from: string; to: string }>;
  className?: string;
}

export function DataFlowVisualization({ nodes, connections, className = '' }: DataFlowVisualizationProps) {
  const [animatedConnections, setAnimatedConnections] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedConnections(prev => {
        const next = [...prev];
        const randomConnection = connections[Math.floor(Math.random() * connections.length)];
        const connectionId = `${randomConnection.from}-${randomConnection.to}`;
        
        if (!next.includes(connectionId)) {
          next.push(connectionId);
          // 2秒後に削除
          setTimeout(() => {
            setAnimatedConnections(current => current.filter(id => id !== connectionId));
          }, 2000);
        }
        
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [connections]);

  return (
    <div className={`relative ${className}`}>
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(connection => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          const connectionId = `${connection.from}-${connection.to}`;
          const isAnimated = animatedConnections.includes(connectionId);
          
          return (
            <motion.line
              key={connectionId}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="#D63E6C"
              strokeWidth={isAnimated ? 3 : 1}
              strokeDasharray="5,5"
              opacity={isAnimated ? 1 : 0.3}
              animate={isAnimated ? {
                strokeDashoffset: [0, -20],
                opacity: [0.3, 1, 0.3]
              } : {}}
              transition={{
                strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, ease: "easeInOut" }
              }}
            />
          );
        })}
      </svg>
      
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-lg"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 4px 8px rgba(214, 62, 108, 0.3)",
              "0 8px 16px rgba(214, 62, 108, 0.5)",
              "0 4px 8px rgba(214, 62, 108, 0.3)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        >
          {node.label}
        </motion.div>
      ))}
    </div>
  );
}