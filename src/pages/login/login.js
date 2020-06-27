import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/loginForm/loginForm";
import "./login.scss";

const Login = () => {
    return (
        <div className="login">
            <div className="formContainer fade">
                <LoginForm />
                <div className="linkWrap">
                    <Link to="/register">Crear cuenta</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
