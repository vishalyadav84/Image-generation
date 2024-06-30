import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './HistoryPage.css';
import HistoryCard from './HistoryCard';
require('dotenv').config();
const HistoryPage = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const getData = async () => {
        try {
            const BACKEND_URL = process.env.BACKEND_URL
            const response = await fetch(`${BACKEND_URL}/api/v1/images`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                },
            });
            const obj = await response.json();
            setData(obj.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, [search]);

    return (
        <div>
            <Navbar page="history" />
            <div className='history-main-container'>
                <div className='history-search-bar'>
                    <input
                        type='text'
                        placeholder='Search history...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='history-items'>
                    {data.map(item => (
                        <HistoryCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
