import { ImageResponse } from 'next/og';

import { SEO_ASSETS } from '@/lib/constants';
import { getSiteUrl } from '@/lib/site-url';

export const runtime = 'edge';
export const alt = 'Prometey VPN preview image';
export const size = {
  width: SEO_ASSETS.openGraphImageWidth,
  height: SEO_ASSETS.openGraphImageHeight,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      // ImageResponse renders plain HTML/CSS, so next/image is not available here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt}
        height={SEO_ASSETS.openGraphImageHeight}
        src={`${getSiteUrl()}${SEO_ASSETS.openGraphImage}`}
        style={{ height: '100%', objectFit: 'cover', width: '100%' }}
        width={SEO_ASSETS.openGraphImageWidth}
      />
    ),
    size,
  );
}