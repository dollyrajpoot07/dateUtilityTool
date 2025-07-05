'use client'

import React, { useState, useEffect } from 'react';
import styles from './dateTool.module.css';

export default function DateTool() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');
    const [daysToShift, setDaysToShift] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date, format = 'DD/MM/YYYY') => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();

        switch (format) {
            case 'MM-DD-YYYY': return `${month}-${day}-${year}`;
            case 'YYYY/MM/DD': return `${year}/${month}/${day}`;
            default: return `${day}/${month}/${year}`;
        }
    };

    const getDateDiff = () => {
        if (!selectedDate) return '';
        const now = new Date();
        const diff = Math.floor((new Date(selectedDate) - now) / (1000 * 60 * 60 * 24));
        return `${Math.abs(diff)} day(s) ${diff < 0 ? 'ago' : 'from now'}`;
    };

    const getShiftedDate = (shift) => {
        if (!selectedDate) return '';
        const d = new Date(selectedDate);
        d.setDate(d.getDate() + parseInt(shift));
        return d.toDateString();
    };

    return (
        <div className={styles.container}>
            <h2>Date Utility tool</h2>
            <div className={styles.section}>
                <p><strong>Live clock: </strong>{currentTime.toLocaleString()}</p>
            </div>
            <div className={styles.section}>
                <label>Select a Date:</label>
                <input type='date' onChange={(e) => setSelectedDate(e.target.value)} />
                {selectedDate && (
                    <>
                        <p><strong>Formatted:</strong> {formatDate(selectedDate)}</p>
                        <p><strong>MM-DD-YYYY:</strong> {formatDate(selectedDate, 'MM-DD-YYYY')}</p>
                        <p><strong>YYYY/MM/DD:</strong> {formatDate(selectedDate, 'YYYY/MM/DD')}</p>
                        <p><strong>Weekday:</strong> {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long' })}</p>
                        <p><strong>Month Name:</strong> {new Date(selectedDate).toLocaleDateString('en-IN', { month: 'long' })}</p>
                        <p><strong>Date Difference:</strong> {getDateDiff()}</p>

                        <div className={styles.shift}>
                            <input
                                type="number"
                                value={daysToShift}
                                onChange={(e) => setDaysToShift(e.target.value)}
                                placeholder="Enter days to add/subtract"
                            />
                            <p><strong>Shifted Date:</strong> {getShiftedDate(daysToShift)}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}