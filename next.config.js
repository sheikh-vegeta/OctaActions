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
  webpack: (config, options) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true
    }

    config.module.rules.push({
      test: /\.handlebars$/,
      use: ['handlebars-loader']
    });

    // Add this to handle ES modules
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Add this to handle undici
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['next/babel', { "useBuiltIns": "usage", "corejs": 3 }]],
          plugins: ['@babel/plugin-syntax-dynamic-import'],
        },
      },
    });

    return config;
  },
};

export default nextConfig;
