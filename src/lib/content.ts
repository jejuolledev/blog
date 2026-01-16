import { allProjects, allDevlogs, type Project, type Devlog } from 'contentlayer/generated';

// Projects
export function getPublishedProjects(): Project[] {
  return allProjects
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedProjects(): Project[] {
  return getPublishedProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug && !p.draft);
}

// Devlogs
export function getPublishedDevlogs(): Devlog[] {
  return allDevlogs
    .filter((d) => !d.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getDevlogBySlug(slug: string): Devlog | undefined {
  return allDevlogs.find((d) => d.slug === slug && !d.draft);
}

// Tags
export function getAllTags(): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();

  [...allProjects, ...allDevlogs]
    .filter((item) => !item.draft)
    .forEach((item) => {
      item.tags.forEach((tag: string) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Mood emoji helper for devlog
export function getMoodEmoji(mood?: string): string {
  const moodMap: Record<string, string> = {
    great: '🚀',
    good: '😊',
    neutral: '😐',
    tired: '😴',
    challenging: '💪',
  };
  return moodMap[mood || 'good'] || '😊';
}

// Status badge helper for projects
export function getStatusBadge(status?: string): { text: string; color: string } {
  const statusMap: Record<string, { text: string; color: string }> = {
    completed: { text: 'Completed', color: 'bg-green-500/20 text-green-400' },
    'in-progress': { text: 'In Progress', color: 'bg-yellow-500/20 text-yellow-400' },
    planned: { text: 'Planned', color: 'bg-blue-500/20 text-blue-400' },
  };
  return statusMap[status || 'completed'] || statusMap.completed;
}
