import React from "react";
import Navbar from "../../components/navbar/navbar";
import "./main.scss";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
