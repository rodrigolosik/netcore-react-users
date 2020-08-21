import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainUser from './pages/user/main';
import DetailsUser from './pages/user/details';
import AddUser from './pages/user/add';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path = "/users" component={MainUser} />
            <Route path = "/user/:id" component={DetailsUser} />
            <Route path = "/add" component={AddUser} />
        </Switch>
    </BrowserRouter>
);

export default Routes;