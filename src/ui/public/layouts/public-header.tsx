import { HeaderMobile } from './components/header-mobile';
import { HeaderDesktop } from './components/header-desktop';

export interface LandingHeaderProps {
  isAuthenticated?: boolean;
}

export const LandingHeader = ({ isAuthenticated = false }: LandingHeaderProps) => {
  return (
    <>
      <div className="lg:hidden">
        <HeaderMobile isAuthenticated={isAuthenticated} />
      </div>
      <div className="hidden lg:block">
        <HeaderDesktop isAuthenticated={isAuthenticated} />
      </div>
      <div className="h-14 lg:h-20" aria-hidden="true" />
    </>
  );
};
