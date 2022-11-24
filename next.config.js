/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: "/api/items",
        destination: "http://localhost:8000/items",
      },
    ];
  },
};

module.exports = nextConfig;
