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
      className="flex h-48.5 w-full flex-col items-center justify-center gap-4 rounded-[13px] bg-neutral-20 p-4 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 sm:w-53.75"
      download
    >
      <Image
        src={logo}
        alt=""
        width={122}
        height={122}
        className="h-30.5 w-30.5"
      />
      <span className="text-center text-sm font-manrope">{label}</span>
    </a>
  );
};
