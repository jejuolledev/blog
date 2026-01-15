import { withContentlayer } from 'next-contentlayer';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp']
  }
};

export default withContentlayer(nextConfig);
