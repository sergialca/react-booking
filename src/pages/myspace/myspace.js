import React, { useEffect, useContext, useState } from "react";
import { LangContext } from "../../context/lang";
import myspaceCa from "../../json/myspaceCa.json";
import myspaceEs from "../../json/myspaceEs.json";
import { getUserBookings } from "../../api/api";

const Myspace = (props) => {
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("mysapce");

    useEffect(() => {
        if (lang === "ca") setContent(() => myspaceCa);
        else if (lang === "es") setContent(() => myspaceEs);
    }, [lang]);

    const dbUserBoo = async () => {
        const res = await getUserBookings();
        console.log("Myspace -> res", res);
    };

    useEffect(() => {
        dbUserBoo();
    }, []);

    return <div className="mySpace"></div>;
};

export default Myspace;
