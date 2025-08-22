'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface UrgencyIndicatorProps {
  type: 'limited-spots' | 'limited-time' | 'high-demand' | 'recent-activity';
  message?: string;
  count?: number;
  className?: string;
}

const urgencyMessages = {
  'limited-spots': [
    '残り3枠のみ - 今月の無料診断',
    '限定5名様 - IPO個別相談',
    '今週の空き枠があと2つだけ',
  ],
  'limited-time': [
    '48時間限定オファー',
    '今月末まで初期費用無料',
    '期間限定：コンサル料金50%OFF',
  ],
  'high-demand': [
    '申し込みが殺到中！',
    '多数のお申込みをいただいています',
    '予想以上のご好評をいただいています',
  ],
  'recent-activity': [
    '5分前: 渋谷区の経営者様が診断を完了',
    '12分前: SaaS企業様がコンサル契約',
    '18分前: 港区のスタートアップ様が相談予約',
  ],
};

export function UrgencyIndicator({ type, message, count, className = '' }: UrgencyIndicatorProps) {
  const [currentMessage, setCurrentMessage] = useState(message || urgencyMessages[type][0]);
  const [isVisible, setIsVisible] = useState(true);
  const [activityCount, setActivityCount] = useState(count || Math.floor(Math.random() * 20) + 5);

  // メッセージのローテーション
  useEffect(() => {
    if (!message && urgencyMessages[type].length > 1) {
      const interval = setInterval(() => {
        setCurrentMessage(prev => {
          const messages = urgencyMessages[type];
          const currentIndex = messages.indexOf(prev);
          return messages[(currentIndex + 1) % messages.length];
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [type, message]);

  // recent-activityの動的更新
  useEffect(() => {
    if (type === 'recent-activity') {
      const interval = setInterval(() => {
        setActivityCount(prev => prev + Math.floor(Math.random() * 3) + 1);
        // ランダムにメッセージを更新
        if (Math.random() > 0.7) {
          const messages = urgencyMessages[type];
          setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
        }
      }, 30000); // 30秒ごと

      return () => clearInterval(interval);
    }
  }, [type]);

  const getIcon = () => {
    switch (type) {
      case 'limited-spots':
        return '⚡';
      case 'limited-time':
        return '⏰';
      case 'high-demand':
        return '🔥';
      case 'recent-activity':
        return '👥';
      default:
        return '⚠️';
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'limited-spots':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'limited-time':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'high-demand':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'recent-activity':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`
            inline-flex items-center gap-3 px-4 py-3 rounded-lg border shadow-sm
            ${getVariant()} ${className}
          `}
        >
          <motion.span
            animate={{ 
              rotate: type === 'high-demand' ? [0, -10, 10, 0] : 0,
              scale: type === 'limited-time' ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              duration: type === 'high-demand' ? 0.5 : 2, 
              repeat: Infinity,
              repeatDelay: type === 'high-demand' ? 2 : 0
            }}
            className="text-lg"
          >
            {getIcon()}
          </motion.span>
          
          <motion.span
            key={currentMessage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="font-medium text-sm"
          >
            {currentMessage}
          </motion.span>

          {type === 'recent-activity' && (
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="px-2 py-1 bg-white/80 rounded-full text-xs font-bold"
            >
              +{activityCount}人
            </motion.span>
          )}

          {(type === 'limited-spots' || type === 'limited-time') && (
            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 text-current opacity-50 hover:opacity-80 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 社会的証明コンポーネント
export function SocialProof({ className = '' }: { className?: string }) {
  const [recentActions, setRecentActions] = useState([
    { action: '診断完了', location: '渋谷区', time: 5 },
    { action: 'コンサル契約', location: '港区', time: 12 },
    { action: '相談予約', location: '新宿区', time: 18 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentActions(prev => {
        const newAction = {
          action: ['診断完了', 'コンサル契約', '相談予約'][Math.floor(Math.random() * 3)],
          location: ['渋谷区', '港区', '新宿区', '品川区', '中央区'][Math.floor(Math.random() * 5)],
          time: Math.floor(Math.random() * 30) + 1,
        };
        
        return [newAction, ...prev.slice(0, 2)];
      });
    }, 45000); // 45秒ごと

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-500 rounded-full"
        />
        <span className="font-semibold text-sm text-gray-800">リアルタイム活動</span>
      </div>
      
      <AnimatePresence mode="popLayout">
        {recentActions.map((action, index) => (
          <motion.div
            key={`${action.location}-${action.time}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="text-xs text-gray-600 mb-1 last:mb-0"
          >
            <span className="font-medium">{action.time}分前:</span>
            <span className="ml-1">{action.location}の経営者様が{action.action}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// FOMO (Fear of Missing Out) コンポーネント
export function FOMOAlert({ className = '' }: { className?: string }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 42, seconds: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // リセット
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            className="text-xl"
          >
            🚨
          </motion.span>
          <div>
            <div className="font-bold text-sm">限定オファー終了まで</div>
            <div className="text-xs opacity-90">初期費用完全無料</div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 font-mono font-bold">
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-white/20 rounded px-2 py-1 text-xs"
          >
            {String(timeLeft.hours).padStart(2, '0')}
          </motion.span>
          <span className="text-xs">:</span>
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="bg-white/20 rounded px-2 py-1 text-xs"
          >
            {String(timeLeft.minutes).padStart(2, '0')}
          </motion.span>
          <span className="text-xs">:</span>
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="bg-white/20 rounded px-2 py-1 text-xs"
          >
            {String(timeLeft.seconds).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}