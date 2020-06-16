import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home/home";

function App() {
    return (
        <Switch>
            <Route path="/home" component={Home} />
            <Redirect from="/" to="/home" />
        </Switch>
    );
}

export default App;
