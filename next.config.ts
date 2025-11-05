import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // 👇 update this part — domains is deprecated, use remotePatterns instead
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // 👇 add this to fix nodemailer import in app/api route
  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
  },
}

export default nextConfig
