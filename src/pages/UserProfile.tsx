import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios, { getAuthConfig } from "../utils/customAxios";
import Box from '@mui/material/Box';

interface UserProfileParams {
    id: string;
    [key: string]: string | undefined;
}

interface UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    password: string;
}

interface CurrentUserRequestDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nickname: string;
}

const UserProfile: React.FC = () => {
    const { id } = useParams<UserProfileParams>();
    const [user, setUser] = useState<UserDto | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState<CurrentUserRequestDto>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        nickname: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
        if (!isAuthenticated) {
            navigate('/');
        } else {
            axios.get(`/users/current`, getAuthConfig())
                .then(response => {
                    setUser(response.data);
                    if (response.data) {
                        setUpdatedUser(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [id, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log(updatedUser)
        axios.put(`/users/current`, updatedUser, getAuthConfig())
            .then(async response => {
                setUser(response.data);

                await axios.post('/logout');
                localStorage.removeItem('token');
                window.location.reload();
                navigate("/home");
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
            });
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                marginTop: '1rem',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={updatedUser?.email}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="nickname"
                    label="Nickname"
                    name="nickname"
                    value={updatedUser?.nickname}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <div>
                <TextField
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={updatedUser?.firstName}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={updatedUser?.lastName}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <div>
                <TextField
                    id="password"
                    label="Password"
                    name="password"
                    value={updatedUser?.password}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <div style={{ alignSelf: 'center', marginTop: '1rem' }}>
                <Button variant="contained" onClick={handleSave} sx={{backgroundColor: 'black'}}>Save</Button>
            </div>
        </Box>
    );
};

export default UserProfile;
