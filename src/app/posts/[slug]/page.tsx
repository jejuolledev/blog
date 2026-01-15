import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { getPublishedPosts, getPostBySlug } from '@/lib/posts';
import { getTableOfContents } from '@/lib/toc';
import { MdxContent } from '@/components/mdx-content';

type PostPageProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: post.canonical ? { canonical: post.canonical } : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags
    }
  };
}

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const posts = getPublishedPosts();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const previous = posts[currentIndex + 1];
  const next = posts[currentIndex - 1];
  const toc = getTableOfContents(post.body.raw);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">
        <article className="prose prose-neutral dark:prose-invert">
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
            {format(new Date(post.date), 'yyyy.MM.dd')}
          </p>
          <h1 className="mt-4 text-3xl font-semibold">{post.title}</h1>
          <p className="text-base text-text-muted">{post.description}</p>
          <div className="mt-8">
            <MdxContent code={post.body.code} />
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-canvas-muted/80 pt-6 text-sm text-text-muted">
            {previous ? (
              <Link href={`/posts/${previous.slug}`} className="hover:text-text">
                ← {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/posts/${next.slug}`} className="hover:text-text">
                {next.title} →
              </Link>
            ) : null}
          </div>
        </article>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-canvas-muted/80 bg-canvas/70 p-6">
            <h2 className="text-base font-semibold">목차</h2>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              {toc.map((item) => (
                <li key={item.id} className={item.level >= 3 ? 'ml-4' : ''}>
                  <a href={`#${item.id}`} className="hover:text-accent">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-canvas-muted/80 bg-canvas/70 p-6 text-sm text-text-muted">
            <h2 className="text-base font-semibold text-text">태그</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="rounded-full bg-canvas-muted px-3 py-1 text-xs hover:text-accent"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
