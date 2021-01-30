import React from "react";
import AddTodo from "./AddTodo";
import VisibleTodoList from "./VisibleTodoList";
import Footer from "./Footer";

const TodoApp = () => {
    return (
        <div>
            <h2>Todos:</h2>
            <AddTodo/>
            <VisibleTodoList/>
            <Footer/>
        </div>
    )
}


export default TodoApp;
