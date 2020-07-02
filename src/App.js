import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Parse from "parse";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { UserProvider } from "./context/user";
import { LangContext } from "./context/lang";

function App() {
    const [lang, setLang] = useState("es");

    Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
    Parse.initialize(
        "kn0fKAr5wiPrx2FEjeIlejuE9s8AjEHaF2vY9zj9", // This is your Application ID
        "YxSrKWAZV2eZw5riHbZWbKr75aBjr2NyuKrll60W" // This is your Javascript key
    );
    return (
        <LangContext.Provider value={{ lang, setLang }}>
            <UserProvider>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Register} />
                    <Redirect from="/" to={"/login"} />
                </Switch>
            </UserProvider>
        </LangContext.Provider>
    );
}

export default App;
