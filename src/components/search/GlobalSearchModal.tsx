import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAll, SearchResultItem } from '../../utils/searchData';

interface GlobalSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const searchResults = useMemo(() => searchAll(query), [query]);

    // Flattened array for keyboard arrow navigation
    const flatResults = useMemo(() => {
        return [
            ...searchResults.students,
            ...searchResults.teachers,
            ...searchResults.classes,
            ...searchResults.assignments,
            ...searchResults.announcements
        ];
    }, [searchResults]);

    const totalResults = flatResults.length;

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setSelectedIndex(0);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleSelect = (item: SearchResultItem) => {
        onClose();
        navigate(item.path);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < totalResults - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalResults - 1));
        } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
            e.preventDefault();
            handleSelect(flatResults[selectedIndex]);
        }
    };

    if (!isOpen) return null;

    return (
        <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 bg-slate-900/50 backdrop-blur-sm p-4"
        onClick={onClose}
        >
        <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <svg className="w-5 h-5 text-slate-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
        ref={inputRef}
        type="text"
        className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none text-base sm:text-lg"
        placeholder="Search students, teachers, classes, assignments..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <button
        onClick={onClose}
        className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-200"
        >
        ESC
        </button>
        </div>

        {/* Results / Empty States */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
        {!query.trim() && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            <p className="text-sm font-medium">Quick search anything across SchoolHub</p>
            <p className="text-xs mt-1 text-slate-400">Search by student name, teacher, course, class, or announcement</p>
            </div>
        )}

        {query.trim() && totalResults === 0 && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
            <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
            <p className="text-xs mt-1 text-slate-400">Try checking for typos or searching a different term</p>
            </div>
        )}

        {query.trim() && totalResults > 0 && (
            <>
            {Object.entries(searchResults).map(([category, items]) => {
                if (items.length === 0) return null;
                return (
                    <div key={category} className="space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
                    {items[0].categoryLabel}
                    </h3>
                    <div className="space-y-1">
                    {items.map((item: SearchResultItem) => {
                        const itemIndex = flatResults.findIndex((r) => r.id === item.id && r.category === item.category);
                        const isSelected = itemIndex === selectedIndex;
                        return (
                            <div
                            key={`${item.category}-${item.id}`}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(itemIndex)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                                isSelected
                                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200'
                            }`}
                            >
                            <div>
                            <div className="font-medium text-sm">{item.title}</div>
                            {item.subtitle && <div className="text-xs text-slate-400">{item.subtitle}</div>}
                            </div>
                            <span className="text-xs text-slate-400 capitalize">{item.category}</span>
                            </div>
                        );
                    })}
                    </div>
                    </div>
                );
            })}
            </>
        )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
        <span>Navigate: <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 rounded border">↑</kbd> <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 rounded border">↓</kbd></span>
        <span>Select: <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 rounded border">↵</kbd></span>
        </div>
        <span>Close: <kbd className="px-1 py-0.5 bg-white dark:bg-slate-700 rounded border">ESC</kbd></span>
        </div>
        </div>
        </div>
    );
};
