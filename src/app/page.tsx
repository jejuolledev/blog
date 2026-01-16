'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BootSequence } from '@/components/boot/BootSequence';
import { FullscreenStack } from '@/components/fullscreen-stack';

const ComputerScene = dynamic(
  () => import('@/components/boot/ComputerScene').then((mod) => mod.ComputerScene),
  { ssr: false }
);

type BootState = 'off' | 'booting' | 'ready';

export default function HomePage() {
  const [bootState, setBootState] = useState<BootState>('off');
  const [showContent, setShowContent] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem('hasVisited');
    if (visited) {
      setHasVisited(true);
      setBootState('ready');
      setShowContent(true);
    }
  }, []);

  const handlePowerOn = () => {
    setBootState('booting');
  };

  const handleBootComplete = () => {
    setBootState('ready');
    sessionStorage.setItem('hasVisited', 'true');
    setTimeout(() => setShowContent(true), 500);
  };

  if (hasVisited && showContent) {
    return <MainContent />;
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      {bootState === 'off' && (
        <ComputerScene isPoweredOn={false} onPowerOn={handlePowerOn} />
      )}

      {bootState === 'booting' && <BootSequence onComplete={handleBootComplete} />}

      {bootState === 'ready' && (
        <div
          className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        >
          <MainContent />
        </div>
      )}
    </div>
  );
}

function MainContent() {
  const sections = [
    {
      id: 'home',
      label: 'Home',
      content: <HomeSection />,
    },
    {
      id: 'projects',
      label: 'Projects',
      content: <ProjectsSection />,
    },
    {
      id: 'devlog',
      label: 'Devlog',
      content: <DevlogSection />,
    },
    {
      id: 'about',
      label: 'About',
      content: <AboutSection />,
    },
    {
      id: 'contact',
      label: 'Contact',
      content: <ContactSection />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FullscreenStack sections={sections} />
    </motion.div>
  );
}

function HomeSection() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-[#0a1a15] to-canvas px-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      <div className="relative max-w-4xl text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-emerald-400"
        >
          ~/moahub
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-5xl font-bold tracking-tight md:text-7xl"
        >
          배정길의 작업실
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl"
        >
          개인 개발자로서 앱과 웹 서비스를 만들고 있습니다.
          <br />
          그 과정과 배움을 이곳에 기록합니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
            iOS App Developer
          </span>
          <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
            Web Developer
          </span>
          <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
            모아허브 운영
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: 'MoaHub (모아허브)',
      description: 'MBTI, 타로, 심리테스트와 미니게임을 즐길 수 있는 인터랙티브 콘텐츠 플랫폼',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      url: 'https://moahub.co.kr',
      slug: '/projects/moahub',
      featured: true,
    },
    {
      title: '바로맵 (BaroMap)',
      description: '급할 때 필수! 화장실, 주차장, 약국을 1초 만에 찾는 iOS 앱',
      tags: ['Swift', 'SwiftUI', 'MapKit'],
      url: 'https://apps.apple.com/kr/app/바로맵/id6757288594',
      slug: '/projects/baromap',
      featured: true,
    },
  ];

  return (
    <div className="flex h-full items-center justify-center px-6 pt-20">
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">Projects</h2>
          <p className="mt-4 text-text-muted">만들고 운영 중인 서비스들</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={project.slug}
                className="group block rounded-2xl border border-canvas-muted bg-canvas-muted/30 p-8 transition-all hover:border-accent hover:shadow-xl"
              >
                {project.featured && (
                  <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    Featured
                  </span>
                )}
                <h3 className="text-2xl font-bold group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-3 text-text-muted">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-canvas px-3 py-1 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center text-sm text-accent">
                  자세히 보기 →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="/projects"
            className="inline-block rounded-lg border border-canvas-muted px-6 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent"
          >
            모든 프로젝트 보기 →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function DevlogSection() {
  const recentLogs = [
    {
      title: '블로그 리디자인 완료',
      date: '2024.03.20',
      mood: '🎨',
      slug: '/devlog/2024-03-20-blog-redesign',
    },
  ];

  return (
    <div className="flex h-full items-center justify-center px-6 pt-20">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">Devlog</h2>
          <p className="mt-4 text-text-muted">개발하면서 배우고 느낀 것들을 기록합니다</p>
        </motion.div>

        <div className="space-y-4">
          {recentLogs.map((log, index) => (
            <motion.div
              key={log.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={log.slug}
                className="group flex items-center gap-4 rounded-xl border border-canvas-muted bg-canvas-muted/30 p-6 transition-all hover:border-accent"
              >
                <span className="text-3xl">{log.mood}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-accent">
                    {log.title}
                  </h3>
                  <p className="text-sm text-text-muted">{log.date}</p>
                </div>
                <span className="text-text-muted group-hover:text-accent">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {recentLogs.length === 0 && (
          <div className="rounded-xl border border-canvas-muted bg-canvas-muted/30 p-12 text-center">
            <p className="text-text-muted">아직 개발 일지가 없습니다.</p>
            <p className="mt-2 text-sm text-text-muted">곧 첫 번째 글을 작성할 예정이에요!</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="/devlog"
            className="inline-block rounded-lg border border-canvas-muted px-6 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent"
          >
            모든 개발 일지 보기 →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="flex h-full items-center justify-center px-6 pt-20">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-6xl">
            👨‍💻
          </div>
          <h2 className="text-4xl font-bold md:text-5xl">배정길</h2>
          <p className="mt-2 text-xl text-accent">개인 개발자 · 모아허브 운영</p>
          <p className="mx-auto mt-6 max-w-2xl text-text-muted">
            앱과 웹 서비스를 만들고 운영하는 개인 개발자입니다.
            <br />
            사용자에게 즐거움과 편의를 주는 서비스를 만들고 있습니다.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="rounded-xl border border-canvas-muted bg-canvas-muted/30 px-6 py-4">
              <p className="text-2xl font-bold text-accent">2+</p>
              <p className="text-sm text-text-muted">운영 중인 서비스</p>
            </div>
            <div className="rounded-xl border border-canvas-muted bg-canvas-muted/30 px-6 py-4">
              <p className="text-2xl font-bold text-accent">2025~</p>
              <p className="text-sm text-text-muted">개발 시작</p>
            </div>
            <div className="rounded-xl border border-canvas-muted bg-canvas-muted/30 px-6 py-4">
              <p className="text-2xl font-bold text-accent">제주</p>
              <p className="text-sm text-text-muted">Based in</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="/about"
            className="inline-block rounded-lg border border-canvas-muted px-6 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent"
          >
            더 알아보기 →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="flex h-full items-center justify-center px-6 pt-20">
      <div className="w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold md:text-5xl">Contact</h2>
          <p className="mt-4 text-text-muted">
            프로젝트 협업, 질문, 또는 그냥 인사도 좋습니다!
          </p>

          <div className="mt-12 space-y-6">
            <a
              href="mailto:jejuolleapps@gmail.com"
              className="group flex items-center justify-center gap-4 rounded-xl border border-canvas-muted bg-canvas-muted/30 p-6 transition-all hover:border-accent"
            >
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <p className="text-sm text-text-muted">Email</p>
                <p className="font-medium group-hover:text-accent">jejuolleapps@gmail.com</p>
              </div>
            </a>

            <a
              href="https://moahub.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 rounded-xl border border-canvas-muted bg-canvas-muted/30 p-6 transition-all hover:border-accent"
            >
              <span className="text-2xl">🌐</span>
              <div className="text-left">
                <p className="text-sm text-text-muted">MoaHub</p>
                <p className="font-medium group-hover:text-accent">moahub.co.kr</p>
              </div>
            </a>
          </div>

          <p className="mt-16 text-sm text-text-muted">
            © 2026 모아허브. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
