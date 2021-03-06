export const SET_MEMO = 'setMemo';

export const setMemo = memo => {
    return {
        type: SET_MEMO,
        payload: memo
    }
}

export const getMemo = (userId) => async dispatch => {
    const res = await fetch(`/api/memos/${userId}`)
    const memo = await res.json();
    if (!memo.error) {
        dispatch(setMemo(memo));
        return memo;
    }
    console.log("ERROR!")
    return memo;

}

export const createMemo = (userId) => async dispatch => {
    const res = await fetch('/api/memos/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId
        })
    });
    const memo = await res.json();
    if (!memo.error) {
        dispatch(setMemo(memo))
        return memo;
    } else {
        return memo;
    }
}

export const editMemo = (userId, text) => async dispatch => {
    const res = await fetch('/api/memos/', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId,
            text
        })
    });
    const memo = await res.json();
    if (!memo.error) {
        dispatch(setMemo(memo));
        return memo;
    } else {
        return { error: memo.error }
    }
}

const memoReducer = (state = '', action) => {
    switch (action.type) {
        case SET_MEMO:
            return action.payload;
        default:
            return state;
    }
}

export default memoReducer;