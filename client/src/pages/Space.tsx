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

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.section className="space" {...slideAnimation("up")}>
                        <h1>LookUpSpace</h1>
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
                            data.map((satelite: any) => (
                                <TextArea
                                    satelite={satelite}
                                    key={satelite._id}
                                />
                            ))
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
