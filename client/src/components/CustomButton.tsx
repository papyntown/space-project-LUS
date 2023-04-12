import state from "../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

interface Props {
    title: string;
    handleClick: () => void;
    customStyles: string;
}

const CustomButton: React.FC<Props> = ({
    title,
    handleClick,
    customStyles,
}) => {
    return (
        <button onClick={() => handleClick()} className={`${customStyles}`}>
            {title}
        </button>
    );
};

export default CustomButton;
