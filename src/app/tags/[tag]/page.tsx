import Link from 'next/link';
import { getPublishedPosts } from '@/lib/posts';
import { PostCard } from '@/components/post-card';

export default function TagDetailPage({ params }: { params: { tag: string } }) {
  const posts = getPublishedPosts().filter((post) => post.tags.includes(params.tag));

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">#{params.tag}</h1>
      <p className="mt-2 text-sm text-text-muted">총 {posts.length}개의 글</p>
      <div className="mt-8 grid gap-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="mt-10">
        <Link href="/tags" className="text-sm text-text-muted hover:text-accent">
          ← 태그 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
