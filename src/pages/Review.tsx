import React, { useState, useEffect } from 'react';
import axios from '../utils/customAxios';
import { Container, Grid, Button, Card, CardContent, Typography } from '@mui/material';
import { Image } from 'antd';
import { FloatButton } from 'antd';
import '../styles/app.scss';

interface Review {
    id: number;
    name: string;
    surname: string;
    country: string;
    city: string;
    rating: number;
    text: string;
    image: string;
}

const Review: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        fetchReviews();
    }, [page]);

    const fetchReviews = () => {
        axios.get(`/api/review?page=${page}&size=9`)
            .then(response => {
                const data = response.data;
                const updatedReviews = data.content.map((review: Review, index: number) => ({ ...review, key: review.id + index }));
                setReviews(prevReviews => [...prevReviews, ...updatedReviews]);
                setHasMore(!data.last);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <Container maxWidth="lg">
            <div className="header-box">
                <h2>Reviews</h2>
            </div>

            <Grid container spacing={2}>
                {reviews.map( (review, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {review.name} {review.surname}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    {review.country}, {review.city}
                                </Typography>
                                <Image src={review.image}/>
                                <Typography color="textSecondary" gutterBottom>
                                    Rating: {review.rating}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {review.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {hasMore && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" onClick={handleLoadMore} sx={{backgroundColor: 'black'}}>
                        Load More
                    </Button>
                </div>
            )}
            <FloatButton.BackTop />
        </Container>
    );
};

export default Review;
