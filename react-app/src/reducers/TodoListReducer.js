export const ADD_TODO = 'addTodo'

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const postNewTodo = ({ userId, todo, priorityLevel }) => async dispatch => {
    const res = await fetch('/api/todo', {
        method: "POST",
        body: JSON.stringify({
            userId,
            todo,
            priorityLevel
        })
    })
    console.log(res.data);
    // return res;
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