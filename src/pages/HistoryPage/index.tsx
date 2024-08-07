import React, { useState } from "react";
import { HistoryRecord } from '../../types/history.ts';
import './index.css';

interface HistoryPageProps {
    onClose: () => void;
    history: HistoryRecord[];
    deleteHistory: (index: number) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onClose, history, deleteHistory }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage = 5;

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
            <div className="history-modal">
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
                <button className="close-button" onClick={onClose}>关闭</button>
            </div>
        </div>
    );
};

export default HistoryPage;
