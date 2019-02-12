import React from 'react';
import Routes from './routes';
import { Navbar, Footer } from './components';

import './App.css';

const App = () => {
    return (
        <div className="fluid-container">
            <Navbar />
            <Routes />
            <Footer />
        </div>
    );
}

export default App;
