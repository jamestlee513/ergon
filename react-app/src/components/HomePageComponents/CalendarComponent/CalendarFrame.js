import { Box, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { digitHourToString } from '../../../services/util';


// Bounds of the calendar. Currently 7am to midnight

function CalendarFrame() {

    let times = [];
    for (let i = 7; i <= 24; i++) {
        times.push(i);
    }

    return (
        <Flex h="100%" direction="column" position="relative">
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
        </Flex>
    )
}

export default CalendarFrame;