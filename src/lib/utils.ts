import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency: string = 'JPY'): string {
  // Use a consistent format to avoid hydration issues
  // For large amounts, use 万/億 units for better readability
  if (amount >= 100000000) {
    // 1億円以上
    const oku = Math.floor(amount / 100000000);
    const remainder = amount % 100000000;
    if (remainder === 0) {
      return `${oku}億円`;
    }
    const man = Math.floor(remainder / 10000);
    if (man > 0) {
      return `${oku}億${man.toLocaleString('ja-JP')}万円`;
    }
    return `${oku}億円`;
  } else if (amount >= 10000000) {
    // 1000万円以上
    const man = Math.floor(amount / 10000);
    return `${man.toLocaleString('ja-JP')}万円`;
  } else if (amount >= 10000) {
    // 1万円以上
    const man = Math.floor(amount / 10000);
    const remainder = amount % 10000;
    if (remainder === 0) {
      return `${man}万円`;
    }
    return `${man}.${Math.floor(remainder / 1000)}万円`;
  }
  // 1万円未満
  return `¥${amount.toLocaleString('ja-JP')}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + '億';
  }
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '億';
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString('ja-JP');
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function calculateDaysDiff(startDate: string, endDate: string = new Date().toISOString()): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getColorForScore(score: number): string {
  if (score >= 85) return '#10B981'; // champion - green
  if (score >= 70) return '#3B82F6'; // rising star - blue
  if (score >= 55) return '#F59E0B'; // potential - amber
  if (score >= 40) return '#8B5CF6'; // developer - purple
  return '#EF4444'; // starter - red
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 70) return 'bg-blue-500';
  if (percentage >= 50) return 'bg-yellow-500';
  if (percentage >= 30) return 'bg-orange-500';
  return 'bg-red-500';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}