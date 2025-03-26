/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enable webpack build worker
    webpackBuildWorker: true,
    esmExternals: 'loose',
    // These settings help prevent issues with Clerk integration
    serverComponentsExternalPackages: [
      '@clerk/nextjs',
      '@clerk/clerk-react',
    ],
  },
  // Ignore Edge Runtime warnings from dependencies we can't control
  // These are client-side only components so they won't be used in Edge functions
  transpilePackages: [
    'scheduler',
    'undici',
    'smee-client',
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
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true
    };

    // Handle ES modules
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Handle node modules in the browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
};

export default nextConfig;
