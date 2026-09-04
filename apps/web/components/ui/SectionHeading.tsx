interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, lede, id }: SectionHeadingProps) {
  return (
    <header id={id} className="mb-12 max-w-2xl scroll-mt-24">
      {eyebrow ? (
        <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-bone sm:text-4xl">
        {title}
      </h2>
      {lede ? <p className="mt-4 text-base font-light leading-relaxed text-bone-muted">{lede}</p> : null}
    </header>
  );
}
