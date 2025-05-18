import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            'www.writersdigest.com',
            'placehold.co',
            'firebasestorage.googleapis.com'
            // Add any other domains you need to use
        ],
    },
};

export default nextConfig;
