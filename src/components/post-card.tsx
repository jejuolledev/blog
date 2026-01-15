import Link from 'next/link';
import { format } from 'date-fns';
import type { Post } from 'contentlayer/generated';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-canvas-muted/80 bg-canvas/60 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-text-muted">
        <span>{format(new Date(post.date), 'yyyy.MM.dd')}</span>
        <span>·</span>
        <span>{post.tags.join(', ')}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold">
        <Link href={`/posts/${post.slug}`} className="hover:text-accent">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm text-text-muted">{post.description}</p>
    </article>
  );
}
