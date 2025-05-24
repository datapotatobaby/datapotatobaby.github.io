
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const ConvergingCircle = ({ 
  color, 
  startAngle, 
  delay 
}: { 
  color: string; 
  startAngle: number; 
  delay: number; 
}) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      const convergenceProgress = (Math.sin(time * 0.8) + 1) / 2; // 0 to 1
      
      // Calculate position based on convergence progress
      const radius = 2 * (1 - convergenceProgress); // Start at distance 2, converge to 0
      const x = Math.cos(startAngle) * radius;
      const z = Math.sin(startAngle) * radius;
      
      meshRef.current.position.set(x, 0, z);
      
      // Add subtle rotation
      meshRef.current.rotation.z = time * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.8, 32]} />
      <meshBasicMaterial 
        color={color}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

const AnimatedPyramid = () => {
  return (
    <div className="w-48 h-48 mx-auto relative">
      <Canvas camera={{ position: [0, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        
        {/* Cyan circle */}
        <ConvergingCircle 
          color="#00ffff" 
          startAngle={0} 
          delay={0} 
        />
        
        {/* Magenta circle */}
        <ConvergingCircle 
          color="#ff00ff" 
          startAngle={Math.PI * 2 / 3} 
          delay={0.5} 
        />
        
        {/* Yellow circle */}
        <ConvergingCircle 
          color="#ffff00" 
          startAngle={Math.PI * 4 / 3} 
          delay={1} 
        />
        
      </Canvas>
      
      {/* Overlay for additive color mixing visualization */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full relative overflow-hidden rounded-lg">
          <div 
            className="absolute w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(0,255,255,0) 70%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'convergence-cyan 4s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,0,255,0.6) 0%, rgba(255,0,255,0) 70%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'convergence-magenta 4s ease-in-out infinite 0.5s'
            }}
          />
          <div 
            className="absolute w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,0,0.6) 0%, rgba(255,255,0,0) 70%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'convergence-yellow 4s ease-in-out infinite 1s'
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes convergence-cyan {
          0%, 100% { transform: translate(-50%, -50%) translate(60px, 0px); }
          50% { transform: translate(-50%, -50%) translate(0px, 0px); }
        }
        @keyframes convergence-magenta {
          0%, 100% { transform: translate(-50%, -50%) translate(-30px, -52px); }
          50% { transform: translate(-50%, -50%) translate(0px, 0px); }
        }
        @keyframes convergence-yellow {
          0%, 100% { transform: translate(-50%, -50%) translate(-30px, 52px); }
          50% { transform: translate(-50%, -50%) translate(0px, 0px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedPyramid;
