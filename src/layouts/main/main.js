import React from "react";
import "./main.scss";

const Layout = ({ children }) => {
    return (
        <div>
            <div className="nav">HOLA</div>
            {children}
        </div>
    );
};

export default Layout;
