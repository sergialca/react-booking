import React, { useState } from "react";
import { MdMail, MdInfo } from "react-icons/md";
import { BsLockFill, BsPersonFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Input from "../input/input";
import Parse from "parse";
import "./registerForm.scss";

const RegisterForm = ({ showAlert }) => {
    const [account, setAccount] = useState({ user: "", psw: "", name: "", rePsw: "" });
    const [mailError, setMailError] = useState("");
    const [pswError, setPswError] = useState("");
    const [rePswError, setRePswError] = useState("");
    const [nameError, setNameError] = useState("");
    const [loading, setLoading] = useState(false);

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
                "La contraseña debe contener mínimo 8 carácteres, una mayúscula, una minúscula y un número"
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

    const validRePsw = () => {
        if (account.psw !== account.rePsw) {
            setRePswError("Las contraseñas no coinciden");
            return false;
        } else if (!account.rePsw) {
            setRePswError("Contraseña requerida");
            return false;
        } else {
            setRePswError("");
            return true;
        }
    };

    const validName = () => {
        if (!account.name) {
            setNameError("Nombre requerido");
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const signIn = (e) => {
        setLoading(true);
        e.preventDefault();
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
            <p className="signinTxt">Sign In</p>
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
                <div className="signinError">{nameError}</div>
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
                <div className="signinError">{mailError}</div>
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
                <div className="signinError">{pswError}</div>
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
                <div className="signinError">{rePswError}</div>
                <div className="signinBtnWrapper">
                    <SubmitButton loading={loading} txt="sign in" />
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
