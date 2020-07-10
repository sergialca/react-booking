import React from "react";
import "./time.scss";

const Time = ({ time }) => {
    //Obtenir nou array amb les hores de les reserves
    return (
        <div className="timebadge">
            <span>{time}</span>
        </div>
    );
};

export default Time;
