import React, { useContext } from "react";
import { BookingContext } from "../../context/booking";
import { MdInfo } from "react-icons/md";
import { LangContext } from "../../context/lang";
import { FiltersContext } from "../../context/filters";
import "./timeAlert.scss";

const TimeAlert = ({ aceptar, display, cancelar, txt }) => {
    const { booking } = useContext(BookingContext);
    const { filters } = useContext(FiltersContext);
    const { lang } = useContext(LangContext);

    return (
        <div className={display ? "timeAlert" : "noTimeAlert"}>
            <div className="alertBack"></div>
            <div className="container">
                <div className="info">
                    <div className="txtWrap">
                        <div className="inline">
                            <MdInfo className="icon" />
                            <span className="txt">
                                {console.log()}
                                {`${txt.timeAlertSure} ${booking.room} ${txt.timeAlertDay}`}{" "}
                                {lang === "ca"
                                    ? filters.dayEuropean
                                    : lang === "es"
                                    ? filters.dayEuropean
                                    : filters.formattedDay}{" "}
                                {`${txt.timeAlertOf} ${booking.time}?`}
                            </span>
                        </div>
                    </div>
                    <div className="btnWrap">
                        <button className="btn aceptar" onClick={() => aceptar()}>
                            {txt.timeAlertOk}
                        </button>
                        <button className="btnCancel" onClick={() => cancelar()}>
                            {txt.timeAlertBad}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeAlert;
