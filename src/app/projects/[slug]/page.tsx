import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allProjects } from 'contentlayer/generated';
import { getProjectBySlug, getStatusBadge } from '@/lib/content';
import { format } from 'date-fns';
import { MdxContent } from '@/components/mdx-content';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PageTransition } from '@/components/page-transition';

export async function generateStaticParams() {
  return allProjects
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const status = getStatusBadge(project.status);

  return (
    <PageTransition>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-text-muted hover:text-accent"
        >
          ← Back to Projects
        </Link>

        <article className="mt-8">
          <header className="border-b border-canvas-muted pb-8">
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-sm ${status.color}`}>
                {status.text}
              </span>
              <span className="text-sm text-text-muted">
                {format(new Date(project.date), 'yyyy년 MM월 dd일')}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold">{project.title}</h1>

            <p className="mt-4 text-lg text-text-muted">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-canvas-muted px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-6 flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Live Demo →
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-canvas-muted px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent"
                  >
                    GitHub
                  </a>
                )}
              </div>
            )}
          </header>

          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
            <MdxContent code={project.body.code} />
          </div>
        </article>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
