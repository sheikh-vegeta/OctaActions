/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enable webpack build worker
    webpackBuildWorker: true,
    // These settings help prevent issues with Clerk integration
    serverComponentsExternalPackages: [
      '@clerk/nextjs',
      '@clerk/shared',
      '@clerk/clerk-react',
    ],
  },
  // Ignore Edge Runtime warnings from dependencies we can't control
  // These are client-side only components so they won't be used in Edge functions
  transpilePackages: [
    'scheduler',
    '@clerk/shared',
  ],
  // Increase the timeout for builds if necessary
  staticPageGenerationTimeout: 300,
  images: {
    // Configure image domains if needed
    domains: [
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'github.com',
      'img.clerk.com',
    ],
  },
};

module.exports = nextConfig;
