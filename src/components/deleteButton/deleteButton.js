import React from "react";
import "./deleteButton.scss";

const DeleteButton = ({ deleteRow, btnTxt, id, setDeleted }) => {
    return (
        <button
            className="deleteButton"
            onClick={() => {
                deleteRow(id);
                setDeleted(() => true);
            }}
        >
            {btnTxt}
        </button>
    );
};

export default DeleteButton;
