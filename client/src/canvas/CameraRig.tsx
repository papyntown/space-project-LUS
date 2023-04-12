import React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useRef } from "react"; // importation de useRef
import state from "../store/index"; // importation de l'état global

interface CameraRigProps {
    children: React.ReactNode;
}

const CameraRig: React.FC<CameraRigProps> = ({ children }) => {
    const group = useRef<THREE.Group>(null); // initialisation d'une référence vers un groupe THREE
    const snap = useSnapshot(state); // récupération de l'état global avec useSnapshot

    // A chaque frame on met à jour la position de la caméra
    useFrame((state, delta) => {
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 768; // on vérifie si on est sur un écran mobile

        //Création de la position initial de la caméra
        let targetPosition = [-15, -6, 15]; // x, y, z
        if (snap.intro) {
            if (isBreakpoint) {
                targetPosition = [0, 0, 15];
            }
            if (isMobile) {
                targetPosition = [-0.15, 0.9, 15];
            }
        } else {
            if (isMobile) {
                targetPosition = [0, 0.0, 15];
            } else targetPosition = [0, 0, 15];
        }

        // creation de la position de la caméra
        easing.damp3(
            state.camera.position,
            targetPosition as [number, number, number],
            0.25,
            delta
        );

        // Création d'une rotation de la caméra
        easing.dampE(
            group.current!.rotation, // accès à la propriété rotation du groupe, qui est de type THREE.Euler
            [state.pointer.y, -state.pointer.x, 0], // tableau contenant les valeurs de la rotation en X, Y et Z
            0.25,
            delta
        );
    });

    return <group ref={group}>{children}</group>;
};

export default CameraRig;
