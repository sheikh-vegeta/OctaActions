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

    // Handle ES modules and private class fields
    config.module.rules.push({
      test: /\.(js|mjs|cjs|ts)$/,
      include: [
        /node_modules[\/]undici/,
        /node_modules[\/]smee-client/,
        /node_modules[\/]probot/
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }]
          ],
          plugins: [
            ['@babel/plugin-transform-class-properties', { loose: true }],
            ['@babel/plugin-transform-private-methods', { loose: true }],
            ['@babel/plugin-transform-private-property-in-object', { loose: true }]
          ]
        }
      }
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
