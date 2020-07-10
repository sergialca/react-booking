import React, { useState, useContext } from "react";
import "./time.scss";
import { LogicContext } from "../../context/logic";

const Time = ({ time, timeId, room, roomId, display, setDisplay, timeClicked }) => {
    const [clicked, setClicked] = useState(false);
    const { setLogic } = useContext(LogicContext);

    const formatToday = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
    };

    const onTimeClick = () => {
        setLogic(() => ({
            room,
            roomId,
            day: formatToday(),
            time,
            timeId,
        }));
        setClicked(() => true);
        setDisplay(() => ({ timeAlert: true }));
    };

    return (
        <div
            className={clicked ? (display ? "noTime" : "timebadge") : "timebadge"}
            onClick={() => {
                timeClicked(time, room, roomId);
                onTimeClick();
            }}
        >
            <span>{time}</span>
        </div>
    );
};

export default Time;
