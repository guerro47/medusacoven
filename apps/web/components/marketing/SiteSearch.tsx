'use client';

import { useEffect, useMemo, useState } from 'react';
import { SearchDialog, type SearchItem } from '@/components/ui/Search';
import { MVP_MODULES, ROADMAP_MODULES } from '@/lib/modules';

/** Marketing-surface search: pages + modules, ⌘K / Ctrl+K to open. */
export function SiteSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = useMemo<SearchItem[]>(
    () => [
      { label: 'Home', href: '/', keywords: 'hero waitlist empire fan graph' },
      ...MVP_MODULES.map((m) => ({
        label: m.name,
        href: `/${m.slug}`,
        keywords: `${m.tagline} ${m.description}`,
        badge: 'Launch module',
      })),
      { label: 'Roadmap', href: '/roadmap', keywords: 'coming soon future modules' },
      ...ROADMAP_MODULES.map((m) => ({
        label: m.name,
        href: `/roadmap#${m.slug}`,
        keywords: `${m.tagline} ${m.description}`,
        badge: 'Coming Soon',
      })),
      { label: 'Join the waitlist', href: '/#waitlist', keywords: 'reserve handle signup email' },
      { label: 'Privacy Policy', href: '/privacy', keywords: 'gdpr pecr data legal' },
      { label: 'Terms of Service', href: '/terms', keywords: 'legal conditions' },
      { label: 'Acceptable Use & 18+', href: '/acceptable-use', keywords: 'adults rules conduct legal' },
      { label: 'Cookie Policy', href: '/cookies', keywords: 'consent essential legal' },
    ],
    [],
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search (Cmd+K)"
        className="hidden items-center gap-2 rounded-full border border-gold-line px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-bone-muted transition-colors duration-(--duration-micro) hover:border-gold-dim hover:text-bone sm:flex"
      >
        Search
        <kbd className="font-mono text-[0.6rem] text-bone-faint">⌘K</kbd>
      </button>
      <SearchDialog items={items} open={open} onOpenChange={setOpen} placeholder="Search MedusaElite…" />
    </>
  );
}
