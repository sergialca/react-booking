import React, { useContext } from "react";
import "./timeAlert.scss";
import { BookingContext } from "../../context/booking";

const TimeAlert = ({ aceptar, display, cancelar }) => {
    const { booking } = useContext(BookingContext);
    return (
        <div className={display ? "timeAlert" : "noAlert"}>
            <div className="alertBack"></div>
            <div className="container">
                <div className="info">
                    <div className="txtWrap">
                        <span className="txt">{`Estàs seguro que quieres reservar la ${booking.room} el dia ${booking.dayFormatted} de ${booking.time}`}</span>
                    </div>
                    <div className="btnWrap">
                        <button className="btn aceptar" onClick={() => aceptar()}>
                            Aceptar
                        </button>
                        <button className="btn" onClick={() => cancelar()}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeAlert;
