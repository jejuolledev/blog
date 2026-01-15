'use client';

import Fuse from 'fuse.js';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Post } from 'contentlayer/generated';

export function SearchBox({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'description', 'body.raw', 'tags'],
        threshold: 0.3
      }),
    [posts]
  );

  const results = query.trim().length
    ? fuse.search(query).map((result) => result.item)
    : [];

  return (
    <div className="rounded-2xl border border-canvas-muted/80 bg-canvas/70 p-6">
      <label className="text-sm font-medium" htmlFor="search">
        글 검색
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="제목 또는 키워드 입력"
        className="mt-3 w-full rounded-xl border border-canvas-muted bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
      {results.length > 0 ? (
        <ul className="mt-4 space-y-3 text-sm text-text-muted">
          {results.map((post) => (
            <li key={post._id}>
              <Link href={`/posts/${post.slug}`} className="text-text hover:text-accent">
                {post.title}
              </Link>
              <p className="text-xs text-text-muted">{post.description}</p>
            </li>
          ))}
        </ul>
      ) : query.trim().length ? (
        <p className="mt-4 text-sm text-text-muted">검색 결과가 없습니다.</p>
      ) : null}
    </div>
  );
}
