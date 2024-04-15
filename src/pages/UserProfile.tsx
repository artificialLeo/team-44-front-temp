// src/pages/UserProfile.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface UserProfileParams {
    id: string;
}

const UserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>User Profile Page</h1>
            <p>User ID: {id}</p>
            {/* Add user profile page content here */}
        </div>
    );
};

export default UserProfile;
