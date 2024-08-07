import { useState } from "react";
import TimerPage from "./pages/TimerPage";
import HistoryPage from "./pages/HistoryPage";
import './App.css';

const App: React.FC = () => {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div>
            <TimerPage onShowHistory={() => setShowHistory(true)} />
            {showHistory && <HistoryPage onClose={() => setShowHistory(false)} />}
        </div>
    );
};

export default App;
