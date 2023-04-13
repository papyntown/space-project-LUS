import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import state from "../store";
import CustomButton from "./CustomButton";

interface Props {
    satelite: any;
    message: string;
}

const TextArea: React.FC<Props> = ({ satelite, message }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newMessage, setNewMessage] = useState<string>("");
    const textAreaRef = useRef(null); // Référence à la zone de texte
    const handleClick = () => {
        state.textArea = !state.textArea;
    };
    const handleTextAreaBlur = () => {
        setIsEdit(false); // Quitte le mode édition
        handleEdit();
    };
    const handleEdit = () => {
        if (newMessage) {
            axios
                .put(`http://localhost:5000/post/${satelite._id}`, {
                    message: newMessage,
                })
                .then((res) => console.log("Message modifié"));
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h1>{satelite ? satelite.author : "wait"}</h1>
            </div>
            <div className="card-message">
                {isEdit ? (
                    <div className="edit-container">
                        <label htmlFor="message-input">Edit:</label>
                        <textarea
                            id="message-input"
                            defaultValue={
                                newMessage ? newMessage : satelite.message
                            }
                            ref={textAreaRef}
                            onBlur={handleTextAreaBlur}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                setIsEdit(false);
                                handleEdit();
                            }}>
                            Valider édition
                        </button>
                    </div>
                ) : (
                    <p>{newMessage ? newMessage : satelite.message}</p>
                )}
            </div>
            <div className="icons-part">
                <div className="icons">
                    <span
                        className="edit-icon"
                        onClick={() => setIsEdit(!isEdit)}>
                        &#9998;
                    </span>
                </div>
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
