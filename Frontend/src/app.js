import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import ImageGenerator from './pages/ImageGenerator/ImageGenerator';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import HistoryInformationPage from './pages/HistoryInformationPage/HistoryInformationPage';
import PointsContext from './context/pointsContext';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Contact from './pages/Contact/Contact';

const parent = document.getElementById('root');
const root = ReactDOM.createRoot(parent);

const App = () => {
    const [userPoints, setUserPoints] = useState(10);
    const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('authToken') ? true : false);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/image-generator',
            element: isLoggedIn ? <ImageGenerator /> : <Navigate to='/login' />
        },
        {
            path: '/history',
            element: <HistoryPage />
        },
        {
            path: '/history/:historyId',
            element: <HistoryInformationPage />
        },
        {
            path: '/contact',
            element: <Contact />
        },
        {
            path: '/help',
            element: <div>help</div>
        },
        {
            path: '/signup',
            element: <SignUp />
        },
        {
            path: '/login',
            element: <Login />
        }
    ]);

    return (
        <PointsContext.Provider value={{
            userPoints,
            setUserPoints,
            isLoggedIn,
            setIsLoggedIn
        }}>
            <RouterProvider router={router} />
        </PointsContext.Provider>
    );
};

root.render(<App />);
