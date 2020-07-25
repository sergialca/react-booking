import React from "react";
import Row from "../row/row";
import { deleteBooking } from "../../api/api";
import "./table.scss";

const Table = ({ header, data, btnTxt }) => {
    const deleteRow = async (id) => {
        deleteBooking(id);
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="trHeader">
                        {header.map((h) => (
                            <th key={h.unique}>{h.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((el) => (
                        <Row
                            key={el.id}
                            id={el.id}
                            roomName={el.roomName}
                            day={el.day}
                            time={el.time}
                            deleteRow={deleteRow}
                            btnTxt={btnTxt}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
