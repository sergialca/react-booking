import React, { useContext, useState, useEffect } from "react";
import { LogicContext } from "../../context/logic";
import moment from "moment";
import "./time.scss";

const Time = ({ time, timeId, room, roomId, setDisplay }) => {
    const { logic, setLogic } = useContext(LogicContext);
    const [booked, setBooked] = useState(false);

    const onTimeClick = () => {
        setLogic(() => ({
            room,
            roomId,
            day: moment(),
            dayFormatted: moment().format("L"),
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
