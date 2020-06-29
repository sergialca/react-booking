import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/loginForm/loginForm";
import TransparentNav from "../../components/transparentNav/transparentNav";
import FloatLang from "../../components/floatLang/floatLang";
import { LangContext } from "../../context/lang";
import "./login.scss";

const Login = () => {
    const { lang } = useContext(LangContext);
    return (
        <div>
            <TransparentNav>
                <FloatLang />
            </TransparentNav>
            <div className="login">
                <div className="formContainer fade">
                    <LoginForm />
                    <div className="linkWrap">
                        <Link to={`/${lang}/signup`}>Crear cuenta</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
