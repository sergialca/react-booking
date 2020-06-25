import React from "react";
import "./submitButton.scss";
const SubmitButton = ({ txt }) => {
    return (
        <button type="submit" className="submitBtn">
            {txt}
        </button>
    );
};

export default SubmitButton;
