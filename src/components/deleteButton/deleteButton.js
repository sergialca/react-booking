import React from "react";
import "./deleteButton.scss";

const DeleteButton = ({ deleteRow, txt }) => {
    return (
        <button className="deleteButton" onClick={() => deleteRow()}>
            {txt}
        </button>
    );
};

export default DeleteButton;
