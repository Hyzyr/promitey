import { ConfigAccessCard } from './config-access-card';

export interface ConfigDownloadCardProps {
	hasActiveSubscription: boolean;
}

export const ConfigDownloadCard = ({ hasActiveSubscription }: ConfigDownloadCardProps) => (
	<ConfigAccessCard hasActiveSubscription={hasActiveSubscription} />
);
