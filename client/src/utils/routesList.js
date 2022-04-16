
// import ProtectedRoute from './../pages/ProtectedRoute';
// import SharedLayout from './../pages/dashboard/SharedLayout';
// import { AddDevice } from '../pages/dashboard';
// import Profile from './../pages/dashboard/Profile';
// const routesList = [
//     {
//         path: "/",
//         element: <ProtectedRoute><SharedLayout /></ProtectedRoute>,
//         breadcrumb: 'Home'
//     },
//     {
//         path: "/add-device",
//         element: <AddDevice />,
//         breadcrumb: 'Add Device'
//     },
//     {
//         path: "/profile",
//         element: <Profile />,
//         breadcrumb: 'Profile'
//     },
// ]


// export default routesList

// if (currentRoutes.length > 0) {
//     currentRoutes.shift();
//     return (
//         <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 15 }}>
//             <Link color="inherit" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
//                 Home
//             </Link>
//             {
//                 currentRoutes.length === 1
//                     ? <Typography color="textPrimary">{currentRoutes[0]}</Typography>
//                     : currentRoutes.map((route, index) => {
//                         return (index !== currentRoutes.length - 1
//                             ? <Link key={index} color="inherit" style={{ cursor: 'pointer' }} onClick={() => {
//                                 navigate(route)
//                             }} >
//                                 {route}
//                             </Link>
//                             : <Typography key={index} color="textPrimary">{route}</Typography>)
//                     })
//             }
//         </Breadcrumbs>
//     );
// }
// else
//     return <></>