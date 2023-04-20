/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL
  },
  images: {
    domains: ["res.cloudinary.com"]
  }
}

module.exports = nextConfig
