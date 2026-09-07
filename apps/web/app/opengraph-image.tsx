import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MEDUSAELITE — Your Fans. Your Data. Your Empire.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Runtime-generated OG card in brand tokens. Replaced by a render of the
 * official Medusa bust masters once the alpha PNGs land in public/logo/.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.12), transparent 70%)',
          color: '#EDE6D6',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            letterSpacing: '0.4em',
            fontWeight: 700,
          }}
        >
          <span>MEDUSA</span>
          <span style={{ color: '#D4AF37' }}>ELITE</span>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 64,
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
          }}
        >
          Your Fans. Your Data.
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#D4AF37',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
          }}
        >
          Your Empire.
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 24,
            color: 'rgba(237,230,214,0.6)',
            letterSpacing: '0.1em',
          }}
        >
          The monetization operating system for creators · Q4 2026
        </div>
      </div>
    ),
    size,
  );
}
