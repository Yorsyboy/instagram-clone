/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'cdn-icons-png.flaticon.com', 'hips.hearstapps.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
