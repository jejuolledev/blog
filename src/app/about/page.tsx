import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata = {
  title: 'About',
  description: '개발자 소개와 이력',
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Profile Section */}
          <aside>
            <div className="sticky top-24">
              <div className="aspect-square w-48 overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5">
                <div className="flex h-full items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
              <h1 className="mt-6 text-2xl font-bold">jejuolledev</h1>
              <p className="mt-2 text-text-muted">Frontend Developer</p>

              <div className="mt-6 space-y-2 text-sm">
                <a
                  href="https://github.com/jejuolledev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent"
                >
                  <GithubIcon /> github.com/jejuolledev
                </a>
                <a
                  href="mailto:hello@jejuolledev.com"
                  className="flex items-center gap-2 text-text-muted hover:text-accent"
                >
                  <EmailIcon /> hello@jejuolledev.com
                </a>
              </div>
            </div>
          </aside>

          {/* Content Section */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold">About Me</h2>
              <div className="mt-4 space-y-4 text-text-muted">
                <p>
                  안녕하세요! 프론트엔드 개발자입니다.
                  사용자 경험을 중요시하며, 깔끔하고 직관적인 인터페이스를 만드는 것을 좋아합니다.
                </p>
                <p>
                  제주에서 살면서 자연과 함께하는 삶의 여유를 즐기고 있습니다.
                  개발 외에도 디자인, 사진, 여행에 관심이 많습니다.
                </p>
                <p>
                  이 블로그에서는 제가 진행한 프로젝트들과 개발하면서 배운 것들을 기록합니다.
                  함께 성장하는 개발자가 되고 싶습니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold">Experience</h2>
              <div className="mt-6 space-y-6">
                <ExperienceItem
                  role="Frontend Developer"
                  company="개인 프로젝트"
                  period="2023 - Present"
                  description="다양한 웹/앱 프로젝트 개발 및 운영"
                />
                <ExperienceItem
                  role="Web Developer"
                  company="스타트업"
                  period="2021 - 2023"
                  description="React 기반 서비스 개발, 디자인 시스템 구축"
                />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold">Education</h2>
              <div className="mt-6">
                <div className="rounded-xl border border-canvas-muted p-4">
                  <h3 className="font-semibold">컴퓨터공학과</h3>
                  <p className="text-sm text-text-muted">2017 - 2021</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold">What I Value</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ValueCard
                  title="사용자 중심"
                  description="기술보다 사용자 경험을 우선시합니다."
                />
                <ValueCard
                  title="지속적 학습"
                  description="새로운 기술을 배우는 것을 즐깁니다."
                />
                <ValueCard
                  title="깔끔한 코드"
                  description="읽기 쉽고 유지보수하기 좋은 코드를 작성합니다."
                />
                <ValueCard
                  title="협업"
                  description="좋은 결과물은 좋은 협업에서 나옵니다."
                />
              </div>
            </section>

            <div className="flex gap-4">
              <Link
                href="/projects"
                className="rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                프로젝트 보기
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-canvas-muted px-6 py-3 font-semibold hover:border-accent hover:text-accent"
              >
                연락하기
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function ExperienceItem({
  role,
  company,
  period,
  description,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-canvas-muted p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{role}</h3>
          <p className="text-sm text-text-muted">{company}</p>
        </div>
        <span className="text-sm text-text-muted">{period}</span>
      </div>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </div>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-canvas-muted p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-text-muted">{description}</p>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
