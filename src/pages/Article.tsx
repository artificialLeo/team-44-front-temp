import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '../utils/customAxios';
import {Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useCurrentUser from "../utils/useCurrentUser";
import '../styles/app.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import {divide} from "lodash";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

interface ArticleDto {
    id: bigint;
    title: string;
    description: string;
    date: string;
    author: string;
    imgUrl: string;
}

interface Recipe {
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

const Article: React.FC = () => {
    const [articles, setArticles] = useState<ArticleDto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loadingArticle, setLoading] = useState<boolean>(false);
    // const { currentUser, loading, error } = useCurrentUser();

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [recipesDate, setRecipesDate] = useState<Recipe[]>([]);


    const fetchArticles = async (pageNumber: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/article?page=${pageNumber}`);
            const {content, totalPages} = response.data;
            setHasMore(pageNumber < totalPages);
            setArticles((prevArticles) => (pageNumber === 1 ? [...content] : [...prevArticles, ...content]));
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
            console.log(articles)
        }
    };

    useEffect(() => {
        fetchArticles(page);

        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/api/recipe', {
                    params: {
                        page: 0,
                        size: 3,
                        sort: 'rating,desc'
                    }
                });
                setRecipes(response.data.content);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        const fetchRecipesDate = async () => {
            try {
                const response = await axios.get('/api/recipe');
                setRecipesDate(response.data.content);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
        fetchRecipesDate();
    }, [page]);

    const fetchMoreArticles = () => {
        const nextPage = page + 1;
        fetchArticles(nextPage);
        setPage(nextPage);
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)');
    const isLargeScreen = useMediaQuery('(min-width:1343px)');

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'row'}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'}}>
                <div className="header-box">
                    <h2>Articles</h2>
                </div>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreArticles}
                    hasMore={hasMore}
                    loader={<div><CircularProgress/></div>}
                    endMessage={<p><Alert icon={<CheckIcon fontSize="inherit"/>} severity="warning">No more articles to
                        load!</Alert></p>}
                >
                    {articles.map((article, index) => (
                        <Link to={`/article/${article.id}`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                        <Card key={index} sx={{maxWidth: 545, width: '800px', margin: "10px 0"}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={article.imgUrl}
                                    alt="description image"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {article.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </Link>
                    ))}
                </InfiniteScroll>
            </div>
            {isLargeScreen &&
                <Box style={{ position: 'fixed', top: '100px', left: '50px', overflow: 'auto', maxHeight: 'calc(100vh - 200px)', width: '345px' }}>
                    {recipes.map((recipe, index) => (
                        <Card key={index} sx={{ maxWidth: 345, margin: '0px 0px 10px 0px' }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={recipe.imageUrl}
                                title="top recipe"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {recipe.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe.summary}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/recipe/${recipe.recipeId}`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                                    <Button size="small" sx={{color: 'black'}}>View Details</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            }
            {isLargeScreen &&
                <Box style={{ position: 'fixed', top: '100px', right: '50px', overflow: 'auto', maxHeight: 'calc(100vh - 200px)', width: '345px' }}>
                    {recipesDate.map((recipe, index) => (
                        <Card key={index} sx={{ maxWidth: 345, margin: '0px 0px 10px 0px' }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={recipe.imageUrl}
                                title="top recipe"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {recipe.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe.summary}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/recipe/${recipe.recipeId}`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                                    <Button size="small" sx={{color: 'black'}}>View Details</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            }
        </div>
    );
};

export default Article;
