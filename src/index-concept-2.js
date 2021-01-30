// app flow before splitting

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, combineReducers} from "redux";
import {Provider, connect} from 'react-redux';
import {loadState, saveState} from "./localStorage";
import {v4} from 'node-uuid'

// action creators -- START
const addTodo = (text) => ({
    type: 'ADD_TODO',
    text,
    id: v4()
})

const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})

// action creator -- END

// creating a store and passing combined reducer
// const store = createStore(todoApp);

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
}

// addTodo component
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
AddTodo = connect()(AddTodo)

const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <button onClick={e => onClick()}>
            {children}
        </button>
    )
}

// FilterLink is now a container component --  provides behaviour and data to the Link component
/*
* As a container component, the filter link doesn't have its own markup. It delegates rendering to the link presentational component.
* In this case, it calculates its active prop by comparing its own filter prop with the visibility filter in the Redux chore state.
* The filter prop is the one that is passed to the filter link from the footer.
* The visibility filter corresponds to the currently chosen visibility filter that is held in Redux chore state. If they match, we want the link to appear active.
* */
const mapStateToLinkProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibility
})
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(setVisibilityFilter(ownProps.filter));
    }
})

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

/*class FilterLink extends Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const props = this.props;
        const state = store.getState();

        return (
            <Link active={props.filter === state.visibility}
                  onClick={() =>
                      store.dispatch({
                          type: 'SET_VISIBILITY_FILTER',
                          filter: props.filter
                      })
                  }>
                {props.children}
            </Link>
        )
    }
}*/

// Filter Link component
/*const FilterLink = ({filter, currentFilter, children, onClick}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    }
    return (
        <button onClick={e => onClick(filter)}>
            {children}
        </button>
    )
}*/

// footer component
const Footer = () => {
    return (
        <p>Show: {' '}
            <FilterLink filter='SHOW_ALL'>ALL</FilterLink>{' '}
            <FilterLink filter='SHOW_ACTIVE'>ACTIVE</FilterLink>{' '}
            <FilterLink filter='SHOW_COMPLETED'>COMPLETED</FilterLink>
        </p>
    )
}

// todo component -- making it a presentation component
const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>
        {text}
    </li>
)

// todolist component -- making it a presentation component
const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        )}
    </ul>
)

// declare a function called "MapsStateToProps" which takes the redux store state and returns the props that
// I need to parse through the presentation to do this component, to render it with the current state.
const mapStateToTodoListProps = (state) => ({
    todos: getVisibleTodos(state.todos, state.visibility)
})


// maps dispatch method of the store to the callback props of todo list component
const mapDispatchToTodoListProps = (dispatch) => ({
    onTodoClick(id) {
        dispatch(toggleTodo(id))
    }
})

const VisibleTodoList = connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList)

// container component - connect presentational component to the redux store | connect function will generate the component automatically
/*class VisibleTodoList extends Component {
    // subscribe to this store and force an update any time this store state changes because it uses this state in its render method.
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const props = this.props;
        const state = store.getState();

        return (
            <TodoList todos={getVisibleTodos(state.todos, state.visibility)}
                      onTodoClick={id =>
                          store.dispatch({
                              type: 'TOGGLE_TODO',
                              id
                          })
                      }
            />
        )
    }
}*/


// container component -- having 3 presentational components : AddTodo, TodoList, Footer
const TodoApp = () => (
    <div>
        <h2>Todos:</h2>
        <AddTodo/>

        <VisibleTodoList/>

        <Footer/>
    </div>
)

// using provider component to pass on the store to grandchildren
/*class Provider extends Component {
    // a special method get child context that will be called by React by using this props tool which corresponds to this store
    // that is passed to the provider as a prop just once.
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return this.props.children;
    }
}*/

// you have to specify child context types on the component that defines get child context.
// These are just React prop types definition, but unlike prop types, the child context types are essential for the context to be turned on.
// If you don't specify them, no child components will receive this context.
/*Provider.childContextTypes = {
    store: React.PropTypes.object
}*/

// REDUCERS -- START
// todo reducer
const todos = function (state = [], action) {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state, {id: action.id, text: action.text, completed: false}
            ];
        case "TOGGLE_TODO":
            return state.map(s => {
                if (s.id === action.id) {
                    s['completed'] = !s['completed'];
                }
                return s;
            });
        default:
            return state;
    }
};

// visibility reducer
const visibility = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
}
// REDUCERS -- END

// combining two reducers into one todoApp reducer
const todoApp = combineReducers({todos, visibility});

const persistedState = loadState();

const store = createStore(todoApp, persistedState);

store.subscribe(() => {
    saveState({
        todos: store.getState().todos
    });
});

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);
