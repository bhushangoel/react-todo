import {connect} from "react-redux";
import React from "react";
import {v4} from "node-uuid";

// action creator
const addTodo = (text) => ({
    type: 'ADD_TODO',
    text,
    id: v4()
})

let AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                dispatch(addTodo(input.value))
                input.value = '';
            }}>Add TODO
            </button>
        </div>
    )
};
AddTodo = connect()(AddTodo);

export default AddTodo;
