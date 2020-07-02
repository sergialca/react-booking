import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/loginForm/loginForm";
import TransparentNav from "../../components/transparentNav/transparentNav";
import LangDropdown from "../../components/langDropdown/langDropdown";
import { LangContext } from "../../context/lang";
import "./login.scss";

const Login = () => {
    const { lang } = useContext(LangContext);

    useEffect(() => {}, [lang]);

    return (
        <div>
            <TransparentNav>
                <LangDropdown />
            </TransparentNav>
            <div className="login">
                <div className="formContainer fade">
                    <LoginForm />
                    <div className="linkWrap">
                        <Link to={`/signup`}>Crear cuenta</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
