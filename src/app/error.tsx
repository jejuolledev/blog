'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-text-muted">500</p>
      <h1 className="mt-4 text-3xl font-semibold">예기치 못한 문제가 발생했어요.</h1>
      <p className="mt-3 text-sm text-text-muted">
        새로고침하거나 다시 시도해 주세요.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-canvas-muted px-5 py-2 text-sm font-semibold text-text"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white"
        >
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
