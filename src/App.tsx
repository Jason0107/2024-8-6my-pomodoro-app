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
    const [dailyGoal, setDailyGoal] = useState<number>(0);
    const [goalInput, setGoalInput] = useState<string>("");
    const [pomodoroDuration, setPomodoroDuration] = useState<number>(1500);
    const [durationInput, setDurationInput] = useState<string>("25");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage = 5;

    useEffect(() => {
        // 从本地存储加载历史记录和每日目标
        const savedHistory = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
        setHistory(savedHistory);

        const savedDailyGoal = parseInt(localStorage.getItem('dailyGoal') || '0');
        setDailyGoal(savedDailyGoal);
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (timerState === TimerState.RUNNING && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
            setAlertTriggered(false); // 计时器运行时重置警报触发器
        } else if (seconds === 0 && !alertTriggered) {
            addHistory();
            setTimerState(TimerState.ENDED);
            alert("时间到！");
            setAlertTriggered(true); // 确保警报只触发一次
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerState, seconds, alertTriggered]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const addHistory = () => {
        const newHistory = [...history, { time: new Date().toLocaleString(), duration: pomodoroDuration - seconds }];
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
            setSeconds(pomodoroDuration);
        }
        setTimerState(TimerState.RUNNING);
    };

    const handleTestStart = () => {
        setSeconds(2);
        setTimerState(TimerState.RUNNING);
    };

    const handleGoalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalInput(event.target.value);
    };

    const handleSetGoal = () => {
        const goal = parseInt(goalInput) || 0;
        setDailyGoal(goal);
        localStorage.setItem('dailyGoal', goal.toString());
    };

    const handleDurationInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDurationInput(event.target.value);
    };

    const handleSetDuration = () => {
        const duration = parseInt(durationInput) * 60 || 1500;
        setPomodoroDuration(duration);
        if (timerState === TimerState.ENDED) {
            setSeconds(duration);
        }
    };

    const completedCount = history.length;
    const progressPercentage = dailyGoal ? (completedCount / dailyGoal) * 100 : 0;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = history.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(history.length / recordsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="app">
            <div className="time">
                {formatTime(seconds)}
            </div>
            <div className="state">
                当前状态: {timerState === TimerState.RUNNING ? "运行中" : timerState === TimerState.PAUSED ? "暂停" : "结束"}
            </div>
            <div className="buttons">
                <button onClick={handleStart}>开始</button>
                <button onClick={() => setTimerState(TimerState.PAUSED)}>暂停</button>
                <button onClick={() => { setSeconds(pomodoroDuration); setTimerState(TimerState.ENDED); }}>重置</button>
                <button onClick={handleTestStart}>测试</button>
            </div>
            <div className="progress">
                <h2>今日目标完成情况</h2>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p>{completedCount} / {dailyGoal}</p>
            </div>
            <div className="set-goal">
                <input
                    type="number"
                    value={goalInput}
                    onChange={handleGoalInputChange}
                    placeholder="设置每日目标"
                />
                <button onClick={handleSetGoal}>设置目标</button>
            </div>
            <div className="set-duration">
                <input
                    type="number"
                    value={durationInput}
                    onChange={handleDurationInputChange}
                    placeholder="设置番茄钟时长（分钟）"
                />
                <button onClick={handleSetDuration}>设置时长</button>
            </div>
            <div className="history">
                <h2>历史记录</h2>
                <ul>
                    {currentRecords.map((record, index) => (
                        <li key={index}>
                            {record.time} - {formatTime(record.duration)}
                            <button onClick={() => deleteHistory(index)}>删除</button>
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage === 1}>上一页</button>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>下一页</button>
                </div>
            </div>
        </div>
    );
};

export default App;
