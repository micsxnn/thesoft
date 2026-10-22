import Link from "next/link";
import { Github, Search } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#0a0a0a]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-[17px] font-semibold tracking-[-0.03em] text-foreground"
        >
          thesoft<span className="text-[#5ce49e]" aria-hidden="true">.</span>
        </Link>

        <nav aria-label="Navegação principal" className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/#posts"
            className="rounded-[2px] px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Posts
          </Link>
          <Link
            href="/busca"
            className="flex items-center gap-1.5 rounded-[2px] px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search size={15} strokeWidth={1.75} aria-hidden="true" />
            Busca
          </Link>
          <a
            href="https://github.com/micsxnn"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub do autor (micsxnn)"
            className="flex items-center rounded-[2px] px-2 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={17} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
