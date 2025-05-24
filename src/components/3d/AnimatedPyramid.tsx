
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const PyramidBase = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate base clockwise
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -0.3, 0]}>
      <cylinderGeometry args={[0.8, 1.2, 1.2, 4]} />
      <meshPhongMaterial 
        color="#3b82f6" 
        shininess={100}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const PyramidTop = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate top counter-clockwise and add floating motion
      meshRef.current.rotation.y -= 0.015;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
      // Floating motion with slight offset
      meshRef.current.position.y = 0.8 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.8, 0]}>
      <cylinderGeometry args={[0.2, 0.6, 0.8, 4]} />
      <meshPhongMaterial 
        color="#06b6d4" 
        shininess={100}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

const AnimatedPyramid = () => {
  return (
    <div className="w-48 h-48 mx-auto">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[2, 2, 2]} 
          intensity={1}
          castShadow
        />
        <pointLight position={[-2, -2, 2]} intensity={0.5} color="#06b6d4" />
        <PyramidBase />
        <PyramidTop />
      </Canvas>
    </div>
  );
};

export default AnimatedPyramid;
