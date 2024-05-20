import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {CircularProgress, ImageList, ImageListItem} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios, {getAuthConfig} from '../utils/customAxios';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import MultipleItems from "../components/CarouselRecipeDetailed";
import CarouselRecipeDetailed from "../components/CarouselRecipeDetailed";
import useCurrentUser from "../utils/useCurrentUser";
import {RecipeDto} from "../components/RecipeReviewCard";
import { Image } from 'antd';
import { Divider as AntdDivider, List as AntdList, Typography as AntdTypography } from 'antd';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';

const fetchRecipeById = async (id: string) => {
    try {
        const response = await axios.get(`/api/recipe/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch recipe');
    }
};


const RecipeDetailed: React.FC = () => {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<RecipeDetailedParams | null>(null);
    const [value, setValue] = React.useState<number | null>(2);
    const [isPurple, setIsPurple] = React.useState(false);
    const {currentUser, loading, error} = useCurrentUser();

    const handleClick = async () => {
        try {
            const user = await currentUser;
            if (user) {
                const {email} = user;
                const requestUrl = isPurple
                    ? `/users/favourite/recipes/remove?recipeId=${recipe?.recipeId}`
                    : `/users/favourite/recipes/add?recipeId=${recipe?.recipeId}`;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                };

                await axios.post(requestUrl, null, getAuthConfig());
                setIsPurple((prevState) => !prevState);
            }
        } catch (error) {
            console.error('Error adding/removing favorite recipe:', error);
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeId = getRecipeIdFromUrl();

                if (recipeId !== null) {
                    const recipeData = await fetchRecipeById(recipeId);
                    setRecipe(recipeData);

                    console.log(recipe)
                } else {
                    console.error('Recipe ID not found in URL');
                }

            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();

        const fetchFavouriteRecipes = async () => {
            try {
                const response = await axios.get('/users/favourite/recipes', getAuthConfig());

                if (Array.isArray(response.data.content)) {
                    const isRecipeFavourite = response.data.content.find(
                        (favouriteRecipe: RecipeDto) => {
                            const recipeIdFromUrl = getRecipeIdFromUrl();
                            return recipeIdFromUrl !== null && favouriteRecipe.recipeId === +recipeIdFromUrl;
                        }
                    );

                    setIsPurple(!!isRecipeFavourite);
                } else {
                    console.log("Response data is not an array");
                }

            } catch (error) {
                console.log(error)
            }
        };

        fetchFavouriteRecipes();

        console.log(recipe)
    }, []);

    const handleGoBack = () => {
        // navigate(-1);
        console.log(recipe)
    };

    const dietLabels: { [key: string]: string } = {
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        glutenFree: 'Gluten Free',
        dairyFree: 'Dairy Free',
        veryHealthy: 'Very Healthy'
    };

    const handleRateChange = async (newValue: number | null) => {
        console.log(newValue)
        try {
            if (newValue !== null) {
                const recipeId = getRecipeIdFromUrl();
                const response = await axios.post(
                    `users/recipes/${recipeId}/${newValue}`, null, getAuthConfig()
                ).then(async () => {
                    if (recipeId !== null) {
                        const recipeData = await fetchRecipeById(recipeId);
                        setRecipe(recipeData);

                        console.log(recipe)
                    } else {
                        console.error('Recipe ID not found in URL');
                    }
                });

            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <div>
            {recipe ? (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100%',
                        }}
                    >
                        <h1>{recipe.title}</h1>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                flexDirection: 'row',
                                minWidth: '100%',
                                maxWidth: '1000px',
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '8px',
                                    borderRight: '2px solid #E5E5E5',
                                }}>
                                    <QueryBuilderRoundedIcon/>
                                    <div style={{paddingRight: '2px', marginLeft: '2px'}}>
                                        {recipe.cookingTimeInMinutes}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '8px',
                                    borderRight: '2px solid #E5E5E5',
                                }}>
                                    <RestaurantRoundedIcon/>
                                    <div style={{paddingRight: '2px', marginLeft: '2px'}}>
                                        {recipe.category}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '8px',
                                    borderRight: '2px solid #E5E5E5',
                                }}>
                                    <PeopleAltRoundedIcon/>
                                    <div style={{paddingRight: '2px', marginLeft: '2px'}}>
                                        {recipe.quantity}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '8px',
                                }}>
                                    <GradeRoundedIcon sx={{color: '#faaf00'}}/>
                                    <div style={{paddingRight: '2px', marginLeft: '2px'}}>
                                        {parseInt(recipe.rating.toFixed())}
                                    </div>
                                </div>
                            </div>

                            {currentUser ?
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px',
                                        borderRight: '2px solid #E5E5E5',
                                    }}>
                                        <Rating
                                            name="simple-controlled"
                                            value={recipe.rating}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                                handleRateChange(newValue);
                                            }}
                                        />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '8px',
                                    }}>
                                        <IconButton aria-label="add to favorites" onClick={handleClick}>
                                            <FavoriteIcon style={{color: isPurple ? 'red' : 'inherit'}}/>
                                        </IconButton>
                                        <Typography variant="body2" color="black" onClick={handleClick}
                                                    sx={{cursor: 'pointer', userSelect: 'none'}}>
                                            Add to favourites
                                        </Typography>
                                    </div>
                                </div> : ''}
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'stretch',
                            flexDirection: ['column', 'row'],
                            width: '100%',
                            maxWidth: '1000px',
                            marginTop: '20px'
                        }}>
                            <Image
                                src={recipe.imageUrl}
                                style={{ height: '100%', objectFit: 'cover', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', flex: '1' }}
                            />

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                backgroundColor: '#FFF9F6',
                                minWidth: '50%',
                                maxWidth: '450px',
                                boxSizing: 'border-box',
                                borderTopRightRadius: '5px',
                                borderBottomRightRadius: '5px',
                                flex: '1',
                                padding: '20px'
                            }}>
                                <p style={{fontWeight: 'bold'}}>
                                    Nutrition Information
                                </p>

                                <p style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFF9F6',
                                    borderBottom: '1px solid #E5E0DD',
                                    width: '90%',
                                    padding: '0 10px',
                                }}>
                                    <span>
                                        Calories
                                    </span>
                                    <span style={{fontWeight: 'bold'}}>
                                        {recipe.nutrition.calories}kcal
                                    </span>
                                </p>

                                <p style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFF9F6',
                                    borderBottom: '1px solid #E5E0DD',
                                    width: '90%',
                                    padding: '0 10px',
                                }}>
                                    <span>
                                        Total Fat
                                    </span>

                                    <span style={{fontWeight: 'bold'}}>
                                        {recipe.nutrition.totalFat}
                                    </span>
                                </p>

                                <p style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFF9F6',
                                    borderBottom: '1px solid #E5E0DD',
                                    width: '90%',
                                    padding: '0 10px',
                                }}>
                                    <span>
                                        Protein
                                    </span>

                                    <span style={{fontWeight: 'bold'}}>
                                        {recipe.nutrition.protein}
                                    </span>
                                </p>

                                <p style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFF9F6',
                                    borderBottom: '1px solid #E5E0DD',
                                    width: '90%',
                                    padding: '0 10px',
                                }}>
                                    <span>
                                        Carbohydrate
                                    </span>

                                    <span style={{fontWeight: 'bold'}}>
                                        {recipe.nutrition.carbohydrate}
                                    </span>
                                </p>
                            </div>

                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: '100%',
                            maxWidth: '1000px',
                            height: '100%',
                            marginTop: '20px',
                            border: '5px ridge rgba(0, 33, 255, 0.3)',
                            borderRadius: '5px'
                        }}>
                            {recipe.summary}
                        </Box>

                        <AntdDivider orientation="left">Recipe Details</AntdDivider>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <AntdList
                            header={<span><strong>Diet type</strong></span>}
                            bordered
                            dataSource={Object.entries(recipe.diet)
                                .filter(([_, value]) => value)
                                .map(([prop]) => dietLabels[prop] || prop)}
                            renderItem={(item) => (<AntdList.Item>{item}</AntdList.Item>)}
                        />
                        <AntdList
                            header={<span><strong>Ingredients</strong></span>}
                            bordered
                            dataSource={recipe.ingredients.map(ingredient => `${ingredient.name}: ${parseInt(ingredient.measures[0].amount.toFixed())} ${ingredient.measures[0].unitShort}`)}
                            renderItem={(item) => (<AntdList.Item>{item}</AntdList.Item>)}
                        />
                        <AntdList
                            header={<span><strong>Steps</strong></span>}
                            bordered
                            dataSource={recipe.steps.map((step, index) => `${index + 1}. ${step.description}`)}
                            renderItem={(item) => (<AntdList.Item>{item}</AntdList.Item>)}
                        />
                        </div>
                    </Box>

                    <div>
                        <CarouselRecipeDetailed/>
                    </div>
                </>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}>
                    <CircularProgress/>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailed;

export const getRecipeIdFromUrl = (): string | null => {
    const url = window.location.href;
    const idMatch = url.match(/\/recipe\/(\d+)/);
    if (idMatch && idMatch[1]) {
        return idMatch[1];
    }
    return null;
};

export interface RecipeDetailedParams {
    recipeId: string;
    title: string;
    quantity: number;
    cookingTimeInMinutes: number;
    category: string[];
    imageUrl: string;
    rating: number;
    ingredients: {
        name: string;
        measures: {
            amount: number;
            unitShort: string;
            unitLong: string;
        }[];
    }[];
    steps: {
        description: string;
    }[];
    summary: string;
    cuisines: string[];
    nutrition: {
        calories: number;
        totalFat: string;
        protein: string;
        carbohydrate: string;
    };
    diet: {
        vegetarian: boolean;
        vegan: boolean;
        glutenFree: boolean;
        dairyFree: boolean;
        veryHealthy: boolean;
    };
}
