import Link from 'next/link';
import { getPublishedDevlogs, getMoodEmoji } from '@/lib/content';
import { format } from 'date-fns';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata = {
  title: 'Devlog',
  description: '개발 일지와 기록들',
};

export default function DevlogPage() {
  const devlogs = getPublishedDevlogs();

  // Group by year-month
  const groupedDevlogs = devlogs.reduce(
    (acc, devlog) => {
      const yearMonth = format(new Date(devlog.date), 'yyyy년 MM월');
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(devlog);
      return acc;
    },
    {} as Record<string, typeof devlogs>
  );

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Devlog</h1>
          <p className="mt-4 text-text-muted">
            개발하면서 배우고 느낀 것들을 일기처럼 기록합니다.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedDevlogs).map(([yearMonth, logs]) => (
            <section key={yearMonth}>
              <h2 className="mb-6 text-xl font-semibold text-text-muted">{yearMonth}</h2>
              <div className="space-y-4">
                {logs.map((devlog) => (
                  <Link
                    key={devlog._id}
                    href={`/devlog/${devlog.slug}`}
                    className="group block rounded-xl border border-canvas-muted bg-canvas p-5 transition-all hover:border-accent hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getMoodEmoji(devlog.mood)}</span>
                          <span className="text-sm text-text-muted">
                            {format(new Date(devlog.date), 'MM.dd (E)')}
                          </span>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">
                          {devlog.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-text-muted">
                          {devlog.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {devlog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-canvas-muted px-2 py-0.5 text-xs text-text-muted"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {devlogs.length === 0 && (
          <div className="py-20 text-center text-text-muted">
            <p>아직 개발 일지가 없습니다.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
