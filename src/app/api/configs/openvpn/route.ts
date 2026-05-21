import { NextResponse } from 'next/server';

import { getAccessToken } from '@/lib/session';
import { DEV_TOKEN_SENTINEL, IS_DEV_MOCK_API_ENABLED } from '@/lib/dev-session';
import { DEV_OPENVPN_CONFIG } from '@/api/client/dev-mock';
import { getOpenvpnConfig } from '@/api/vpn';
import { isApiError } from '@/api/client/api-error';

export async function GET() {
  const token = await getAccessToken();
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (IS_DEV_MOCK_API_ENABLED && token === DEV_TOKEN_SENTINEL) {
    return new NextResponse(DEV_OPENVPN_CONFIG, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="prometey-dev.ovpn"',
      },
    });
  }

  let upstream: Response;
  try {
    upstream = await getOpenvpnConfig(token);
  } catch (e) {
    if (isApiError(e)) {
      if (e.status === 401 || e.status === 403) {
        return new NextResponse('Forbidden', { status: e.status });
      }
      return new NextResponse(e.message, { status: e.status || 502 });
    }
    return new NextResponse('Bad Gateway', { status: 502 });
  }

  const headers = new Headers();
  const contentDisposition = upstream.headers.get('Content-Disposition');
  headers.set(
    'Content-Disposition',
    contentDisposition ?? 'attachment; filename="prometey.ovpn"',
  );
  headers.set(
    'Content-Type',
    upstream.headers.get('Content-Type') ?? 'application/octet-stream',
  );

  return new NextResponse(upstream.body, { headers, status: upstream.status });
}
