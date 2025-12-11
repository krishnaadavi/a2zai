import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'A2Z AI - Your A-to-Z Guide to AI';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f172a 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background decorations */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 800,
              color: 'white',
            }}
          >
            A→Z
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            A2Z
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
            }}
          >
            AI
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#9ca3af',
            marginBottom: 30,
          }}
        >
          Your A-to-Z Guide to AI
        </div>

        {/* Value prop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 32px',
            background: 'rgba(168, 85, 247, 0.1)',
            borderRadius: 12,
            border: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          <span style={{ fontSize: 24, color: '#d8b4fe' }}>
            Stay AI-current in 5 minutes a day
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
