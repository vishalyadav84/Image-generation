import React from 'react';
import './HomePage.css';
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
    return (
        <div className="homepage-wrapper">
            <Navbar page="home" />
            <div className="homepage-container">
                <div className="homepage-header">
                    <h1>Welcome to Image Generator</h1>
                </div>
                <div className="homepage-content">
                    <p>Explore our powerful tools and features to create amazing images effortlessly.</p>
                    <div className="homepage-features">
                        <div className="feature">
                            <i className="fas fa-palette" />
                            <h3>Customizable Templates</h3>
                            <p>Choose from a variety of templates to get started</p>
                        </div>
                        <div className="feature">
                            <i className="fas fa-image" />
                            <h3>High-Quality Images</h3>
                            <p>Generate stunning images with our advanced algorithms</p>
                        </div>
                        <div className="feature">
                            <i className="fas fa-history" />
                            <h3>Image History</h3>
                            <p>View and manage your previously generated images</p>
                        </div>
                    </div>
                    <div className="homepage-buttons">
                        {/* <button onClick={() => window.location.href = '/image-generator'}>Generate Images</button>
                        <button onClick={() => window.location.href = '/history'}>View History</button> */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomePage;
