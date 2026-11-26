import React from 'react';
import { RoundedBox } from '@react-three/drei';

/**
 * Photorealistic Procedural Furniture Meshes for MAISON NOIR
 * Crafted using beveled architectural forms, soft rounded cushions, and authentic material tones.
 */

// 1. Arc Lounge Chair — Continuous steam-bent walnut shell, deep tufted cushions, brushed 4-star base
export function ChairMesh({
  color = "#1C1B1A",
  roughness = 0.65,
  metalness = 0.08,
  woodColor = "#50331F"
}) {
  return (
    <group position={[0, -0.65, 0]}>
      {/* --- STEAM-BENT AMERICAN WALNUT SHELLS --- */}
      {/* Lower Seat Shell (Cradling bucket) */}
      <mesh position={[0, 0.35, 0.02]} rotation={[-0.14, 0, 0]} castShadow receiveShadow>
        <RoundedBox args={[1.14, 0.12, 1.02]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={woodColor} roughness={0.65} metalness={0.05} />
        </RoundedBox>
      </mesh>

      {/* Main Back Shell (Curved ergonomic back) */}
      <mesh position={[0, 0.78, -0.26]} rotation={[-0.24, 0, 0]} castShadow receiveShadow>
        <RoundedBox args={[1.16, 0.88, 0.1]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={woodColor} roughness={0.65} metalness={0.05} />
        </RoundedBox>
      </mesh>

      {/* Headrest Upper Shell Arc */}
      <mesh position={[0, 1.3, -0.42]} rotation={[-0.34, 0, 0]} castShadow>
        <RoundedBox args={[0.9, 0.38, 0.08]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={woodColor} roughness={0.65} metalness={0.05} />
        </RoundedBox>
      </mesh>

      {/* --- SOFT UPHOLSTERED CUSHIONS (BEVELED PBR) --- */}
      {/* Deep Seat Cushion with soft pillowed edges */}
      <mesh position={[0, 0.44, 0.06]} rotation={[-0.12, 0, 0]} castShadow receiveShadow>
        <RoundedBox args={[1.06, 0.22, 0.96]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Main Back Cushion (Deep channel-cradled comfort) */}
      <mesh position={[0, 0.82, -0.2]} rotation={[-0.24, 0, 0]} castShadow>
        <RoundedBox args={[1.04, 0.8, 0.18]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Vertical Tufting Seam Ribs (Adds authentic tailoring detail) */}
      <mesh position={[-0.26, 0.82, -0.1]} rotation={[-0.24, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.74, 16]} />
        <meshStandardMaterial color="#0E0D0D" roughness={0.9} />
      </mesh>
      <mesh position={[0.26, 0.82, -0.1]} rotation={[-0.24, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.74, 16]} />
        <meshStandardMaterial color="#0E0D0D" roughness={0.9} />
      </mesh>

      {/* Ergonomic Headrest Pillow */}
      <mesh position={[0, 1.3, -0.36]} rotation={[-0.34, 0, 0]} castShadow>
        <RoundedBox args={[0.82, 0.3, 0.16]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Sculpted Wing Armrests with soft rounded pads */}
      <mesh position={[-0.57, 0.64, 0.04]} rotation={[0, 0, -0.12]} castShadow>
        <RoundedBox args={[0.14, 0.18, 0.82]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>
      <mesh position={[0.57, 0.64, 0.04]} rotation={[0, 0, 0.12]} castShadow>
        <RoundedBox args={[0.14, 0.18, 0.82]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* --- PRECISION MILLED SWIVEL BASE & HARDWARE --- */}
      {/* Central Swivel Column in Matte Black */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.26, 24]} />
        <meshStandardMaterial color="#161616" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* 4-Star Milled Architectural Star Base */}
      <group position={[0, 0.08, 0]}>
        {[0, Math.PI / 2, Math.PI / 4, -Math.PI / 4].map((rot, idx) => (
          <mesh key={idx} rotation={[0, rot, 0]} castShadow>
            <RoundedBox args={[1.14, 0.05, 0.08]} radius={0.015} smoothness={3}>
              <meshStandardMaterial color="#181818" metalness={0.9} roughness={0.25} />
            </RoundedBox>
          </mesh>
        ))}

        {/* Champagne Brass Architectural Glider Shoes */}
        <mesh position={[0.54, -0.02, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 20]} />
          <meshStandardMaterial color="#C6A878" metalness={0.75} roughness={0.3} />
        </mesh>
        <mesh position={[-0.54, -0.02, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 20]} />
          <meshStandardMaterial color="#C6A878" metalness={0.75} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.02, 0.54]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 20]} />
          <meshStandardMaterial color="#C6A878" metalness={0.75} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.02, -0.54]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 20]} />
          <meshStandardMaterial color="#C6A878" metalness={0.75} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// 2. Forma Modular Sofa — Monolithic low-slung chaise and sofa lounge
export function SofaMesh({
  color = "#EDE8DD",
  roughness = 0.92,
  metalness = 0.02,
  plinthColor = "#241D17"
}) {
  return (
    <group position={[0, -0.55, 0]}>
      {/* Recessed Smoked Oak Plinth Base with Shadowline */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <RoundedBox args={[2.75, 0.12, 1.45]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color={plinthColor} roughness={0.8} />
        </RoundedBox>
      </mesh>

      {/* Main Left Modular Seat Cushion Block */}
      <mesh position={[-0.66, 0.36, 0.05]} castShadow receiveShadow>
        <RoundedBox args={[1.42, 0.48, 1.36]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Extended Right Chaise Lounge Cushion Block */}
      <mesh position={[0.76, 0.36, 0.25]} castShadow receiveShadow>
        <RoundedBox args={[1.36, 0.48, 1.76]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Low-Profile Monolithic Backrests */}
      <mesh position={[-0.66, 0.74, -0.52]} castShadow receiveShadow>
        <RoundedBox args={[1.42, 0.42, 0.34]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>
      <mesh position={[0.76, 0.74, -0.52]} castShadow receiveShadow>
        <RoundedBox args={[1.36, 0.42, 0.34]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Left Low-Slung Armrest */}
      <mesh position={[-1.4, 0.6, 0.05]} castShadow>
        <RoundedBox args={[0.26, 0.34, 1.36]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Sculpted Feather-Filled Architectural Bolster Cushions */}
      <mesh position={[-0.35, 0.66, -0.32]} rotation={[0.1, -0.16, 0]} castShadow>
        <RoundedBox args={[0.58, 0.42, 0.18]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#67452F" roughness={0.7} metalness={0.04} />
        </RoundedBox>
      </mesh>
      <mesh position={[0.66, 0.66, -0.32]} rotation={[0.08, 0.14, 0]} castShadow>
        <RoundedBox args={[0.62, 0.44, 0.18]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>
    </group>
  );
}

// 3. Terra Dining Table — Solid white oak slab on twin cylinder monoliths with fluted ribbing
export function TableMesh({
  color = "#B89B77",
  roughness = 0.75,
  metalness = 0.02
}) {
  return (
    <group position={[0, -0.55, 0]}>
      {/* Thick Pillowed Table Top Slab in French Bourgogne White Oak */}
      <mesh position={[0, 0.96, 0]} castShadow receiveShadow>
        <RoundedBox args={[2.55, 0.11, 1.18]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Twin Monolithic Architectural Cylinder Pedestals */}
      <mesh position={[-0.72, 0.46, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.3, 0.9, 48]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>
      <mesh position={[0.72, 0.46, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.3, 0.9, 48]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Champagne Brass Base Accent Rings */}
      <mesh position={[-0.72, 0.03, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.06, 36]} />
        <meshStandardMaterial color="#C6A878" metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh position={[0.72, 0.03, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.06, 36]} />
        <meshStandardMaterial color="#C6A878" metalness={0.82} roughness={0.28} />
      </mesh>
    </group>
  );
}

// 4. Eos Floating Platform Bed — Charred ash floating plinth with raw Belgian linen mattress
export function BedMesh({
  color = "#1D1C1B",
  roughness = 0.85,
  metalness = 0.02
}) {
  return (
    <group position={[0, -0.65, 0]}>
      {/* Recessed Subterranean Plinth (Creates the Levitation Shadowline) */}
      <mesh position={[0, 0.1, -0.05]} receiveShadow>
        <RoundedBox args={[1.82, 0.2, 2.02]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#0A0A0A" roughness={0.95} />
        </RoundedBox>
      </mesh>

      {/* Wide Floating Timber Platform Deck */}
      <mesh position={[0, 0.26, -0.05]} castShadow receiveShadow>
        <RoundedBox args={[2.35, 0.14, 2.35]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Belgian Linen Low Mattress with Tailored Edges */}
      <mesh position={[0, 0.48, -0.05]} castShadow receiveShadow>
        <RoundedBox args={[1.92, 0.32, 2.08]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#EEE8DD" roughness={0.92} metalness={0.0} />
        </RoundedBox>
      </mesh>

      {/* Folded Duvet Throw in Dark Graphite */}
      <mesh position={[0, 0.54, 0.36]} castShadow>
        <RoundedBox args={[1.94, 0.22, 1.22]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#2E2E2E" roughness={0.88} metalness={0.0} />
        </RoundedBox>
      </mesh>

      {/* Low Architectural Charred Ash Headboard */}
      <mesh position={[0, 0.74, -1.16]} castShadow receiveShadow>
        <RoundedBox args={[2.52, 0.82, 0.14]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* Symmetrical Dual Sleeping Pillows */}
      <mesh position={[-0.52, 0.69, -0.78]} rotation={[0.2, 0, 0]} castShadow>
        <RoundedBox args={[0.72, 0.18, 0.46]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#EEE8DD" roughness={0.95} />
        </RoundedBox>
      </mesh>
      <mesh position={[0.52, 0.69, -0.78]} rotation={[0.2, 0, 0]} castShadow>
        <RoundedBox args={[0.72, 0.18, 0.46]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#EEE8DD" roughness={0.95} />
        </RoundedBox>
      </mesh>
    </group>
  );
}

// 5. Linear Fluted Credenza — Fluted tambour body with Nero Marquina marble top
export function CabinetMesh({
  color = "#543725",
  roughness = 0.74,
  metalness = 0.02
}) {
  return (
    <group position={[0, -0.65, 0]}>
      {/* Honed Nero Marquina Marble Top Slab with Polished Chamfers */}
      <mesh position={[0, 0.87, 0]} castShadow receiveShadow>
        <RoundedBox args={[2.22, 0.06, 0.64]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#141414" roughness={0.32} metalness={0.12} />
        </RoundedBox>
      </mesh>

      {/* Fluted Walnut Body */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <RoundedBox args={[2.16, 0.7, 0.6]} radius={0.03} smoothness={4}>
          <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
        </RoundedBox>
      </mesh>

      {/* 4 Architectural Champagne Brass Pencil Legs */}
      <group position={[0, 0.07, 0]}>
        {[
          [-0.96, 0, 0.22],
          [0.96, 0, 0.22],
          [-0.96, 0, -0.22],
          [0.96, 0, -0.22]
        ].map((pos, idx) => (
          <mesh key={idx} position={pos} castShadow>
            <cylinderGeometry args={[0.024, 0.016, 0.16, 16]} />
            <meshStandardMaterial color="#C6A878" metalness={0.82} roughness={0.28} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
