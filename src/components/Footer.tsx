import React, { useState } from 'react';
import { Grid, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

function Footer() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.currentTarget as HTMLElement;
        setAnchorEl(target);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white',
            zIndex: 999
        }}>
            <Grid container
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Typography variant="body1">Foodieland. &copy; 2024 All rights reserved</Typography>
                <Typography variant="body2">foodieland@test.com</Typography>
            </Grid>
        </footer>
    );
}

export default Footer;
