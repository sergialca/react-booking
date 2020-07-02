import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { BsLockFill } from "react-icons/bs";
import SubmitButton from "../submitButton/submitButton";
import Input from "../input/input";
import Parse from "parse";
import "./loginForm.scss";

const LoginForm = ({ content }) => {
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
            setMailError(content.mailError);
            return false;
        } else if (!account.mail) {
            setMailError(content.mailRequired);
            return false;
        } else {
            setMailError("");
            return true;
        }
    };

    const validPsw = () => {
        if (account.psw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(account.psw)) {
            setPswError(content.pswRule);
            return false;
        } else if (!account.psw) {
            setPswError(content.pswRequired);
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
                })
                .catch((error) => {
                    if (typeof document !== "undefined")
                        document.write(`Error while logging in user: ${JSON.stringify(error)}`);
                    console.error("Error while logging in user", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else setLoading(false);
    };

    return (
        <div className="formWrapper">
            <p className="loginTxt">{content.loginTitle}</p>
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
                    placeholder={content.pswPlaceholder}
                    type="password"
                >
                    <span>
                        <BsLockFill />
                    </span>
                </Input>
                <div className="loginError">{pswError}</div>
                <div className="loginBtnWrapper space">
                    <SubmitButton loading={loading} txt={content.submitBtn} />
                </div>
                <div className="space recover">
                    <span>
                        {content.recoveryTxt}{" "}
                        <a href="mailto:support@gmail.com">{content.recoveryA}</a>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
