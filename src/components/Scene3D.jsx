import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshReflectorMaterial,
  SoftShadows,
  Sparkles,
} from "@react-three/drei";
import { CatmullRomCurve3, MathUtils, TubeGeometry, Vector3 } from "three";
import { useMemo, useRef, useState } from "react";

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const tx = pointer.x * 0.75;
    const ty = pointer.y * 0.36;
    camera.position.x = MathUtils.lerp(camera.position.x, 2.3 + tx, 0.05);
    camera.position.y = MathUtils.lerp(camera.position.y, 1.5 + ty, 0.05);
    camera.lookAt(0, -0.34, -0.6);
  });

  return null;
}

function Worker({ position = [0, 0, 0], color = "#6286a0" }) {
  return (
    <group position={position} scale={0.33}>
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.09, 0.24, 6, 10]} />
        <meshStandardMaterial color={color} roughness={0.56} />
      </mesh>
      <mesh position={[0, 0.57, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#f0c27b" roughness={0.46} />
      </mesh>
      <mesh position={[0, 0.67, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.07, 16]} />
        <meshStandardMaterial color="#ffb258" roughness={0.42} />
      </mesh>
    </group>
  );
}

function MicroWorkers() {
  const workers = [
    [-1.18, -0.89, 0.42],
    [-0.74, -0.88, -0.18],
    [-0.12, -0.87, 0.22],
    [0.58, -0.9, -0.24],
    [1.06, -0.88, 0.2],
    [1.62, -0.89, -0.07],
    [0.2, -0.9, 0.7],
  ];

  return (
    <group>
      {workers.map((pos, i) => (
        <Worker
          key={`${pos.join("-")}-${i}`}
          position={pos}
          color={i % 2 === 0 ? "#607f98" : "#4f9e93"}
        />
      ))}
    </group>
  );
}

function ChipCity({ theme }) {
  const isDark = theme === "dark";
  const chipColor = isDark ? "#121714" : "#8b98b5";
  const pinColor = isDark ? "#ffb258" : "#d98e1e";

  const blocks = useMemo(() => {
    const items = [];
    for (let x = -6; x <= 6; x += 1) {
      for (let z = -6; z <= 6; z += 1) {
        if (Math.abs(x) < 2 && Math.abs(z) < 2) continue;
        const h = 0.06 + (Math.abs((x * 19 + z * 11) % 10) / 10) * 0.58;
        items.push({ x: x * 0.41, z: z * 0.41, h, glow: (x + z) % 5 === 0 });
      }
    }
    return items;
  }, []);

  const traces = useMemo(() => {
    const paths = [];
    for (let i = -4; i <= 4; i++) {
      paths.push({ p: [i * 0.42, -0.92, -2.45], s: [0.02, 0.01, 4.65] });
      paths.push({ p: [-2.45, -0.92, i * 0.42], s: [4.65, 0.01, 0.02] });
    }
    return paths;
  }, []);

  return (
    <group>
      <mesh position={[0, -1.02, 0]}>
        <boxGeometry args={[6.6, 0.18, 6.6]} />
        <meshStandardMaterial
          color={chipColor}
          roughness={0.52}
          metalness={0.38}
          emissive={isDark ? "#162118" : "#d8e1f7"}
          emissiveIntensity={isDark ? 0.45 : 0.02}
        />
      </mesh>

      {traces.map((item, i) => (
        <mesh key={`tr-${i}`} position={item.p}>
          <boxGeometry args={item.s} />
          <meshStandardMaterial
            color={isDark ? "#273323" : "#5f74ab"}
            emissive={isDark ? "#86d96d" : "#4f67aa"}
            emissiveIntensity={isDark ? 0.12 : 0.1}
            roughness={0.3}
            metalness={0.55}
          />
        </mesh>
      ))}

      <mesh position={[0, -0.89, 0]}>
        <boxGeometry args={[1.62, 0.11, 1.62]} />
        <meshStandardMaterial
          color={isDark ? "#43493f" : "#a1b0d1"}
          metalness={0.55}
          roughness={0.24}
          emissive={isDark ? "#b3ff4a" : "#6a84db"}
          emissiveIntensity={isDark ? 0.24 : 0.12}
        />
      </mesh>

      {blocks.map(({ x, z, h, glow }, i) => (
        <mesh key={`b-${i}`} position={[x, -0.93 + h / 2, z]}>
          <boxGeometry args={[0.24, h, 0.24]} />
          <meshStandardMaterial
            color={chipColor}
            roughness={0.44}
            metalness={0.34}
            emissive={glow ? pinColor : "#000000"}
            emissiveIntensity={glow ? 0.22 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function CircuitForest({ theme }) {
  const isDark = theme === "dark";
  const leaf = isDark ? "#86d96d" : "#2fa85f";
  const stem = isDark ? "#6e8b62" : "#4d7a64";

  const trees = useMemo(
    () => [
      [-2.0, -0.87, -1.8],
      [-1.5, -0.87, -2.1],
      [-0.95, -0.87, -1.9],
      [1.58, -0.87, -1.72],
      [2.05, -0.87, -1.42],
      [1.65, -0.87, -2.2],
    ],
    [],
  );

  return (
    <group>
      {trees.map(([x, y, z], i) => (
        <group
          key={`t-${i}`}
          position={[x, y, z]}
          scale={0.54 + (i % 3) * 0.12}
        >
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.26, 8]} />
            <meshStandardMaterial color={stem} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.34, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color={leaf} roughness={0.82} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function IndustrialCables({ theme }) {
  const isDark = theme === "dark";
  const cableGeometries = useMemo(() => {
    const curves = [
      new CatmullRomCurve3([
        new Vector3(0.9, 0.42, -0.4),
        new Vector3(1.15, 0.36, -0.05),
        new Vector3(1.35, 0.2, 0.25),
        new Vector3(1.62, -0.02, 0.54),
      ]),
      new CatmullRomCurve3([
        new Vector3(0.78, 0.33, -0.38),
        new Vector3(1.05, 0.24, -0.09),
        new Vector3(1.27, 0.1, 0.21),
        new Vector3(1.54, -0.08, 0.49),
      ]),
      new CatmullRomCurve3([
        new Vector3(0.68, 0.28, -0.28),
        new Vector3(0.95, 0.2, 0.04),
        new Vector3(1.21, 0.04, 0.29),
        new Vector3(1.49, -0.12, 0.58),
      ]),
    ];

    return curves.map((curve) => new TubeGeometry(curve, 24, 0.015, 12, false));
  }, []);

  return (
    <group>
      {cableGeometries.map((geo, idx) => (
        <mesh key={`c-${idx}`} geometry={geo}>
          <meshStandardMaterial
            color={idx === 0 ? "#d44949" : idx === 1 ? "#54b8ff" : "#ffd15c"}
            emissive={isDark ? "#171411" : "#000000"}
            roughness={0.5}
            metalness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function RobotArm({ theme }) {
  const base = useRef();
  const shoulder = useRef();
  const elbow = useRef();
  const claw = useRef();
  const [isHot, setIsHot] = useState(false);
  const isDark = theme === "dark";

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (base.current) {
      base.current.rotation.y = MathUtils.lerp(
        base.current.rotation.y,
        -0.35 + px * 0.8,
        0.08,
      );
    }

    if (shoulder.current) {
      shoulder.current.rotation.z = MathUtils.lerp(
        shoulder.current.rotation.z,
        0.28 + Math.sin(t * 0.7) * 0.12 + py * 0.25,
        0.08,
      );
    }

    if (elbow.current) {
      elbow.current.rotation.z = MathUtils.lerp(
        elbow.current.rotation.z,
        -0.48 + Math.cos(t * 0.9) * 0.1 - px * 0.2,
        0.08,
      );
    }

    if (claw.current) {
      claw.current.rotation.y = t * 1.2;
    }
  });

  return (
    <group position={[1.58, -0.3, 0.8]}>
      <mesh position={[0, -0.62, 0]}>
        <cylinderGeometry args={[0.48, 0.52, 0.35, 24]} />
        <meshStandardMaterial
          color={isDark ? "#353b38" : "#d3dced"}
          metalness={0.5}
          roughness={0.34}
        />
      </mesh>

      <group ref={base} position={[0, -0.45, 0]}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.66, 0.54, 0.66]} />
          <meshStandardMaterial
            color={isDark ? "#697166" : "#d9e3f8"}
            metalness={0.4}
            roughness={0.28}
          />
        </mesh>

        <group ref={shoulder} position={[0.24, 0.42, 0]}>
          <mesh position={[0.42, 0, 0]}>
            <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
            <meshStandardMaterial
              color={isDark ? "#b9b9ae" : "#a7b8db"}
              metalness={0.42}
              roughness={0.24}
            />
          </mesh>

          <group ref={elbow} position={[0.84, 0.02, 0]}>
            <mesh position={[0.36, -0.06, 0]}>
              <capsuleGeometry args={[0.1, 0.58, 8, 16]} />
              <meshStandardMaterial
                color={isDark ? "#a6ab9c" : "#9eb2d9"}
                metalness={0.4}
                roughness={0.24}
              />
            </mesh>

            <group ref={claw} position={[0.75, -0.18, 0]}>
              <mesh
                onPointerOver={() => setIsHot(true)}
                onPointerOut={() => setIsHot(false)}
              >
                <boxGeometry args={[0.22, 0.24, 0.22]} />
                <meshStandardMaterial
                  color={isDark ? "#ffb258" : "#e9961e"}
                  emissive={isDark ? "#ff9e39" : "#e9961e"}
                  emissiveIntensity={isHot ? 0.62 : isDark ? 0.24 : 0.06}
                />
              </mesh>
              <mesh position={[0.14, -0.14, 0.07]}>
                <boxGeometry args={[0.09, 0.26, 0.06]} />
                <meshStandardMaterial
                  color={isDark ? "#777d75" : "#9caecf"}
                  metalness={0.35}
                  roughness={0.4}
                />
              </mesh>
              <mesh position={[0.14, -0.14, -0.07]}>
                <boxGeometry args={[0.09, 0.26, 0.06]} />
                <meshStandardMaterial
                  color={isDark ? "#777d75" : "#9caecf"}
                  metalness={0.35}
                  roughness={0.4}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

function SteamPuffs({ theme }) {
  const puffs = useRef([]);
  const isDark = theme === "dark";

  useFrame((state) => {
    puffs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = state.clock.elapsedTime + i * 0.8;
      mesh.position.y = -0.5 + (Math.sin(t * 0.8) * 0.1 + (t % 1.3) * 0.35);
      mesh.position.x = 2.2 + Math.sin(t * 0.6 + i) * 0.08;
      mesh.material.opacity = 0.18 + ((Math.sin(t * 1.7) + 1) / 2) * 0.24;
    });
  });

  return (
    <group>
      {new Array(5).fill(0).map((_, i) => (
        <mesh
          key={`steam-${i}`}
          ref={(el) => {
            puffs.current[i] = el;
          }}
          position={[2.2, -0.5 + i * 0.08, 1.25]}
        >
          <sphereGeometry args={[0.12 + i * 0.02, 12, 12]} />
          <meshStandardMaterial
            transparent
            opacity={0.22}
            color={isDark ? "#e9f2dd" : "#b8c9ef"}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneWorld({ theme }) {
  const isDark = theme === "dark";

  return (
    <>
      <mesh position={[0, -1.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6.8, 80]} />
        <MeshReflectorMaterial
          resolution={1024}
          blur={[250, 55]}
          mixBlur={0.95}
          mixStrength={20}
          roughness={0.28}
          depthScale={0.2}
          color={isDark ? "#0f1611" : "#c4cedf"}
          metalness={0.52}
        />
      </mesh>

      <ChipCity theme={theme} />
      <CircuitForest theme={theme} />
      <RobotArm theme={theme} />
      <IndustrialCables theme={theme} />
      <MicroWorkers />
      <SteamPuffs theme={theme} />

      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={isDark ? 0.45 : 0.36}
        scale={8}
        blur={2.2}
        far={2.4}
      />

      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.24}
        position={[-2.5, 1.15, -1.2]}
      >
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={isDark ? "#f7f6df" : "#ffffff"}
            roughness={0.25}
            metalness={0.2}
          />
        </mesh>
      </Float>

      <Sparkles
        count={68}
        size={isDark ? 1.7 : 1.1}
        speed={0.32}
        color={isDark ? "#c0ff6d" : "#6e8cd1"}
        opacity={0.52}
        scale={[11, 4.8, 10]}
      />
    </>
  );
}

export default function Scene3D({ theme = "dark" }) {
  const isDark = theme === "dark";

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [2.3, 1.5, 6.25], fov: 42 }}
    >
      <SoftShadows size={28} samples={20} focus={0.7} />
      <CameraRig />
      <color attach="background" args={[isDark ? "#060a08" : "#cfd7e4"]} />
      <fog attach="fog" args={[isDark ? "#060a08" : "#cfd7e4", 6, 16]} />

      <ambientLight intensity={isDark ? 0.62 : 0.56} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={isDark ? 1.25 : 1.2}
        color={isDark ? "#b9ff70" : "#7b93d8"}
        castShadow
      />
      <directionalLight
        position={[-6, 2, -4]}
        intensity={isDark ? 0.88 : 0.72}
        color={isDark ? "#66d7c8" : "#329d8c"}
      />
      <pointLight
        position={[1.8, 2.2, 1.1]}
        intensity={isDark ? 0.7 : 0.46}
        color={isDark ? "#ffb258" : "#e78b21"}
      />

      <SceneWorld theme={theme} />
      <Environment preset="warehouse" />
    </Canvas>
  );
}
