import { Button } from '@chakra-ui/react';
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
        <>
            <div>{secondsToTime(timer)}</div>
            <Button onClick={() => setIsTimerOn(true)}>Start</Button>
            <Button onClick={() => setIsTimerOn(false)}>Stop</Button>
            <Button onClick={() => {
                setIsTimerOn(false)
                setTimer(1500)
            }
            }>Reset</Button>
        </>
    )
}

export default PomodoroTimer;