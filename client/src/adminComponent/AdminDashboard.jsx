// // import React, { useState, useEffect } from 'react';
// // import { styled, useTheme } from '@mui/material/styles';
// // import Box from '@mui/material/Box';
// // import MuiDrawer from '@mui/material/Drawer';
// // import MuiAppBar from '@mui/material/AppBar';
// // import Toolbar from '@mui/material/Toolbar';
// // import List from '@mui/material/List';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Typography from '@mui/material/Typography';
// // import Divider from '@mui/material/Divider';
// // import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// // import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import HomeIcon from '@mui/icons-material/Home';
// // import AssessmentIcon from '@mui/icons-material/Assessment';
// // import BorderColorIcon from '@mui/icons-material/BorderColor';
// // import PersonIcon from '@mui/icons-material/Person';
// // import { FaBars } from 'react-icons/fa';

// // import Menu from './adminMenu';
// // // import Table from './adminTable'; // Import Table component
// // import Order from './adminOrder';
// // import Report from './adminReport';
// // import AdminDashboard from './adminBoard';
// // import LogOut from './adminLogin';
// // import axios from 'axios';

// // const drawerWidth = 240;

// // const openedMixin = (theme) => ({
// //   width: drawerWidth,
// //   transition: theme.transitions.create('width', {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.enteringScreen,
// //   }),
// //   overflowX: 'hidden',
// // });

// // const closedMixin = (theme) => ({
// //   transition: theme.transitions.create('width', {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   overflowX: 'hidden',
// //   width: `calc(${theme.spacing(7)} + 1px)`,
// //   [theme.breakpoints.up('sm')]: {
// //     width: `calc(${theme.spacing(8)} + 1px)`,
// //   },
// // });

// // const DrawerHeader = styled('div')(({ theme }) => ({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'flex-end',
// //   padding: theme.spacing(0, 1),
// //   // necessary for content to be below app bar
// //   ...theme.mixins.toolbar,
// // }));

// // const AppBar = styled(MuiAppBar, {
// //   shouldForwardProp: (prop) => prop !== 'open',
// // })(({ theme, open }) => ({
// //   zIndex: theme.zIndex.drawer + 1,
// //   transition: theme.transitions.create(['width', 'margin'], {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   ...(open && {
// //     marginLeft: drawerWidth,
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     transition: theme.transitions.create(['width', 'margin'], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //   }),
// // }));

// // const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
// //   ({ theme, open }) => ({
// //     width: drawerWidth,
// //     flexShrink: 0,
// //     whiteSpace: 'nowrap',
// //     boxSizing: 'border-box',
// //     ...(open && {
// //       ...openedMixin(theme),
// //       '& .MuiDrawer-paper': openedMixin(theme),
// //     }),
// //     ...(!open && {
// //       ...closedMixin(theme),
// //       '& .MuiDrawer-paper': closedMixin(theme),
// //     }),
// //   }),
// // );

// // const Dashboard = () => {
// //   const theme = useTheme();
// //   const [open, setOpen] = React.useState(false);
// //   const [activeComponent, setActiveComponent] = React.useState(null);
// //   const [username, setUsername] = useState('');

// //   useEffect(() => {
// //     // Fetch the username from the adminLogin table
// //     fetchUsername();
// //   }, []);

// //   const fetchUsername = async () => {
// //     try {
// //       const response = await axios.get('/adminUsername');
// //       setUsername(response.data);
// //     } catch (error) {
// //       console.error('Error fetching username:', error);
// //     }
// //   };

// //   const handleDrawerOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleDrawerClose = () => {
// //     setOpen(false);
// //   };

// //   const handleComponentChange = (component) => {
// //     setActiveComponent(component);
// //   };

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
// //       <AppBar position="fixed" open={open}>
// //         <Toolbar>
// //           <IconButton
// //             color="inherit"
// //             aria-label="open drawer"
// //             onClick={handleDrawerOpen}
// //             edge="start"
// //             sx={{
// //               marginRight: 5,
// //               ...(open && { display: 'none' }),
// //             }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Typography variant="h6" noWrap component="div">
// //             OneByte Admin
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>
// //       <Drawer variant="permanent" open={open}>
// //         <DrawerHeader>
// //           <IconButton onClick={handleDrawerClose}>
// //             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
// //           </IconButton>
// //         </DrawerHeader>
// //         <Divider />
// //         <List>
// //           <ListItem disablePadding onClick={() => handleComponentChange('AdminDashboard')}>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 <HomeIcon />
// //               </ListItemIcon>
// //               <ListItemText primary={"Dashboard"} />
// //             </ListItemButton>
// //           </ListItem>
// //           <ListItem disablePadding onClick={() => handleComponentChange('Report')}>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 <AssessmentIcon/>
// //               </ListItemIcon>
// //               <ListItemText primary={"Reports"} />
// //             </ListItemButton>
// //           </ListItem>
// //           <ListItem disablePadding onClick={() => handleComponentChange('Order')}>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 <BorderColorIcon/>
// //               </ListItemIcon>
// //               <ListItemText primary={"Orders"} />
// //             </ListItemButton>
// //           </ListItem>
// //           <ListItem disablePadding onClick={() => handleComponentChange('Menu')}>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 <FaBars />
// //               </ListItemIcon>
// //               <ListItemText primary={"Menu Management"} />
// //             </ListItemButton>
// //           </ListItem>
// //         </List>
// //         <Divider />
// //         <List className='User'>
// //           <ListItem disablePadding>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 <PersonIcon></PersonIcon>
// //               </ListItemIcon>
// //               <ListItemText primary={username} />
// //             </ListItemButton>
// //           </ListItem>
// //         </List>
// //       </Drawer>
// //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //         <DrawerHeader />
// //         <Typography paragraph>
// //           {activeComponent === 'AdminDashboard' && <AdminDashboard />}
// //           {activeComponent === 'Report' && <Report />}
// //           {activeComponent === 'Order' && <Order />}
// //           {activeComponent === 'Menu' && <Menu />}
// //         </Typography>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import PersonIcon from '@mui/icons-material/Person';
// import { FaBars } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// import Menu from './adminMenu';
// import Order from './adminOrder';
// import Report from './adminReport';
// import AdminDashboard from './adminBoard';
// import LogOut from './adminLogin'; // Import LogOut component
// import axios from 'axios';

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

// const Dashboard = () => {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [activeComponent, setActiveComponent] = React.useState(null);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     // Fetch the username from the adminLogin table
//     fetchUsername();
//   }, []);

//   const fetchUsername = async () => {
//     try {
//       const response = await axios.get('/adminUsername');
//       setUsername(response.data);
//     } catch (error) {
//       console.error('Error fetching username:', error);
//     }
//   };

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleComponentChange = (component) => {
//     setActiveComponent(component);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: 'none' }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             OneByte Admin
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           <ListItem disablePadding onClick={() => handleComponentChange('AdminDashboard')}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <HomeIcon />
//               </ListItemIcon>
//               <ListItemText primary={"Dashboard"} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding onClick={() => handleComponentChange('Report')}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <AssessmentIcon/>
//               </ListItemIcon>
//               <ListItemText primary={"Reports"} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding onClick={() => handleComponentChange('Order')}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <BorderColorIcon/>
//               </ListItemIcon>
//               <ListItemText primary={"Orders"} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding onClick={() => handleComponentChange('Menu')}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <FaBars />
//               </ListItemIcon>
//               <ListItemText primary={"Menu Management"} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding onClick={() => handleComponentChange('Logout')}>
//             <ListItemButton>
//               <ListItemIcon>
//                 <PersonIcon />
//               </ListItemIcon>
//             <ListItemText primary={"Logout"} />
//             </ListItemButton>
//           </ListItem>
//         </List>
//         <Divider />
//         <List className='User'>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <PersonIcon></PersonIcon>
//                 </ListItemIcon>
//             <ListItemText primary={username} />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Drawer>
//     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//       <DrawerHeader />
//       <Typography paragraph>
//         {activeComponent === 'AdminDashboard' && <AdminDashboard />}
//         {activeComponent === 'Report' && <Report />}
//         {activeComponent === 'Order' && <Order />}
//         {activeComponent === 'Menu' && <Menu />}
//       </Typography>
//     </Box>
//   </Box>
// );
// };

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

import Menu from './adminMenu';
import Order from './adminOrder';
import Report from './adminReport';
import AdminDashboard from './adminBoard';
import axios from 'axios';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch the username from the adminLogin table
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await axios.get('/adminUsername');
      setUsername(response.data);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleComponentChange = (component) => {
    if (component === 'Logout') {
      navigate('/adminLogout'); // Navigate to AdminLogout component
    } else {
      setActiveComponent(component);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            OneByte Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => handleComponentChange('AdminDashboard')}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleComponentChange('Report')}>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentIcon/>
              </ListItemIcon>
              <ListItemText primary={"Reports"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleComponentChange('Order')}>
            <ListItemButton>
              <ListItemIcon>
                <BorderColorIcon/>
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleComponentChange('Menu')}>
            <ListItemButton>
              <ListItemIcon>
                <FaBars />
              </ListItemIcon>
              <ListItemText primary={"Menu Management"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => handleComponentChange('Logout')}>
            <ListItemButton>
              <ListItemIcon>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List className='User'>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FaUserCircle />
              </ListItemIcon>
              <ListItemText primary={username} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          {activeComponent === 'AdminDashboard' && <AdminDashboard />}
          {activeComponent === 'Report' && <Report />}
          {activeComponent === 'Order' && <Order />}
          {activeComponent === 'Menu' && <Menu />}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
