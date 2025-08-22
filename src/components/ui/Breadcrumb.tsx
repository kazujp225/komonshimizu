'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: 'slash' | 'chevron' | 'arrow' | 'dot';
  className?: string;
}

export function Breadcrumb({ items, separator = 'chevron', className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  const separators = {
    slash: (
      <span className="text-gray-400 mx-2">/</span>
    ),
    chevron: (
      <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    arrow: (
      <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    ),
    dot: (
      <span className="text-gray-400 mx-2">•</span>
    ),
  };

  return (
    <nav className={cn('flex items-center text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className={cn(
                  'flex items-center',
                  isLast ? 'text-gray-900 font-medium' : 'text-gray-600'
                )}>
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              )}
              {!isLast && separators[separator]}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'ホーム',
      href: '/',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: formatSegmentLabel(segment),
      href: index === segments.length - 1 ? undefined : currentPath,
    });
  });

  return breadcrumbs;
}

// Format segment labels
function formatSegmentLabel(segment: string): string {
  const labelMap: Record<string, string> = {
    'assessment': '5分診断',
    'pricing': '料金プラン',
    'case-studies': '成功事例',
    'blog': 'ブログ',
    'about': '会社概要',
    'contact': 'お問い合わせ',
    'dashboard': 'ダッシュボード',
    'terms': '利用規約',
    'privacy': 'プライバシーポリシー',
  };

  return labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
}

// Breadcrumb with dropdown for long paths
interface BreadcrumbWithDropdownProps extends BreadcrumbProps {
  maxItems?: number;
}

export function BreadcrumbWithDropdown({
  items,
  maxItems = 3,
  separator = 'chevron',
  className,
}: BreadcrumbWithDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  if (breadcrumbItems.length <= maxItems) {
    return <Breadcrumb items={breadcrumbItems} separator={separator} className={className} />;
  }

  const firstItem = breadcrumbItems[0];
  const lastItems = breadcrumbItems.slice(-2);
  const hiddenItems = breadcrumbItems.slice(1, -2);

  return (
    <nav className={cn('flex items-center text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center">
        {/* First item */}
        <li className="flex items-center">
          <Link
            href={firstItem.href || '/'}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            {firstItem.icon && <span className="mr-1">{firstItem.icon}</span>}
            <span>{firstItem.label}</span>
          </Link>
          <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>

        {/* Dropdown for hidden items */}
        <li className="relative flex items-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-600 hover:text-primary-600 transition-colors px-2 py-1 rounded hover:bg-gray-100"
          >
            ...
          </button>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >
              {hiddenItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href || '#'}
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
          <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>

        {/* Last items */}
        {lastItems.map((item, index) => {
          const isLast = index === lastItems.length - 1;
          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(
                  isLast ? 'text-gray-900 font-medium' : 'text-gray-600'
                )}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <svg className="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}