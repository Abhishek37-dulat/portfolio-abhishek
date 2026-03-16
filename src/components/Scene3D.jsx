import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshReflectorMaterial,
  Sparkles,
} from "@react-three/drei";
import { MathUtils } from "three";
import { useMemo, useRef } from "react";

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const tx = pointer.x * 0.65;
    const ty = pointer.y * 0.35;
    camera.position.x = MathUtils.lerp(camera.position.x, 2.4 + tx, 0.045);
    camera.position.y = MathUtils.lerp(camera.position.y, 1.45 + ty, 0.045);
    camera.lookAt(0, -0.35, -0.65);
  });

  return null;
}

function Worker({ position = [0, 0, 0], color = "#2f7ddb" }) {
  return (
    <group position={position} scale={0.34}>
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.09, 0.24, 6, 10]} />
        <meshStandardMaterial color={color} roughness={0.52} />
      </mesh>
      <mesh position={[0, 0.57, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#f2bf6f" roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.67, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.07, 16]} />
        <meshStandardMaterial color="#ffbe2d" roughness={0.42} />
      </mesh>
    </group>
  );
}

function MicroWorkers() {
  const workers = [
    [-1.15, -0.89, 0.35],
    [-0.7, -0.88, -0.15],
    [-0.1, -0.86, 0.22],
    [0.55, -0.9, -0.28],
    [1.1, -0.88, 0.25],
    [1.58, -0.89, -0.08],
  ];

  return (
    <group>
      {workers.map((pos, i) => (
        <Worker
          key={`${pos.join("-")}-${i}`}
          position={pos}
          color={i % 2 === 0 ? "#2f7ddb" : "#2f98d7"}
        />
      ))}
    </group>
  );
}

function ChipCity({ theme }) {
  const isDark = theme === "dark";
  const chipColor = isDark ? "#161f36" : "#d9e2f7";
  const pinColor = isDark ? "#f8a62c" : "#d98713";

  const blocks = useMemo(() => {
    const items = [];
    for (let x = -5; x <= 5; x += 1) {
      for (let z = -5; z <= 5; z += 1) {
        if (Math.abs(x) < 2 && Math.abs(z) < 2) continue;
        const h = 0.08 + ((Math.abs((x * 19 + z * 11) % 10) / 10) * 0.55);
        items.push({ x: x * 0.45, z: z * 0.45, h });
      }
    }
    return items;
  }, []);

  return (
    <group>
      <mesh position={[0, -1.02, 0]}>
        <boxGeometry args={[6.6, 0.18, 6.6]} />
        <meshStandardMaterial
          color={chipColor}
          roughness={0.48}
          metalness={0.36}
          emissive={isDark ? "#0d1323" : "#d0daf2"}
          emissiveIntensity={isDark ? 0.45 : 0.08}
        />
      </mesh>

      <mesh position={[0, -0.89, 0]}>
        <boxGeometry args={[1.58, 0.1, 1.58]} />
        <meshStandardMaterial
          color={isDark ? "#2a334e" : "#c6d4f5"}
          metalness={0.55}
          roughness={0.28}
          emissive={isDark ? "#7f95ff" : "#7490e7"}
          emissiveIntensity={isDark ? 0.23 : 0.11}
        />
      </mesh>

      {blocks.map(({ x, z, h }, i) => (
        <mesh key={`b-${i}`} position={[x, -0.93 + h / 2, z]}>
          <boxGeometry args={[0.28, h, 0.28]} />
          <meshStandardMaterial
            color={chipColor}
            roughness={0.45}
            metalness={0.32}
            emissive={i % 4 === 0 ? pinColor : "#000000"}
            emissiveIntensity={i % 4 === 0 ? 0.2 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function CircuitForest({ theme }) {
  const isDark = theme === "dark";
  const leaf = isDark ? "#3acb72" : "#2fa85f";
  const stem = isDark ? "#5f8f78" : "#4b7a62";

  const trees = useMemo(
    () => [
      [-1.9, -0.87, -1.75],
      [-1.45, -0.87, -2.05],
      [-0.95, -0.87, -1.85],
      [1.58, -0.87, -1.7],
      [2.05, -0.87, -1.4],
      [1.65, -0.87, -2.15],
    ],
    [],
  );

  return (
    <group>
      {trees.map(([x, y, z], i) => (
        <group
          key={`t-${i}`}
          position={[x, y, z]}
          scale={0.55 + (i % 3) * 0.12}
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

function RobotArm({ theme }) {
  const base = useRef();
  const shoulder = useRef();
  const elbow = useRef();
  const claw = useRef();
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
          color={isDark ? "#30384f" : "#d3dced"}
          metalness={0.5}
          roughness={0.34}
        />
      </mesh>

      <group ref={base} position={[0, -0.45, 0]}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.66, 0.54, 0.66]} />
          <meshStandardMaterial
            color={isDark ? "#59627f" : "#d9e3f8"}
            metalness={0.4}
            roughness={0.28}
          />
        </mesh>

        <group ref={shoulder} position={[0.24, 0.42, 0]}>
          <mesh position={[0.42, 0, 0]}>
            <capsuleGeometry args={[0.12, 0.7, 8, 16]} />
            <meshStandardMaterial
              color={isDark ? "#aeb8d5" : "#a7b8db"}
              metalness={0.42}
              roughness={0.24}
            />
          </mesh>

          <group ref={elbow} position={[0.84, 0.02, 0]}>
            <mesh position={[0.36, -0.06, 0]}>
              <capsuleGeometry args={[0.1, 0.58, 8, 16]} />
              <meshStandardMaterial
                color={isDark ? "#9ea9c8" : "#9eb2d9"}
                metalness={0.4}
                roughness={0.24}
              />
            </mesh>

            <group ref={claw} position={[0.75, -0.18, 0]}>
              <mesh>
                <boxGeometry args={[0.22, 0.24, 0.22]} />
                <meshStandardMaterial
                  color={isDark ? "#ffb135" : "#e9961e"}
                  emissive={isDark ? "#ff9d1f" : "#000000"}
                  emissiveIntensity={isDark ? 0.24 : 0}
                />
              </mesh>
              <mesh position={[0.14, -0.14, 0.07]}>
                <boxGeometry args={[0.09, 0.26, 0.06]} />
                <meshStandardMaterial
                  color={isDark ? "#6f7893" : "#9caecf"}
                  metalness={0.35}
                  roughness={0.4}
                />
              </mesh>
              <mesh position={[0.14, -0.14, -0.07]}>
                <boxGeometry args={[0.09, 0.26, 0.06]} />
                <meshStandardMaterial
                  color={isDark ? "#6f7893" : "#9caecf"}
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
          color={isDark ? "#121a2e" : "#edf2ff"}
          metalness={0.52}
        />
      </mesh>

      <ChipCity theme={theme} />
      <CircuitForest theme={theme} />
      <RobotArm theme={theme} />
      <MicroWorkers />

      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.24}
        position={[-2.5, 1.15, -1.2]}
      >
        <mesh>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color={isDark ? "#d6e4ff" : "#ffffff"}
            roughness={0.25}
            metalness={0.2}
          />
        </mesh>
      </Float>

      <Sparkles
        count={68}
        size={isDark ? 1.7 : 1.1}
        speed={0.32}
        color={isDark ? "#9fc2ff" : "#6e8cd1"}
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
      camera={{ position: [2.4, 1.45, 6.2], fov: 42 }}
    >
      <CameraRig />
      <color attach="background" args={[isDark ? "#090e19" : "#eaf0ff"]} />
      <fog attach="fog" args={[isDark ? "#090e19" : "#eaf0ff", 7, 18]} />

      <ambientLight intensity={isDark ? 0.62 : 0.88} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={isDark ? 1.25 : 0.95}
        color={isDark ? "#95a9ff" : "#8ea7e7"}
      />
      <directionalLight
        position={[-6, 2, -4]}
        intensity={isDark ? 0.88 : 0.66}
        color={isDark ? "#41e4c9" : "#3eb59f"}
      />
      <pointLight
        position={[1.8, 2.2, 1.1]}
        intensity={isDark ? 0.7 : 0.36}
        color={isDark ? "#ffac3f" : "#e78b21"}
      />

      <SceneWorld theme={theme} />
      <Environment preset="warehouse" />
    </Canvas>
  );
}
