import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-text-muted">404</p>
      <h1 className="mt-4 text-3xl font-semibold">페이지를 찾을 수 없습니다.</h1>
      <p className="mt-3 text-sm text-text-muted">
        요청한 페이지가 이동되었거나 존재하지 않습니다.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
