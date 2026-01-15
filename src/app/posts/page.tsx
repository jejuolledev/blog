import Link from 'next/link';
import { getPublishedPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
import { SearchBox } from '@/components/search-box';

const PAGE_SIZE = 5;

type PostsPageProps = {
  searchParams: { page?: string };
};

export default function PostsPage({ searchParams }: PostsPageProps) {
  const parsedPage = Number.parseInt(searchParams.page ?? '1', 10);
  const page = Number.isNaN(parsedPage) ? 1 : parsedPage;
  const allPosts = getPublishedPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = allPosts.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
        <section>
          <h1 className="text-3xl font-semibold">글</h1>
          <p className="mt-2 text-sm text-text-muted">
            총 {allPosts.length}개의 글이 있습니다.
          </p>
          <div className="mt-8 grid gap-5">
            {pagePosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between text-sm text-text-muted">
            <Link
              href={`/posts?page=${currentPage - 1}`}
              aria-disabled={currentPage === 1}
              className={`rounded-full border border-canvas-muted px-4 py-2 transition ${
                currentPage === 1 ? 'pointer-events-none opacity-40' : 'hover:text-text'
              }`}
            >
              이전
            </Link>
            <span>
              {currentPage} / {totalPages}
            </span>
            <Link
              href={`/posts?page=${currentPage + 1}`}
              aria-disabled={currentPage === totalPages}
              className={`rounded-full border border-canvas-muted px-4 py-2 transition ${
                currentPage === totalPages ? 'pointer-events-none opacity-40' : 'hover:text-text'
              }`}
            >
              다음
            </Link>
          </div>
        </section>
        <aside className="space-y-6">
          <SearchBox posts={allPosts} />
          <div className="rounded-2xl border border-canvas-muted/80 bg-canvas/70 p-6 text-sm text-text-muted">
            <h2 className="text-base font-semibold text-text">읽기 가이드</h2>
            <p className="mt-3">
              모든 글은 경험과 실험을 기반으로 작성합니다. 긴 글보다는 한눈에 요약되는 글을
              지향합니다.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
