import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  IconButton,
  Paper,
  Grid
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const marketplaceItems = [
  {
    title: "Digital Products",
    description: "Courses, e-books, designs, videos",
    image: "/assets/Images/2.jpg"
  },
  {
    title: "Physical Products",
    description: "Tools, clothing, supplies, electronics",
    image: "/assets/Images/22.jpg"
  },
  {
    title: "Professional Services",
    description: "Programming, editing, writing, design",
    image: "/assets/Images/12.jpg"
  },
  {
    title: "Game Content",
    description: "In-game tools, licenses, accounts",
    image: "/assets/Images/4.jpg"
  },
  {
    title: "Custom Subscriptions",
    description: "Exclusive access to future content",
    image: "/assets/Images/31.jpg"
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const MarketplaceCarousel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const paginate = (newDirection) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setPage([page + newDirection, newDirection]);
    }
  };

  const currentIndex = (page % marketplaceItems.length + marketplaceItems.length) % marketplaceItems.length;

  return (
    <Box sx={{ 
      px: isMobile ? 2 : 6,
      py: 8,
      maxWidth: '1400px',
      mx: 'auto',
      position: 'relative'
    }}>
      <Typography 
        variant="h2" 
        gutterBottom 
        align="left"
        sx={{ 
          fontWeight: 800, 
          mb: 2,
          fontSize: isMobile ? '2rem' : '2.5rem',
          color:"white"
        }}
      >
        🛒 Unified Digital Marketplace
      </Typography>
      
      <Typography 
        variant="h5" 
        align="left" 
        sx={{ 
          mb: 6, 
          fontSize: isMobile ? '1.1rem' : '1.5rem',
          color: 'rgb(139, 137, 137)'
        }}
      >
        A comprehensive marketplace offering:
      </Typography>

      <Box sx={{
        position: 'relative',
        height: isMobile ? '600px' : '400px',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '16px'
      }}>
        <AnimatePresence 
          custom={direction}
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <Paper elevation={6} sx={{
              height: '100%',
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <Grid container sx={{ height: '100%', flexDirection: isMobile ? 'row' : 'row' }}>
                {/* Image Section - Now visible on all screens */}
                <Grid item xs={12} md={6} sx={{
                  height: isMobile ? '50%' : '100%',
                  backgroundImage: `url(${marketplaceItems[currentIndex].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }} />
                
                {/* Content Section */}
                <Grid item xs={12} md={6} sx={{
                  height: isMobile ? '50%' : '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: isMobile ? 3 : 6,
                  background:"linear-gradient(to top left,#900098,#4d0051)"
                }}>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    color: "white",
                    fontSize: isMobile ? '1.8rem' : '2.4rem'
                  }}>
                    {marketplaceItems[currentIndex].title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ 
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    mb: 4,
                    color: 'white'
                  }}>
                    {marketplaceItems[currentIndex].description}
                  </Typography>
                  
                  <Typography variant="subtitle1" sx={{
                    color: "white",
                    fontStyle: 'italic'
                  }}>
                    {currentIndex + 1} of {marketplaceItems.length}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <IconButton
          onClick={() => paginate(-1)}
          sx={{
            position: 'absolute',
            left: '16px',
            top: isMobile ? '40%' : '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)'
            }
          }}
        >
          <ArrowBackIos />
        </IconButton>
        
        <IconButton
          onClick={() => paginate(1)}
          sx={{
            position: 'absolute',
            right: '16px',
            top: isMobile ? '40%' : '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)'
            }
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Dot Indicators */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
        gap: 1
      }}>
        {marketplaceItems.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              const direction = index > currentIndex ? 1 : -1;
              setPage([page + direction, direction]);
            }}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 
                "white" : 
                theme.palette.action.disabled,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MarketplaceCarousel;