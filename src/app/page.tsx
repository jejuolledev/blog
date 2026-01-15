import Link from 'next/link';
import { getPublishedPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export default function HomePage() {
  const posts = getPublishedPosts().slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <section className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Journal</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            제주에서 기록하는 성장과 디자인의 기록
          </h1>
          <p className="mt-4 max-w-readable text-base text-text-muted">
            제품, 사용자 경험, 그리고 팀의 배움을 기록합니다. 짧은 기록들이 모여 더 나은 내일을
            만들길 바랍니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white"
            >
              최근 글 보기
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-canvas-muted px-5 py-2 text-sm font-semibold text-accent"
            >
              소개 보기
            </Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-canvas-muted/80 bg-canvas/60 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-text-muted">Profile</p>
          <h2 className="mt-3 text-xl font-semibold">정기록 · Frontend Engineer</h2>
          <p className="mt-3 text-sm text-text-muted">
            제주에서 일하며 작은 실험을 기록합니다. 감각적인 UI와 탄탄한 제품 경험을 연구해요.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-text-muted">
            <span className="rounded-full bg-canvas-muted px-3 py-1">#React</span>
            <span className="rounded-full bg-canvas-muted px-3 py-1">#DesignSystem</span>
            <span className="rounded-full bg-canvas-muted px-3 py-1">#Life</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a href="https://github.com/jejuolledev" className="hover:text-accent">
              GitHub
            </a>
            <a href="mailto:hello@jejuolledev.com" className="hover:text-accent">
              Email
            </a>
          </div>
        </aside>
      </section>

      <section className="mt-14">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">최근 글</h2>
          <Link href="/posts" className="text-sm text-text-muted hover:text-accent">
            전체 보기
          </Link>
        </div>
        <div className="mt-6 grid gap-5">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
