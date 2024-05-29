import React from 'react';
import { Carousel } from 'antd';
import CardMedia from "@mui/material/CardMedia";

const CarouselRecipeDetailed: React.FC = () => {
    const getRandomString = () => {
        return Math.random().toString(36).substring(7);
    };

    const randomImageUrls = Array.from({ length: 4 }, () => {
        return `https://loremflickr.com/1600/900/food?random=${getRandomString()}`;
    });

    return (
        <>
            <Carousel autoplay style={{ marginBottom: '-40px', marginTop: '5px' }}>
                {randomImageUrls.map((imageUrl, index) => (
                    <div key={index}>
                        <CardMedia
                            component="img"
                            style={{ width: '100%', height: '500px' }}
                            image={imageUrl}
                            alt={`Recipe ${index + 1}`}
                        />
                    </div>
                ))}
            </Carousel>
        </>
    );
};

export default CarouselRecipeDetailed;
