import { isApiError } from '@/api/client/api-error';
import * as billingApi from '@/api/billing';

import type { CurrentSubscriptionResponse } from '@/api/client/api-types';

export async function getCurrentSubscriptionOrNull(
  token: string,
): Promise<CurrentSubscriptionResponse | null> {
  try {
    return await billingApi.getCurrentSubscription(token);
  } catch (error) {
    if (isApiError(error) && error.status === 404) {
      return null;
    }

    throw error;
  }
}
