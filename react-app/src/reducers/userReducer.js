export const ADD_USER = 'addUser'
export const REMOVE_USER = 'removeUser'

export const addUser = user => {
    return {
        type: ADD_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER:
            return action.payload;
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
}


export default userReducer;