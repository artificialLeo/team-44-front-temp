import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import { Image } from 'antd';
import Fab from '@mui/material/Fab';
import Back from '@mui/icons-material/ArrowBackIosSharp';
import { useNavigate } from 'react-router-dom';

interface Article {
    id: number;
    title: string;
    description: string;
    date: string;
    author: string;
    imgUrl: string;
}

const ArticleDetailed: React.FC = () => {
    const navigate = useNavigate();

    const params = useParams<{ id: string }>();
    const id = params.id;
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/article/${id}`);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            {article && (
                <Card style={{ width: '80%', height: '80%', marginTop: '-100px' }}>
                    <CardMedia
                        component="img"
                        height="80%"
                        image={article.imgUrl}
                        alt="Article Image"
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {article.title}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {article.date} - {article.author}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {article.description}
                        </Typography>
                    </CardContent>
                </Card>
            )}
            <Fab color="primary" aria-label="back" sx={{position: 'fixed', bottom: '50px', left: '50px', backgroundColor: 'black'}} onClick={handleBack}>
                <Back />
            </Fab>
        </Box>
    );
};

export default ArticleDetailed;
