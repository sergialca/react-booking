import React, { useState } from "react";
import { MdMail, MdInfo } from "react-icons/md";
import { BsLockFill, BsPersonFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Input from "../input/input";
import Parse from "parse";
import "./registerForm.scss";

const RegisterForm = ({ showAlert }) => {
    const [account, setAccount] = useState({ mail: "", psw: "", name: "", rePsw: "" });
    const [error, setError] = useState({ mail: "", psw: "", rePsw: "", name: "" });
    const [loading, setLoading] = useState(false);

    const accountChange = (e) => {
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
            setError((error) => ({ ...error, mail: "Mail no válido" }));
            return false;
        } else if (!account.user) {
            setError((error) => ({ ...error, mail: "Mail requerido" }));
            return false;
        } else {
            setError((error) => ({ ...error, mail: "" }));
            return true;
        }
    };

    const validPsw = () => {
        if (account.psw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(account.psw)) {
            setError((error) => ({
                ...error,
                psw: "La contraseña debe contener mínimo 8 carácteres",
            }));
            return false;
        } else if (!account.psw) {
            setError((error) => ({
                ...error,
                psw: "Contraseña requerida",
            }));
            return false;
        } else {
            setError((error) => ({
                ...error,
                psw: "",
            }));
            return true;
        }
    };

    const validRePsw = () => {
        if (account.psw !== account.rePsw) {
            setError((error) => ({ ...error, rePsw: "Las contraseñas no coinciden" }));
            return false;
        } else if (!account.rePsw) {
            setError((error) => ({ ...error, rePsw: "Campo requerido" }));
            return false;
        } else {
            setError((error) => ({ ...error, rePsw: "" }));
            return true;
        }
    };

    const validName = () => {
        if (!account.name) {
            setError((error) => ({ ...error, name: "Nombre requerido" }));
            return false;
        } else {
            setError((error) => ({ ...error, name: "" }));
            return true;
        }
    };

    const signIn = (e) => {
        e.preventDefault();
        setLoading(true);
        const mail = validMail();
        const name = validName();
        const psw = validPsw();
        const rePsw = validRePsw();
        if (mail && psw && rePsw && name) {
            console.log("buen registro");
        } else setLoading(false);
    };

    return (
        <div className="formWrapper">
            <p className="signinTxt">Sign up</p>
            <form className="signinForm" onSubmit={signIn}>
                <Input
                    name="name"
                    account={account.name}
                    accountChange={accountChange}
                    placeholder="Nombre completo"
                    type=""
                >
                    <span className="svg">
                        <BsPersonFill />
                    </span>
                </Input>
                <div className="signinError">{error.name}</div>
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
                <div className="signinError">{error.mail}</div>
                <div className="inputInfoContainer space">
                    <div className="inputInfoWrapper">
                        <span>
                            <BsLockFill />
                        </span>
                        <input
                            className="inputInfo"
                            name="psw"
                            type="password"
                            value={account.psw}
                            onChange={accountChange}
                            placeholder="Contraseña"
                        />
                    </div>
                    <MdInfo onClick={() => showAlert()} className="info" />
                </div>
                <div className="signinError">{error.psw}</div>
                <Input
                    name="rePsw"
                    account={account.rePsw}
                    accountChange={accountChange}
                    placeholder="Repetir contraseña"
                    type="password"
                >
                    <span>
                        <BsLockFill />
                    </span>
                </Input>
                <div className="signinError">{error.rePsw}</div>
                <div className="signinBtnWrapper">
                    <SubmitButton loading={loading} txt="Sign up" />
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
