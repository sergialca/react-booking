import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Layout from "./layouts/main/main";
import Dashboard from "./pages/dashboard/dashboard";
import Myspace from "./pages/myspace/myspace";
import Profile from "./pages/profile/profile";
import AppRoute from "./components/appRoute/appRoute";
import moment from "moment";
import { UserContext } from "./context/user";
import { LangContext } from "./context/lang";
import { MenuContext } from "./context/menu";
import { FiltersContext } from "./context/filters";
import { BookingContext } from "./context/booking";
import { DeleteContext } from "./context/deleteBooking";

function App() {
    const [lang, setLang] = useState("es");
    const [menu, setMenu] = useState("Reservar");
    const [filters, setFilters] = useState({
        room: "roomName",
        roomId: "all",
        day: moment(),
        dayFormatted: moment().format("L"),
        dayEuropean: `${moment().date()}/${moment().month() + 1}/${moment().year()}`,
        isSunday: moment().format("dddd") === "Sunday" ? true : false,
        select: false,
        dayPicker: false,
    });

    const [booking, setBooking] = useState({
        room: "roomName",
        roomId: "all",
        dayFormatted: moment().format("L"),
        time: "0h-2h",
        timeId: "t0",
        booked: false,
    });
    const [user, setUser] = useState({ logged: false });

    useEffect(() => {
        if (!supabase) return undefined;

        const applySession = (session) => {
            if (!session) {
                setUser({ logged: false });
                return;
            }
            setUser({
                logged: true,
                name: session.user.user_metadata?.name || "",
                mail: session.user.email,
                token: session.access_token,
                id: session.user.id,
            });
        };

        supabase.auth.getSession().then(({ data }) => applySession(data.session));
        const { data } = supabase.auth.onAuthStateChange((_event, session) => applySession(session));
        return () => data.subscription.unsubscribe();
    }, []);

    const [deleteData, setDeleteData] = useState({
        room: "roomName",
        day: moment().format("L"),
        time: "10-12",
        timeId: "t0s0",
        deleted: false,
        euroDate: "14/4/2000",
    });

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            <UserContext.Provider value={{ user, setUser }}>
                <MenuContext.Provider value={{ menu, setMenu }}>
                    <FiltersContext.Provider value={{ filters, setFilters }}>
                        <BookingContext.Provider value={{ booking, setBooking }}>
                            <DeleteContext.Provider value={{ deleteData, setDeleteData }}>
                                <Switch>
                                    <Route path="/login" component={Login} />
                                    <Route path="/signup" component={Register} />
                                    <AppRoute
                                        path="/"
                                        exact
                                        component={Dashboard}
                                        layout={Layout}
                                    />
                                    <AppRoute path="/myspace" component={Myspace} layout={Layout} />
                                    <AppRoute path="/profile" component={Profile} layout={Layout} />
                                    <Redirect to="/" />
                                </Switch>
                            </DeleteContext.Provider>
                        </BookingContext.Provider>
                    </FiltersContext.Provider>
                </MenuContext.Provider>
            </UserContext.Provider>
        </LangContext.Provider>
    );
}

export default App;
