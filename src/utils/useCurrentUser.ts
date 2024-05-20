import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import axios, {getAuthConfig} from '../utils/customAxios';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
}

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                // const token = localStorage.getItem('token');
                // if (!token) {
                //     throw new Error('Token not found');
                // }
                //
                // const config = {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // };

                const response = await axios.get<User>('/users/current', getAuthConfig());
                const userData = response.data;
                setCurrentUser(userData);
            } catch (error) {
                // setError((error as AxiosError).message || 'An error occurred');
                window.location.reload();
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return { currentUser, loading, error };
};

export default useCurrentUser;
