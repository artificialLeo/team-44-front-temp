// RecipeDetailed.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface RecipeDetailedParams {
    id: string;
}

const RecipeDetailed: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Fetch recipe details based on the id

    return (
        <div>
            <h1>Recipe Detailed Page</h1>
            <p>Recipe ID: {id}</p>
            {/* Add detailed recipe content here */}
        </div>
    );
};

export default RecipeDetailed;
