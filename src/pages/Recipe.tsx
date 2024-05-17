import React, { useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Checkbox,
    CircularProgress,
    FilledInput,
    FormControlLabel, InputAdornment,
    NativeSelect, PaginationItem,
    Theme, useMediaQuery,
    useTheme
} from '@mui/material';
import RecipeReviewCard, { RecipeDto } from '../components/RecipeReviewCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from '../utils/customAxios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from "@mui/material/Button";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from "@mui/material/IconButton";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { debounce } from 'lodash';
import useCurrentUser from '../utils/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import '../styles/app.scss';

export interface FiltersState {
    title: string;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cuisine: string;
    userEmail: string;
    page: number;
    size: number;
    sortProperty: string;
    sortDirection: string;
}

const Recipe: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigateCreateClick = () => {
        navigate('/recipe/create');
    };

    const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [definedPage, setDefinedPage] = useState(1);
    const [loader, setLoading] = useState(true);
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    const [cuisine, setCuisine] = React.useState('');
    const [dietName, setDietName] = React.useState<string[]>([]);
    const { currentUser, loading, error } = useCurrentUser();


    const [filters, setFilters] = useState<FiltersState>({
        title: "",
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        veryHealthy: false,
        cuisine: "",
        userEmail: "",
        page: 0,
        size: 9,
        sortProperty: "creationDate",
        sortDirection: "DESC"
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`/api/recipe/diet`, filters);
                setRecipes(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setLoading(false);
            }

        };

        fetchRecipes();
    }, [filters]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const adjustedPage = value - 1;
        setFilters(prevFilters => ({ ...prevFilters, page: adjustedPage }));
        setDefinedPage(value);
    };

    const handleCuisineChange = (event: SelectChangeEvent) => {
        const selectedCuisine = event.target.value as string;
        setCuisine(selectedCuisine);

        setFilters(prevFilters => ({
            ...prevFilters,
            cuisine: selectedCuisine,
        }));

    };

    const handleChangeDiet = (event: SelectChangeEvent<typeof dietName>) => {
        const {
            target: { value },
        } = event;

        const selectedDietNames = Array.isArray(value) ? value : [value];

        const updatedFilters = {
            ...filters,
            vegetarian: selectedDietNames.includes('vegetarian'),
            vegan: selectedDietNames.includes('vegan'),
            glutenFree: selectedDietNames.includes('glutenFree'),
            dairyFree: selectedDietNames.includes('dairyFree'),
            veryHealthy: selectedDietNames.includes('veryHealthy'),
        };

        setFilters(updatedFilters);

        setDietName(selectedDietNames);
    };

    const [inputValue, setInputValue] = useState<string>('');

    const handleChangeInput = (inputValue: string) => {
        setInputValue(inputValue);

        setFilters(prevFilters => ({
            ...prevFilters,
            title: inputValue
        }));
    };

    const debouncedHandleChangeInput = debounce((inputValue: string) => {
        handleChangeInput(inputValue);
    }, 100);

    const resetInput = () => {
        setInputValue('');
        handleChangeInput('');
    };

    const handleSortChange = (value: string) => {
        setFilters(prevFilters => {
            return {
                ...prevFilters,
                sortProperty: value,
            };
        });
    };

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);

        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            updatedFilters.userEmail = isChecked ? currentUser?.email || '' : '';
            return updatedFilters;
        });
    };


    const matches = useMediaQuery('(min-width: 600px)');
    const columns = matches ? 3 : 1;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className="header-box">
                <h2>Recipes</h2>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '10px' }}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="filled-title">Title</InputLabel>
                        <OutlinedInput
                            label="Title"
                            id="filled-title"
                            value={inputValue}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                debouncedHandleChangeInput(event.target.value);
                            }}
                            startAdornment={<InputAdornment position="start"><SearchRoundedIcon/></InputAdornment>}
                            endAdornment={
                                inputValue ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={resetInput}
                                            edge="end"
                                        >
                                            <CancelRoundedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null
                            }
                        />
                    </FormControl>

                    {currentUser ? (
                        <Button
                            startIcon={<AddRoundedIcon />}
                            sx={{ paddingX: '25px', backgroundColor: 'black', color: 'white'}}
                            onClick={handleNavigateCreateClick}
                        >
                            Create&nbsp;recipe
                        </Button>
                    ) : null}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Sort by
                            </InputLabel>
                            <NativeSelect
                                inputProps={{
                                    name: 'sort',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={(event) => handleSortChange(event.target.value as string)}
                            >
                                <option value={"creationDate"}>Date</option>
                                <option value={"title"}>Title</option>
                                <option value={"rating"}>Rating</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120, marginLeft: '5px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
                            <Select
                                labelId="cuisine-select"
                                id="cuisine-select"
                                value={cuisine}
                                label="Cuisine"
                                onChange={handleCuisineChange}
                            >
                                <MenuItem value={""}>None</MenuItem>
                                <MenuItem value={"Italian"}>Italian</MenuItem>
                                <MenuItem value={"French"}>French</MenuItem>
                                <MenuItem value={"Chinese"}>Chinese</MenuItem>
                                <MenuItem value={"Japanese"}>Japanese</MenuItem>
                                <MenuItem value={"Mexican"}>Mexican</MenuItem>
                                <MenuItem value={"Indian"}>Indian</MenuItem>
                                <MenuItem value={"Thai"}>Thai</MenuItem>
                                <MenuItem value={"Greek"}>Greek</MenuItem>
                                <MenuItem value={"Spanish"}>Spanish</MenuItem>
                                <MenuItem value={"Mediterranean"}>Mediterranean</MenuItem>
                                <MenuItem value={"American"}>American</MenuItem>
                                <MenuItem value={"Brazilian"}>Brazilian</MenuItem>
                                <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
                                <MenuItem value={"Korean"}>Korean</MenuItem>
                                <MenuItem value={"Middle Eastern"}>Middle Eastern</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="diet-label">Diet</InputLabel>
                            <Select
                                labelId="diet-label"
                                id="diet-multiple"
                                multiple
                                value={dietName}
                                onChange={handleChangeDiet}
                                input={<OutlinedInput label="Diet" />}
                            >
                                    <MenuItem key={"vegetarian"} value={"vegetarian"}>
                                        Vegetarian
                                    </MenuItem>
                                    <MenuItem key={"vegan"} value={"vegan"}>
                                        Vegan
                                    </MenuItem>
                                    <MenuItem key={"glutenFree"} value={"glutenFree"}>
                                        Gluten Free
                                    </MenuItem>
                                    <MenuItem key={"dairyFree"} value={"dairyFree"}>
                                        Dairy Free
                                    </MenuItem>
                                    <MenuItem key={"veryHealthy"} value={"veryHealthy"}>
                                        Very Healthy
                                    </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {currentUser ? (
                        <Box sx={{ minWidth: 120 }}>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={handleCheckboxChange}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                                label="Favourite"
                            />
                        </Box>
                    ) : null}
                </div>
            </div>

            <div>
                {loader ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(auto-fill, 1fr)', gridAutoRows: 'auto', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            {recipes.length > 0 ? (
                                recipes.map((recipe: RecipeDto) => (
                                    <RecipeReviewCard key={recipe.recipeId} recipe={recipe} />
                                ))
                            ) : (
                                <Alert severity="info">No recipes found.</Alert>
                            )}
                        </Box>

                        {totalPages <= 1 ? (
                            <></>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Pagination
                                    count={totalPages}
                                    page={definedPage}
                                    onChange={handlePageChange}
                                    size="large"
                                    variant="outlined"
                                    shape="rounded"
                                    renderItem={(item) => {
                                        if (item.type === 'previous' && definedPage === 1) {
                                            return <PaginationItem {...item} disabled />;
                                        }
                                        if (item.type === 'next' && definedPage === totalPages) {
                                            return <PaginationItem {...item} disabled />;
                                        }
                                        return <PaginationItem {...item} />;
                                    }}
                                />
                            </Box>
                        )}

                    </>
                )}
            </div>

        </div>
    );
};

export default Recipe;
