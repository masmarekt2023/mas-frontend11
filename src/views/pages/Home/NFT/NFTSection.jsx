import React from "react";
import { Typography, Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from 'react-i18next';

const AnimatedBox = ({ fromLeft = true, children }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        x: fromLeft ? -100 : 100
      }}
      animate={{ 
        opacity: inView ? 1 : 0,
        x: inView ? 0 : (fromLeft ? -100 : 100)
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const NFTSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'xl'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="xl" sx={{ py: 1 }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <AnimatedBox fromLeft={false}>
          <Box
            component={motion.div}
            animate={{
              scale: [1, 1.001, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              background: "linear-gradient(to top right,#75017b,#3a013d)",
              marginTop: { xs: '10px', sm: '20px' },
              borderRadius: "50px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
              paddingTop: '0px',
              gap: '10px',
              position: "relative",
              width: '100%',
              maxWidth: isLargeScreen ? '1200px' : isMediumScreen ? '900px' : '100%',
            }}
          >
            <Box sx={{ 
              padding: { xs: '15px', md: '20px' },
              flex: 1,
              minWidth: { md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Box textAlign="center">
                 <Typography 
              component='h2'
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 1,
                color: 'white'
              }}
            >
              RWA
            </Typography>
              </Box>

              <Box textAlign="center" mb={4}>
                 <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                mb: 1,
                color: 'white'
              }}
            >
              Real World Assets
            </Typography>
              </Box>

              <Box textAlign="center">
                 <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                mb: 1,
                color: 'white'
              }}
            >
              Coming Soon..
            </Typography>
              </Box>
            </Box>
        
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: { md: '50%' },
              width: '100%',
              height: { xs: '300px', md: 'auto' },
              position: 'relative', 
              zIndex: 3,
              p: { xs: 0, md: 0 }
            }}>
              <Box
                component="img"
                src={'assets/Images/24.png'}
                alt="Real World Assets"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: { xs: '0 0 50px 50px', md: '50px' },
                  maxHeight: { md: '100%' }
                }}
              />
            </Box>
          </Box>
        </AnimatedBox>
      </Box>
    </Container>
  );
}

export default NFTSection;