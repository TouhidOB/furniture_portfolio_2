import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { ProductLighting } from './ProductLighting';
import { ProductControls } from './ProductControls';
import { ProductModel } from './ProductModel';
import { Loader2 } from 'lucide-react';

function CanvasFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-obsidian text-stone">
      <Loader2 className="w-7 h-7 text-champagne animate-spin mb-3" />
      <p className="text-xs tracking-widest uppercase text-ivory/70 font-sans">Generating 3D Atmosphere...</p>
    </div>
  );
}

export function SceneCanvas({
  type = 'chair',
  glbUrl = null,
  materialColor = '#1C1B1A',
  roughness = 0.65,
  metalness = 0.08,
  cameraPosition = [0, 0.7, 3.4],
  rotation = [0, 0, 0],
  autoRotate = false,
  autoRotateSpeed = 0.8,
  enableZoom = false, // Default to FALSE so mouse wheel scrolls page smoothly without being hijacked
  enableOrbit = true,
  isDark = true,
  fallbackImage = null,
  className = "w-full h-full min-h-[440px]"
}) {
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
      }
    } catch (e) {
      setHasWebGLError(true);
    }
  }, []);

  if (hasWebGLError && fallbackImage) {
    return (
      <div className={`relative ${className} bg-obsidian flex items-center justify-center overflow-hidden`}>
        <img
          src={fallbackImage}
          alt="Architectural piece preview"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-4 left-4 glass-obsidian px-3 py-1.5 rounded text-xs text-ivory/80">
          Studio Editorial Presentation
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} bg-transparent`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ProductLighting isDark={isDark} />
          
          <ProductModel
            type={type}
            glbUrl={glbUrl}
            materialColor={materialColor}
            roughness={roughness}
            metalness={metalness}
            rotation={rotation}
          />

          {/* Grounding Soft Ambient Contact Shadow */}
          <ContactShadows
            position={[0, -0.66, 0]}
            opacity={0.72}
            scale={6.5}
            blur={2.4}
            far={3.0}
            color="#000000"
          />

          {enableOrbit && (
            <ProductControls
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              enableZoom={enableZoom}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
