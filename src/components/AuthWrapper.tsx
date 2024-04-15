import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Recipe from '../pages/Recipe';
import Article from '../pages/Article';
import Review from '../pages/Review';
import UserProfile from '../pages/UserProfile';

const isAuthorized = () => {
    return true;
};

const AuthWrapper = () => {
    const navigate = useNavigate();

    if (!isAuthorized()) {
        navigate('/');
        return null;
    }

    return (
        <>
            <Route path="/auth/recipe/:id" element={<Recipe />} />
            <Route path="/auth/article/:id" element={<Article />} />
            <Route path="/auth/review/:id" element={<Review />} />
            <Route path="/auth/user/:id" element={<UserProfile />} />
        </>
    );
};

export default AuthWrapper;
