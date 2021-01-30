import React from "react";
import {Provider} from "react-redux";
// import {Router, Route, useHistory} from 'react-router';
import {Route, BrowserRouter, Redirect} from "react-router-dom";
import TodoApp from "./TodoApp";

const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/:filter" component={TodoApp}/>
            <Redirect to="/all"/>
        </BrowserRouter>
    </Provider>
)

export default Root;
