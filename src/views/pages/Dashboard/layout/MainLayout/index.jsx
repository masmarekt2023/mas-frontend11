import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// Material-UI
import { AppBar, Box, Toolbar, CssBaseline, styled, useTheme, useMediaQuery } from '@mui/material';
// Project Imports
import Header from './Header';
import Sidebar from './Sidebar';
import { SET_MENU } from '../../store/actions';
import { drawerWidth } from '../../store/constant';
import TopBar from '../../../../../layouts/TopBar/TopBar';
import Footer from '../../../../../layouts/Footer/Footer';

// Styled Component for Main Content
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create('margin', {
    easing: open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
    duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth - 20}px`,
  width: `calc(100% - ${drawerWidth}px)`,
  padding: '16px',
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: '10px',
  },
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);

  // Toggle Left Drawer
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  const isRtl = document.documentElement.dir === 'rtl';


  return (
    <>
      <Box sx={{ display: 'flex', padding: '0' }} dir='ltr'>
        <CssBaseline />

        {/* AppBar (Header) */}
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            background: (theme) => 'linear-gradient(to top, #640D5F, #38014e)',
            transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
          }}
        >
          {/* TopBar */}
          <Box>
          <TopBar
           
          /></Box>

          {/* Toolbar with Header */}
          <Toolbar>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          </Toolbar>
          <Sidebar
          drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />
        </AppBar>

        {/* Sidebar */}
       <Box sx={{padding:"130px" ,
       
        "@media(max-width:900px)":{
          padding:"0"
        }
       }}></Box>
        {/* Main Content */}
        <Main
          sx={{
            padding: '10px',
            backgroundColor: 'white',
            marginTop: '4rem', // Adjust based on AppBar height
          }}
          open={leftDrawerOpened}
        >
          {/* Outlet for Nested Routes */}
          <Outlet />
        </Main>
      </Box>

     
    </>
  );
};

export default MainLayout;