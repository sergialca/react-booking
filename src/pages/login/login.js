import React from "react";
import LoginForm from "../../components/loginForm/loginForm";
import "./login.scss";

const Login = () => {
    return (
        <div className="login">
            <div className="formContainer fade">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
