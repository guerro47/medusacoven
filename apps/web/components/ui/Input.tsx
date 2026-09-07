import type { InputHTMLAttributes, ReactNode } from 'react';

export interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** Static text rendered before the input, e.g. a handle prefix. */
  prefix?: ReactNode;
}

export function Field({ prefix, className = '', ...props }: FieldProps) {
  return (
    <div
      className={`flex items-center rounded-[14px] border border-gold-line bg-ink-elevated transition-colors duration-(--duration-transition) focus-within:border-gold/55 ${className}`}
    >
      {prefix ? (
        <span className="select-none whitespace-nowrap pl-[18px] text-[0.95rem] font-medium text-gold">
          {prefix}
        </span>
      ) : null}
      <input
        className={`min-w-0 flex-1 border-0 bg-transparent px-[18px] py-4 font-body text-[0.98rem] text-bone outline-none placeholder:text-bone-faint ${prefix ? 'pl-0.5' : ''}`}
        {...props}
      />
    </div>
  );
}
