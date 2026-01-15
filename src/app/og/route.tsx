import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'jejuolledev';
  const subtitle = searchParams.get('subtitle') ?? 'Minimal tech journal';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          width: '100%',
          height: '100%',
          background: '#f8f6f3',
          color: '#141414',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <p style={{ fontSize: 28, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          jejuolledev
        </p>
        <h1 style={{ fontSize: 64, margin: '32px 0 16px' }}>{title}</h1>
        <p style={{ fontSize: 28, color: '#5e5e5e' }}>{subtitle}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
