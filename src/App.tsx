import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import RecipeDetailed from './pages/RecipeDetailed';
import Article from './pages/Article';
import ArticleDetailed from './pages/ArticleDetailed';
import Review from './pages/Review';
import ReviewDetailed from './pages/ReviewDetailed';
import UserProfile from './pages/UserProfile';
import AuthWrapper from './components/AuthWrapper';
import RecipeCreate from './pages/RecipeCreate';
import ReviewCreate from './pages/ReviewCreate';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <div style={{padding: '60px 0'}}>

            <Router>
                <Header/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/recipe" element={<Recipe/>}/>
                    <Route path="/recipe/:id" element={<RecipeDetailed/>}/>
                    <Route path="/article" element={<Article/>}/>
                    <Route path="/article/:id" element={<ArticleDetailed/>}/>
                    <Route path="/review" element={<Review/>}/>
                    <Route path="/review/:id" element={<ReviewDetailed/>}/>
                    <Route path="/user" element={<UserProfile/>}/>
                    <Route path="/recipe/create" element={<RecipeCreate/>}/>
                    <Route path="/review/create" element={<ReviewCreate/>}/>

                </Routes>

                <Footer/>
            </Router>
        </div>
    );
}

export default App;
