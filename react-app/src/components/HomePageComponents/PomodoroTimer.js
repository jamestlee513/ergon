import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { secondsToTime } from '../../services/util';
function PomodoroTimer() {
    const WORKTIME = 1500;
    const BREAKTIME = 5;

    const [timer, setTimer] = useState(WORKTIME);
    const [breakTimer, setBreakTimer] = useState(BREAKTIME);
    const [isBreak, setIsBreak] = useState(false);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);

    useEffect(() => {
        if (isTimerOn) {
            const interval = setInterval(() => {
                if (!isBreak) {
                    let time = WORKTIME;
                    setTimer(prevTime => {
                        time = prevTime - 1;
                        return time;
                    });
                    if (time === 0) {
                        setIsTimerOn(false);
                    }
                } else {
                    let time = BREAKTIME;
                    setBreakTimer(prevTime => {
                        time = prevTime - 1;
                        return time;
                    });
                    if (time === 0) {
                        setIsTimerOn(false);
                    }
                }
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
                <Button onClick={() => setIsTimerOn(false)}>Pause</Button>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={() => setIsBreak(prevState => !prevState)}>
                    {isBreak ? "Work" : "Break"}
                </Button>
            </ButtonGroup>
        </Flex >
    )
}

export default PomodoroTimer;