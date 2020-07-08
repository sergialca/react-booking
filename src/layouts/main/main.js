import React from "react";
import NavBar from "../../components/navbar/navbar";
import "./main.scss";

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
};

export default Layout;
