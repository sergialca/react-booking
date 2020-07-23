import React, { useContext, useState, useEffect } from "react";
import { BookingContext } from "../../context/booking";
import "./time.scss";

const Time = ({ time, timeId, room, roomId, setDisplay, dayFormatted }) => {
    const { booking, setBooking } = useContext(BookingContext);
    const [localState, setLocalState] = useState({
        dayFormatted,
        timeId,
        time,
        booked: false,
    });

    const onTimeClick = () => {
        setBooking(() => ({
            dayFormatted,
            room,
            roomId,
            time,
            timeId,
            booked: false,
        }));
        setDisplay((prev) => ({ ...prev, timeAlert: true }));
    };

    useEffect(() => {
        if (booking.dayFormatted === localState.dayFormatted) {
            if (booking.timeId === localState.timeId && booking.booked) {
                setLocalState((prev) => ({ ...prev, booked: true }));
            }
        }
    }, [booking.booked]);

    return (
        <div className={localState.booked ? "noTime" : "timebadge"} onClick={() => onTimeClick()}>
            <span>{time}</span>
        </div>
    );
};

export default Time;
