/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async headers() {
    return [
       {
          source: '/:path*',
          headers: [
             { key: 'referrer-policy', value: 'no-referrer'}
          ]
       }
    ]
 }
};

module.exports = nextConfig;
