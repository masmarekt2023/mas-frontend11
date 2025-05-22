import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { 
  Box,
  Button,
  Typography,
  Slide
} from '@mui/material';

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(['cookie_consent']);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only show popup if cookie consent hasn't been given
    if (!cookies.cookie_consent) {
      setOpen(true);
    }
  }, [cookies.cookie_consent]);

  const handleAccept = () => {
    setCookie('cookie_consent', 'accepted', { 
      path: '/', 
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'strict'
    });
    setOpen(false);
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'declined', { 
      path: '/', 
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: 'strict'
    });
    setOpen(false);
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 9999,
           background: "rgba(0, 0, 0, 0.9)",
          p: 3,
          boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
          borderRadius:"0 50px 0 0"
        }}
      >
       
          <Box sx={{ 
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
          }}>
            <Typography variant="h4" color="#8200b5">
              Cookie Consent
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph color='white'>
            We use cookies to enhance your experience on our website. 
            By clicking "Accept", you agree to our use of cookies.
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 2
          }}>
            <Button 
              onClick={handleDecline} 
              color="secondary"  
              sx={{ color: "#8200b5" }}
            >
              Decline
            </Button>
            <Button 
              onClick={handleAccept} 
              variant="contained" 
              sx={{
                background: "#43005e",
                "&:hover": {
                  background: "#320046"
                }
              }}
            >
              Accept
            </Button>
          </Box>
        </Box>
    </Slide>
  );
};

export default CookieConsent;