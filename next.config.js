/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing code ...
  webpack: (config) => {
    // 忽略 punycode 警告
    config.resolve.fallback = {
      ...config.resolve.fallback,
      punycode: false,
    };
    return config;
  },
  // ... existing code ...
};

module.exports = nextConfig; 