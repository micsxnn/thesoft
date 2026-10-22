export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          thesoft — engenharia de software, direto ao ponto.
        </p>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://github.com/micsxnn"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="/feed.xml"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            RSS
          </a>
          <span className="font-mono text-[13px] tabular text-muted-foreground">
            © 2026 micaelsan
          </span>
        </div>
      </div>
    </footer>
  );
}
