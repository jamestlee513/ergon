export const NEW_EVENT = 'newEvent';
export const LOAD_EVENTS = 'loadEvents';

export const newEvent = event => {
    return {
        type: NEW_EVENT,
        payload: event
    }
}

export const loadEvents = events => {
    return {
        type: LOAD_EVENTS,
        payload: events
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
    const data = await res.json();
    dispatch(newEvent(data.event));
    return data.event;
}

export const getEvents = (userId) => async dispatch => {
    const res = await fetch(`/api/events/${userId}`);
    const data = await res.json();
    dispatch(loadEvents(data.events));
    return data.events;
}

const eventReducer = (state = [], action) => {
    switch (action.type) {
        case NEW_EVENT:
            return [...state, action.payload];
        case LOAD_EVENTS:
            return action.payload;
        default:
            return state;
    }
}

export default eventReducer;