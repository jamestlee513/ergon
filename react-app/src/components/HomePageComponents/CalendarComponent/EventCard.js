import React from 'react';

function EventCard({ event }) {
    const {
        background_color: backgroundColor,
        description,
        end_time: endTime,
        start_time: startTime,
        title,
        user_id: userId
    } = event;

    return (
        <>
            <div>{backgroundColor}</div>
            <div>{description}</div>
            <div>{endTime}</div>
            <div>{startTime}</div>
            <div>{title}</div>
            <div>{userId}</div>
        </>

    )
}

export default EventCard;