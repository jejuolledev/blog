'use client';

import { useEffect, useRef } from 'react';

export function AuroraWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width, height } = canvas;

      // Clear with dark background
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, width, height);

      // Draw multiple aurora waves
      const waves = [
        { color: 'rgba(16, 185, 129, 0.3)', speed: 0.02, amplitude: 100, offset: 0 },
        { color: 'rgba(52, 211, 153, 0.2)', speed: 0.015, amplitude: 80, offset: 2 },
        { color: 'rgba(99, 102, 241, 0.2)', speed: 0.025, amplitude: 120, offset: 4 },
        { color: 'rgba(139, 92, 246, 0.15)', speed: 0.01, amplitude: 60, offset: 6 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 5) {
          const y = height / 2 +
            Math.sin((x * 0.003) + (time * wave.speed) + wave.offset) * wave.amplitude +
            Math.sin((x * 0.007) + (time * wave.speed * 0.5)) * (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Create gradient
        const gradient = ctx.createLinearGradient(0, height / 2, 0, height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Add floating particles
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time * 0.01 + i * 0.5) + 1) * width / 2;
        const y = (Math.cos(time * 0.008 + i * 0.3) + 1) * height / 2;
        const size = Math.sin(time * 0.02 + i) * 2 + 3;
        const alpha = Math.sin(time * 0.01 + i * 0.2) * 0.3 + 0.4;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.fill();
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    />
  );
}
