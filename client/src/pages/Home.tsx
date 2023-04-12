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

const Home: React.FC = () => {
    const snap = useSnapshot(state);
    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className="home" {...fadeAnimation}>
                    <motion.div
                        className="home-content"
                        {...headContainerAnimation}>
                        <motion.div {...slideAnimation("down")}>
                            <h1 className="head-text">Look Up Space</h1>
                        </motion.div>
                        <motion.div {...headContentAnimation} className="">
                            <p className="sub-text">
                                THE NEXT GLOBAL LEADER FOR SPACE SAFETY,
                                SECURITY AND SUSTAINABILITY
                            </p>
                            <CustomButton
                                title="Découvrir l'espace"
                                handleClick={(): void => {
                                    state.intro = false;
                                }}
                                customStyles="home-btn"
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default Home;
