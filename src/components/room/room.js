import React from "react";
import Time from "../time/time";
import "./room.scss";

const Room = ({ name, time, roomId, day, setDisplay, noTimes }) => {
    console.log("Room -> noTime", noTimes);
    console.log("Room -> time", typeof time);
    return (
        <div className="room">
            <div className="title">{name}</div>
            <div className="time">
                {time.map((t) => {
                    return typeof t === "string" ? (
                        noTimes
                    ) : (
                        <Time
                            time={t.timeInt || t}
                            key={t.id}
                            timeId={t.id || t}
                            room={name}
                            roomId={roomId}
                            setDisplay={setDisplay}
                            day={day}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Room;
