import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { secondsToTime } from '../services/util';
function PomodoroTimer() {
    const [timer, setTimer] = useState(1500);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);

    useEffect(() => {
        if (isTimerOn) {
            const interval = setInterval(() => {
                setTimer(prevTime => prevTime - 1);
            }, 1000)
            setTimerInterval(interval);
            return () => {
                clearInterval(interval);
            }
        } else {
            clearInterval(timerInterval);
        }
    }, [isTimerOn])

    return (
        <Flex direction="column" align="center" justify="space-around" h="100%">
            <Box
                h="40%"
                p={4}
                fontSize="60pt"
            >{secondsToTime(timer)}</Box>
            <ButtonGroup>
                <Button onClick={() => setIsTimerOn(true)}>Start</Button>
                <Button onClick={() => setIsTimerOn(false)}>Stop</Button>
                <Button onClick={() => {
                    setIsTimerOn(false)
                    setTimer(1500)
                }
                }>Reset</Button>
            </ButtonGroup>
        </Flex>
    )
}

export default PomodoroTimer;