import React, { useContext, useState, useEffect } from "react";
import { LogicContext } from "../../context/logic";
import "./time.scss";

const Time = ({ time, timeId, room, roomId, setDisplay, day, dayFormatted }) => {
    const { logic, setLogic } = useContext(LogicContext);
    const [localState, setLocalState] = useState({
        day,
        dayFormatted,
        timeId,
        booked: false,
    });

    const onTimeClick = () => {
        setLogic((prev) => ({
            ...prev,
            room,
            roomId,
            time,
            timeId: { id: timeId, booked: false },
        }));
        setDisplay(() => ({ timeAlert: true }));
    };

    useEffect(() => {
        "canvi de logic booked";
        if (logic.dayFormatted === localState.dayFormatted) {
            if (logic.timeId.id === localState.timeId && logic.timeId.booked) {
                setLocalState((prev) => ({ ...prev, booked: true }));
            }
        }
    }, [logic]);

    return (
        <div className={localState.booked ? "noTime" : "timebadge"} onClick={() => onTimeClick()}>
            <span>{time}</span>
        </div>
    );
};

export default Time;
