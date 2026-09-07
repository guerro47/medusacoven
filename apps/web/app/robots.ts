import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/public-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Gated surfaces never enter an index.
        disallow: ['/dashboard', '/login'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
