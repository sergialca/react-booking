import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import "./loginForm.scss";

const LoginForm = () => {
    const [account, setAccount] = useState({ user: "", password: "" });

    const accountChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const logIn = (e) => {
        if (e) e.preventDefault();
    };

    return (
        <div className="formWrapper">
            <p className="loginTxt">Login</p>
            <form className="loginForm" onSubmit={logIn}>
                <div className="inputWrapper space">
                    <span className="svg">
                        <MdMail />
                    </span>
                    <input
                        className="input"
                        name="user"
                        value={account.user}
                        onChange={accountChange}
                        placeholder="username"
                    ></input>
                </div>
                <div className="inputWrapper space">
                    <span>
                        <BsLockFill />
                    </span>
                    <input
                        className="input"
                        name="password"
                        type="password"
                        value={account.password}
                        onChange={accountChange}
                        placeholder="password"
                    ></input>
                </div>
                <div className="loginBtnWrapper">
                    <SubmitButton txt="login" />
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
