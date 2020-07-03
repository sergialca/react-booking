import React, { useState } from "react";
import { MdMail, MdInfo } from "react-icons/md";
import { BsLockFill, BsPersonFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Input from "../input/input";
import Parse from "parse";
import "./registerForm.scss";

const RegisterForm = ({ showAlert, content }) => {
    console.log("RegisterForm -> content", content);
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
            setError((error) => ({ ...error, mail: content.mailError }));
            return false;
        } else if (!account.user) {
            setError((error) => ({ ...error, mail: content.mailRequired }));
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
                psw: content.pswRule,
            }));
            return false;
        } else if (!account.psw) {
            setError((error) => ({
                ...error,
                psw: content.pswRequired,
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
            setError((error) => ({ ...error, rePsw: content.rePswError }));
            return false;
        } else if (!account.rePsw) {
            setError((error) => ({ ...error, rePsw: content.rePswRequired }));
            return false;
        } else {
            setError((error) => ({ ...error, rePsw: "" }));
            return true;
        }
    };

    const validName = () => {
        if (!account.name) {
            setError((error) => ({ ...error, name: content.nameRequired }));
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
            <p className="signinTxt">{content.signupTitle}</p>
            <form className="signinForm" onSubmit={signIn}>
                <Input
                    name="name"
                    account={account.name}
                    accountChange={accountChange}
                    placeholder={content.namePlaceholder}
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
                            placeholder={content.pswPlaceholder}
                        />
                    </div>
                    <MdInfo onClick={() => showAlert()} className="info" />
                </div>
                <div className="signinError">{error.psw}</div>
                <Input
                    name="rePsw"
                    account={account.rePsw}
                    accountChange={accountChange}
                    placeholder={content.rePswPlaceholder}
                    type="password"
                >
                    <span>
                        <BsLockFill />
                    </span>
                </Input>
                <div className="signinError">{error.rePsw}</div>
                <div className="signinBtnWrapper">
                    <SubmitButton loading={loading} txt={content.submitBtn} />
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
