import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['lxzrhcfrfblhgjzdbuia.supabase.co'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@tiptap/react', '@tiptap/starter-kit'],
  },
  // 减少不必要的预加载
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '</_next/static/css/app/layout.css>; rel=preload; as=style',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
