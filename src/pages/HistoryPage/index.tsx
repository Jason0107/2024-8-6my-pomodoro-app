import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './index.css'

const Index: React.FC = () => {
    const [history, setHistory] = useState<HistoryRecord[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage = 5;

    interface HistoryRecord {
        time: string;
        duration: number;
    }


    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('pomodoroHistory') || '[]');
        setHistory(savedHistory);
    }, []);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const deleteHistory = (index: number) => {
        const newHistory = history.filter((_, i) => i !== index);
        setHistory(newHistory);
        localStorage.setItem('pomodoroHistory', JSON.stringify(newHistory));
    };

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
        <div className="history-page">
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
            <Link to="/" className="back-link">返回计时器</Link>
        </div>
    );
};
export default Index