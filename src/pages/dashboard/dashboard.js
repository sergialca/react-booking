import React, { useContext, useEffect, useState } from "react";
import dashboardCa from "../../json/dashboardCa.json";
import dashboardEs from "../../json/dashboardEs.json";
import Room from "../../components/room/room";
import TimeAlert from "../../components/alert/timeAlert";
import { LangContext } from "../../context/lang";
import { LogicContext } from "../../context/logic";
import { UserContext } from "../../context/user";
import { newBooking, getValUserLoged, getRooms, getBooking } from "../../api/api";
import Parse from "parse";
import "./dashboard.scss";

const Dashboard = (props) => {
    const { lang } = useContext(LangContext);
    const { logic } = useContext(LogicContext);
    const { user } = useContext(UserContext);
    const [content, setContent] = useState("Reservas");
    const [display, setDisplay] = useState({ timeAlert: false });
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

    const verifyUser = async () => {
        const currentUser = await getValUserLoged(user.token);
        return currentUser ? "" : props.history.push("/login");
    };

    const dbRooms = async () => {
        const resRooms = await getRooms();
        for (let i = 0; i < resRooms.length; i++) {
            const bo = await getBooking(logic.day, resRooms[i].id);
            if (bo.length > 0) {
                const reNew = bo.map((t) => {
                    return t.attributes.time;
                });
                reNew.map((tt) => {
                    resRooms[i].attributes.times.map((et, pos) => {
                        if (tt === et.timeInt) resRooms[i].attributes.times.splice(pos, 1);
                        return tt;
                    });
                    return tt;
                });
            }
            if (resRooms[i].attributes.times.length === 0) {
                resRooms[i].attributes.times.push("No time available");
            }
            if (i === 0) setRooms(() => [resRooms[i]]);
            else setRooms((prev) => [...prev, resRooms[i]]);
        }
        return;
    };

    useEffect(() => {
        if (lang === "ca") {
            setContent(() => dashboardCa);
        } else if (lang === "es") {
            setContent(() => dashboardEs);
        }
        verifyUser();
        dbRooms();
        return () => {
            setDisplay((dis) => ({ ...dis, timeAlert: false }));
        };
    }, []);

    const aceptar = async () => {
        await newBooking(user.id, logic.roomId, logic.day, logic.time);
        setDisplay((dis) => ({ ...dis, timeAlert: false }));
    };

    const cancelar = () => {
        setDisplay((dis) => ({ ...dis, timeAlert: false }));
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
                        setDisplay={setDisplay}
                        day={logic.day}
                        noTimes={content.complete}
                    />
                );
            })}
            <TimeAlert display={display.timeAlert} aceptar={aceptar} cancelar={cancelar} />
        </div>
    );
};

export default Dashboard;
