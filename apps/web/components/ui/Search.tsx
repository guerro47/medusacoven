'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from './Dialog';

export interface SearchItem {
  label: string;
  href: string;
  /** Extra matchable text (tagline, synonyms). */
  keywords?: string;
  /** Small right-aligned annotation, e.g. "Coming Soon". */
  badge?: string;
}

interface SearchDialogProps {
  items: SearchItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
}

/**
 * Command-style search over a provided item set. Pure primitive: knows
 * nothing about modules or routes — callers pass the corpus in.
 * ArrowUp/Down + Enter keyboard navigation, substring matching across
 * label + keywords.
 */
export function SearchDialog({
  items,
  open,
  onOpenChange,
  placeholder = 'Search…',
}: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.label} ${item.keywords ?? ''}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [open]);

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault();
      go(results[activeIndex].href);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Search" hideTitle className="top-[20%] translate-y-0 p-0 data-[state=open]:animate-[dialog-fade-in_var(--duration-transition)_var(--ease-cinematic)]">
        <div className="border-b border-gold-line">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[activeIndex] ? `search-item-${activeIndex}` : undefined}
            className="w-full rounded-t-2xl border-0 bg-transparent px-6 py-4 font-body text-[0.98rem] text-bone outline-none placeholder:text-bone-faint"
          />
        </div>
        <ul
          id="search-results"
          ref={listRef}
          role="listbox"
          className="max-h-72 overflow-y-auto p-2"
        >
          {results.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-bone-faint">Nothing matches.</li>
          ) : (
            results.map((item, i) => (
              <li key={`${item.href}::${item.label}`} role="option" aria-selected={i === activeIndex} id={`search-item-${i}`} data-index={i}>
                <button
                  onClick={() => go(item.href)}
                  onMouseMove={() => setActiveIndex(i)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors duration-(--duration-micro) ${
                    i === activeIndex ? 'bg-gold-line text-gold-hi' : 'text-bone-muted'
                  }`}
                >
                  <span className="text-[0.9rem]">{item.label}</span>
                  {item.badge ? (
                    <span className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-bone-faint">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
