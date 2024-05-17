import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import axios from '../utils/customAxios';

const RegisterDialog = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        nickname: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClear = () => {
        setFormData({
            email: '',
            password: '',
            repeatPassword: '',
            firstName: '',
            lastName: '',
            nickname: ''
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitting form');
        try {
            const response = await axios.post('/auth/registration', formData);
            console.log(response.data);

            handleClear();
        } catch (error) {
            console.error('Registration failed:', error);
        }
        handleClose();
    };

    return (
        <React.Fragment>
            <MenuItem key="Register" onClick={handleClickOpen}>
                <Typography textAlign="center">Register</Typography>
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Register</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        To register for this website, please enter your information below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="repeatPassword"
                        name="repeatPassword"
                        label="Repeat Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        variant="standard"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="nickname"
                        name="nickname"
                        label="Nickname"
                        fullWidth
                        variant="standard"
                        value={formData.nickname}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: '100%', margin: '10px 0', backgroundColor: 'black' }}
                    >
                        Register
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        sx={{ width: '100%', backgroundColor: 'grey' }}
                    >
                        Cancel
                    </Button>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default RegisterDialog;
