import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Parse from "parse";
import "./loginForm.scss";

const LoginForm = () => {
    const [account, setAccount] = useState({ user: "", psw: "" });
    const [mailError, setMailError] = useState("");
    const [pswError, setPswError] = useState("");

    const accountChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const validMail = () => {
        if (
            account.user &&
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                account.user
            )
        ) {
            setMailError("Mail no válido");
            return false;
        } else if (!account.user) {
            setMailError("Mail requerido");
            return false;
        } else {
            setMailError("");
            return true;
        }
    };

    const validPsw = () => {
        if (account.psw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(account.psw)) {
            setPswError(
                "La contraseña debe contener 8 carácteres mínimo, una mayúscula, una minúscula y un número"
            );
            return false;
        } else if (!account.psw) {
            setPswError("Contraseña requerida");
            return false;
        } else {
            setPswError("");
            return true;
        }
    };

    const logIn = (e) => {
        e.preventDefault();
        const mail = validMail();
        const psw = validPsw();
        if (mail && psw) {
            Parse.User.logIn(account.user, account.psw)
                .then((user) => {
                    console.log("LOGEDIN");
                })
                .catch((error) => {
                    if (typeof document !== "undefined")
                        document.write(`Error while logging in user: ${JSON.stringify(error)}`);
                    console.error("Error while logging in user", error);
                });
        }
    };

    return (
        <div className="formWrapper">
            <p className="loginTxt">Login</p>
            <form className="loginForm" onSubmit={logIn}>
                <div className="inputWrapper center">
                    <span className="svg">
                        <MdMail />
                    </span>
                    <input
                        className="input"
                        name="user"
                        value={account.user}
                        onChange={accountChange}
                        placeholder="mail"
                    ></input>
                </div>
                <div className="loginError">{mailError}</div>
                <div className="inputWrapper center space">
                    <span>
                        <BsLockFill />
                    </span>
                    <input
                        className="input"
                        name="psw"
                        type="password"
                        value={account.psw}
                        onChange={accountChange}
                        placeholder="password"
                    ></input>
                </div>
                <div className="loginError">{pswError}</div>
                <div className="loginBtnWrapper space">
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
