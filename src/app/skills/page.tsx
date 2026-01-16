import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata = {
  title: 'Skills',
  description: '기술 스택과 도구들',
};

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Three.js', level: 60 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 70 },
      { name: 'Supabase', level: 75 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'REST API', level: 80 },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'Figma', level: 75 },
      { name: 'VS Code', level: 90 },
      { name: 'Vercel', level: 80 },
    ],
  },
];

const currentlyLearning = [
  'Rust',
  'WebGL & Shaders',
  'React Native',
  'GraphQL',
];

export default function SkillsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Skills</h1>
          <p className="mt-4 text-text-muted">
            사용하는 기술 스택과 도구들입니다.
          </p>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category) => (
            <section key={category.title}>
              <h2 className="mb-6 text-2xl font-semibold">{category.title}</h2>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold">Currently Learning</h2>
          <div className="flex flex-wrap gap-3">
            {currentlyLearning.map((item) => (
              <span
                key={item}
                className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold">Soft Skills</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SoftSkillCard
              title="문제 해결"
              description="복잡한 문제를 작은 단위로 분해하고 해결합니다."
            />
            <SoftSkillCard
              title="커뮤니케이션"
              description="팀원들과 명확하게 소통하고 협업합니다."
            />
            <SoftSkillCard
              title="자기 주도 학습"
              description="새로운 기술을 빠르게 습득합니다."
            />
            <SoftSkillCard
              title="사용자 중심 사고"
              description="사용자 관점에서 제품을 바라봅니다."
            />
            <SoftSkillCard
              title="문서화"
              description="코드와 프로세스를 명확하게 문서화합니다."
            />
            <SoftSkillCard
              title="적응력"
              description="변화하는 요구사항에 유연하게 대응합니다."
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-text-muted">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-canvas-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function SoftSkillCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-canvas-muted p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-text-muted">{description}</p>
    </div>
  );
}
