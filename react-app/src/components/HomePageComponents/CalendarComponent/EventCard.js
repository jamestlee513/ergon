import { Box } from '@chakra-ui/react';
import React from 'react';
import { determineEventCardEnd, determineEventCardStart } from '../../../services/util';

function EventCard({ event, calendarStart, calendarEnd }) {
    const {
        background_color: backgroundColor,
        description,
        start_time: startTime,
        end_time: endTime,
        title,
        user_id: userId
    } = event;



    return (
        <Box
            zIndex={1}
            ml="15%"
            mr="2%"
            p={2}
            borderRadius="md"
            fontSize="12px"

            backgroundColor={backgroundColor}>
            {startTime}
            {determineEventCardEnd(startTime, calendarStart, calendarEnd)}
        </Box>
    )
}

export default EventCard;