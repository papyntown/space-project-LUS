import React from "react";
import { CirclePicker, HuePicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../store";

const ColorPicker = () => {
    const snap = useSnapshot(state);
    return (
        <div className="color-picker">
            <HuePicker
                color={snap.color}
                onChange={(color) => (state.color = color.hex)}
            />
        </div>
    );
};

export default ColorPicker;
