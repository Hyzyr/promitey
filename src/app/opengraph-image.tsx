import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Prometey VPN — Fast & Secure VPN';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a1a',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Top orange accent stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            backgroundColor: '#ff6d41',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: '#ff6d41',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: '900',
              color: '#fff',
            }}
          >
            P
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '-0.5px',
            }}
          >
            Prometey VPN
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: '68px',
            fontWeight: '900',
            color: '#ffffff',
            lineHeight: 1.05,
            marginTop: '40px',
            letterSpacing: '-2px',
          }}
        >
          Your Freedom
          <br />
          <span style={{ color: '#ff6d41' }}>in One Click</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '26px',
            color: '#9d9d9d',
            marginTop: '20px',
            fontWeight: '400',
          }}
        >
          High-speed VPN · Up to 10 devices · Free trial
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: 'auto',
            paddingBottom: '20px',
          }}
        >
          {(['VLESS', 'OpenVPN', 'from €3/mo'] as const).map((label) => (
            <div
              key={label}
              style={{
                padding: '10px 22px',
                backgroundColor: '#2b2b2b',
                borderRadius: '10px',
                color: '#ff6d41',
                fontSize: '22px',
                fontWeight: '700',
                border: '1px solid #3a3a3a',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom orange accent stripe */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#ff6d41',
          }}
        />
      </div>
    ),
    size,
  );
}
