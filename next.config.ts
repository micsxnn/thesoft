import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `standalone` só faz sentido fora da Vercel (preview local/sandbox).
  // Na Vercel o runtime usa o output padrão dela — forçar standalone aqui
  // quebra o rastreamento de assets e o funciona das rotas.
  output: process.env.VERCEL ? undefined : "standalone",
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
