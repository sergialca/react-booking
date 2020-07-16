import React, { useContext, useEffect, useState } from "react";
import dashboardCa from "../../json/dashboardCa.json";
import dashboardEs from "../../json/dashboardEs.json";
import Room from "../../components/room/room";
import Select from "react-select";
import TimeAlert from "../../components/alert/timeAlert";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import { LangContext } from "../../context/lang";
import { LogicContext } from "../../context/logic";
import { UserContext } from "../../context/user";
import { newBooking, getValUserLoged, getRooms, getBooking } from "../../api/api";
import "./dashboard.scss";

const Dashboard = (props) => {
    const { lang } = useContext(LangContext);
    const { logic, setLogic } = useContext(LogicContext);
    const { user } = useContext(UserContext);
    const [display, setDisplay] = useState({ timeAlert: false });
    const [datePicker, setDayPicker] = useState({ focus: false });
    const [selectable, setSelectable] = useState([]);
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

    const selectLang = () => {
        if (lang === "ca") {
            return dashboardCa;
        } else if (lang === "es") {
            return dashboardEs;
        }
    };

    const [content, setContent] = useState(selectLang());

    useEffect(() => {
        if (lang === "ca") {
            setContent(() => dashboardCa);
        } else if (lang === "es") {
            setContent(() => dashboardEs);
        }
        selectableRooms();
    }, [lang]);

    const verifyUser = async () => {
        const currentUser = await getValUserLoged(user.token);
        return currentUser ? "" : props.history.push("/login");
    };

    const dbRooms = async () => {
        const resRooms = await getRooms();
        for (let i = 0; i < resRooms.length; i++) {
            const bo = await getBooking(logic.dayFormatted, resRooms[i].id);
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

    const selectableRooms = async () => {
        const results = await getRooms();
        for (let i = 0; i < results.length; i++) {
            if (i === 0) {
                setSelectable(() => [
                    { value: results[i].attributes.name, label: results[i].attributes.name },
                ]);
            } else if (i === results.length - 1) {
                setSelectable((prev) => [
                    ...prev,
                    { value: results[i].attributes.name, label: results[i].attributes.name },
                    {
                        value: lang === "ca" ? "Totes" : "Todas",
                        label: lang === "ca" ? "Totes" : "Todas",
                    },
                ]);
            } else {
                setSelectable((prev) => [
                    ...prev,
                    { value: results[i].attributes.name, label: results[i].attributes.name },
                ]);
            }
        }
    };

    useEffect(() => {
        verifyUser();
        dbRooms();
        return () => {
            setDisplay((dis) => ({ ...dis, timeAlert: false }));
        };
    }, []);

    const aceptar = async () => {
        await newBooking(user.id, logic.roomId, logic.dayFormatted, logic.time);
        setDisplay((dis) => ({ ...dis, timeAlert: false }));
    };

    const cancelar = () => {
        setDisplay((dis) => ({ ...dis, timeAlert: false }));
    };

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: "250px",
            width: "120px",
        }),
    };

    return (
        <div className="dashboard">
            <div className="filters">
                <div className="labelInput">
                    <span className="label">{content.day}:</span>
                    <SingleDatePicker
                        date={logic.day}
                        onDateChange={(date) => {
                            setLogic((prev) => ({
                                ...prev,
                                day: date,
                                dayFormatted: date.format("L"),
                            }));
                        }}
                        focused={datePicker.focus} // PropTypes.bool
                        onFocusChange={({ focused }) => {
                            setDayPicker(() => ({ focus: focused }));
                        }}
                        numberOfMonths={1}
                        displayFormat={"DD/MM/YYYY"}
                        id="dayComp"
                    />
                </div>
                <div className="labelInput second">
                    <span className="label">{content.room}:</span>
                    <Select
                        styles={colourStyles}
                        options={selectable}
                        defaultValue={selectable[2]}
                        placeholder={content.all}
                    />
                </div>
            </div>
            <div className="rooms">
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
            </div>
            <TimeAlert display={display.timeAlert} aceptar={aceptar} cancelar={cancelar} />
        </div>
    );
};

export default Dashboard;
