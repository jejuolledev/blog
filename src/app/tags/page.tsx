import Link from 'next/link';
import { getAllTags } from '@/lib/posts';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">태그</h1>
      <p className="mt-2 text-sm text-text-muted">
        주제별로 글을 모아볼 수 있어요.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="rounded-full border border-canvas-muted px-4 py-2 text-sm text-text-muted transition hover:text-text"
          >
            #{tag} <span className="ml-1 text-xs">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
