import React from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import ArtisticSkills from '../components/ArtisticSkills';
import './Landing.css';

const Avatar3D = () => {
  const texture = useTexture("/my_generated_pixel_art.png");
  const meshRef = React.useRef(null);

  useFrame((state) => {
    if(meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4.5, 6, 0.2]} />
      <meshPhysicalMaterial map={texture} roughness={0.3} metalness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  );
};

const Landing = () => {
  return (
    <div className="landing-page-wrap">
      <div className="hero-section">
        
        {/* Left Side: Clean, highly legible typography */}
        <div className="hero-typography">
          <h1 className="hero-first">HAMEEM BHAI</h1>
          <h2 className="hero-middle">er</h2>
          <h1 className="hero-last">KAARSHAJI</h1>
          
          <div className="hero-bio-box">
            <p className="hero-bio-title">BASIT HAMEEM</p>
            <p className="hero-bio-text">
              Happy to be here living a beautiful life.<br/>
              I will help you turn your creative imagination into reality in every way possible.<br/>
              Check out my works, and if you want to connect, use the given links or directly email me!
            </p>
          </div>
        </div>
        
        {/* Right Side: 3D Avatar */}
        <div className="hero-avatar-container">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={1.8} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <React.Suspense fallback={null}>
              <Avatar3D />
            </React.Suspense>
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/2} />
          </Canvas>
        </div>

      </div>

      <ArtisticSkills />
    </div>
  );
};

export default Landing;
