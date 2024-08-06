import React, { useState, useEffect } from 'react';
import './App.css';

interface HistoryRecord {
    time: string;
    duration: number;
}

enum TimerState {
    RUNNING = 'running',
    PAUSED = 'paused',
    ENDED = 'ended',
}

const App: React.FC = () => {
    const [seconds, setSeconds] = useState<number>(1500); // 25 minutes
    const [timerState, setTimerState] = useState<TimerState>(TimerState.ENDED);
    const [history, setHistory] = useState<HistoryRecord[]>([]);
    const [alertTriggered, setAlertTriggered] = useState<boolean>(false);

    useEffect(() => {
        // Load history from LocalStorage
        const savedHistory = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
        setHistory(savedHistory);
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (timerState === TimerState.RUNNING && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
            setAlertTriggered(false); // Reset alert trigger when timer is running
        } else if (seconds === 0 && !alertTriggered) {
            addHistory();
            setTimerState(TimerState.ENDED);
            alert("Time's up!");
            setAlertTriggered(true); // Ensure alert only triggers once
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerState, seconds,alertTriggered]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const addHistory = () => {
        const newHistory = [...history, { time: new Date().toLocaleString(), duration: 1500 - seconds }];
        setHistory(newHistory);
        localStorage.setItem('pomodoroHistory', JSON.stringify(newHistory));
    };

    const deleteHistory = (index: number) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem('pomodoroHistory', JSON.stringify(newHistory));
    };

    const handleStart = () => {
        if (timerState === TimerState.ENDED) {
            setSeconds(1500);
        }
        setTimerState(TimerState.RUNNING);
    };

    const handleTestStart = () => {
        setSeconds(2);
        setTimerState(TimerState.RUNNING);
    };

    return (
        <div className="app">
            <div className="time">
                {formatTime(seconds)}
            </div>
            <div className="buttons">
                <button onClick={handleStart}>Start</button>
                <button onClick={() => setTimerState(TimerState.PAUSED)}>Pause</button>
                <button onClick={() => { setSeconds(1500); setTimerState(TimerState.ENDED); }}>Reset</button>
                <button onClick={handleTestStart}>Test</button>
            </div>
            <div className="history">
                <h2>History</h2>
                <ul>
                    {history.map((record, index) => (
                        <li key={index}>
                            {record.time} - {formatTime(record.duration)}
                            <button onClick={() => deleteHistory(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
