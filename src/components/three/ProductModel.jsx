import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { ChairMesh, SofaMesh, TableMesh, BedMesh, CabinetMesh } from './FurnitureModels';

function GLTFModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} scale={scale} position={position} rotation={rotation} castShadow receiveShadow />;
}

export function ProductModel({
  type = 'chair',
  glbUrl = null,
  materialColor = '#1C1B1A',
  roughness = 0.7,
  metalness = 0.05,
  rotation = [0, 0, 0]
}) {
  if (glbUrl) {
    return (
      <Suspense fallback={<ChairMesh color={materialColor} roughness={roughness} metalness={metalness} />}>
        <GLTFModel url={glbUrl} rotation={rotation} />
      </Suspense>
    );
  }

  // Render procedural architectural mesh
  return (
    <group rotation={rotation}>
      {type === 'chair' && (
        <ChairMesh color={materialColor} roughness={roughness} metalness={metalness} />
      )}
      {type === 'sofa' && (
        <SofaMesh color={materialColor} roughness={roughness} metalness={metalness} />
      )}
      {type === 'table' && (
        <TableMesh color={materialColor} roughness={roughness} metalness={metalness} />
      )}
      {type === 'bed' && (
        <BedMesh color={materialColor} roughness={roughness} metalness={metalness} />
      )}
      {type === 'cabinet' && (
        <CabinetMesh color={materialColor} roughness={roughness} metalness={metalness} />
      )}
    </group>
  );
}
