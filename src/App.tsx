import React, { useState, useEffect } from 'react';
import './App.css';

interface HistoryRecord {
    time: string;
    duration: number;
}

const App: React.FC = () => {
    const [seconds, setSeconds] = useState<number>(1500); // 25 minutes
    const [isActive, setIsActive] = useState<boolean>(false);
    const [history, setHistory] = useState<HistoryRecord[]>([]);

    useEffect(() => {
        // Load history from LocalStorage
        const savedHistory = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
        setHistory(savedHistory);
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            addHistory();
            alert("Time's up!");
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);



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

    return (
        <div className="app">
            <div className="time">
                {formatTime(seconds)}
            </div>
            <div className="buttons">
                <button onClick={() => setIsActive(true)}>Start</button>
                <button onClick={() => setIsActive(false)}>Pause</button>
                <button onClick={() => { setSeconds(1500); setIsActive(false); }}>Reset</button>
            </div>
            <div className="history">
                <h2>History</h2>
                <ul>
                    {history.map((record, index) => (
                        <li key={index}>
                            {record.time} - {formatTime(record.duration)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
