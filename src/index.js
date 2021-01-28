import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from "redux";
import reportWebVitals from './reportWebVitals';
import {Provider, connect} from 'react-redux';

// reducer function
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

// creating a store, which exposes 3 methods -- getState, dispatch and subscribe
let store = createStore(countReducer);

// component
const Component = ({count, handleIncrementClick, handleDecrementClick}) => (
    <div>
        <h1>Helloworld React & Redux! {count}</h1>
        <button onClick={handleDecrementClick}>Decrement</button>
        <button onClick={handleIncrementClick}>Increment</button>
    </div>
);

// mapStateToProps that literally maps or links the state from the Redux store to the component props we wish to pass to our downstream component.
// In this case, we convert the state (which is just a number from countReducer) to a prop called count.
const mapStateToProps = state => {
    return {
        count: state
    };
};

// This function maps the dispatch function from the Redux store to the registered callbacks.
// These callbacks are named as the return object's property,
// and passed to the downstream component as props (handleIncrementClick and handleDecrementClick).
const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({type: 'INCREMENT'}),
        handleDecrementClick: () => dispatch({type: 'DECREMENT'})
    }
};

// use connect() to connect redux:(mapStateToProps, mapDispatchToProps) to (component)
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

// connect redux to react using the NPM library react-redux. Let's import the <Provider />,
// and wrap our main app component with it. Also, pass our previously created store into the <Provider />'s store prop.
const App = () => (
    <Provider store={store}>
        <Container/>
    </Provider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
