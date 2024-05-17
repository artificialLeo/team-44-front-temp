import React, { useState, useEffect } from 'react';
import MealPanel from "../components/MealPanel";
import mainImage from "../img/main.jpg";
import {Link} from 'react-router-dom';
import Button from "@mui/material/Button";
import CarouselHome from "../components/CarouselHome";


const Home: React.FC = () => {
    const [isUserAuthorized1, setUserAuthorized] = useState(false);

    useEffect(() => {
        setUserAuthorized(!!localStorage.getItem('token'));
    }, []);

    const handleLogState = () => {
        console.log("User authorized:", isUserAuthorized1);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <img src={mainImage} alt="Foodieland" width='750' height='500' style={{borderRadius: '5%'}}/>
            <div style={{width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <h2>Categories</h2>

                <Link to="/recipe">
                    <Button variant="contained" sx={{backgroundColor: 'black'}}>View All</Button>
                </Link>
            </div>
            <MealPanel/>
            <div style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <h2>The Most Popular</h2>

                <p style={{textAlign: 'center', color: '#666666'}}>
                    Experience culinary delight on our recipes site! Explore diverse dishes, from classics to
                    innovations, with clear instructions and visuals. Whether a seasoned chef or novice, discover global
                    cuisines and share triumphs in our community. Join us on a delicious journey!
                </p>
            </div>
            <CarouselHome/>
        </div>
    );
};

export default Home;
