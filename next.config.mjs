/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    // Next's image optimizer needs a server; static export serves images as-is.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    // Images téléversées via l'admin (Cloudinary).
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
