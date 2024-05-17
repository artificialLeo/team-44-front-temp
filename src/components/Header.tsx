import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from 'react-router-dom';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import axios from '../utils/customAxios';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, FormControl, InputLabel, Input, InputAdornment, MenuItem, Typography, IconButton, Avatar, Tooltip, Menu } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PersonOutline, VerifiedUser } from '@mui/icons-material';
import useCurrentUser from "../utils/useCurrentUser";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import TagFacesRoundedIcon from '@mui/icons-material/TagFacesRounded';

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isUserAuthorized, setIsUserAuthorized] = React.useState(false);
    const { currentUser, loading, error } = useCurrentUser();

    React.useEffect(() => {
        setIsUserAuthorized(currentUser !== null);
    }, [currentUser]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            localStorage.removeItem('token');
            setIsUserAuthorized(false);
            setAnchorElUser(null);
            window.location.reload();

        } catch (error) {
            console.error('Logout failed:', error);
            setAnchorElUser(null);
        }
    };

    return (
            <Box sx={{
                backgroundColor: 'black',
                color: 'white',
                width: '100%',
                position: 'fixed',
                top: 0,
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0'
            }}>

                <Box sx={{
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    color: 'white',
                    marginLeft: '10px'
                }}>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'white',
                            fontFamily: '"Lobster", sans-serif'

                        }}
                    >
                        Foodieland<span style={{color: 'red'}}>.</span>
                    </Typography>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Link to={`/`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                        <MenuItem key="Home">
                            <Typography textAlign="center">Home</Typography>
                        </MenuItem>
                    </Link>

                    <Link to={`/recipe`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                        <MenuItem key="Recipe">
                            <Typography textAlign="center">Recipe</Typography>
                        </MenuItem>
                    </Link>

                    <Link to={`/article`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                        <MenuItem key="Article">
                            <Typography textAlign="center">Article</Typography>
                        </MenuItem>
                    </Link>

                    <Link to={`/review`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                        <MenuItem key="Review">
                            <Typography textAlign="center">Review</Typography>
                        </MenuItem>
                    </Link>

                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginRight: '10px'
                }}>
                    <Tooltip title="Menu">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar sx={{backgroundColor: 'black'}}>
                                {isUserAuthorized ? <TagFacesRoundedIcon/> : <LoginRoundedIcon/>}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {!isUserAuthorized ? <LoginDialog setIsUserAuthorized={setIsUserAuthorized}/> : ''}
                        {!isUserAuthorized ? <RegisterDialog/> : ''}

                        {isUserAuthorized ?
                            <Link to={`/user`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                                <MenuItem key={"Profile"}>
                                    <Typography textAlign="center">{"Profile"}</Typography>
                                </MenuItem>
                            </Link>
                            : ''}

                        {isUserAuthorized ?
                            <MenuItem key={"Logout"} onClick={handleLogout}>
                                <Typography textAlign="center">{"Logout"}</Typography>
                            </MenuItem>
                            : ''}

                    </Menu>
                </Box>
            </Box>
    );
}

export default Header;
