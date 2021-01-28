import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {createStore} from "redux";
import {render} from "@testing-library/react";

const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
)

const countReducer = function (state = 0, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};

let store = createStore(countReducer);
store.subscribe(render);
class App extends Component {
    render() {
        return (
            <div className="App">
                <Counter value={store.getState()}
                         onIncrement={() => store.dispatch({type: 'INCREMENT'})}
                         onDecrement={() => store.dispatch({type: 'DECREMENT'})}/>
            </div>
        );
    }
}

export default App;
