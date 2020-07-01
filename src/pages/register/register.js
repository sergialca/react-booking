import React, { useState } from "react";
import RegisterForm from "../../components/registerForm/registerForm";
import Alert from "../../components/alert/alert";
import TransparentNav from "../../components/transparentNav/transparentNav";
import FloatLang from "../../components/floatLang/floatLang";
import "./register.scss";

const Register = () => {
    const [display, setDisplay] = useState(false);

    const changeDisplay = () => {
        setDisplay(!display);
    };

    return (
        <div>
            <TransparentNav>
                <FloatLang />
            </TransparentNav>
            <div className="register">
                <div className="formContainer fade">
                    <RegisterForm showAlert={changeDisplay} />
                </div>
                <Alert
                    txt={
                        "La contraseña debe contener 8 carácteres mínimo, una mayúscula, una minúscula y un número."
                    }
                    txtBtn={"Aceptar"}
                    display={display}
                    aceptar={changeDisplay}
                />
            </div>
        </div>
    );
};

export default Register;
