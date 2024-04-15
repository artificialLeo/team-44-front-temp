import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const [isUserAuthorized1, setUserAuthorized] = useState(false);

    useEffect(() => {
        setUserAuthorized(!!localStorage.getItem('token'));
    }, []);

    const handleLogState = () => {
        console.log("User authorized:", window.isUserAuthorized);
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleLogState}>Log Auth State</button>
        </div>
    );
};

export default Home;
