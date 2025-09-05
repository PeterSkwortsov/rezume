import React, { useRef } from "react";
import styled from "styled-components";
import { PerspectiveCamera, Text } from "@react-three/drei";
import { OrbitControls, RenderTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Cube = () => {

    const textRef = useRef()
    useFrame(
      (state) =>
        (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2)
    );

  return (
    <mesh rotation={[1.2,2,-2]}>
      <boxGeometry />

      <meshStandardMaterial>
        <RenderTexture attach="map">
          <PerspectiveCamera makeDefault position={[0, 0, 2]} />
          <color attach="background" args={["pink"]} />
          <Text ref={textRef} fontSize={1} color="white" position={[0, 0, 0]}>
            Hi frends
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
};

export default Cube;
