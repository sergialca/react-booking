import React from "react";
import { MdMail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import "./loginForm.scss";

const LoginForm = () => {
    return (
        <div className="formWrapper">
            <p className="loginTxt">Login</p>
            <form className="loginForm">
                <div className="inputWrapper space">
                    <span className="svg">
                        <MdMail />
                    </span>
                    <input className="input" placeholder="username"></input>
                </div>
                <div className="inputWrapper space">
                    <span>
                        <BsLockFill />
                    </span>
                    <input className="input" placeholder="password"></input>
                </div>
                <div className="loginBtnWrapper">
                    <button className="loginBtn">Login</button>
                </div>
                <div className="space recover">
                    <span>
                        Recuperar <a href="mailto:support@gmail.com">usuario y contraseña</a>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
