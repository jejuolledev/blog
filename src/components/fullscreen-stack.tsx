'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Section {
  id: string;
  label: string;
  content: ReactNode;
}

interface FullscreenStackProps {
  sections: Section[];
}

export function FullscreenStack({ sections }: FullscreenStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / sectionHeight);

      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < sections.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, sections.length]);

  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    isScrolling.current = true;
    setActiveIndex(index);

    container.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-canvas">
      {/* Main scrollable container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory overscroll-none"
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
        }}
      >
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="relative h-screen w-full snap-start snap-always"
            initial={false}
            animate={{
              opacity: activeIndex === index ? 1 : 0.3,
              scale: activeIndex === index ? 1 : 0.95,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full w-full overflow-hidden">
              {section.content}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Side navigation dots */}
      <nav className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
        <ul className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(index)}
                className="group flex items-center gap-3"
                aria-label={`Go to ${section.label}`}
              >
                <span
                  className={`hidden text-xs font-medium transition-all group-hover:inline-block ${activeIndex === index ? 'text-accent' : 'text-text-muted'
                    }`}
                >
                  {section.label}
                </span>
                <span
                  className={`block h-3 w-3 rounded-full border-2 transition-all ${activeIndex === index
                    ? 'border-accent bg-accent scale-125'
                    : 'border-text-muted bg-transparent hover:border-accent'
                    }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Top navigation bar */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-canvas-muted/30 bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => scrollToSection(0)}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full border border-white/10">
              <img src="/images/profile.jpg" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-bold">모아허브</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeIndex === index
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-muted hover:bg-canvas-muted hover:text-text'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* MoaHub link removed as requested */}
          </div>
        </div>
      </header>

      {/* Scroll indicator */}
      <AnimatePresence>
        {activeIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-text-muted"
            >
              <span className="text-xs">Scroll</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
