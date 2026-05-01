import Image from 'next/image';

interface ConfigTileProps {
  logo: string;
  label: React.ReactNode;
  href: string;
}

export const ConfigTile = ({ logo, label, href }: ConfigTileProps) => {
  return (
    <a
      href={href}
      className="flex h-36.5 w-42.25 flex-col items-center justify-center gap-4.5 rounded-2xl bg-white px-3 py-4 shadow-[0_13px_51.2px_rgba(0,0,0,.04)] transition-transform hover:-translate-y-0.5 lg:h-47.75 lg:w-53.75"
      download>
      <Image
        src={logo}
        alt=""
        width={122}
        height={122}
        className="h-20 w-20 lg:h-30.5 lg:w-30.5"
      />
      <span className="text-center text-sm font-roboto">{label}</span>
    </a>
  );
};
