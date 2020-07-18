import axios from "axios";
import Parse from "parse";

const url = "https://parseapi.back4app.com";
const appId = "kn0fKAr5wiPrx2FEjeIlejuE9s8AjEHaF2vY9zj9";
const normalHeaders = {
    "X-Parse-Application-Id": appId,
    "X-Parse-REST-API-Key": "od4o0RAtgQzAICZY1LdEiVrItZN2trnrtcQX4hve",
    "Content-Type": "application/json",
};
const saveError = async (e, description) => {
    await axios({
        method: "post",
        url: `${url}/classes/Errors`,
        headers: normalHeaders,
        data: {
            code: e.response.data.code,
            error: e.response.data.error,
            description,
        },
    });
    return;
};

export const getValUserLoged = async (token) => {
    try {
        const val = await axios({
            method: "get",
            url: `${url}/users/me`,
            headers: {
                "X-Parse-Application-Id": appId,
                "X-Parse-REST-API-Key": "od4o0RAtgQzAICZY1LdEiVrItZN2trnrtcQX4hve",
                "X-Parse-Session-Token": token,
            },
        });
        return val;
    } catch (e) {
        saveError(e, "El token no se ha encontrado al verificar usuario");
        return false;
    }
};

export const isUserLoged = async () => {
    const session = JSON.parse(localStorage.getItem(`Parse/${appId}/currentUser`));
    const localUser = session ? await getValUserLoged(session.sessionToken) : "";
    return localUser ? true : false;
};

export const newBooking = async (userId, roomId, day, time) => {
    try {
        const val = await axios({
            method: "post",
            url: `${url}/classes/Booking`,
            headers: normalHeaders,
            data: {
                user: { __type: "Pointer", className: "_User", objectId: userId },
                day,
                time,
                room: { __type: "Pointer", className: "Rooms", objectId: roomId },
            },
        });
        return val.data;
    } catch (e) {
        saveError(e, "Fallo al crear reserva");
        return false;
    }
};

export const getBooking = async (day, roomId) => {
    const Booking = Parse.Object.extend("Booking");
    const queryRoom = new Parse.Query(Booking);
    queryRoom.equalTo("room", { __type: "Pointer", className: "Rooms", objectId: roomId });
    queryRoom.select("time");
    const queryDay = new Parse.Query(Booking);
    queryDay.equalTo("day", day);
    queryDay.select("time");
    const composedQuery = Parse.Query.and(queryRoom, queryDay);
    let result = await composedQuery.find();
    return result;
};

export const getRooms = async () => {
    const rooms = Parse.Object.extend("Rooms");
    const query = new Parse.Query(rooms);
    let roomsRes = await query.find();
    return roomsRes;
};

export const getRoom = async (roomName) => {
    const Rooms = Parse.Object.extend("Rooms");
    const query = new Parse.Query(Rooms);
    query.equalTo("name", roomName);
    let res = await query.find();
    return res;
};
