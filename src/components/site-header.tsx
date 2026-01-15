import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/posts', label: '글' },
  { href: '/tags', label: '태그' },
  { href: '/about', label: 'About' }
];

export function SiteHeader() {
  return (
    <header className="border-b border-canvas-muted/70 bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-5">
        <div>
          <Link href="/" className="text-lg font-semibold">
            jejuolledev
          </Link>
          <p className="text-sm text-text-muted">
            오늘의 배움을 내일의 성장으로
          </p>
        </div>
        <nav aria-label="메인 메뉴" className="hidden items-center gap-6 text-sm font-medium text-text-muted md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 pb-4 text-sm text-text-muted md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="transition hover:text-text">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
