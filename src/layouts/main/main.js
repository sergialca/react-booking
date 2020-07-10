import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { MenuContext } from "../../context/menu";
import { LangContext } from "../../context/lang";
import navbarCa from "../../json/navbarCa.json";
import navbarEs from "../../json/navbarEs.json";
import "./main.scss";

const Layout = ({ children }) => {
    const { menu } = useContext(MenuContext);
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("login");

    useEffect(() => {
        if (lang === "ca") setContent(() => navbarCa);
        else if (lang === "es") setContent(() => navbarEs);
    }, [lang]);

    return (
        <div className="layout">
            <Navbar content={content} />
            <div className="header">{menu}</div>
            {children}
        </div>
    );
};

export default Layout;
