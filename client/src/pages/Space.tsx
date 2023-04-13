import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import {
    fadeAnimation,
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation,
} from "../config/motion";

import state from "../store";
import CustomButton from "../components/CustomButton";
import ColorPicker from "../components/ColorPicker";
import { useEffect, useState } from "react";
import TextArea from "../components/TextArea";
import axios from "axios";

const Space: React.FC = () => {
    const snap = useSnapshot(state);
    const [activeColorPicker, setActiveColorPicker] = useState<string>("");
    const [isColoring, setIsColoring] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [newSatelite, setNewSatelite] = useState<string>("Premier satellite");
    const [message, setMessage] = useState<string>(
        "FR-1 est le nom donné au deuxième satellite artificiel français lancé le 6 décembre 1965 (10 jours après le premier satellite français Astérix) par une fusée américaine Scout depuis la base spatiale de Vandenberg."
    );

    const generateTabContent = () => {
        switch (activeColorPicker) {
            case "colorpicker":
                return <ColorPicker />;
            default:
                return null;
        }
    };
    useEffect(() => {
        axios
            .get("http://localhost:5000/post/")
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }, []);
    // Crée un nouveau satelite
    const PostNewSatelite = () => {
        const data = {
            author: newSatelite,
            message: message,
            // Id provisoir en attendant le retour de la BDD
            _id: Date.now(),
        };
        axios.post("http://localhost:5000/post/", data);
        console.log("Post New Satellite");
    };
    //Fin de la création d'un nouveau  satelite

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.section className="space" {...slideAnimation("up")}>
                        <h1 onClick={() => PostNewSatelite()}>LookUpSpace</h1>
                        <div
                            className="img-color-picker"
                            onClick={() => {
                                setIsColoring(!isColoring);
                                setActiveColorPicker("colorpicker");
                            }}>
                            <img
                                src="../src/assets/swatch.png"
                                alt="logo Color Picker "
                            />
                            {isColoring ? generateTabContent() : null}
                        </div>
                        <CustomButton
                            title="Back to Home"
                            handleClick={(): void => {
                                state.intro = true;
                            }}
                            customStyles="space-btn"
                        />
                    </motion.section>
                    <motion.div
                        className="text-area-container"
                        {...slideAnimation("right")}>
                        {snap.textArea ? (
                            data.length >= 1 ? (
                                data.map((satelite: any) => (
                                    <TextArea
                                        message={satelite.message}
                                        satelite={satelite}
                                        key={satelite._id}
                                    />
                                ))
                            ) : (
                                <h1>
                                    (Il est possible que vous n'ayez pas accès a
                                    la BDD)
                                </h1>
                            )
                        ) : (
                            <h1
                                className="hover"
                                onClick={() =>
                                    (state.textArea = !state.textArea)
                                }>
                                Plus de détail ?
                            </h1>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Space;
