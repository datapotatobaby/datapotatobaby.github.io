
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Pyramid = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.3, 1, 1.5, 4]} />
      <meshPhongMaterial 
        color="#3b82f6" 
        shininess={100}
        transparent
        opacity={0.9}
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
        <Pyramid />
      </Canvas>
    </div>
  );
};

export default AnimatedPyramid;
