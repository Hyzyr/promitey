import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Underlined gray secondary link used across auth screens
 * ("Forgot password?", "Sign in to existing", etc).
 */
export const AuthLink = ({ href, children, className }: AuthLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'font-manrope text-[16px] font-semibold tracking-[0.18px] text-neutral-300 underline transition-colors hover:text-neutral-600 lg:text-[18px]',
        className,
      )}
    >
      {children}
    </Link>
  );
};
