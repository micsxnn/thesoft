import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      // O techmate publicava em /blog/[slug]; o thesoft usa /posts/[slug].
      // O conteúdo migrou, então as URLs antigas precisam continuar funcionando.
      { source: "/blog/:slug", destination: "/posts/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
