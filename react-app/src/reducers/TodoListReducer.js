export const ADD_TODO = 'addTodo';
export const LOAD_TODOS = 'loadTodos';

export const addTodo = todo => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const loadTodos = todos => {
    return {
        type: LOAD_TODOS,
        payload: todos
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
    if (!data.errors) {
        dispatch(loadTodos(data.todos))
        return data;
    } else {
        return { errors: data.errors };
    }
}

export const removeTodo = (todoId, userId) => async dispatch => {
    const res = await fetch(`/api/todos/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            todo_id: todoId,
            user_id: userId
        })
    });
    const data = await res.json();
    if (!data.errors) {
        dispatch(loadTodos(data.todos))
        return data.todos
    } else {
        return { errors: data.errors }
    }
}

export const clearCheckedTodos = userId => async dispatch => {
    const res = await fetch('/api/todos/clear_completed', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId
        })
    })
    const data = await res.json()
    dispatch(loadTodos(data.todos))
    return data.todos
}

export const loadUserTodos = userId => async dispatch => {
    const res = await fetch(`/api/todos/${userId}`);
    const data = await res.json();
    dispatch(loadTodos(data.todos));
    return data.todos;
}

const todoListReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload];
        case LOAD_TODOS:
            return [...action.payload]
        default:
            return state;
    }
}


export default todoListReducer;