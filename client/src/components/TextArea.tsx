import React, { useEffect, useState } from "react";
import axios from "axios";
import state from "../store";
import CustomButton from "./CustomButton";

interface Props {
    satelite: any;
}

const TextArea: React.FC<Props> = ({ satelite }) => {
    const [newSatelite, setNewSatelite] = useState<string>("Premier satelite");
    const [message, setMessage] = useState<string>(
        "Le premier satélite au monde"
    );
    const handleClick = () => {
        state.textArea = !state.textArea;
    };

    // Crée un nouveau satelite
    const PostNewSatelite = () => {
        const data = {
            author: newSatelite,
            message: message,
            // Id provisoir en attendant le retour de la BDD
            _id: Date.now(),
        };
        axios.post("http://localhost:5000/post/", data);
        console.log("Post New Satelite");
    };
    //Fin de la création d'un nouveau  satelite
    return (
        <div className="card">
            <div className="card-header">
                <h1 onClick={() => PostNewSatelite()}>
                    {satelite ? satelite.author : "wait"}
                </h1>
            </div>
            <div className="card-message">
                <p>{satelite.message}</p>
            </div>

            <div className="icons-part">
                <div className="icons"></div>
            </div>
            <div className="back">
                <CustomButton
                    title="Back"
                    handleClick={handleClick}
                    customStyles={"btn-back"}
                />
            </div>
        </div>
    );
};

export default TextArea;
