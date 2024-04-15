import React, {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import axios from '../utils/customAxios';

interface LoginDialogProps {
    setIsUserAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginDialog({ setIsUserAuthorized }: LoginDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('/auth/login', formData);
            // Assuming the token is received in the response
            const { token } = response.data;
            // Store the token in local storage
            localStorage.setItem('token', token);
            // Close the dialog
            handleClose();
            // Set global variable to indicate user is authorized
            window.isUserAuthorized = true;

            setIsUserAuthorized(true);
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure (show error message, etc.)
        }
    };

    return (
        <React.Fragment>
            <MenuItem key={"Login"} onClick={handleClickOpen}>
                <Typography textAlign="center">{"Login"}</Typography>
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                }}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your email and password to login.
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

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: '100%', margin: '10px 0' }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleClose}
                        sx={{ width: '100%' }}
                    >
                        Cancel
                    </Button>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
