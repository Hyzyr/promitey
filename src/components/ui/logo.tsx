export interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <span className={className ?? 'logo'}>
      <img src="/logo.svg" alt="Prometey VPN Logo" className="h-full w-full" />
    </span>
  );
};

export const LogoWithText = ({
  size,
  className,
  dark = false,
}: LogoProps & {
  dark?: boolean;
}) => {
  const style = size ? { fontSize: size } : undefined;

  return (
    <span className={className ?? 'logo'} style={style}>
      {!dark ? (
        <img
          src="/logo-with-text.svg"
          alt="Prometey VPN Logo"
          className="h-full w-full"
        />
      ) : (
        <img
          src="/logo-with-text-dark.svg"
          alt="Prometey VPN Logo"
          className="h-full w-full"
        />
      )}
    </span>
  );
};
