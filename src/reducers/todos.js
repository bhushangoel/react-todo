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

export default todos;
