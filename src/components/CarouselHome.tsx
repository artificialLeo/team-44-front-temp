import React from 'react';
import { Carousel } from 'antd';

const CarouselHome: React.FC = () => {
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '250px',
        color: '#fff',
        lineHeight: '250px',
        textAlign: 'center',
        background: '#364d79',
        overflow: 'hidden',
    };

    const imageStyle: React.CSSProperties = {
        ...contentStyle,
        objectFit: 'cover',
        width: '100%',
    };

    return (
        <div style={{ width: '100%' }}>
            <Carousel arrows dotPosition="left" autoplay style={{ width: '100%', marginBottom: '-40px' }}>
                <div>
                    <img src="https://loremflickr.com/1600/900/food?random=1" alt="Slide 1" style={imageStyle} />
                </div>
                <div>
                    <img src="https://loremflickr.com/1600/900/food?random=2" alt="Slide 2" style={imageStyle} />
                </div>
                <div>
                    <img src="https://loremflickr.com/1600/900/food?random=3" alt="Slide 3" style={imageStyle} />
                </div>
                <div>
                    <img src="https://loremflickr.com/1600/900/food?random=4" alt="Slide 4" style={imageStyle} />
                </div>
            </Carousel>
        </div>
    );
};

export default CarouselHome;
