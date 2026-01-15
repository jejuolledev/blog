'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = theme === 'system' ? resolvedTheme : theme;
  const isDark = current === 'dark';

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-canvas-muted px-3 py-2 text-sm text-text-muted transition hover:text-text"
      aria-label="다크 모드 토글"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {mounted ? (
        isDark ? (
          <>
            <SunIcon />
            <span>Light</span>
          </>
        ) : (
          <>
            <MoonIcon />
            <span>Dark</span>
          </>
        )
      ) : (
        <span>Theme</span>
      )}
    </button>
  );
}
