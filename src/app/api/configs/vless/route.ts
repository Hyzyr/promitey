import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getAccessToken } from '@/lib/session';
import { getVlessSubscription } from '@/api/vpn';
import { isApiError } from '@/api/client/api-error';

export async function GET(_req: NextRequest) {
  const token = await getAccessToken();
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let subscription_url: string;
  try {
    const data = await getVlessSubscription(token);
    subscription_url = data.subscription_url;
  } catch (e) {
    if (isApiError(e)) {
      return new NextResponse(e.message, { status: e.status || 502 });
    }
    return new NextResponse('Bad Gateway', { status: 502 });
  }

  return NextResponse.redirect(subscription_url, { status: 307 });
}
