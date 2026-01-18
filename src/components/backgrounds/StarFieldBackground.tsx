'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RotatingStars() {
    const ref = useRef<any>();

    useFrame((state, delta) => {
        if (ref.current) {
            // Rotate the stars slowly
            ref.current.rotation.x -= delta / 50;
            ref.current.rotation.y -= delta / 60;
        }
    });

    return (
        <group ref={ref}>
            <Stars
                radius={300} // Radius of the inner sphere (default=100)
                depth={50}   // Depth of area where stars should fit (default=50)
                count={5000} // Amount of stars (default=5000)
                factor={4}   // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade         // Faded dots (default=false)
                speed={2}    // Twinkle speed
            />
        </group>
    );
}

// Custom stars implementation for more control if needed, but R3F Stars is pretty good.
// Let's stick to a simple R3F Stars implementation first for standard "Deep Space" look.

export function StarFieldBackground() {
    return (
        <div className="absolute inset-0 z-0 bg-[#050510]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <RotatingStars />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#050510]/50 pointer-events-none" />
        </div>
    );
}
