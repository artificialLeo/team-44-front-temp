// ArticleDetailed.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface ArticleDetailedParams {
    id: string;
}

const ArticleDetailed: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Fetch article details based on the id

    return (
        <div>
            <h1>Article Detailed Page</h1>
            <p>Article ID: {id}</p>
            {/* Add detailed article content here */}
        </div>
    );
};

export default ArticleDetailed;
