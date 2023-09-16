/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'coffeedoorbucket.s3.eu-north-1.amazonaws.com',
            port: '',
            // pathname: '/account123/**',
          },
        ],
      },
};

module.exports = nextConfig;
