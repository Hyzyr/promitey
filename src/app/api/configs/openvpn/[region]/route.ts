import { NextResponse } from 'next/server';

import { DEV_OPENVPN_CONFIG } from '@/api/client/dev-mock';
import { isApiError } from '@/api/client/api-error';
import { getOpenvpnConfigByRegion } from '@/api/vpn';
import { DEV_TOKEN_SENTINEL, IS_DEV } from '@/lib/dev-session';
import { getAccessToken } from '@/lib/session';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ region: string }> },
) {
  const token = await getAccessToken();
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { region } = await params;
  const normalizedRegion = region.trim();
  if (!normalizedRegion) {
    return new NextResponse('Missing region', { status: 400 });
  }

  if (IS_DEV && token === DEV_TOKEN_SENTINEL) {
    return new NextResponse(DEV_OPENVPN_CONFIG, {
      status: 200,
      headers: buildOpenvpnHeaders(normalizedRegion),
    });
  }

  let upstream: Response;
  try {
    upstream = await getOpenvpnConfigByRegion(normalizedRegion, token);
  } catch (e) {
    if (isApiError(e)) {
      if (e.status === 401 || e.status === 403) {
        return new NextResponse('Forbidden', { status: e.status });
      }
      return new NextResponse(e.message, { status: e.status || 502 });
    }
    return new NextResponse('Bad Gateway', { status: 502 });
  }

  const headers = buildOpenvpnHeaders(normalizedRegion, upstream);
  return new NextResponse(upstream.body, { headers, status: upstream.status });
}

function buildOpenvpnHeaders(region: string, upstream?: Response): Headers {
  const headers = new Headers();
  const safeRegion = region.replace(/[^a-zA-Z0-9_-]/g, '-');
  const contentDisposition = upstream?.headers.get('Content-Disposition');

  headers.set(
    'Content-Disposition',
    contentDisposition ?? `attachment; filename="prometey-${safeRegion}.ovpn"`,
  );
  headers.set(
    'Content-Type',
    upstream?.headers.get('Content-Type') ?? 'application/x-openvpn-profile',
  );

  return headers;
}