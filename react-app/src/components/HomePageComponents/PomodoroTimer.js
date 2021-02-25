import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { secondsToTime } from '../../services/util';
function PomodoroTimer() {
    const WORKTIME = 1500;
    const BREAKTIME = 300;

    const [timer, setTimer] = useState(WORKTIME);
    const [breakTimer, setBreakTimer] = useState(BREAKTIME);
    const [isBreak, setIsBreak] = useState(false);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);
    const [isAlarm, setIsAlarm] = useState(false);

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
                        setIsAlarm(true);
                    }
                } else {
                    let time = BREAKTIME;
                    setBreakTimer(prevTime => {
                        time = prevTime - 1;
                        return time;
                    });
                    if (time === 0) {
                        setIsTimerOn(false);
                        setIsAlarm(true);
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
    // eslint-disable-next-line
    }, [isTimerOn])

    useEffect(() => {
        setIsTimerOn(false);
        setTimer(WORKTIME);
        setBreakTimer(BREAKTIME);
        clearInterval(timerInterval);
    // eslint-disable-next-line
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
            <ReactPlayer
                style={{ display: "none" }}
                url="https://onlineclock.net/audio/options/default.mp3"
                playing={isAlarm}
                volume={0.035}
                onEnded={() => setIsAlarm(false)}
            >
            </ReactPlayer>
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