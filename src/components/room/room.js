import React from "react";
import Time from "../time/time";
import "./room.scss";

const Room = ({ name, time, roomId, display, setDisplay, timeClicked }) => {
    return (
        <div className="room">
            <div className="title">{name}</div>
            <div className="time">
                {time.map((t) => {
                    return (
                        <Time
                            time={t.timeInt}
                            key={t.id}
                            timeId={t.id}
                            room={name}
                            roomId={roomId}
                            display={display}
                            setDisplay={setDisplay}
                            timeClicked={timeClicked}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Room;
