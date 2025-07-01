import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

interface FrameProps {
  imageUrl: string;
}

const Frame: React.FC<FrameProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, imageUrl);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Frame back */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="#5a5a5a" />
      </mesh>
      
      {/* Photo */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.8, 1.8]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {/* Frame front */}
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 2, 0.2]} />
        <meshStandardMaterial color="#8b5a2b" wireframe={false} transparent opacity={1} />
        {/* Cut out center for photo */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 1.8, 0.3]} />
          <meshStandardMaterial color="black" transparent opacity={0} />
        </mesh>
      </mesh>
    </group>
  );
};

interface FrameViewerProps {
  imageUrl: string;
}

const FrameViewer: React.FC<FrameViewerProps> = ({ imageUrl }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={true} enablePan={true} />
        
        <Frame imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
};

export default FrameViewer;