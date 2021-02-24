import { Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { calculateEventCardHeight, determineEventCardTime } from '../../../services/util';
import EventUpdateForm from './EventUpdateForm';

function EventCard({ event, calendarStart, calendarEnd }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        background_color: backgroundColor,
        description,
        start_time: startTime,
        end_time: endTime,
        title,
        user_id: userId
    } = event;

    const handleUpdateClick = e => {
        e.stopPropagation();
        console.log(event)
        onOpen();
    }

    return (
        <>
            <Box
                zIndex={1}
                ml="15%"
                mr="2%"
                p={2}
                borderRadius="md"
                fontSize="12px"
                position="absolute"
                top={determineEventCardTime(calendarStart, calendarEnd, startTime)}
                backgroundColor={backgroundColor}
                h={calculateEventCardHeight(calendarStart, calendarEnd, startTime, endTime)}
                w="83%"
                border="1px"
                borderColor="gray.200"
                onClick={handleUpdateClick}
                _hover={{
                    cursor: "pointer"
                }}
            >
                {title}
            </Box>
            <EventUpdateForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} event={event} />
        </>
    )
}

export default EventCard;