import React from 'react';
import { Link } from 'react-router-dom';
import './HistoryCard.css';

const HistoryCard = (props) => {
    const { item } = props;
    return (
        <div className='history-card'>
            <h3>{item.query}</h3>
            <p>User ID: {item.userId}</p>
            <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
            <img src={item.image} alt={item.query} />
            <Link to={`/history/${item.id}`}>more...</Link>
        </div>
    );
};

export default HistoryCard;
