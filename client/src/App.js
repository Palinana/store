import React from 'react';
import Routes from './routes';
import Navbar from './components/Navbar';

import './App.css';

const App = () => {
    return (
        <div className="fluid-container">
            <Navbar />
            <Routes />
        </div>
    );
}

export default App;
