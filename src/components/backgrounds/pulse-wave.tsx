'use client';

import { useEffect, useRef } from 'react';

interface Pulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

export function PulseWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const pulses: Pulse[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create initial pulses
    const createPulse = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      pulses.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 200 + 100,
        alpha: 1,
        speed: Math.random() * 2 + 1,
      });
    };

    // Create pulses periodically
    const pulseInterval = setInterval(() => {
      if (pulses.length < 15) {
        createPulse();
      }
    }, 500);

    // Initial pulses
    for (let i = 0; i < 5; i++) {
      createPulse();
    }

    const draw = () => {
      const { width, height } = canvas;

      // Clear with gradient background
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(1, '#020617');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];

        // Draw pulse rings
        for (let j = 0; j < 3; j++) {
          const ringRadius = pulse.radius - j * 20;
          if (ringRadius > 0) {
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(16, 185, 129, ${pulse.alpha * (1 - j * 0.3)})`;
            ctx.lineWidth = 2 - j * 0.5;
            ctx.stroke();
          }
        }

        // Draw center dot
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${pulse.alpha})`;
        ctx.fill();

        // Update pulse
        pulse.radius += pulse.speed;
        pulse.alpha = 1 - (pulse.radius / pulse.maxRadius);

        // Remove completed pulses
        if (pulse.radius >= pulse.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // Draw connection lines between nearby pulse centers
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < pulses.length; i++) {
        for (let j = i + 1; j < pulses.length; j++) {
          const dx = pulses[i].x - pulses[j].x;
          const dy = pulses[i].y - pulses[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 300) {
            ctx.beginPath();
            ctx.moveTo(pulses[i].x, pulses[i].y);
            ctx.lineTo(pulses[j].x, pulses[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - dist / 300)})`;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(pulseInterval);
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
