import * as React from 'react';
import Card from '@mui/material/Card';
import {Link} from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import {Box, Checkbox, FormControlLabel} from "@mui/material";
import useCurrentUser from "../utils/useCurrentUser";
import axios, {getAuthConfig} from "../utils/customAxios";
import {useEffect} from "react";

export interface RecipeDto {
    userName: string;
    creationDate: string;
    recipeId: number;
    title: string;
    imageUrl: string;
    rating: number;
    quantity: number;
    category: string[];
    cookingTimeInMinutes: number;
    summary: string;
}

interface RecipeReviewCardProps {
    recipe: RecipeDto;
}

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({recipe}) => {
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState<number | null>(recipe.rating);
    const [isPurple, setIsPurple] = React.useState(false);
    const {currentUser, loading, error} = useCurrentUser();

    useEffect(() => {
        const fetchFavouriteRecipes = async () => {
            try {
                const response = await axios.get('/users/favourite/recipes', getAuthConfig());

                if (Array.isArray(response.data.content)) {
                    const isRecipeFavourite = response.data.content.find(
                        (favouriteRecipe: RecipeDto) => favouriteRecipe.recipeId === recipe.recipeId
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
    }, []);

    const handleClick = async () => {
        try {
            const user = await currentUser;
            if (user) {
                const { email } = user;
                const requestUrl = isPurple
                    ? `/users/favourite/recipes/remove?recipeId=${recipe.recipeId}`
                    : `/users/favourite/recipes/add?recipeId=${recipe.recipeId}`;

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{maxWidth: 345, margin: '20px'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {recipe.userName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                }
                action={
                    <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
                        {currentUser && (
                            <IconButton aria-label="add to favorites" onClick={handleClick} sx={{ml: 'auto', mt: 1}}>
                                <FavoriteIcon style={{color: isPurple ? 'red' : 'inherit'}}/>
                            </IconButton>
                        )}
                    </Box>
                }
                title={recipe.title}
                subheader={recipe.creationDate}
            />

            <Link to={`/recipe/${recipe.recipeId}`}>
                <CardMedia component="img" height="194" image={recipe.imageUrl} alt={recipe.title}/>
            </Link>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {recipe.summary}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Box display="flex" flexDirection="row">
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
                    }}>
                        <PeopleAltRoundedIcon/>
                        <div style={{paddingRight: '2px', marginLeft: '2px'}}>
                            {recipe.quantity}
                        </div>
                    </div>
                </Box>
                <Rating
                    name="simple-controlled"
                    value={value}
                    readOnly
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    // }}
                />
            </CardActions>
        </Card>
    );
};

export default RecipeReviewCard;
