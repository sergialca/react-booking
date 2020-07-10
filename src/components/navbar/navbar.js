import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import LangDropdown from "../langDropdown/langDropdown";
import { MenuContext } from "../../context/menu";
import "./navbar.scss";

const Navbar = ({ content }) => {
    const [expanded, setExpanded] = useState(false);
    const { setMenu } = useContext(MenuContext);
    const [selected, setSelected] = useState({ first: true, second: false });

    const onExpand = () => {
        setExpanded((expanded) => !expanded);
    };

    const selectTab = (tab) => {
        switch (tab) {
            case "1":
                setSelected(() => ({ first: true, second: false }));
                //FALTA PULIR
                console.log("content en navbar", content);
                setMenu(() => "Reservar");
                //
                break;
            case "2":
                setSelected(() => ({ first: false, second: true }));
                setMenu(() => "Mis Reservas");
                break;
            default:
                setSelected(() => ({ first: true, second: false }));
                break;
        }
        setExpanded(() => false);
    };

    return (
        <div className={expanded ? "navbar responsive" : "navbar"}>
            <Link onClick={() => selectTab("1")} className="link brand" to="/dashboard">
                {content.brand}
            </Link>
            <div className={expanded ? "panel responsive" : "panel"}>
                <Link
                    onClick={() => selectTab("1")}
                    className={selected.first ? "link selected" : "link"}
                    to="/dashboard"
                >
                    {content.booking}
                </Link>
                <Link
                    onClick={() => selectTab("2")}
                    className={selected.second ? "link selected" : "link"}
                    to="/myspace"
                >
                    {content.myBooking}
                </Link>
                <div className="lang">
                    <LangDropdown />
                </div>
            </div>
            <div className="icon" onClick={onExpand}>
                <TiThMenu />
            </div>
        </div>
    );
};

export default Navbar;
