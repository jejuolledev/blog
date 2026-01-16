'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Monitor({ isPoweredOn, children }: { isPoweredOn: boolean; children?: React.ReactNode }) {
  const monitorRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [screenGlow, setScreenGlow] = useState(0);

  useEffect(() => {
    if (isPoweredOn) {
      const interval = setInterval(() => {
        setScreenGlow(prev => Math.min(prev + 0.1, 1));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPoweredOn]);

  useFrame((state) => {
    if (monitorRef.current) {
      // Subtle floating animation
      monitorRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={monitorRef} position={[0, 0, 0]}>
      {/* Monitor Base */}
      <mesh position={[0, -1.2, 0.3]}>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor Stand */}
      <mesh position={[0, -0.7, 0.3]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor Body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[3.2, 2, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Screen Bezel */}
      <mesh position={[0, 0.3, 0.11]}>
        <boxGeometry args={[2.9, 1.7, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.3, 0.13]}>
        <planeGeometry args={[2.7, 1.5]} />
        <meshBasicMaterial
          color={isPoweredOn ? '#0a1a0f' : '#050505'}
          toneMapped={false}
        />
      </mesh>

      {/* Screen Glow Effect */}
      {isPoweredOn && (
        <pointLight
          position={[0, 0.3, 1]}
          color="#33ff33"
          intensity={screenGlow * 0.5}
          distance={3}
        />
      )}

      {/* Power LED */}
      <mesh position={[1.3, -0.35, 0.15]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial
          color={isPoweredOn ? '#00ff00' : '#333333'}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, -1.4, 1.2]}>
      {/* Keyboard body */}
      <mesh>
        <boxGeometry args={[2, 0.08, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Keys pattern */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-0.9 + i * 0.2, 0.05, -0.1]}>
          <boxGeometry args={[0.15, 0.03, 0.12]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      ))}
    </group>
  );
}

function Mouse() {
  return (
    <group position={[1.5, -1.38, 1.2]}>
      <mesh>
        <boxGeometry args={[0.25, 0.1, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <mesh position={[0, -1.5, 0.5]} rotation={[-0.02, 0, 0]}>
      <boxGeometry args={[5, 0.1, 3]} />
      <meshStandardMaterial color="#3d2b1f" metalness={0.1} roughness={0.8} />
    </mesh>
  );
}

function Room() {
  return (
    <>
      {/* Back wall */}
      <mesh position={[0, 1, -2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#1a1820" />
      </mesh>
      {/* Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#0f0e12" />
      </mesh>
    </>
  );
}

function Scene({ isPoweredOn }: { isPoweredOn: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 4]} fov={45} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <spotLight
        position={[3, 4, 3]}
        intensity={0.5}
        angle={0.5}
        penumbra={0.5}
        castShadow
      />
      <pointLight position={[-2, 2, 2]} intensity={0.2} color="#4a90d9" />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Monitor isPoweredOn={isPoweredOn} />
      </Float>
      <Keyboard />
      <Mouse />
      <Desk />
      <Room />
    </>
  );
}

interface ComputerSceneProps {
  isPoweredOn: boolean;
  onPowerOn: () => void;
}

export function ComputerScene({ isPoweredOn, onPowerOn }: ComputerSceneProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="computer-scene-placeholder">
        <div className="loading-text">Loading 3D Scene...</div>
      </div>
    );
  }

  return (
    <div className="computer-scene" onClick={!isPoweredOn ? onPowerOn : undefined}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene isPoweredOn={isPoweredOn} />
        </Suspense>
      </Canvas>
      {!isPoweredOn && (
        <div className="power-prompt">
          <div className="power-button">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v10M18.36 6.64a9 9 0 1 1-12.73 0" />
            </svg>
          </div>
          <p>Click to power on</p>
        </div>
      )}
      <style jsx>{`
        .computer-scene {
          width: 100%;
          height: 100vh;
          background: linear-gradient(180deg, #0a0a0f 0%, #1a1a25 100%);
          position: relative;
          cursor: ${isPoweredOn ? 'default' : 'pointer'};
        }
        .computer-scene-placeholder {
          width: 100%;
          height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loading-text {
          color: #33ff33;
          font-family: 'Courier New', monospace;
        }
        .power-prompt {
          position: absolute;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: #666;
          animation: pulse 2s infinite;
        }
        .power-button {
          width: 80px;
          height: 80px;
          border: 2px solid #333;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          transition: all 0.3s ease;
        }
        .power-button:hover {
          border-color: #33ff33;
          color: #33ff33;
          box-shadow: 0 0 20px #33ff3333;
        }
        .power-prompt p {
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
