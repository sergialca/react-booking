import React, { useContext } from "react";
import "./timeAlert.scss";
import { LogicContext } from "../../context/logic";

const TimeAlert = ({ aceptar, display, cancelar }) => {
    const { logic } = useContext(LogicContext);

    return (
        <div className={display ? "timeAlert" : "noAlert"}>
            <div className="alertBack"></div>
            <div className="container">
                <div className="info">
                    <div className="txtWrap">
                        <span className="txt">{`Estàs seguro que quieres reservar la ${logic.room} el dia ${logic.day} de ${logic.time}`}</span>
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
