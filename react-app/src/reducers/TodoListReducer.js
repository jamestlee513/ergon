export const ADD_TODO = 'addTodo'

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const postNewTodo = ({ userId, todo, priorityLevel }) => async dispatch => {
    const res = await fetch('/api/todos/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId,
            todo,
            priority_level: priorityLevel
        })
    });
    const data = await res.json();
    if(!data.errors) {
        dispatch(addTodo(data))
        return data;
    } else {
        return {errors: data.errors};
    }
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