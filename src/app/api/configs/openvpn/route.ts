import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getAccessToken } from '@/lib/session';
import { getOpenvpnConfig } from '@/api/vpn';
import { isApiError } from '@/api/client/api-error';

export async function GET(_req: NextRequest) {
  const token = await getAccessToken();
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
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
