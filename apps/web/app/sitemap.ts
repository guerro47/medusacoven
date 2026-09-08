import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/public-config';

const routes = ['', '/access-pass', '/drops', '/tips', '/roadmap', '/privacy', '/terms', '/acceptable-use', '/cookies'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.6,
  }));
}
