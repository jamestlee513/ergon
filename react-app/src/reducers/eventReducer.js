export const NEW_EVENT = 'newEvent';

export const newEvent = event => {
    return {
        type: NEW_EVENT,
        payload: event
    }
}

export const postEvent = (userId, title, startTime, endTime, description, backgroundColor) => async dispatch => {
    const res = await fetch('/api/events/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId,
            title,
            start_time: startTime,
            end_time: endTime,
            description,
            background_color: backgroundColor
        })
    });
    const event = await res.json();
    // dispatch(newEvent(event));
    return event;
}

const eventReducer = (state = [], action) => {
    switch (action.type) {
        case NEW_EVENT:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default eventReducer;