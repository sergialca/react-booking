import React, { useContext, useState, useEffect } from "react";
import { LogicContext } from "../../context/logic";
import "./time.scss";

const Time = ({ time, timeId, room, roomId, setDisplay }) => {
    const { logic, setLogic } = useContext(LogicContext);
    const [booked, setBooked] = useState(false);

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
            timeId: { id: timeId, booked: false },
        }));
        setDisplay(() => ({ timeAlert: true }));
    };

    useEffect(() => {
        if (logic.timeId.id === timeId && logic.timeId.booked) {
            setBooked(() => true);
        }
    }, [logic.timeId.booked]);

    return (
        <div className={booked ? "noTime" : "timebadge"} onClick={() => onTimeClick()}>
            <span>{time}</span>
        </div>
    );
};

export default Time;
