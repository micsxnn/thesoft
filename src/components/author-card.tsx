import Image from "next/image";
import { Github } from "lucide-react";

export function AuthorCard() {
  return (
    <aside
      aria-label="Sobre o autor"
      className="mt-20 flex flex-col gap-5 border-y border-border py-8 sm:flex-row sm:items-center"
    >
      <Image
        src="/avatar.png"
        alt="Foto de perfil de micaelsan no GitHub"
        width={64}
        height={64}
        priority={false}
        className="h-16 w-16 shrink-0 rounded-[2px] border border-border object-cover"
      />

      <div className="flex-1">
        <p className="font-medium text-foreground">micaelsan</p>
        <p className="mt-1.5 max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">
          Desenvolvedor autônomo. Escreve sobre engenharia de software, ferramentas
          e prática de desenvolvimento — direto ao ponto, com código que funciona.
        </p>
      </div>

      <a
        href="https://github.com/micsxnn"
        target="_blank"
        rel="noreferrer"
        className="inline-flex shrink-0 items-center gap-2 rounded-[2px] border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:border-[#5ce49e]/50 hover:text-[#5ce49e]"
      >
        <Github size={15} strokeWidth={1.75} aria-hidden="true" />
        GitHub
      </a>
    </aside>
  );
}
