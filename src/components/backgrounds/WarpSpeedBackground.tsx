'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WarpStars({ count = 1000 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const light = useRef<THREE.PointLight>(null);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random initial positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        // Rotate the whole tunnel slightly based on mouse? or just constant
        // mesh.current.rotation.z += 0.001

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time/position
            t = particle.t += speed / 2;
            const a = Math.cos(t) + mathSignedRandom(xFactor) * 0.1; // Oscillate
            const b = Math.sin(t) + mathSignedRandom(yFactor) * 0.1;
            const s = Math.cos(t);

            // Warp speed effect: Move towards camera (Z axis)
            // Reset if too close
            particle.zFactor += speed * 100; // Move forward
            if (particle.zFactor > 50) {
                particle.zFactor = -200; // Reset far back
                particle.xFactor = -50 + Math.random() * 100;
                particle.yFactor = -50 + Math.random() * 100;
            }

            dummy.position.set(
                particle.xFactor + Math.cos(t) * 5,
                particle.yFactor + Math.sin(t) * 5,
                particle.zFactor
            );

            // Scale based on speed for "streak" effect? (simple scaling for now)
            const scale = 0.5;
            dummy.scale.set(scale, scale, scale * 5); // Elongate in Z for warp look

            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();

            // Update the instance
            mesh.current!.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <boxGeometry args={[0.2, 0.2, 2]} />
                <meshBasicMaterial color="#a78bfa" transparent opacity={0.6} />
            </instancedMesh>
        </>
    );
}

function mathSignedRandom(n: number) {
    return (Math.random() - 0.5) * n;
}


// Improved Warp Effect using simple points coming at camera
function StarTunnel({ count = 4000 }) {
    const points = useRef<THREE.Points>(null);

    const [positions, sizes] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;   // y
            positions[i * 3 + 2] = Math.random() * 100 - 50;      // z
            sizes[i] = Math.random();
        }
        return [positions, sizes];
    }, [count]);

    useFrame((state) => {
        if (!points.current) return;

        const positions = points.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            let z = positions[i * 3 + 2];
            z += 0.8; // Move towards camera

            if (z > 50) {
                z = -100; // Reset
                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            }

            positions[i * 3 + 2] = z;
        }
        points.current.geometry.attributes.position.needsUpdate = true;

        // Rotate tunnel slightly
        points.current.rotation.z += 0.002;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#8b5cf6"
                sizeAttenuation={true}
                depthWrite={false}
                transparent
                opacity={0.8}
            />
        </points>
    );
}

export function WarpSpeedBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-[#050510]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <fog attach="fog" args={['#050510', 0, 80]} />
                <StarTunnel />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050510]/10 to-[#050510]/80 pointer-events-none" />
        </div>
    );
}
