import React, { useState, useContext, useEffect } from "react";
import RegisterForm from "../../components/registerForm/registerForm";
import Alert from "../../components/alert/alert";
import TransparentNav from "../../components/transparentNav/transparentNav";
import LangDropdown from "../../components/langDropdown/langDropdown";
import { LangContext } from "../../context/lang";
import registerCa from "../../json/registerCa.json";
import registerEs from "../../json/registerEs.json";
import "./register.scss";

const Register = () => {
    const { lang } = useContext(LangContext);
    const [display, setDisplay] = useState(false);
    const [content, setContent] = useState("singup");

    useEffect(() => {
        if (lang === "ca") setContent(() => registerCa);
        else if (lang === "es") setContent(() => registerEs);
    }, [lang]);

    const changeDisplay = () => {
        setDisplay(!display);
    };

    return (
        <div>
            <TransparentNav>
                <LangDropdown />
            </TransparentNav>
            <div className="register">
                <div className="formContainer fade">
                    <RegisterForm content={content} showAlert={changeDisplay} />
                </div>
                <Alert
                    txt={content.pswRule}
                    txtBtn={content.accept}
                    display={display}
                    aceptar={changeDisplay}
                />
            </div>
        </div>
    );
};

export default Register;
