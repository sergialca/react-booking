import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "../../context/lang";
import dashboardCa from "../../json/dashboardCa.json";
import dashboardEs from "../../json/dashboardEs.json";
import Room from "../../components/room/room";
import Parse from "parse";
import "./dashboard.scss";

const Dashboard = (props) => {
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("Reservas");
    const [rooms, setRooms] = useState([
        {
            attributes: {
                name: "fake",
                times: ["f", "a"],
            },
        },
    ]);

    useEffect(() => {
        if (lang === "ca") {
            setContent(() => dashboardCa);
        } else if (lang === "es") {
            setContent(() => dashboardEs);
        }
    }, [lang]);

    useEffect(() => {
        const rooms = Parse.Object.extend("Rooms");
        const query = new Parse.Query(rooms);
        query.count().then((count) => {
            console.log(`ParseObjects found: ${count}`);
        });
        query.find().then((result) => {
            setRooms(() => result);
        });
    }, []);

    return (
        <div className="dashboard">
            {rooms.map((m) => {
                return (
                    <Room key={m._objCount} name={m.attributes.name} time={m.attributes.times} />
                );
            })}
            {console.log("Dashboard -> rooms", rooms)}
        </div>
    );
};

export default Dashboard;
