import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PageTransition } from '@/components/page-transition';

export const metadata = {
  title: 'About',
  description: '개발자 소개와 이력',
};

export default function AboutPage() {
  return (
    <PageTransition>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Profile Section */}
          <aside>
            <div className="sticky top-24">
              <div className="aspect-square w-48 overflow-hidden rounded-2xl border-4 border-accent/20 bg-gradient-to-br from-accent/20 to-accent/5">
                <img
                  src="/images/profile.jpg"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <h1 className="mt-6 text-2xl font-bold">배정길</h1>
              <p className="mt-2 text-text-muted">앱 개발자 (모아허브 & 바로맵)</p>

              <div className="mt-6 space-y-2 text-sm">
                <a
                  href="mailto:jejuolleapps@gmail.com"
                  target="_self"
                  className="flex items-center gap-2 text-text-muted hover:text-accent"
                >
                  <EmailIcon /> jejuolleapps@gmail.com
                </a>
                <a
                  href="https://moahub.co.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-muted hover:text-accent"
                >
                  <WebIcon /> moahub.co.kr
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
                  안녕하세요! 개인 개발자 배정길입니다.
                  사용자 경험을 중요시하며, 깔끔하고 직관적인 서비스를 만드는 것을 좋아합니다.
                </p>
                <p>
                  모아허브(MoaHub)와 바로맵(BaroMap) 등 웹/앱 서비스를 개발하고 운영하고 있습니다.
                  개발 외에도 디자인, 기획에 관심이 많습니다.
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
                  role="개인 개발자"
                  company="모아허브"
                  period="2025 - Present"
                  description="MoaHub, 바로맵 등 웹/앱 서비스 개발 및 운영"
                />
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
    </PageTransition>
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

function WebIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
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
