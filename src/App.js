import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Parse from "parse";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { LangProvider } from "./context/lang";
import { UserProvider } from "./context/user";

function App() {
    Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
    Parse.initialize(
        "kn0fKAr5wiPrx2FEjeIlejuE9s8AjEHaF2vY9zj9", // This is your Application ID
        "YxSrKWAZV2eZw5riHbZWbKr75aBjr2NyuKrll60W" // This is your Javascript key
    );
    return (
        <LangProvider>
            <UserProvider>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </UserProvider>
        </LangProvider>
    );
}

export default App;
