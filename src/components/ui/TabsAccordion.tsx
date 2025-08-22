'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Tabs Component
interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Tabs({
  items,
  defaultTab,
  variant = 'default',
  orientation = 'horizontal',
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);
  const isHorizontal = orientation === 'horizontal';

  const variantClasses = {
    default: {
      list: 'border-b border-gray-200',
      tab: 'px-4 py-2 -mb-px border-b-2',
      active: 'border-primary-600 text-primary-600',
      inactive: 'border-transparent text-gray-600 hover:text-gray-900',
    },
    pills: {
      list: 'bg-gray-100 p-1 rounded-lg',
      tab: 'px-4 py-2 rounded-md',
      active: 'bg-white text-primary-600 shadow',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
    underline: {
      list: '',
      tab: 'px-4 py-2 relative',
      active: 'text-primary-600',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
  };

  const styles = variantClasses[variant];

  return (
    <div className={cn('', className)}>
      {/* Tab List */}
      <div
        className={cn(
          'flex',
          isHorizontal ? 'flex-row' : 'flex-col',
          styles.list
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && setActiveTab(item.id)}
            disabled={item.disabled}
            className={cn(
              'flex items-center space-x-2 transition-colors',
              styles.tab,
              activeTab === item.id ? styles.active : styles.inactive,
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
            {variant === 'underline' && activeTab === item.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                layoutId="underline"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {items.map((item) =>
            activeTab === item.id ? (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {item.content}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Accordion Component
interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  variant?: 'default' | 'bordered' | 'separated';
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  variant = 'default',
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(id) ? [] : [id]
      );
    }
  };

  const variantClasses = {
    default: 'divide-y divide-gray-200',
    bordered: 'border border-gray-200 rounded-lg divide-y divide-gray-200',
    separated: 'space-y-4',
  };

  const itemClasses = {
    default: '',
    bordered: 'first:rounded-t-lg last:rounded-b-lg',
    separated: 'border border-gray-200 rounded-lg',
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div
            key={item.id}
            className={cn(itemClasses[variant])}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                'w-full px-4 py-4 flex items-center justify-between text-left',
                'hover:bg-gray-50 transition-colors',
                variant === 'separated' && 'rounded-t-lg'
              )}
            >
              <div className="flex items-center space-x-3">
                {item.icon && <span>{item.icon}</span>}
                <span className="font-medium text-gray-900">
                  {item.title}
                </span>
              </div>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={cn(
                    'px-4 py-4 text-gray-600',
                    variant === 'separated' && 'border-t border-gray-200'
                  )}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// Collapsible Component
interface CollapsibleProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  className,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('border border-gray-200 rounded-lg', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-t-lg"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 border-t border-gray-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}