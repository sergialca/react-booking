import React from "react";
import Time from "../time/time";
import "./room.scss";

const Room = ({ name, time, roomId, day, dayFormatted, setDisplay, noTimes }) => {
    return (
        <div className="room">
            <div className="title">{name}</div>
            <div className="time">
                {time.map((t) => {
                    return typeof t === "string" ? (
                        noTimes
                    ) : (
                        <Time
                            time={t.timeInt}
                            key={t.id}
                            timeId={t.id}
                            room={name}
                            roomId={roomId}
                            setDisplay={setDisplay}
                            day={day}
                            dayFormatted={dayFormatted}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Room;
