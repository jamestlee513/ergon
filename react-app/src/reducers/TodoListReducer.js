export const ADD_TODO = 'addTodo'

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const postTodo = ({ todo, priorityLevel }) => async dispatch => {
    // const res = await fetch('/api/todoItems', {
    //     method: "POST",
    //     body: JSON.stringify({
    //         credential,
    //         password
    //     })
    // });
    // dispatch(addTodo(res.data.todo));
    console.log("postTodo fired.")
    dispatch(addTodo("worked?"));
}

const ToDoListReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload]
        default:
            return state;
    }
}

export default ToDoListReducer;