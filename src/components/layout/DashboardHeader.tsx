import React, { useState, useEffect } from 'react';
import { GlobalSearchModal } from '../search/GlobalSearchModal';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  onMenuClick,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/95 sm:px-6">
    {/* Left: Mobile Toggle & Page Title */}
    <div className="flex items-center gap-3">
    {onMenuClick && (
      <button
      onClick={onMenuClick}
      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
      aria-label="Open Sidebar"
      >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      </button>
    )}

    {title && (
      <div>
      <h1 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
      {title}
      </h1>
      {subtitle && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
        {subtitle}
        </p>
      )}
      </div>
    )}
    </div>

    {/* Center/Right: Global Search Bar & Actions */}
    <div className="flex items-center gap-2 sm:gap-4">
    <button
    onClick={() => setIsSearchOpen(true)}
    className="flex h-9 w-full max-w-[200px] sm:max-w-xs items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800"
    aria-label="Open global search"
    >
    <span className="flex items-center gap-2 truncate">
    <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span className="truncate">Search SchoolHub...</span>
    </span>
    <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] text-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    ⌘K
    </kbd>
    </button>

    {/* Quick Notification Bell */}
    <button
    className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
    aria-label="Notifications"
    >
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
    </button>
    </div>
    </header>

    {/* Mount Modal */}
    <GlobalSearchModal
    isOpen={isSearchOpen}
    onClose={() => setIsSearchOpen(false)}
    />
    </>
  );
};
