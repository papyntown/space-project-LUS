import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import CameraRig from "./CameraRig";
import { Satelite } from "./Satelite";
import { useState } from "react";

const CanvasModel: React.FC = () => {
    return (
        <Canvas className="canvas-container">
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            <CameraRig>
                <Center>
                    <Satelite />
                </Center>
            </CameraRig>
        </Canvas>
    );
};

export default CanvasModel;
