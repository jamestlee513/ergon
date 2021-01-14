export const ADD_TODO = 'addTodo'

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const testTodo = (test) => async dispatch => {
    dispatch(addTodo(test));
}

const todoListReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];
        default:
            return state;
    }
}


export default todoListReducer;