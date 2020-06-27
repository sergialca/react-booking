import React, { createContext, useState } from "react";

export const LangContext = createContext();
export const LangProvider = (props) => {
    const [lang, setLanguage] = useState("cat");
    return (
        <LangContext.Provider value={[lang, setLanguage]}>{props.children}</LangContext.Provider>
    );
};
