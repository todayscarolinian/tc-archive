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
    experimental: {
        serverActions: {
            // Issue thumbnails/PDFs are uploaded through Server Actions; raise
            // the default ~1mb body limit to accommodate multi-MB PDF issues.
            bodySizeLimit: '50mb',
        },
    },
};

export default nextConfig;
