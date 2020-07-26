import React, { useContext } from "react";
import { MdInfo } from "react-icons/md";
import { LangContext } from "../../context/lang";
import "./deleteAlert.scss";
import { DeleteContext } from "../../context/deleteBooking";

const DeleteAlert = ({ accept, display, cancel, txt }) => {
    const { deleteData } = useContext(DeleteContext);
    const { lang } = useContext(LangContext);

    return (
        <div className={display ? "deleteAlert" : "noDeleteAlert"}>
            <div className="alertBack"></div>
            <div className="container">
                <div className="info">
                    <div className="txtWrap">
                        <div className="inline">
                            <MdInfo className="icon" />
                            <span className="txt">
                                {`${txt.deleteSure} ${deleteData.room} ${txt.deleteThe} `}
                                {lang === "ca" || lang === "es"
                                    ? deleteData.euroDate
                                    : deleteData.day}
                                {` ${txt.deleteAt} ${deleteData.time}?`}
                            </span>
                        </div>
                    </div>
                    <div className="btnWrap">
                        <button className="btn aceptar" onClick={() => accept()}>
                            {txt.accept}
                        </button>
                        <button className="btnCancel" onClick={() => cancel()}>
                            {txt.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAlert;
