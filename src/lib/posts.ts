import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export function getPublishedPosts() {
  return allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
}

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug && !post.draft);
}

export function getAllTags() {
  const tagMap = new Map<string, number>();

  getPublishedPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagMap.entries()).sort((a, b) => b[1] - a[1]);
}
