import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainUser from './pages/user/main';
import DetailsUser from './pages/user/details';
import AddUser from './pages/user/add';
import EditUser from "./pages/user/edit";
import DeleteUser from "./pages/user/delete";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" >
                <Redirect to="/users"></Redirect>
            </Route>
            <Route exact path = "/users" component={MainUser} />
            <Route path = "/user/:id" component={DetailsUser} />
            <Route path = "/add" component={AddUser} />
            <Route path = "/edit/:id" component={EditUser} />
            <Route path = "/delete/:id" component={DeleteUser} />
        </Switch>
    </BrowserRouter>
);

export default Routes;