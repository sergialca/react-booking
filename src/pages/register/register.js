import React from "react";
import RegisterForm from "../../components/registerForm/registerForm";
import "./register.scss";

const Register = () => {
    return (
        <div className="register">
            <div className="formContainer fade">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
