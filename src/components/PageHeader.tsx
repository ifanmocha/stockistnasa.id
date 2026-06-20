import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-dark section-hero-top relative pb-16">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="eyebrow-dark">{eyebrow}</p>}
        <h2 className="section-heading mt-1">{title}</h2>
        {subtitle && (
          <p className="mt-1.5 max-w-xl text-sm text-ink-muted md:text-base">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
