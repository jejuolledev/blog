import { withContentlayer } from 'next-contentlayer';

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp']
  }
};

export default withContentlayer(nextConfig);
