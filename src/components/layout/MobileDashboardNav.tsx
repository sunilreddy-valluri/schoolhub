import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalSearchModal } from '../search/GlobalSearchModal';

interface NavItem {
  label: string;
  to: string;
  icon: (props: { className?: string }) => JSX.Element;
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    to: '/dashboard',
    icon: ({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
{
  label: 'Classes',
  to: '/classes',
  icon: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
},
{
  label: 'Assignments',
  to: '/assignments',
  icon: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
},
{
  label: 'Announce',
  to: '/announcements',
  icon: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
},
];

export const MobileDashboardNav: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-2 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
    {navItems.slice(0, 2).map((item) => (
      <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
      `flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors ${
        isActive
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
      }`
      }
      >
      <item.icon className="h-5 w-5" />
      <span>{item.label}</span>
      </NavLink>
    ))}

    {/* Center Search Action Button */}
    <button
    onClick={() => setIsSearchOpen(true)}
    className="flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
    aria-label="Search"
    >
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    </div>
    <span>Search</span>
    </button>

    {navItems.slice(2).map((item) => (
      <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
      `flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition-colors ${
        isActive
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
      }`
      }
      >
      <item.icon className="h-5 w-5" />
      <span>{item.label}</span>
      </NavLink>
    ))}
    </nav>

    {/* Global Search Modal */}
    <GlobalSearchModal
    isOpen={isSearchOpen}
    onClose={() => setIsSearchOpen(false)}
    />
    </>
  );
};
