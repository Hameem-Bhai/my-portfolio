import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";
import { Physics, RigidBody, BallCollider, CylinderCollider } from "@react-three/rapier";

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const balloons = [...Array(18)].map(() => ({
  scale: [0.8, 0.9, 1.0, 1.1, 1.2][Math.floor(Math.random() * 5)],
}));

function Balloon({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, isActive }) {
  const api = useRef(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.1, delta);
    
    // Antigravity upward impulse + central clustering to simulate floating balloons
    const currentTranslation = api.current.translation();
    const impulse = vec
      .copy(currentTranslation)
      .normalize()
      .multiply(new THREE.Vector3(-15 * delta * scale, 35 * delta * scale, -15 * delta * scale)); 
    // Additional upward wind
    impulse.y += 50 * delta * scale;

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody linearDamping={1.5} angularDamping={0.5} friction={0.2} restitution={0.8} position={[r(20), r(20) - 15, r(20) - 10]} ref={api} colliders={false}>
      <BallCollider args={[scale]} />
      {/* Balloon Base */}
      <CylinderCollider args={[scale, 0.1 * scale]} position={[0, -1.1 * scale, 0]} />
      
      {/* Pink Balloon Mesh */}
      <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry}>
        <meshPhysicalMaterial 
          color="#ff80ab" 
          roughness={0.1} 
          metalness={0.1} 
          clearcoat={1} 
          clearcoatRoughness={0.05} 
          emissive="#ff80ab" 
          emissiveIntensity={0.1} 
        />
      </mesh>
      {/* Balloon Tie Knot */}
      <mesh position={[0, -1.05 * scale, 0]}>
        <coneGeometry args={[0.08 * scale, 0.15 * scale, 0.2 * scale, 8]} />
        <meshStandardMaterial color="#ff80ab" roughness={0.5} />
      </mesh>
      {/* Balloon String */}
      <mesh position={[0, -1.8 * scale, 0]}>
        <cylinderGeometry args={[0.01 * scale, 0.01 * scale, 1.5 * scale, 8]} />
        <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3(), isActive }) {
  const ref = useRef(null);
  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0), 0.2);
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[3]} />
    </RigidBody>
  );
}

const ArtisticSkills = () => {
  const [isActive] = useState(true);

  return (
    <div style={{ width: "100%", height: "80vh", position: "relative", zIndex: 10, marginTop: "15vh", marginBottom: "15vh" }}>
      <Canvas shadows camera={{ position: [0, 0, 25], fov: 35, near: 1, far: 100 }}>
        <ambientLight intensity={1.5} />
        <spotLight position={[20, 30, 25]} penumbra={1} angle={0.3} color="white" castShadow shadow-mapSize={[512, 512]} />
        <directionalLight position={[-10, 10, 10]} intensity={1} color="#ff80ab" />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {balloons.map((props, i) => (
            <Balloon key={i} {...props} isActive={isActive} />
          ))}
        </Physics>
        <Environment preset="city" environmentIntensity={0.6} />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#ff80ab" aoRadius={3} intensity={1.5} />
          <Bloom luminanceThreshold={1} intensity={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
export default ArtisticSkills;
