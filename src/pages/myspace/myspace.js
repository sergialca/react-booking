import React, { useEffect, useContext, useState } from "react";
import { LangContext } from "../../context/lang";
import Table from "../../components/table/table";
import DeleteAlert from "../../components/alert/deleteAlert";
import ClipLoader from "react-spinners/ClipLoader";
import myspaceCa from "../../json/myspaceCa.json";
import myspaceEs from "../../json/myspaceEs.json";
import myspaceEn from "../../json/myspaceEn.json";
import { getUserBookings, getRoomById, deleteBooking } from "../../api/api";
import { DeleteContext } from "../../context/deleteBooking";
import { BookingContext } from "../../context/booking";
import { UserContext } from "../../context/user";
import "./myspace.scss";

const Myspace = () => {
    const { lang } = useContext(LangContext);
    const { deleteData, setDeleteData } = useContext(DeleteContext);
    const { setBooking } = useContext(BookingContext);
    const { user } = useContext(UserContext);
    const [content, setContent] = useState("es");
    const [display, setDisplay] = useState({
        deleteAlert: false,
        loading: false,
        loadingBtn: false,
    });
    const [tableCol, setTableCol] = useState([
        {
            header: "Sala",
            id: "roomName",
        },
    ]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (lang === "ca") {
            setContent(() => myspaceCa);
        } else if (lang === "es") {
            setContent(() => myspaceEs);
        } else if (lang === "en") {
            setContent(() => myspaceEn);
        }
        getColumns();
    }, [lang]);

    const dbUserBoo = async () => {
        setDisplay((prev) => ({
            ...prev,
            loading: true,
        }));
        const res = await getUserBookings();
        let ob = {};
        for (let i = 0; i < res.length; i++) {
            const roomName = await getRoomById(res[i].attributes.room.id);
            ob = {
                day: res[i].attributes.day,
                time: res[i].attributes.time,
                roomName: roomName.attributes.name,
                timeId: res[i].attributes.timeId,
                euroDate: res[i].attributes.euroDate,
                id: res[i].id,
            };
            if (i === 0) setTableData(() => [ob]);
            else setTableData((prev) => [...prev, ob]);
        }
        setDisplay((prev) => ({
            ...prev,
            loading: false,
        }));
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
                        header: "Hora",
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
                        header: "Día",
                        id: "day",
                        unique: "h2es",
                    },
                    {
                        header: "Hora",
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
                        header: "Day",
                        id: "day",
                        unique: "h2en",
                    },
                    {
                        header: "Time",
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

    const acceptDeleteAlert = async () => {
        setDisplay((dis) => ({ ...dis, loadingBtn: true }));
        await deleteBooking(deleteData.id);
        setDeleteData((prev) => ({
            ...prev,
            deleted: true,
        }));
        setBooking(() => ({
            dayFormatted: deleteData.day,
            room: deleteData.room,
            roomId: "",
            time: deleteData.time,
            timeId: deleteData.timeId,
            booked: false,
        }));
        setDisplay((dis) => ({ ...dis, deleteAlert: false, loadingBtn: false }));
    };

    const cancel = () => {
        setDisplay((dis) => ({ ...dis, deleteAlert: false }));
    };

    return (
        <div className={display.loading ? "mySpaceLoading" : "mySpace"}>
            <DeleteAlert
                display={display.deleteAlert}
                accept={acceptDeleteAlert}
                cancel={cancel}
                txt={content}
                loadingBtn={display.loadingBtn}
            />
            {display.loading ? (
                <ClipLoader color={"#00d6fc"} size={50} />
            ) : tableData.length > 0 ? (
                <Table
                    key={"table"}
                    btnTxt={content.btnTxt}
                    header={tableCol}
                    data={tableData}
                    setDisplay={setDisplay}
                />
            ) : (
                <div className="empty">
                    <span>{content.empty}</span>
                </div>
            )}
        </div>
    );
};

export default Myspace;
