import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-canvas-muted/70 bg-canvas-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💻</span>
              <span className="font-bold">배정길 (ZZB Labs)</span>
            </div>
            <p className="mt-2 text-sm text-text-muted">
              프론트엔드 개발자의 작업실
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Navigate</h4>
            <nav className="mt-3 flex flex-col gap-2 text-sm text-text-muted">
              <Link href="/projects" className="hover:text-accent">
                Projects
              </Link>
              <Link href="/devlog" className="hover:text-accent">
                Devlog
              </Link>
              <Link href="/about" className="hover:text-accent">
                About
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold">Connect</h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-text-muted">
              <a
                href="https://github.com/jejuolledev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                GitHub
              </a>
              <a href="mailto:hello@jejuolledev.com" className="hover:text-accent">
                Email
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Subscribe</h4>
            <p className="mt-3 text-sm text-text-muted">
              새 글이 올라오면 알림을 받으세요.
            </p>
            <Link
              href="/rss.xml"
              className="mt-2 inline-block text-sm text-accent hover:underline"
            >
              RSS Feed →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-canvas-muted pt-8 text-sm text-text-muted sm:flex-row">
          <p>© 2024 jejuolledev. All rights reserved.</p>
          <p className="text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
