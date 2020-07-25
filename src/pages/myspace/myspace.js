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
            id: "asd",
        },
        {
            roomName: "sala 1",
            day: "23/06/2018",
            time: "9-10",
            delete: "no",
            id: "vbn",
        },
        {
            roomName: "sala 2",
            day: "23/06/2018",
            time: "9-10",
            delete: "no",
            id: "uoi",
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
                        unique: "h1ca",
                    },
                    {
                        header: "Dia",
                        id: "day",
                        unique: "h2ca",
                    },
                    {
                        header: "hora",
                        id: "time",
                        unique: "h3ca",
                    },
                    {
                        header: "",
                        id: "delete",
                        unique: "h4ca",
                    },
                ]);
                break;
            case "es":
                setTableCol(() => [
                    {
                        header: "Sala",
                        id: "roomName",
                        unique: "h1es",
                    },
                    {
                        header: "Dia",
                        id: "day",
                        unique: "h2es",
                    },
                    {
                        header: "hora",
                        id: "time",
                        unique: "h3es",
                    },
                    {
                        header: "",
                        id: "delete",
                        unique: "h4es",
                    },
                ]);
                break;
            case "en":
                setTableCol(() => [
                    {
                        header: "Room",
                        id: "room",
                        unique: "h1en",
                    },
                    {
                        header: "day",
                        id: "day",
                        unique: "h2en",
                    },
                    {
                        header: "time",
                        id: "time",
                        unique: "h3en",
                    },
                    {
                        header: "",
                        id: "delete",
                        unique: "h4en",
                    },
                ]);
                break;
            default:
                setTableCol(() => ["deafult"]);
        }
    };

    useEffect(() => {
        dbUserBoo();
        getColumns();
    }, []);

    return (
        <div className="mySpace">
            <Table key={"table"} btnTxt={content.btnTxt} header={tableCol} data={tableData} />
        </div>
    );
};

export default Myspace;
