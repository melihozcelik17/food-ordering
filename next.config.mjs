/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true, // Source map'leri etkinleştirir
    images: {
        domains: ["res.cloudinary.com"]
    }
};

export default nextConfig;
