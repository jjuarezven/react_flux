import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';

function App() {
    function getPage() {
        const route = window.location.pathname;
        if (route === '/about') {
            return <AboutPage />
        } else {
            return <HomePage />
        }
    };

    // displays the header component and returns the getPage function result
    return (
        <div className="containerFluid">
            <Header />
            { getPage() }
        </div>
    );
}

export default App;