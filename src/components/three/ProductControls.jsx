import React from 'react';
import { OrbitControls } from '@react-three/drei';

export function ProductControls({
  autoRotate = false,
  autoRotateSpeed = 1.0,
  enableZoom = true,
  enablePan = false,
  minDistance = 1.8,
  maxDistance = 6.0,
  maxPolarAngle = Math.PI / 2.05,
  minPolarAngle = Math.PI / 6
}) {
  return (
    <OrbitControls
      makeDefault
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      enableZoom={enableZoom}
      enablePan={enablePan}
      minDistance={minDistance}
      maxDistance={maxDistance}
      maxPolarAngle={maxPolarAngle}
      minPolarAngle={minPolarAngle}
      dampingFactor={0.06}
      enableDamping={true}
    />
  );
}
