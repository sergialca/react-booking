import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Input from "../input/input";
import Parse from "parse";
import "./loginForm.scss";

const LoginForm = () => {
    const [account, setAccount] = useState({ mail: "", psw: "" });
    const [mailError, setMailError] = useState("");
    const [pswError, setPswError] = useState("");
    const [loading, setLoading] = useState(false);

    const accountChange = (e) => {
        setMailError("");
        setPswError("");
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const validMail = () => {
        if (
            account.mail &&
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                account.mail
            )
        ) {
            setMailError("Mail no válido");
            return false;
        } else if (!account.mail) {
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
        setLoading(true);
        const mail = validMail();
        const psw = validPsw();
        if (mail && psw) {
            Parse.User.logIn(account.mail, account.psw)
                .then((user) => {
                    console.log("User LOGEDIN", JSON.stringify(user));
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    if (typeof document !== "undefined")
                        document.write(`Error while logging in user: ${JSON.stringify(error)}`);
                    console.error("Error while logging in user", error);
                });
        } else setLoading(false);
    };

    return (
        <div className="formWrapper">
            <p className="loginTxt">Login</p>
            <form className="loginForm" onSubmit={logIn}>
                <Input
                    name="mail"
                    account={account.mail}
                    accountChange={accountChange}
                    placeholder="Mail"
                    type="mail"
                >
                    <span className="svg">
                        <MdMail />
                    </span>
                </Input>
                <div className="loginError">{mailError}</div>
                <Input
                    name="psw"
                    account={account.psw}
                    accountChange={accountChange}
                    placeholder="Contraseña"
                    type="password"
                >
                    <span>
                        <BsLockFill />
                    </span>
                </Input>
                <div className="loginError">{pswError}</div>
                <div className="loginBtnWrapper space">
                    <SubmitButton loading={loading} txt="login" />
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
