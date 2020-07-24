import React, { useEffect, useContext, useState } from "react";
import { LangContext } from "../../context/lang";
import Table from "../../components/table/table";
import myspaceCa from "../../json/myspaceCa.json";
import myspaceEs from "../../json/myspaceEs.json";
import { getUserBookings, getRoomById } from "../../api/api";
import "./myspace.scss";

const Myspace = () => {
    const { lang } = useContext(LangContext);
    const [content, setContent] = useState("es");
    const [tableCol, setTableCol] = useState([
        {
            header: "Sala",
            id: "roomName",
        },
    ]);
    const [tableData, setTableData] = useState([
        {
            roomName: "sala 1",
            day: "23/06/2018",
            time: "9-10",
            delete: "no",
        },
        {
            roomName: "sala 1",
            day: "23/06/2018",
            time: "9-10",
            delete: "no",
        },
        {
            roomName: "sala 2",
            day: "23/06/2018",
            time: "9-10",
            delete: "no",
        },
    ]);

    useEffect(() => {
        if (lang === "ca") {
            setContent(() => myspaceCa);
        } else if (lang === "es") {
            setContent(() => myspaceEs);
        }
    }, [lang]);

    const dbUserBoo = async () => {
        const res = await getUserBookings();
        let ob = {};
        for (let i = 0; i < res.length; i++) {
            const roomName = await getRoomById(res[i].attributes.room.id);
            ob = {
                day: res[i].attributes.day,
                time: res[i].attributes.time,
                roomName: roomName.attributes.name,
                id: res[i].id,
            };
            if (i === 0) setTableData(() => [ob]);
            else setTableData((prev) => [...prev, ob]);
        }
    };

    const getColumns = () => {
        switch (lang) {
            case "ca":
                setTableCol(() => [
                    {
                        header: "Sala",
                        id: "roomName",
                    },
                    {
                        header: "Dia",
                        id: "day",
                    },
                    {
                        header: "hora",
                        id: "time",
                    },
                    {
                        header: "Eliminar",
                        id: "delete",
                    },
                ]);
                break;
            case "es":
                setTableCol(() => [
                    {
                        header: "Sala",
                        id: "roomName",
                    },
                    {
                        header: "Dia",
                        id: "day",
                    },
                    {
                        header: "hora",
                        id: "time",
                    },
                    {
                        header: "Eliminar",
                        id: "delete",
                    },
                ]);
                break;
            case "en":
                setTableCol(() => [
                    {
                        header: "Room",
                        id: "room",
                    },
                    {
                        header: "day",
                        id: "day",
                    },
                    {
                        header: "time",
                        id: "time",
                    },
                    {
                        header: "Delete",
                        id: "delete",
                    },
                ]);
                break;
            default:
                setTableCol(() => ["deafult"]);
        }
    };

    useEffect(() => {
        //dbUserBoo();
        getColumns();
    }, []);

    return (
        <div className="mySpace">
            <Table btnTxt={content.btnTxt} header={tableCol} data={tableData} />
        </div>
    );
};

export default Myspace;
