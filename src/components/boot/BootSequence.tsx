'use client';

import { useState, useEffect, useCallback } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: 'BIOS Version 1.0.0', delay: 50 },
  { text: 'Copyright (C) 2025 모아허브', delay: 80 },
  { text: '', delay: 30 },
  { text: 'CPU: Creative Mind @ 3.5GHz', delay: 60 },
  { text: 'Memory Test: 16384MB OK', delay: 80 },
  { text: '', delay: 30 },
  { text: 'Detecting IDE Master... [Developer Skills]', delay: 60 },
  { text: 'Detecting IDE Slave... [Design Sense]', delay: 60 },
  { text: '', delay: 30 },
  { text: 'Loading Operating System...', delay: 100 },
  { text: '██████████████████████████████ 100%', delay: 150 },
  { text: '', delay: 30 },
  { text: 'Welcome to 배정길\'s Portfolio', delay: 100 },
  { text: 'Initializing workspace...', delay: 150 },
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Skip animation on click/key
  const handleSkip = useCallback(() => {
    if (currentIndex < bootMessages.length) {
      setLines(bootMessages.map(m => m.text));
      setCurrentIndex(bootMessages.length);
      setTimeout(onComplete, 500);
    }
  }, [currentIndex, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect for current line
  useEffect(() => {
    if (currentIndex >= bootMessages.length) return;

    const message = bootMessages[currentIndex];

    if (!isTyping) {
      setIsTyping(true);
      setCurrentText('');
      setCharIndex(0);
    }

    if (charIndex < message.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + message.text[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 8);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, message.text]);
        setCurrentText('');
        setCharIndex(0);
        setIsTyping(false);
        setCurrentIndex(prev => prev + 1);
      }, message.delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, charIndex, isTyping]);

  // Complete when all messages shown
  useEffect(() => {
    if (currentIndex === bootMessages.length) {
      const timeout = setTimeout(onComplete, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, onComplete]);

  return (
    <div
      className="boot-sequence"
      onClick={handleSkip}
      onKeyDown={handleSkip}
      tabIndex={0}
    >
      <div className="boot-screen">
        <div className="boot-content">
          {lines.map((line, i) => (
            <div key={i} className="boot-line">
              {line}
            </div>
          ))}
          {currentIndex < bootMessages.length && (
            <div className="boot-line">
              {currentText}
              <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>█</span>
            </div>
          )}
        </div>
        <div className="skip-hint">
          Click anywhere to skip
        </div>
      </div>
      <style jsx>{`
        .boot-sequence {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .boot-screen {
          width: 100%;
          max-width: 800px;
          padding: 40px;
          font-family: 'Courier New', monospace;
          color: #33ff33;
          text-shadow: 0 0 10px #33ff33;
        }
        .boot-content {
          min-height: 400px;
        }
        .boot-line {
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
        }
        .cursor {
          animation: blink 1s infinite;
        }
        .cursor.hidden {
          opacity: 0;
        }
        .cursor.visible {
          opacity: 1;
        }
        .skip-hint {
          margin-top: 40px;
          font-size: 12px;
          color: #33ff3366;
          text-align: center;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
