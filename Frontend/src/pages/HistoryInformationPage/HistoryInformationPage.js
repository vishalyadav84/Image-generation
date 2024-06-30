import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link, useParams } from 'react-router-dom';

const HistoryInformationPage = () => {
    const { historyId } = useParams();
    const [data, setData] = useState({});

    const getData = async () => {
        const res = await fetch(`https://dummyjson.com/products/${historyId}`)
        const obj = await res.json()
        setData(obj)
    }

    useEffect(() => {
        getData();
    }, [])

    const customStyles = {
        margin: '30px',
        padding: '20px',
        border: '1px solid black',
        textAlign: 'center'

    }

    return (
        <div>
            <Navbar page="history" />
            <div style={customStyles}>
                <h2 style={{
                    marginBottom: '20px'
                }}>{data.title}</h2>
                <p>{data.description}</p>
                <img src={data.thumbnail}></img><br />
                <Link to={'/history'}>back</Link>
            </div>
        </div>
    )
}

export default HistoryInformationPage