import NavbarWrapper from '../assets/wrappers/Menu'
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext'
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
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";


const pages = [
    {
        id: 1,
        text: "Map",
        path: "/map",
    },
]

const useStyles = makeStyles((theme) => ({

    customHeight: {
        minHeight: 96,
        paddingTop: 14,

    },
    offset: theme.mixins.toolbar
}));
const MainMenu = () => {
    const { isMember, toggleIsMember, user } = useAppContext()
    // return (
    //     <NavbarWrapper>
    //         <div className="nav-center">
    //             <div className='spacer'>
    //                 <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
    //                     UAPMIS
    //                 </Link>
    //             </div>
    //             <div className='spacer'>
    //                 <Link to='/map' style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
    //                     Map
    //                 </Link>
    //             </div>
    //             <div>
    //                 <Link onClick={() => toggleIsMember(true)} to="/register" style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
    //                     Log in
    //                 </Link>
    //             </div>
    //             <div>
    //                 <Link onClick={() => toggleIsMember(false)} to='/register' className='btn btn-hero'>
    //                     Register
    //                 </Link>
    //             </div>
    //         </div>
    //     </NavbarWrapper>
    // )
    const [anchorElNav, setAnchorElNav] = useState(null);
    const classes = useStyles();

    const handleOpenNavMenu = (event) => {
        console.log('hello from elnav');
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // style={{ background: '#FFFFFF' }}

    return (
        <AppBar position="static" className={classes.customHeight} style={{ background: '#fff' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters >

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        color={'#0a0'}
                    >
                        <Link to='/landing' style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
                            UAPMIS
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            // aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        //color="inherit"
                        >
                            <MenuIcon style={{ fill: '#0a0' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu} component={Link} to={page.path} style={{ color: '#102A43', textDecoration: 'inherit' }}>
                                    <Typography textAlign="center">{page.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                        color={'#0a0'}
                    >
                        <Link to='/landing' style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
                            UAPMIS
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} justifyContent="center">
                        {pages.map((page) => (
                            <Link
                                key={page.id}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, display: "block" }}
                                component={Link}
                                to={page.path}
                                style={{ color: '#102A43', textDecoration: 'inherit' }}
                                className='btn-hero'
                            >
                                {page.text}
                            </Link>
                        ))}
                    </Box>
                    {!user ?
                        <>
                            <Box sx={{ flexGrow: 0 }}>
                                <Link onClick={() => toggleIsMember(true)} to="/register" style={{ color: '#102A43', textDecoration: 'inherit' }} className=' btn-hero'>
                                    Log in
                                </Link>
                            </Box><Box sx={{ flexGrow: 0 }}>
                                <Link onClick={() => toggleIsMember(false)} to='/register' className='btn btn-hero'>
                                    Register
                                </Link>
                            </Box>
                        </> : <Box sx={{ flexGrow: 0 }}>
                            <Link to='/' className='btn btn-hero'>
                                Go to dashboard
                            </Link>
                        </Box>}
                </Toolbar>
            </Container>
        </AppBar >
    )

}

export default MainMenu