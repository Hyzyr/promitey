type LogoProps = {
  href?: string;
  onClick?: () => void;
};

export const Logo = ({ href, onClick }: LogoProps) => {
  return (
    <a href={href} onClick={onClick} className="logo">
      <img src="/logo.svg" alt="Prometey VPN Logo" className="h-full w-full" />
    </a>
  );
};

export const LogoWithText = ({ href, onClick }: LogoProps) => {
  return (
    <a href={href} onClick={onClick} className="logo">
      <img
        src="/logo-with-text.svg"
        alt="Prometey VPN Logo"
        className="h-full w-full"
      />
    </a>
  );
};
