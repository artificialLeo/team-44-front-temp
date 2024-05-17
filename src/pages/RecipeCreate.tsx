import React, { useState } from 'react';
import {TextField, Button, Box, IconButton, FormControlLabel, Checkbox, Alert, AlertTitle} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import axios, {getAuthConfig} from "../utils/customAxios";
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import { useNavigate } from 'react-router-dom';

interface Ingredient {
    id: number;
    name: string;
    quantity: string | number;
}

interface Step {
    id: number;
    description: string;
}

const RecipeCreate: React.FC = () => {
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        title: '',
        quantity: 1,
        cookingTimeInMinutes: 0,
        category: [] as string[],
        imageUrl: '',
        rating: 0,
        ingredients: [] as Ingredient[],
        steps: [] as Step[],
        summary: '',
        cuisines: [] as string[],
        nutrition: {
            calories: 0,
            totalFat: '0g',
            protein: '0g',
            carbohydrate: '0g'
        },
        diet: {
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
            veryHealthy: false
        }
    });

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            title: value
        }));
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            quantity: parseFloat(value)
        }));
    };

    const handleCookingTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            cookingTimeInMinutes: parseFloat(value)
        }));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            category: [value]
        }));
    };

    const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            imageUrl: value
        }));
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            rating: parseFloat(value)
        }));
    };

    const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            summary: value
        }));
    };

    const handleCuisinesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            cuisines: [value]
        }));
    };

    const handleIngredientChange = (index: number, key: string, value: string | number) => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: prevRecipe.ingredients.map((ingredient, i) =>
                i === index ? { ...ingredient, [key]: value } : ingredient
            )
        }));
    };

    const handleStepChange = (index: number, description: string) => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            steps: prevRecipe.steps.map((step, i) =>
                i === index ? { ...step, description } : step
            )
        }));
    };

    const handleAddIngredient = () => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: [...prevRecipe.ingredients, { id: prevRecipe.ingredients.length + 1, name: '', quantity: 0 }]
        }));
    };

    const handleAddStep = () => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            steps: [...prevRecipe.steps, { id: prevRecipe.steps.length + 1, description: '' }]
        }));
    };

    const handleRemoveIngredient = (index: number) => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: prevRecipe.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleRemoveStep = (index: number) => {
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            steps: prevRecipe.steps.filter((_, i) => i !== index)
        }));
    };

    const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            nutrition: {
                ...prevRecipe.nutrition,
                calories: parseFloat(value)
            }
        }));
    };

    const handleTotalFatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 1) {
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                nutrition: {
                    ...prevRecipe.nutrition,
                    totalFat: `${parseFloat(value)}g`
                }
            }));
        }
    };

    const handleProteinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 1) {
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                nutrition: {
                    ...prevRecipe.nutrition,
                    protein: `${parseFloat(value)}g`
                }
            }));
        }
    };

    const handleCarbohydrateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (!isNaN(parseFloat(value)) && parseFloat(value) >= 1) {
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                nutrition: {
                    ...prevRecipe.nutrition,
                    carbohydrate: `${parseFloat(value)}g`
                }
            }));
        }
    };

    const handleVegetarianChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            diet: {
                ...prevRecipe.diet,
                vegetarian: checked
            }
        }));
    };

    const handleVeganChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            diet: {
                ...prevRecipe.diet,
                vegan: checked
            }
        }));
    };

    const handleGlutenFreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            diet: {
                ...prevRecipe.diet,
                glutenFree: checked
            }
        }));
    };

    const handleDairyFreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            diet: {
                ...prevRecipe.diet,
                dairyFree: checked
            }
        }));
    };

    const handleVeryHealthyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            diet: {
                ...prevRecipe.diet,
                veryHealthy: checked
            }
        }));
    };

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //
    //     // await axios.post("users/recipes/add", null, getAuthConfig());
    //     console.log(recipe);
    // };

    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const missingFields = Object.entries(recipe)
            .filter(([key, value]) => key !== 'diet') // Exclude 'diet' property
            .filter(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.length === 0;
                } else if (typeof value === 'object') {
                    return Object.values(value as Record<string, any>).some(subValue => !subValue);
                }
                return !value;
            })
            .map(([key]) => key);

        if (missingFields.length > 0) {
            setAlertMessage(`The following fields are required:<br />${missingFields.map((field, index) => `${index + 1}. ${field}`).join('<br />')}`);
        } else {
            // console.log(recipe);
            await axios.post("users/recipes/add", recipe, getAuthConfig()).then(() => {
                navigate('/recipe');
            });
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '800px'
            }}
        >
            <h1>Create custom recipe <RestaurantMenuRoundedIcon/></h1>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Title"
                        name="title"
                        onChange={handleTitleChange}
                    />
                    <TextField
                        type="number"
                        label="Quantity"
                        name="quantity"
                        onChange={handleQuantityChange}
                        sx={{ marginTop: '10px' }}
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        type="number"
                        label="Cooking Time (minutes)"
                        name="cookingTimeInMinutes"
                        onChange={handleCookingTimeChange}
                        sx={{ marginTop: '10px' }}
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        onChange={handleCategoryChange}
                        sx={{ marginTop: '10px' }}
                    />
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        onChange={handleImageUrlChange}
                        sx={{ marginTop: '10px' }}
                    />
                    <TextField
                        type="number"
                        label="Rating"
                        name="rating"
                        onChange={handleRatingChange}
                        sx={{ marginTop: '10px' }}
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        label="Summary"
                        name="summary"
                        onChange={handleSummaryChange}
                        sx={{ marginTop: '10px' }}
                    />
                    <TextField
                        label="Cuisines"
                        name="cuisines"
                        onChange={handleCuisinesChange}
                        sx={{ marginTop: '10px' }}
                    />

                    {/* Nutrition */}
                    <TextField
                        type="number"
                        label="Calories (kcal)"
                        name="calories"
                        onChange={handleCaloriesChange}
                        sx={{ marginTop: '10px' }}
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        label="Total Fat (g)"
                        name="totalFat"
                        type="number"
                        onChange={handleTotalFatChange}
                        sx={{ marginTop: '10px' }}
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        label="Protein (g)"
                        name="protein"
                        type="number"
                        onChange={handleProteinChange}
                        sx={{ marginTop: '10px' }}
                        inputProps={{ min: 1 }}
                    />
                    <TextField
                        label="Carbohydrate (g)"
                        name="carbohydrate"
                        type="number"
                        onChange={handleCarbohydrateChange}
                        sx={{ marginTop: '10px' }}
                        inputProps={{ min: 1 }}
                    />

                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onChange={handleVegetarianChange} name="vegetarian" />}
                            label="Vegetarian"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleVeganChange} name="vegan" />}
                            label="Vegan"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleGlutenFreeChange} name="glutenFree" />}
                            label="Gluten Free"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleDairyFreeChange} name="dairyFree" />}
                            label="Dairy Free"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={handleVeryHealthyChange} name="veryHealthy" />}
                            label="Very Healthy"
                        />
                    </FormGroup>



                    {/* Ingredients */}
                    <Button variant="contained" onClick={handleAddIngredient} sx={{backgroundColor: 'black'}}>Add Ingredient</Button>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                value={ingredient.name}
                                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                placeholder="Ingredient name"
                            />
                            <TextField
                                type="number"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value))}
                                placeholder="Quantity"
                                inputProps={{ min: 1 }}
                            />
                            <IconButton aria-label="delete" onClick={() => handleRemoveIngredient(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}

                    {/* Steps */}
                    <Button variant="contained" onClick={handleAddStep} sx={{backgroundColor: 'black'}}>Add Step</Button>
                    {recipe.steps.map((step, index) => (
                        <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                value={step.description}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                                placeholder="Step description"
                                multiline
                            />
                            <IconButton aria-label="delete" onClick={() => handleRemoveStep(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}

                    <Button variant="contained" type="submit" sx={{backgroundColor: 'black'}}>Create Recipe</Button>
                    {alertMessage && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <div dangerouslySetInnerHTML={{ __html: alertMessage }} />
                        </Alert>
                    )}

                </Box>
            </form>
        </Container>
    );
};

export default RecipeCreate;
