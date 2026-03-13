/**
 * Next.js Configuration (next.config.js)
 * --------------------------------------
 * Controls build and runtime. Here we only customize images:
 * Next.js <Image> requires external domains to be allowlisted in remotePatterns.
 * AnimeCard loads images from shikimori.one — the wildcard allows that and any other HTTPS host.
 * For production you may want to restrict hostname to e.g. "shikimori.one" only.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
