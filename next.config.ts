import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "portfolio-site-rho-rouge.vercel.app",
          },
        ],
        destination: "https://portfolio.umianode.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
