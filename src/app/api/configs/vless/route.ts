import { NextResponse } from 'next/server';

import { getAccessToken } from '@/lib/session';
import { DEV_TOKEN_SENTINEL, IS_DEV } from '@/lib/dev-session';
import { getVlessSubscription } from '@/api/vpn';
import { isApiError } from '@/api/client/api-error';

export async function GET() {
  const token = await getAccessToken();
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (IS_DEV && token === DEV_TOKEN_SENTINEL) {
    return NextResponse.redirect(
      'vless://dev-test-fixture@dev.local:443?type=tcp&security=tls#DEV-TEST',
      { status: 307 },
    );
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
