import axios from "axios";

const url = "https://parseapi.back4app.com";
const appId = "kn0fKAr5wiPrx2FEjeIlejuE9s8AjEHaF2vY9zj9";

export const getValUserLoged = async (token) => {
    const val = await axios({
        method: "get",
        url: `${url}/users/me`,
        headers: {
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": "od4o0RAtgQzAICZY1LdEiVrItZN2trnrtcQX4hve",
            "X-Parse-Session-Token": token,
        },
    });
    return val.data;
};

export const isUserLoged = async () => {
    const session = JSON.parse(localStorage.getItem(`Parse/${appId}/currentUser`));
    const localUser = session ? await getValUserLoged(session.sessionToken) : "";
    return localUser ? true : false;
};
