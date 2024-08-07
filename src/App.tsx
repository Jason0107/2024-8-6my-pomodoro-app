import { useEffect, useState } from "react";
import TimerPage from "./pages/TimerPage";
import HistoryPage from "./pages/HistoryPage";
import { HistoryRecord } from './types/history.ts';
import './App.css';

const App: React.FC = () => {
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState<HistoryRecord[]>([]);
    const [dailyGoal, setDailyGoal] = useState<number>(0);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
        setHistory(savedHistory);

        const savedDailyGoal = parseInt(localStorage.getItem('dailyGoal') || '0');
        setDailyGoal(savedDailyGoal);
    }, []);

    useEffect(() => {
        localStorage.setItem('pomodoroHistory', JSON.stringify(history));
    }, [history]);

    const deleteHistory = (index: number) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
    };

    return (
        <div>
            <TimerPage
                onShowHistory={() => setShowHistory(true)}
                history={history}
                setHistory={setHistory}
                dailyGoal={dailyGoal}
                setDailyGoal={setDailyGoal}
            />
            {showHistory &&
                <HistoryPage
                    onClose={() => setShowHistory(false)}
                    history={history}
                    deleteHistory={deleteHistory}
                />
            }
        </div>
    );
};

export default App;
