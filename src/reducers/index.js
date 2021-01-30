import visibility from "./visibilityFilter";
import todos from "./todos";
import {combineReducers} from "redux";

const todoApp = combineReducers({todos, visibility});

export default todoApp;
