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
            setFormData({ email: formData.email,
                password: formData.password });
            const response = await axios.post('/auth/login', formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            handleClose();

            setIsUserAuthorized(true);
            window.location.reload();

            setTimeout(() => {
                localStorage.removeItem('token');
                window.location.reload();
            }, 300000);

        } catch (error) {
            console.error('Login failed:', error);
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
                        sx={{ width: '100%', margin: '10px 0', backgroundColor: 'grey' }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        sx={{ width: '100%', backgroundColor: 'black' }}
                    >
                        Cancel
                    </Button>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
