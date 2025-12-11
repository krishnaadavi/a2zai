import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #06b6d4 100%)',
          borderRadius: 36,
          fontSize: 72,
          fontWeight: 800,
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        A→Z
      </div>
    ),
    {
      ...size,
    }
  );
}
