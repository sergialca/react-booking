import React, { useEffect, useContext, useState } from "react";
import { LangContext } from "../../context/lang";
import myspaceCa from "../../json/myspaceCa.json";
import myspaceEs from "../../json/myspaceEs.json";

const Myspace = (props) => {
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("mysapce");

    useEffect(() => {
        if (lang === "ca") setContent(() => myspaceCa);
        else if (lang === "es") setContent(() => myspaceEs);
    }, [lang]);

    return <div>{content.title}</div>;
};

export default Myspace;
