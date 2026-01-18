'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BootSequence } from '@/components/boot/BootSequence';
import { FullscreenStack } from '@/components/fullscreen-stack';
import { NetworkBackground } from '@/components/network-background';
import { SwiftCodeBackground } from '@/components/backgrounds/swift-code';
import { CodeRainBackground } from '@/components/backgrounds/code-rain';
import { AuroraWaveBackground } from '@/components/backgrounds/aurora-wave';
import { PulseWaveBackground } from '@/components/backgrounds/pulse-wave';
import { StarFieldBackground } from '@/components/backgrounds/StarFieldBackground';
import { WarpSpeedBackground } from '@/components/backgrounds/WarpSpeedBackground';

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
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6">
      {/* Interactive Network Background */}
      <NetworkBackground />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center text-white">
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
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6 pt-20">
      <SwiftCodeBackground />
      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">Projects</h2>
          <p className="mt-4 text-gray-400">만들고 운영 중인 서비스들</p>
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
                className="group block rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                {project.featured && (
                  <span className="mb-4 inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                    Featured
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400">
                  {project.title}
                </h3>
                <p className="mt-3 text-gray-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center text-sm text-emerald-400">
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
            className="inline-block rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-emerald-500 hover:text-emerald-400"
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
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6 pt-20">
      <CodeRainBackground />
      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">Devlog</h2>
          <p className="mt-4 text-gray-400">개발하면서 배우고 느낀 것들을 기록합니다</p>
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
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/50"
              >
                <span className="text-3xl">{log.mood}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400">
                    {log.title}
                  </h3>
                  <p className="text-sm text-gray-500">{log.date}</p>
                </div>
                <span className="text-gray-500 group-hover:text-emerald-400">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {recentLogs.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-black/50 p-12 text-center backdrop-blur-sm">
            <p className="text-gray-400">아직 개발 일지가 없습니다.</p>
            <p className="mt-2 text-sm text-gray-500">곧 첫 번째 글을 작성할 예정이에요!</p>
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
            className="inline-block rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-emerald-500 hover:text-emerald-400"
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
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6 pt-20">
      <StarFieldBackground />
      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-6xl shadow-lg shadow-emerald-500/30">
            👨‍💻
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl">배정길</h2>
          <p className="mt-2 text-xl text-emerald-400">개인 개발자 · 모아허브 운영</p>
          <p className="mx-auto mt-6 max-w-2xl text-gray-300">
            앱과 웹 서비스를 만들고 운영하는 개인 개발자입니다.
            <br />
            사용자에게 즐거움과 편의를 주는 서비스를 만들고 있습니다.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="rounded-xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-emerald-400">2+</p>
              <p className="text-sm text-gray-400">운영 중인 서비스</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-emerald-400">2025~</p>
              <p className="text-sm text-gray-400">개발 시작</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-bold text-emerald-400">제주</p>
              <p className="text-sm text-gray-400">Based in</p>
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
            className="inline-block rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all hover:border-emerald-500 hover:text-emerald-400"
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
    <div className="relative flex h-full items-center justify-center overflow-hidden px-6 pt-20">
      <WarpSpeedBackground />
      <div className="relative z-10 w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl">Contact</h2>
          <p className="mt-4 text-gray-400">
            프로젝트 협업, 질문, 또는 그냥 인사도 좋습니다!
          </p>

          <div className="mt-12 space-y-6">
            <a
              href="mailto:jejuolleapps@gmail.com"
              className="group flex items-center justify-center gap-4 rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/50"
            >
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-white group-hover:text-emerald-400">jejuolleapps@gmail.com</p>
              </div>
            </a>

            <a
              href="https://moahub.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/50"
            >
              <span className="text-2xl">🌐</span>
              <div className="text-left">
                <p className="text-sm text-gray-500">MoaHub</p>
                <p className="font-medium text-white group-hover:text-emerald-400">moahub.co.kr</p>
              </div>
            </a>
          </div>

          <p className="mt-16 text-sm text-gray-500">
            © 2026 모아허브. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
