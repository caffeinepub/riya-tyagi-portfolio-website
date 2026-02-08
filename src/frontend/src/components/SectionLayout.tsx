import { ReactNode } from 'react';

interface SectionLayoutProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function SectionLayout({
  id,
  title,
  subtitle,
  children,
  className = '',
  containerClassName = '',
}: SectionLayoutProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className={`container mx-auto px-4 ${containerClassName}`}>
        {(title || subtitle) && (
          <div className="text-center mb-16 md:mb-20 section-separator pb-8">
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
