/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@vendr/ui", "@vendr/types"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
