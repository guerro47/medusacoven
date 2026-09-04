import type { ReactNode } from 'react';

interface LegalArticleProps {
  title: string;
  version: string;
  effectiveDate: string;
  children: ReactNode;
}

/** Version-stamped legal document shell. One canonical version per policy. */
export function LegalArticle({ title, version, effectiveDate, children }: LegalArticleProps) {
  return (
    <article>
      <header className="mb-10 border-b border-gold-line pb-8">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-wide text-bone">
          {title}
        </h1>
        <p className="mt-3 font-mono text-[0.78rem] tracking-wide text-bone-muted">
          Version {version} · Effective {effectiveDate}
        </p>
      </header>
      <div className="space-y-8 text-[0.95rem] font-light leading-relaxed text-bone-muted [&_b]:font-medium [&_b]:text-bone [&_h2]:font-display [&_h2]:text-base [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-[0.14em] [&_h2]:text-gold [&_li]:ml-5 [&_li]:list-disc [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-gold-hi">
        {children}
      </div>
    </article>
  );
}
