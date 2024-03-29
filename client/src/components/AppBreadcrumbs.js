import { Typography, Breadcrumbs, Link } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { useAppContext } from '../context/appContext';

export default function AppBreadcrumbs() {
    const {
        setPageNumber,
    } = useAppContext()

    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor =
            theme.palette.mode === 'light'
                ? theme.palette.grey[600]
                : theme.palette.grey[800];
        return {
            backgroundColor,
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            '&:active': {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12),
            },
        };
    });

    let navigate = useNavigate();
    let location = useLocation();
    let currentRoutes = []
    const regExpr = '/\/\d+/i'
    currentRoutes = location.pathname !== '/' ? location.pathname.split('/') : [];

    if (currentRoutes.length === 0) {
        return (
            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 15 }}>
                <Link color="inherit" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    Devices
                </Link>
                <Typography color="textPrimary">List</Typography>
            </Breadcrumbs>
        )
    }

    if (currentRoutes.length > 0) {
        currentRoutes.shift();
        return (
            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 15 }}>
                <Link color="inherit" onClick={() => { setPageNumber(); navigate('/') }} style={{ cursor: 'pointer' }} >
                    Devices
                </Link>
                {
                    currentRoutes.length === 1
                        ? <Typography color="textPrimary">{currentRoutes[0].charAt(0).toUpperCase() + currentRoutes[0].slice(1)}</Typography>
                        : currentRoutes.map((route, index) => {
                            return (index === currentRoutes.length
                                ? <Link key={index} color="inherit" style={{ cursor: 'pointer' }} onClick={() => {
                                    navigate(route)
                                }} >
                                    {route}
                                </Link>
                                : <Typography key={index} color="textPrimary">{route}</Typography>)
                        })
                }
            </Breadcrumbs>
        )
    }
    else
        return <></>
}
