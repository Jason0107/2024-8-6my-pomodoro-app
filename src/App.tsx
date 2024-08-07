import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TimerPage from "./pages/TimerPage";
import HistoryPage from "./pages/HistoryPage";
import './App.css';


const App: React.FC = () => {
    return (
        <Router basename="/my-pomodoro-app">
            <Routes>
                <Route path="/" element={<TimerPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </Router>
    );
};


export default App;
