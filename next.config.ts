/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.visualytes.com",
      },
    ],
  },
};

module.exports = nextConfig;