'use client';

import Image from 'next/image';

/**
 * Decorative background for the auth area.
 *
 * Layers (bottom → top):
 *   1. Solid neutral-30 base
 *   2. Soft tilted blur shape (mimics Figma's #201e1e blurred shape, opacity 9%)
 *   3. Optional /images/auth/bg.png (full-bleed photo, 44% opacity)
 *   4. Optional /images/auth/decoration.png (left blob, desktop only)
 *   5. Dark gradient right panel (desktop only)
 *
 * The two PNG layers are rendered with Image and onError-hidden via CSS, so the
 * shell remains pixel-correct even if assets are not yet supplied.
 */
export const AuthBackground = () => {
  return (
    <div aria-hidden className="bg pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0 bg-neutral-30" />

      {/* Soft tilted dark blur (matches Figma decorative shape) */}
      <div className="absolute -bottom-[10%] -left-[5%] h-[42vh] w-[40vw] rotate-[-7deg] bg-neutral-900 opacity-[0.09] blur-[107px]" />

      {/* Full-bleed background photo (optional asset) */}
      <Image
        src="/images/auth/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.44]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Left decorative blob (desktop only) */}
      <Image
        src="/images/auth/decoration.png"
        alt=""
        width={1014}
        height={915}
        loading="lazy"
        sizes="(min-width: 1024px) 1014px, 0px"
        className="absolute top-[32px] left-[82px] hidden h-[915px] w-[1014px] max-w-none object-contain lg:block"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Dark gradient right panel — desktop only */}
      <div className="absolute top-0 right-0 hidden h-full w-[34%] max-w-[550px] bg-gradient-to-b from-neutral-900 to-[#1e1e1e] lg:block" />
    </div>
  );
};
