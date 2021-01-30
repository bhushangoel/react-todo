import {connect} from "react-redux";
import TodoList from "./TodoList";
import {withRouter} from 'react-router-dom';

// action creator
const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(t => t.completed);
        case 'active':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
}

// declare a function called "MapsStateToProps" which takes the redux store state and returns the props that
// I need to parse through the presentation to do this component, to render it with the current state.
const mapStateToTodoListProps = (state, ownProps) => ({
    todos: getVisibleTodos(state.todos, ownProps.match.params.filter || 'all')
})

// maps dispatch method of the store to the callback props of todo list component
/*const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id))
    }
})*/

/*const VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList));*/

// shorthand notation
const VisibleTodoList = withRouter(connect(
    mapStateToTodoListProps,
    {onTodoClick: toggleTodo}
)(TodoList));

export default VisibleTodoList;
