import React from 'react';

export function ProductLighting({ isDark = true }) {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={isDark ? 0.75 : 1.2} />

      {/* Primary Key Spotlight illuminating top and front at dramatic angle */}
      <spotLight
        position={[4, 7, 5]}
        angle={0.6}
        penumbra={0.65}
        intensity={isDark ? 2.8 : 2.0}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Warm Champagne Rim / Back Light to outline silhouettes from dark background */}
      <directionalLight
        position={[-5, 4, -4]}
        intensity={isDark ? 2.4 : 1.2}
        color="#E4C89D"
      />

      {/* Front-Right Soft Warm Fill */}
      <directionalLight
        position={[3, 1, 3]}
        intensity={isDark ? 1.4 : 0.8}
        color="#EEE8DD"
      />

      {/* Subtle Under-bounce to preserve underside detail */}
      <directionalLight
        position={[0, -2, 2]}
        intensity={0.4}
        color="#8A7550"
      />

      {/* Soft Contact Shadow Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.66, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={isDark ? 0.45 : 0.25} />
      </mesh>
    </>
  );
}
