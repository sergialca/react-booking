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
    if (e.mail) {
        await axios({
            method: "post",
            url: `${url}/classes/Errors`,
            headers: normalHeaders,
            data: {
                code: 401,
                error: "Network Error",
                description,
            },
        });
    } else {
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
    }

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

export const newBooking = async (userId, roomId, day, time, timeId, euroDate) => {
    try {
        const val = await axios({
            method: "post",
            url: `${url}/classes/Booking`,
            headers: normalHeaders,
            data: {
                user: { __type: "Pointer", className: "_User", objectId: userId },
                day,
                time,
                timeId,
                euroDate,
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

export const getUserBookings = async () => {
    const Booking = Parse.Object.extend("Booking");
    const query = new Parse.Query(Booking);
    query.equalTo("user", Parse.User.current());
    let result = await query.find();
    return result;
};

export const getRoomById = async (id) => {
    const Rooms = Parse.Object.extend("Rooms");
    const query = new Parse.Query(Rooms);
    let res = await query.get(id);
    return res;
};

export const deleteBooking = async (id) => {
    const Booking = Parse.Object.extend("Booking");
    const query = new Parse.Query(Booking);
    let obToDelete = await query.get(id);
    await obToDelete.destroy();
    return;
};

export const bookingMail = async (lang, mail, room, dayFormatted, dayEuropean, time) => {
    try {
        const send = await axios({
            method: "post",
            url: "http://server.taptime.info/api/mail/create",
            data: {
                lang,
                mail,
                room,
                dayFormatted,
                euroDate: dayEuropean,
                time,
                www: window.location.host,
            },
        });
        return;
    } catch (e) {
        if (e.response) {
            saveError(e, "Fallo al enviar mail de crear nueva reserva");
        } else {
            e.mail = true;
            saveError(e, "Fallo al enviar mail de crear nueva reserva");
        }
        return;
    }
};

export const deleteMail = async (lang, mail, room, day, euroDate, time) => {
    try {
        const send = await axios({
            method: "post",
            url: "http://server.taptime.info/api/mail/delete",
            data: {
                lang,
                mail,
                room,
                day,
                euroDate,
                time,
                www: window.location.host,
            },
        });
        return;
    } catch (e) {
        if (e.response) {
            saveError(e, "Fallo al enviar mail de borrar reserva");
        } else {
            e.mail = true;
            saveError(e, "Fallo al enviar mail de borrar reserva");
        }
        return;
    }
};

export const logout = async () => {
    const noUser = await Parse.User.logOut();
    return;
};
