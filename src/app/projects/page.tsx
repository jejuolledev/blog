import Link from 'next/link';
import { getPublishedProjects, getStatusBadge } from '@/lib/content';
import { format } from 'date-fns';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata = {
  title: 'Projects',
  description: '개발한 프로젝트들을 소개합니다.',
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="mt-4 text-text-muted">
            앱과 웹 프로젝트들입니다. 클릭해서 자세한 내용을 확인하세요.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => {
            const status = getStatusBadge(project.status);
            return (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className="group rounded-2xl border border-canvas-muted bg-canvas p-6 transition-all hover:border-accent hover:shadow-xl"
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video rounded-xl bg-gradient-to-br from-canvas-muted to-canvas-muted/50 flex items-center justify-center">
                  <span className="text-4xl opacity-50">🖥️</span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs ${status.color}`}>
                      {status.text}
                    </span>
                    <span className="text-xs text-text-muted">
                      {format(new Date(project.date), 'yyyy.MM')}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-semibold group-hover:text-accent">
                    {project.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-text-muted">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-canvas-muted px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="py-20 text-center text-text-muted">
            <p>아직 프로젝트가 없습니다.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
