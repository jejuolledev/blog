export function SiteFooter() {
  return (
    <footer className="border-t border-canvas-muted/70 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>© 2024 jejuolledev. 기록은 성장의 엔진.</p>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:hello@jejuolledev.com" className="hover:text-text">
            Email
          </a>
          <a href="https://github.com/jejuolledev" className="hover:text-text">
            GitHub
          </a>
          <a href="https://www.instagram.com" className="hover:text-text">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
