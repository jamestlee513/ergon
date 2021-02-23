import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../../reducers/eventReducer';
import { calculateTimePercent, digitHourToString, getCurrentTimeNumber } from '../../../services/util';
import EventCard from './EventCard';
import EventForm from './EventForm';


// Bounds of the calendar. Currently 7am to midnight

function CalendarFrame() {

    const START_TIME = 7; // 7am
    const END_TIME = 24;  // 12am
    const currentUser = useSelector(state => state.user);
    const [timePercent, setTimePercent] = useState(calculateTimePercent(START_TIME, END_TIME, getCurrentTimeNumber()));
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const events = useSelector(state => state.events);

    useEffect(() => {
        (async () => {
            await dispatch(getEvents(currentUser.id));
        })();

        const interval = setInterval(() => {
            setTimePercent(calculateTimePercent(START_TIME, END_TIME, getCurrentTimeNumber()));
        }, 1000)
        return () => {
            clearInterval(interval);
        }
    }, []);


    let times = [];
    for (let i = START_TIME; i <= END_TIME; i++) {
        times.push(i);
    }

    return (
        <>
            <Flex h="100%" direction="column" position="relative" onClick={onOpen}>
                <Flex h="100%" w="100%" direction="column" justifyContent="space-between" position="absolute" right="0">
                    {times.map(time =>
                        <Flex key={time} direction="row" align="center">
                            <Box w="12%" mr="4px" display="flex" fontSize="10px" justifyContent="flex-end">{digitHourToString(time)}</Box>
                            <Box
                                w="85%"
                                pr="10px"
                                borderBottom="1px #cccccc solid"
                            ></Box>
                        </Flex>
                    )}
                </Flex>
                <Flex position="absolute" width="100%" height="100%" direction="row" justify="flex-end">
                    <Box position="absolute" w="87%" borderBottom="1px red solid" top={timePercent} />
                </Flex>
                {events.map(event =>
                    <EventCard key={event.id} event={event} />
                )}
            </Flex>
            <EventForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}

export default CalendarFrame;