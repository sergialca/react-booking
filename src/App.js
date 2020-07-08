import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Parse from "parse";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Layout from "./layouts/main/main";
import Dashboard from "./pages/dashboard/dashboard";
import Myspace from "./pages/myspace/myspace";
import AppRoute from "./components/appRoute/appRoute";
import { UserContext } from "./context/user";
import { LangContext } from "./context/lang";

function App() {
    const [lang, setLang] = useState("es");
    const appId = "kn0fKAr5wiPrx2FEjeIlejuE9s8AjEHaF2vY9zj9";

    const getUserLoged = () => {
        const session = JSON.parse(localStorage.getItem(`Parse/${appId}/currentUser`));
        if (session) {
            return session.sessionToken
                ? {
                      logged: true,
                      name: session.name,
                      email: session.mail,
                      token: session.sessionToken,
                      id: session.objectId,
                  }
                : { logged: false };
        } else return { logged: false };
    };

    const [user, setUser] = useState(getUserLoged());

    useEffect(() => {
        Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
        Parse.initialize(
            appId,
            "YxSrKWAZV2eZw5riHbZWbKr75aBjr2NyuKrll60W" // This is your Javascript key
        );
    }, []);

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            <UserContext.Provider value={{ user, setUser }}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Register} />
                    <AppRoute path="/dashboard" component={Dashboard} layout={Layout} />
                    <AppRoute path="/myspace" component={Myspace} layout={Layout} />
                    <Redirect from="/" to={"/dashboard"} />
                </Switch>
            </UserContext.Provider>
        </LangContext.Provider>
    );
}

export default App;
