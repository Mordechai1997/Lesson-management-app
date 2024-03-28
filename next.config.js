/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['via.placeholder.com']
    },
    reactStrictMode: false,
}

module.exports = nextConfig
