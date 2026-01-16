/** @type {import('next').NextConfig} */

// GitHub Pages requires basePath for repository deployments
// Remove basePath if deploying to root domain (draxon.asia)
const isProd = process.env.NODE_ENV === 'production';
const repoName = ''; // Leave empty for custom domain, or set to '/repo-name' for GitHub Pages subdirectory

const nextConfig = {
  output: 'export', // Static export for GitHub Pages compatibility
  
  // Configure for custom domain or GitHub Pages subdirectory
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
  
  images: {
    // GitHub Pages doesn't support Next.js Image Optimization
    unoptimized: true,
  },
  
  // Disable server-side features for static export
  trailingSlash: true,
  
  // Optimize build performance
  swcMinify: true,
  
  // Configure headers for security (applied via GitHub Pages config)
  experimental: {
    // optimizeCss: true, // Disabled for stability
  },
  
  // Webpack optimizations for bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
