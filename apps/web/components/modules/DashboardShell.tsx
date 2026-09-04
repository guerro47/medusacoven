'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, DialogTrigger, SheetContent } from '@/components/ui/Dialog';
import { Badge } from '@/components/ui/Badge';
import type { Role } from '@/lib/stytch';

/**
 * Post-auth dashboard shell (modular monolith). Module surfaces mount
 * into the nav as their entitlements go live; locked modules render
 * honestly as "Beta" rather than pretending to work.
 */

interface ModuleLink {
  href: string;
  label: string;
  entitlement: string;
}

const MODULE_LINKS: ModuleLink[] = [
  { href: '/dashboard', label: 'Overview', entitlement: '' },
  { href: '/dashboard/access-pass', label: 'Access Pass', entitlement: 'access-pass' },
  { href: '/dashboard/drops', label: 'Drops', entitlement: 'drops' },
  { href: '/dashboard/tips', label: 'Tips', entitlement: 'tips' },
];

interface DashboardShellProps {
  role: Role;
  entitlements: string[];
  children: ReactNode;
}

function ModuleNav({ role, entitlements }: { role: Role; entitlements: string[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Modules" className="flex h-full flex-col">
      <Link
        href="/"
        className="font-display text-[13px] font-extrabold uppercase tracking-[0.34em] text-bone"
      >
        MEDUSA<span className="text-gold">ELITE</span>
      </Link>

      <ul className="mt-8 flex flex-col gap-1">
        {MODULE_LINKS.map(({ href, label, entitlement }) => {
          const unlocked = entitlement === '' || entitlements.includes(entitlement);
          const active = pathname === href;
          return (
            <li key={href}>
              {unlocked ? (
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-colors duration-(--duration-micro) ${
                    active ? 'bg-gold-line text-gold' : 'text-bone-muted hover:bg-gold-line/50 hover:text-bone'
                  }`}
                >
                  {label}
                </Link>
              ) : (
                <span className="flex items-center justify-between rounded-xl px-4 py-3 text-[0.8rem] font-medium uppercase tracking-[0.16em] text-bone-faint">
                  {label}
                  <span className="text-[0.58rem] tracking-[0.2em]">Beta</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto border-t border-gold-line pt-5">
        <Badge tone="muted">{role}</Badge>
        <p className="mt-3 text-[0.7rem] leading-relaxed text-bone-faint">
          Founding beta. Module surfaces unlock as entitlements go live.
        </p>
      </div>
    </nav>
  );
}

export function DashboardShell({ role, entitlements, children }: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="relative z-10 flex min-h-svh">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-gold-line/60 p-6 lg:block">
        <ModuleNav role={role} entitlements={entitlements} />
      </aside>

      {/* Mobile: sheet-based nav */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-4 border-b border-gold-line/60 px-6 py-4 lg:hidden">
          <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <DialogTrigger
              aria-label="Open module navigation"
              className="rounded-lg border border-gold-line px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-bone-muted"
            >
              Modules
            </DialogTrigger>
            <SheetContent title="Modules" hideTitle side="left" className="flex flex-col">
              <ModuleNav role={role} entitlements={entitlements} />
            </SheetContent>
          </Dialog>
          <span className="font-display text-[12px] font-extrabold uppercase tracking-[0.3em] text-bone">
            MEDUSA<span className="text-gold">ELITE</span>
          </span>
        </header>
        <main className="flex-1 px-6 py-10 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
