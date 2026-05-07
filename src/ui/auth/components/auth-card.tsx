import { cn } from '@/lib/utils';

interface AuthCardProps {
  /** Page title — Manrope Bold 28/36px capitalized. */
  title: string;
  /** Optional subtitle below the title. */
  subtitle?: React.ReactNode;
  /** Optional rendered after the form (e.g. AuthPolicy). */
  footer?: React.ReactNode;
  /** Form / body slot. */
  children: React.ReactNode;
  className?: string;
}

/**
 * White rounded auth card. Mobile-first; expands to fixed Figma desktop size
 * (558px wide, 750px tall, padding 60/46) at lg+.
 */
export const AuthCard = ({
  title,
  subtitle,
  footer,
  children,
  className,
}: AuthCardProps) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-139 flex-col items-center justify-center gap-9 rounded-xl bg-white px-5 py-10 md:rounded-2xl md:px-10 md:py-7 lg:pt-15 lg:pb-11.5 xlx:min-h-187 xlx:rounded-[36px] xlx:px-15',
        'drop-shadow-[0px_12px_12px_rgba(0,0,0,0.12),0px_32px_9px_rgba(0,0,0,0.05)] lg:drop-shadow-[0px_19px_20.65px_rgba(0,0,0,0.22),0px_49px_12.55px_rgba(0,0,0,0.12)]',
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-6">
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="font-manrope text-[28px] leading-[1.1] font-bold tracking-[-0.56px] text-neutral-800 capitalize lg:text-[36px] lg:tracking-[-0.72px]">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-72 w-[80%] font-manrope text-[16px] leading-[1.36] text-neutral-300 lg:text-[18px]">
              {subtitle}
            </p>
          )}
        </header>

        {children}
      </div>

      {footer}
    </div>
  );
};
