'use client';

import { useEffect, useRef } from 'react';

const swiftCodeSnippets = [
  `import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            MapView()
        }
    }
}`,
  `@Observable
class LocationManager {
    var location: CLLocation?

    func requestLocation() {
        // Get user location
    }
}`,
  `struct MapView: View {
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(
            latitude: 33.4996,
            longitude: 126.5312
        ),
        span: MKCoordinateSpan(
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
        )
    )
}`,
  `func fetchNearbyPlaces() async {
    let request = MKLocalSearch.Request()
    request.naturalLanguageQuery = "화장실"
    request.region = mapRegion

    let search = MKLocalSearch(request: request)
    let response = try await search.start()
}`,
  `extension Color {
    static let moahub = Color(
        red: 16/255,
        green: 185/255,
        blue: 129/255
    )
}`,
  `struct PlaceAnnotation: View {
    let place: Place

    var body: some View {
        VStack {
            Image(systemName: "mappin.circle.fill")
                .foregroundStyle(.moahub)
            Text(place.name)
                .font(.caption)
        }
    }
}`,
];

interface CodeBlock {
  x: number;
  y: number;
  code: string;
  charIndex: number;
  opacity: number;
  speed: number;
  fontSize: number;
}

export function SwiftCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const codeBlocks: CodeBlock[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCodeBlocks();
    };

    const initCodeBlocks = () => {
      codeBlocks.length = 0;
      const count = Math.floor(canvas.width / 400) + 1;

      for (let i = 0; i < count * 2; i++) {
        codeBlocks.push({
          x: (i % count) * 400 + Math.random() * 100,
          y: Math.random() * canvas.height,
          code: swiftCodeSnippets[Math.floor(Math.random() * swiftCodeSnippets.length)],
          charIndex: 0,
          opacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.5 + 0.3,
          fontSize: Math.random() * 4 + 12,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width, height } = canvas;

      // Clear with dark gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a0f1a');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw code blocks
      codeBlocks.forEach((block) => {
        ctx.font = `${block.fontSize}px "SF Mono", "Fira Code", monospace`;

        const lines = block.code.split('\n');
        const lineHeight = block.fontSize * 1.5;

        let totalChars = 0;
        lines.forEach((line, lineIndex) => {
          const y = block.y + lineIndex * lineHeight;

          if (y < -lineHeight * lines.length) {
            block.y = height + 100;
            block.charIndex = 0;
            block.code = swiftCodeSnippets[Math.floor(Math.random() * swiftCodeSnippets.length)];
          }

          if (y > -lineHeight && y < height + lineHeight) {
            // Color coding for Swift syntax
            let displayLine = line.slice(0, Math.max(0, block.charIndex - totalChars));

            // Keywords
            const keywords = ['import', 'struct', 'var', 'let', 'func', 'class', 'extension', 'some', 'async', 'await', 'try', 'private', 'static', '@State', '@Observable'];
            const types = ['View', 'Color', 'String', 'Int', 'CLLocation', 'MKCoordinateRegion', 'MKLocalSearch', 'Image', 'Text', 'VStack', 'NavigationStack'];

            // Draw with syntax highlighting
            let xOffset = block.x;
            const words = displayLine.split(/(\s+)/);

            words.forEach((word) => {
              if (keywords.some(k => word.includes(k))) {
                ctx.fillStyle = `rgba(198, 120, 221, ${block.opacity + 0.2})`; // Purple for keywords
              } else if (types.some(t => word.includes(t))) {
                ctx.fillStyle = `rgba(86, 182, 194, ${block.opacity + 0.2})`; // Cyan for types
              } else if (word.includes('"') || word.includes("'")) {
                ctx.fillStyle = `rgba(152, 195, 121, ${block.opacity + 0.2})`; // Green for strings
              } else if (word.includes('//')) {
                ctx.fillStyle = `rgba(92, 99, 112, ${block.opacity})`; // Gray for comments
              } else if (/^\d+$/.test(word) || word.includes('/255')) {
                ctx.fillStyle = `rgba(209, 154, 102, ${block.opacity + 0.2})`; // Orange for numbers
              } else {
                ctx.fillStyle = `rgba(171, 178, 191, ${block.opacity})`; // Default gray
              }

              ctx.fillText(word, xOffset, y);
              xOffset += ctx.measureText(word).width;
            });
          }

          totalChars += line.length + 1;
        });

        // Update
        block.y -= block.speed;
        if (block.charIndex < block.code.length + 50) {
          block.charIndex += 2;
        }
      });

      // Add some glowing dots
      for (let i = 0; i < 20; i++) {
        const x = Math.sin(Date.now() * 0.001 + i * 0.5) * width * 0.4 + width / 2;
        const y = Math.cos(Date.now() * 0.0008 + i * 0.3) * height * 0.4 + height / 2;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${0.3 + Math.sin(Date.now() * 0.003 + i) * 0.2})`;
        ctx.fill();
      }

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
