'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export interface NetworkBackgroundProps {
  color?: string;
  particleCountMultiplier?: number;
  speedMultiplier?: number;
  connectionDistance?: number;
  interactionRadius?: number;
}

export function NetworkBackground({
  color = 'rgba(16, 185, 129', // Default Emerald green without alpha/closing parenthesis if we want to manipulate alpha
  particleCountMultiplier = 1,
  speedMultiplier = 1,
  connectionDistance = 120,
  interactionRadius = 150
}: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  // Parse color to rgb values if possible, or just use as base
  // For simplicity dealing with existing code which constructs rgba strings manually:
  // We'll assume the input is like "rgba(r, g, b" or "#hex" and we might need to handle it.
  // Given current usage is rgba(16, 185, 129, alpha), let's make the prop customizable.
  // To keep it simple and robust with the existing alpha manipulations in the drawing code, 
  // let's expect the `color` prop to be the r,g,b triplet e.g. "16, 185, 129"

  // Actually, to make it easier for usage, let's accept "rgba(r,g,b)" string and extract or just pass r,g,b string.
  // Let's refine the prop to be `baseColorRgb` like "16, 185, 129".

  const baseColor = color.startsWith('rgba')
    ? color.match(/\d+,\s*\d+,\s*\d+/)?.[0] || '16, 185, 129'
    : '16, 185, 129'; // Fallback

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 15000) * particleCountMultiplier;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        vy: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        radius: Math.random() * 2 + 1,
      });
    }

    particlesRef.current = particles;
  }, [particleCountMultiplier, speedMultiplier]);

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

      if (dist < interactionRadius) {
        const force = (interactionRadius - dist) / interactionRadius;
        particle.vx -= (dx / dist) * force * 0.02 * speedMultiplier;
        particle.vy -= (dy / dist) * force * 0.02 * speedMultiplier;
      }

      // Limit velocity
      const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      const maxSpeed = 2 * speedMultiplier;
      if (currentSpeed > maxSpeed) {
        particle.vx = (particle.vx / currentSpeed) * maxSpeed;
        particle.vy = (particle.vy / currentSpeed) * maxSpeed;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseColor}, 0.8)`;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(${baseColor}, ${0.3 * (1 - distance / connectionDistance)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (dist < interactionRadius + 50) { // Slightly larger radius for mouse connections
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(${baseColor}, ${0.5 * (1 - dist / (interactionRadius + 50))})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw mouse glow
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
    gradient.addColorStop(0, `rgba(${baseColor}, 0.15)`);
    gradient.addColorStop(1, `rgba(${baseColor}, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
    ctx.fill();

    animationRef.current = requestAnimationFrame(animate);
  }, [baseColor, connectionDistance, interactionRadius, speedMultiplier]);

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
