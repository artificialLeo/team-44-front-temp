// ReviewDetailed.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface ReviewDetailedParams {
    id: string;
}

const ReviewDetailed: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Fetch review details based on the id

    return (
        <div>
            <h1>Review Detailed Page</h1>
            <p>Review ID: {id}</p>
            {/* Add detailed review content here */}
        </div>
    );
};

export default ReviewDetailed;
