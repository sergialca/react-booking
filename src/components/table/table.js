import React from "react";
import DeleteButton from "../deleteButton/deleteButton";
import "./table.scss";

const Table = ({ header, data, btnTxt }) => {
    const deleteRow = () => {
        console.log("DR");
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="trHeader">
                        {header.map((h) => (
                            <th>{h.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((el) => (
                        <tr className="row" key={el.id}>
                            <td>{el.roomName}</td>
                            <td>{el.day}</td>
                            <td>{el.time}</td>
                            <td>
                                <DeleteButton deleteRow={deleteRow} txt={btnTxt} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
