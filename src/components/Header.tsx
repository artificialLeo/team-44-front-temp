import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from 'react-router-dom';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { VerifiedUser, PersonOutline } from '@mui/icons-material';
import axios from '../utils/customAxios';

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isUserAuthorized, setIsUserAuthorized] = React.useState(false); // State for user authorization

    React.useEffect(() => {
        // Update isUserAuthorized when component mounts
        setIsUserAuthorized(window.isUserAuthorized || false);
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        console.log(isUserAuthorized)
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
            setIsUserAuthorized(false); // Update isUserAuthorized
            setAnchorElUser(null);
            window.isUserAuthorized = false;
        } catch (error) {
            console.error('Logout failed:', error);
            setAnchorElUser(null);
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'Lobster',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Foodieland.
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'center'}}>
                        <Link to={`/`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                            <MenuItem key="Home" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                        </Link>

                        <Link to={`/recipe`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                            <MenuItem key="Recipe" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Recipe</Typography>
                            </MenuItem>
                        </Link>

                        <Link to={`/article`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                            <MenuItem key="Article" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Article</Typography>
                            </MenuItem>
                        </Link>

                        <Link to={`/review`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                            <MenuItem key="Review" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Review</Typography>
                            </MenuItem>
                        </Link>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar>
                                    {isUserAuthorized ? <VerifiedUser/> : <PersonOutline/>}
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
                            {!isUserAuthorized ? <LoginDialog setIsUserAuthorized={setIsUserAuthorized} /> : ''}
                            {!isUserAuthorized ? <RegisterDialog/>  : '' }

                            {isUserAuthorized ?
                                <Link to={`/user`} style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
                                    <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{"Profile"}</Typography>
                                    </MenuItem>
                                </Link>
                                : '' }

                            {isUserAuthorized ?
                                <MenuItem key={"Logout"} onClick={handleLogout}>
                                    <Typography textAlign="center">{"Logout"}</Typography>
                                </MenuItem>
                                : '' }

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
