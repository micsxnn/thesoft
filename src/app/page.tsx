import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getAllTags, tagToSlug } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto w-full max-w-4xl px-6">
      {/* Hero — o momento autoral: reveal com stagger */}
      <section className="pb-16 pt-16 sm:pt-24">
        <h1 className="hero-rise hero-rise-1 text-[clamp(3.75rem,10vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
          thesoft
          <span className="text-[#5ce49e]" aria-hidden="true">
            .
          </span>
        </h1>

        <div className="hero-rise hero-rise-2 mt-10 flex items-center gap-4">
          <Image
            src="/avatar.png"
            alt="Foto de perfil de micaelsan no GitHub"
            width={52}
            height={52}
            priority
            className="h-13 w-13 shrink-0 rounded-[2px] border border-border object-cover"
          />
          <div>
            <p className="text-[15px] font-medium text-foreground">micaelsan</p>
            <p className="font-mono text-[13px] text-muted-foreground">
              github.com/micsxnn
            </p>
          </div>
        </div>

        <p className="hero-rise hero-rise-3 mt-7 max-w-[54ch] text-lg leading-relaxed text-muted-foreground">
          Desenvolvedor autônomo. Aqui você encontra tutoriais de engenharia de
          software — Next.js, React, TypeScript, Git e deploy — direto ao ponto,
          com código que funciona.
        </p>
      </section>

      {/* Escritos */}
      <section id="posts" className="scroll-mt-24 pb-20">
        <div className="hero-rise hero-rise-4">
          <h2 className="text-2xl font-semibold tracking-[-0.025em]">Escritos</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            {posts.length} tutoriais publicados.
          </p>
        </div>

        <div className="hero-rise hero-rise-4 mt-8">
          <PostList posts={posts} />
        </div>
      </section>

      {/* Temas */}
      <section className="pb-24" aria-labelledby="temas-title">
        <h2 id="temas-title" className="text-2xl font-semibold tracking-[-0.025em]">
          Temas
        </h2>

        <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
          {tags.map(({ tag, count }) => (
            <li key={tag}>
              <Link
                href={`/tag/${tagToSlug(tag)}`}
                className="inline-flex items-baseline gap-1.5 rounded-[2px] border border-border px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:border-[#5ce49e]/50 hover:text-[#5ce49e]"
              >
                {tag}
                <span className="font-mono text-xs tabular text-[#5ce49e]">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
