import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login/login";

function App() {
    return (
        <Switch>
            <Route path="/home" component={Login} />
            <Redirect from="/" to="/home" />
        </Switch>
    );
}

export default App;
