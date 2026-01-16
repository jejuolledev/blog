import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allDevlogs } from 'contentlayer/generated';
import { getDevlogBySlug, getMoodEmoji } from '@/lib/content';
import { format } from 'date-fns';
import { MdxContent } from '@/components/mdx-content';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export async function generateStaticParams() {
  return allDevlogs
    .filter((d) => !d.draft)
    .map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const devlog = getDevlogBySlug(params.slug);
  if (!devlog) return { title: 'Devlog Not Found' };

  return {
    title: devlog.title,
    description: devlog.description,
  };
}

export default function DevlogDetailPage({ params }: { params: { slug: string } }) {
  const devlog = getDevlogBySlug(params.slug);

  if (!devlog) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href="/devlog"
          className="inline-flex items-center text-sm text-text-muted hover:text-accent"
        >
          ← Back to Devlog
        </Link>

        <article className="mt-8">
          <header className="border-b border-canvas-muted pb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getMoodEmoji(devlog.mood)}</span>
              <span className="text-text-muted">
                {format(new Date(devlog.date), 'yyyy년 MM월 dd일 (EEEE)')}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold">{devlog.title}</h1>

            <p className="mt-3 text-text-muted">{devlog.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {devlog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-canvas-muted px-3 py-1 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
            <MdxContent code={devlog.body.code} />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
