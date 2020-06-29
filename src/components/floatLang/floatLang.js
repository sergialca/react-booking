import React, { useContext } from "react";
import "./floatLang.scss";
import { LangContext } from "../../context/lang";

const FloatLang = ({ fnSelect }) => {
    const { setLang } = useContext(LangContext);

    const select = (e) => {
        let val = e.target.value;
        if (val === "ca") {
            setLang("ca");
        } else if (val === "es") {
            setLang("es");
        }
    };
    return (
        <div class="selectWrap">
            <select className="select" onChange={select}>
                <option value="es">ESP</option>
                <option value="ca">CAT</option>
            </select>
        </div>
    );
};

export default FloatLang;
