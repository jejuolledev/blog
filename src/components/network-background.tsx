'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 15000);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    particlesRef.current = particles;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear canvas
    ctx.fillStyle = 'rgba(10, 26, 21, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Move particle
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Mouse interaction - particles move away from mouse
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const force = (150 - dist) / 150;
        particle.vx -= (dx / dist) * force * 0.02;
        particle.vy -= (dy / dist) * force * 0.02;
      }

      // Limit velocity
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > 2) {
        particle.vx = (particle.vx / speed) * 2;
        particle.vy = (particle.vy / speed) * 2;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.3 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (dist < 200) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(52, 211, 153, ${0.5 * (1 - dist / 200)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw mouse glow
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
    ctx.fill();

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: 'linear-gradient(to bottom, #0a1a15, #0f172a)' }}
    />
  );
}
