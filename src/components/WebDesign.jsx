import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  SpotLight,
  PresentationControls,
  RenderTexture,
  Text,
} from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import Shoe from "./Shoe";
import { MeshReflectorMaterial } from "@react-three/drei";
import Chair from "./Chair";
import Venus from "./Venus";
import { PerspectiveCamera } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function MovingLight() {
  const lightRef = useRef();
  const targetRef = useRef();
  const { mouse, viewport } = useThree();
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [zPosition, setZPosition] = useState(5);

  // Отслеживаем нажатие Shift
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Shift") {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);



  useFrame((state) => {
    // Нормализуем координаты мыши от -1 до 1
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;



    // Если зажат Shift, изменяем Z-координату вместо Y
    if (isShiftPressed) {
      setZPosition((prev) => {
        const newZ = prev - mouse.y * 0.1;
        return Math.max(1, Math.min(20, newZ));
      });
    }

    // Обновляем позицию света
    lightRef.current.position.set(x, isShiftPressed ? 0 : y, zPosition);

    // Обновляем цель света
    if (targetRef.current) {
      targetRef.current.position.set(x, isShiftPressed ? 0 : y, 0);
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        color="red"
        intensity={120}
        distance={5}
        decay={2}
      />
      <object3D ref={targetRef} position={[0, 0, 0]} />
    </>
  );
}

export default function WebDesign() {
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 9] }}
          onCreated={() => setModelLoaded(true)}
        >
          {modelLoaded && <MovingLight />}

          <OrbitControls enableZoom={false} />

          <Venus position={[0, -2, 0]} />
        </Canvas>
      </Suspense>
    </>
  );
}
