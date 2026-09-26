import { requireSupabase } from "../supabaseClient";

const asRoom = (row) => ({
    id: row.id,
    attributes: {
        name: row.name,
        times: Array.isArray(row.times) ? row.times.map((slot) => ({ ...slot })) : [],
    },
});

const asBooking = (row) => ({
    id: row.id,
    attributes: {
        day: row.day,
        time: row.time,
        timeId: row.time_id,
        euroDate: row.euro_date,
        room: { id: row.room_id },
    },
});

const saveError = async (description, details = {}) => {
    try {
        const client = requireSupabase();
        const { data } = await client.auth.getUser();
        await client.from("errors").insert({
            user_id: data.user ? data.user.id : null,
            code: details.code || null,
            error: details.error || null,
            description,
        });
    } catch (e) {
        return;
    }
};

export const getValUserLoged = async () => {
    try {
        const { data, error } = await requireSupabase().auth.getUser();
        if (error || !data.user) return false;
        return data.user;
    } catch (e) {
        saveError("El token no se ha encontrado al verificar usuario");
        return false;
    }
};

export const isUserLoged = async () => {
    try {
        const { data } = await requireSupabase().auth.getSession();
        return Boolean(data.session);
    } catch (e) {
        return false;
    }
};

export const newBooking = async (userId, roomId, day, time, timeId, euroDate) => {
    try {
        const { data, error } = await requireSupabase()
            .from("bookings")
            .insert({
                user_id: userId,
                room_id: roomId,
                day,
                time,
                time_id: timeId,
                euro_date: euroDate,
            })
            .select()
            .single();
        if (error) {
            saveError("Fallo al crear reserva", { error: error.message });
            return false;
        }
        return data;
    } catch (e) {
        saveError("Fallo al crear reserva", { error: e.message });
        return false;
    }
};

export const getBooking = async (day, roomId) => {
    const { data, error } = await requireSupabase()
        .from("bookings")
        .select("id, day, time, time_id, euro_date, room_id")
        .eq("day", day)
        .eq("room_id", roomId);
    if (error) throw error;
    return (data || []).map(asBooking);
};

export const getRooms = async () => {
    const { data, error } = await requireSupabase().from("rooms").select("id, name, times").order("name");
    if (error) throw error;
    return (data || []).map(asRoom);
};

export const getRoom = async (roomName) => {
    const { data, error } = await requireSupabase()
        .from("rooms")
        .select("id, name, times")
        .eq("name", roomName);
    if (error) throw error;
    return (data || []).map(asRoom);
};

export const getUserBookings = async () => {
    const client = requireSupabase();
    const { data: userData, error: userError } = await client.auth.getUser();
    if (userError || !userData.user) return [];
    const { data, error } = await client
        .from("bookings")
        .select("id, day, time, time_id, euro_date, room_id")
        .eq("user_id", userData.user.id);
    if (error) throw error;
    return (data || []).map(asBooking);
};

export const getRoomById = async (id) => {
    const { data, error } = await requireSupabase()
        .from("rooms")
        .select("id, name, times")
        .eq("id", id)
        .single();
    if (error) throw error;
    return asRoom(data);
};

export const deleteBooking = async (id) => {
    const { error } = await requireSupabase().from("bookings").delete().eq("id", id);
    if (error) throw error;
};

export const bookingMail = async () => {};

export const deleteMail = async () => {};

export const logout = async () => {
    const { error } = await requireSupabase().auth.signOut();
    if (error) throw error;
};
