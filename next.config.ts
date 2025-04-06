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
  // 优化资源预加载
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: [
              '</_next/static/css/app/layout.css>; rel=preload; as=style; crossorigin=anonymous',
              '</_next/static/media/a34f9d1faa5f3315-s.p.woff2>; rel=preload; as=font; crossorigin=anonymous; type=font/woff2',
            ].join(','),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
