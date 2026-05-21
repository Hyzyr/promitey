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
    <div aria-hidden className="bg pointer-events-none bg-neutral-30">
      <img
        src="/images/auth-bg.png"
        alt=""
        width={1440}
        height={1024}
        className="absolute h-full w-full object-cover lg:top-0 lg:left-0 lg:w-[75%] lg:w-[max(75%,calc(100%-540px))]"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />

      <div className="absolute top-0 right-0 hidden h-full w-[32%] w-[min(32%,540px)] bg-linear-to-b from-neutral-900 to-[#1e1e1e] lg:block" />
    </div>
  );
};
