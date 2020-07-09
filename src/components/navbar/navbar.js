import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import "./navbar.scss";

const Navbar = () => {
    const [expanded, setExpanded] = useState(false);

    const onExpand = () => {
        setExpanded((expanded) => !expanded);
    };

    return (
        <div className={expanded ? "navbar responsive" : "navbar"}>
            <Link className="link brand" to="/dashboard">
                Home
            </Link>
            <div className={expanded ? "panel responsive" : "panel"}>
                <Link className="link" to="/dashboard">
                    First
                </Link>
                <Link className="link" to="/dashboard">
                    Last
                </Link>
            </div>
            <div className="icon" onClick={onExpand}>
                <TiThMenu />
            </div>
        </div>
    );
};

export default Navbar;
