'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BootSequence } from '@/components/boot/BootSequence';

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
    // Check if user has visited before in this session
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

  // If user has visited before, show content directly
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.5 },
        scale: { duration: 0.6 },
      }}
      className="min-h-screen bg-canvas"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1a15] to-canvas px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative mx-auto max-w-5xl">
          <p className="font-mono text-sm text-emerald-400">~/moahub</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            배정길의 작업실
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            개인 개발자로서 앱과 웹 서비스를 만들고 있습니다.
            <br />
            그 과정과 배움을 이곳에 기록합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-600"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/devlog"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
            >
              개발 일지
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <QuickLink
            href="/projects"
            title="Projects"
            description="앱과 웹 프로젝트들"
            icon="📱"
          />
          <QuickLink
            href="/devlog"
            title="Devlog"
            description="개발 일지와 기록"
            icon="📝"
          />
          <QuickLink href="/about" title="About" description="소개와 연락처" icon="👋" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-canvas-muted px-6 py-12">
        <div className="mx-auto max-w-5xl text-center text-sm text-text-muted">
          <div className="mb-4 flex justify-center gap-6">
            <a href="https://moahub.co.kr" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              MoaHub
            </a>
            <Link href="/contact" className="hover:text-accent">
              Contact
            </Link>
          </div>
          <p>© 2026 모아허브. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
}

function QuickLink({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-canvas-muted bg-canvas p-6 transition-all hover:border-accent hover:shadow-lg"
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="mt-4 text-xl font-semibold group-hover:text-accent">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </Link>
  );
}
