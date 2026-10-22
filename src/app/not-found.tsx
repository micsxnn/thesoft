import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-24">
      <p className="font-mono text-[13px] tabular text-muted-foreground">404</p>
      <h1 className="mt-3 max-w-[20ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
        Página não encontrada.
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
        O endereço acessado não corresponde a nenhum post ou página do thesoft.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>
          Voltar para a home
        </Link>
      </div>
    </div>
  );
}
