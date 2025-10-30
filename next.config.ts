import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Add this 'images' section
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**", // Allows all images from their /img/ folder
      },
    ],
  },
};

export default nextConfig;