import React, { useContext, useEffect, useState } from "react";
import { LangContext } from "../../context/lang";
import dashboardCa from "../../json/dashboardCa.json";
import dashboardEs from "../../json/dashboardEs.json";
import Room from "../../components/room/room";
import TimeAlert from "../../components/alert/timeAlert";
import Parse from "parse";
import "./dashboard.scss";

const Dashboard = (props) => {
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("Reservas");
    const [display, setDisplay] = useState({ timeAlert: false, okClicked: false });
    const [rooms, setRooms] = useState([
        {
            attributes: {
                name: "fake",
                times: [
                    { id: 0, timeInt: "a-b" },
                    { id: 0, timeInt: "a-b" },
                ],
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
        query.find().then((result) => {
            setRooms(() => result);
        });
        return () => {
            setDisplay((dis) => ({ ...dis, timeAlert: false }));
        };
    }, []);

    const aceptar = () => {
        setDisplay((dis) => ({ ...dis, timeAlert: false, okClicked: true }));
    };

    const cancelar = () => {
        setDisplay((dis) => ({ ...dis, timeAlert: false, okClicked: false }));
    };

    const timeClicked = (time, room, roomId) => {
        setDisplay((dis) => ({ ...dis, timeBadge: false }));
    };

    return (
        <div className="dashboard">
            {rooms.map((m) => {
                return (
                    <Room
                        key={m._objCount}
                        name={m.attributes.name}
                        time={m.attributes.times}
                        roomId={m.id}
                        display={display.okClicked}
                        setDisplay={setDisplay}
                        timeClicked={timeClicked}
                    />
                );
            })}
            <TimeAlert display={display.timeAlert} aceptar={aceptar} cancelar={cancelar} />
        </div>
    );
};

export default Dashboard;
