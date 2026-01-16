'use client';

import { useEffect, useRef } from 'react';

interface Block {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  floatOffset: number;
  floatSpeed: number;
  opacity: number;
  color: string;
}

export function FloatingGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const blocks: Block[] = [];

    const colors = [
      'rgba(16, 185, 129, 0.6)',
      'rgba(52, 211, 153, 0.5)',
      'rgba(99, 102, 241, 0.4)',
      'rgba(139, 92, 246, 0.3)',
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBlocks();
    };

    const initBlocks = () => {
      blocks.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 40000);

      for (let i = 0; i < count; i++) {
        blocks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width, height } = canvas;

      // Clear
      ctx.fillStyle = '#0a0f1a';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;

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

      // Draw floating blocks
      blocks.forEach((block) => {
        ctx.save();

        // Float animation
        const floatY = Math.sin(time * block.floatSpeed + block.floatOffset) * 20;
        const floatX = Math.cos(time * block.floatSpeed * 0.5 + block.floatOffset) * 10;

        ctx.translate(block.x + floatX, block.y + floatY);
        ctx.rotate(block.rotation);

        // Draw block with rounded corners
        const size = block.size;
        const radius = size * 0.15;

        ctx.beginPath();
        ctx.roundRect(-size / 2, -size / 2, size, size, radius);
        ctx.fillStyle = block.color;
        ctx.fill();

        // Draw border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw inner details (code-like lines)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        const lineHeight = size * 0.1;
        const margin = size * 0.15;
        for (let i = 0; i < 3; i++) {
          const lineWidth = (Math.random() * 0.4 + 0.3) * (size - margin * 2);
          ctx.fillRect(
            -size / 2 + margin,
            -size / 2 + margin + i * (lineHeight + 4),
            lineWidth,
            lineHeight
          );
        }

        ctx.restore();

        // Update rotation
        block.rotation += block.rotationSpeed;
      });

      // Draw connecting lines between close blocks
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const dx = blocks[i].x - blocks[j].x;
          const dy = blocks[i].y - blocks[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(blocks[i].x, blocks[i].y);
            ctx.lineTo(blocks[j].x, blocks[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - dist / 200)})`;
            ctx.stroke();
          }
        }
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
