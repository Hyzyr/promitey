'use client';

import { useMedia } from '@/hooks/use-media';
import { HeaderMobile } from './components/header-mobile';
import { HeaderDesktop } from './components/header-desktop';

export interface LandingHeaderProps {
  isAuthenticated?: boolean;
}

/**
 * Main header orchestrator component.
 * Renders mobile or desktop header based on viewport width.
 * Breakpoint: 1024px (lg)
 */
export const LandingHeader = ({ isAuthenticated = false }: LandingHeaderProps) => {
  const isMobile = useMedia('(max-width: 1023px)');

  return isMobile
    ? <HeaderMobile isAuthenticated={isAuthenticated} />
    : <HeaderDesktop isAuthenticated={isAuthenticated} />;
};
