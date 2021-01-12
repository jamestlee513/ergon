import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { secondsToTime } from '../services/util';
function PomodoroTimer() {
    const WORKTIME = 1500;
    const BREAKTIME = 300;

    const [timer, setTimer] = useState(WORKTIME);
    const [breakTimer, setBreakTimer] = useState(BREAKTIME);
    const [isBreak, setIsBreak] = useState(false);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);

    useEffect(() => {
        if (isTimerOn) {
            const interval = setInterval(() => {
                !isBreak ? setTimer(prevTime => prevTime - 1) :
                    setBreakTimer(prevTime => prevTime - 1)
            }, 1000)
            setTimerInterval(interval);
            return () => {
                clearInterval(interval);
            }
        } else {
            clearInterval(timerInterval);
        }
    }, [isTimerOn])

    useEffect(() => {
        setIsTimerOn(false);
        setTimer(WORKTIME);
        setBreakTimer(BREAKTIME);
        clearInterval(timerInterval);
    }, [isBreak])

    const handleReset = () => {
        setIsTimerOn(false);
        if (!isBreak) {
            setTimer(WORKTIME);
        } else {
            setBreakTimer(BREAKTIME);
        }
    }

    return (
        <Flex direction="column" align="center" justify="space-around" h="100%">
            <Box
                h="40%"
                p={4}
                fontSize="60pt"
            >{isBreak ? secondsToTime(breakTimer) : secondsToTime(timer)}</Box>
            <ButtonGroup>
                <Button onClick={() => setIsTimerOn(true)}>Start</Button>
                <Button onClick={() => setIsTimerOn(false)}>Stop</Button>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={() => setIsBreak(prevState => !prevState)}>
                    {isBreak ? "Work" : "Break"}
                </Button>
            </ButtonGroup>
        </Flex >
    )
}

export default PomodoroTimer;