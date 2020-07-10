import React from "react";
import Time from "../time/time";
import "./room.scss";

const Room = ({ name, time }) => {
    return (
        <div className="room">
            <div className="title">{name}</div>
            <div className="time">
                {time.map((t) => {
                    return <Time time={t} />;
                })}
            </div>
        </div>
    );
};

export default Room;
