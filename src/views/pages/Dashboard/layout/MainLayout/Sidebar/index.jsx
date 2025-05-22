import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuCard from './MenuCard';
import MenuList from './MenuList';
// import LogoSection from '../LogoSection';
import Chip from '../../../ui-component/extended/Chip';

import { drawerWidth } from '../../../store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <PerfectScrollbar
    component="div"
    style={{
      height: 'calc(100vh - 170px)', // ارتفاع مناسب
       // لتغطية ارتفاع drawer بالكامل
    }}
  >


      <Box sx={{ display: { xs: 'block', md: 'none' }  }}>
        <Box>
        
        </Box>
      </Box>
      <BrowserView>
        {/* <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        > */}
        <Box
        style={{
          height:"100vh",
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
        >
        <MenuList />

        </Box>
         
         
         
        {/* </PerfectScrollbar> */}
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          {/* <MenuCard /> */}
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={import.meta.env.VITE_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </Box>
      </MobileView>
      </PerfectScrollbar>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
            
            <Box component="nav" sx={{ flexShrink: { md: 0 }, paddingBottom: '0px',  width: matchUpMd ? drawerWidth : 'auto'
    ,  }} aria-label="mailbox folders">
      <Drawer
  container={container}
  variant={'persistent'}
  anchor="left"
  open={drawerOpen}
  onClose={drawerToggle}
  sx={{
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      background: (theme) => "linear-gradient(to bottom, #640D5F, rgb(1, 15, 78))",
      color: 'white !important',
      borderRight: 'none',
      height: 'calc(100vh )', // ارتفاع مناسب
      position:"absolute",
      top:"100%"
    }
  }}
  ModalProps={{ keepMounted: true }}
>
  
    {drawer}
  {/* </PerfectScrollbar> */}
</Drawer>
      
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;


