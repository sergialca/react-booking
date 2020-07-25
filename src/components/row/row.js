import React, { useState } from "react";
import DeleteButton from "../deleteButton/deleteButton";
import "./row.scss";

const Row = ({ id, roomName, day, time, deleteRow, btnTxt }) => {
    const [deleted, setDeleted] = useState(false);

    return (
        <tr className={deleted ? "noRow" : "row"} rowId={id}>
            <td>{roomName}</td>
            <td>{day}</td>
            <td>{time}</td>
            <td>
                <DeleteButton
                    deleteRow={deleteRow}
                    setDeleted={setDeleted}
                    id={id}
                    btnTxt={btnTxt}
                />
            </td>
        </tr>
    );
};

export default Row;
