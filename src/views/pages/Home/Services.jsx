import React from "react";
import { Typography, Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

const Services = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'xl'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <AnimatedBox fromLeft={true}>
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
              minWidth: { md: '50%' }
            }}>
              <Box textAlign="center">
                <Typography sx={{
                  fontSize: { xs: "22px", sm: "25px" },
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0px 0px 10px white",
                  mb: 2
                }}>
                  How MAS Works
                </Typography>
              </Box>

              <Box textAlign="center" mb={4}>
                <Typography variant="h3" color='white' sx={{
                  fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem' },
                  lineHeight: 1.2
                }}>
                  A Smarter Way to Support, Create, and Earn
                </Typography>
              </Box>

              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: { xs: 'center', md: 'flex-start' },
                color: 'white',
                gap: '10px',
                px: { xs: 1, md: 0 }
              }}>
                <Typography variant="h4" sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1rem' },
                  fontWeight: 'bold',
                  textAlign: { xs: 'center', md: 'left' },
                  color:"white"
                }}>
                  1. Create Your Wallet-Linked Account: Seamless sign-up with MetaMask or Trust Wallet.
                </Typography>
                <Typography variant="h4" sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1rem' },
                  fontWeight: 'bold',
                  textAlign: { xs: 'center', md: 'left' },
                  color:"white"
                }}>
                  2. Choose a Role: Creator, Supporter, or Both.
                </Typography>       
                <Typography variant="h4" sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1rem' },
                  fontWeight: 'bold',
                  textAlign: { xs: 'center', md: 'left' },
                  color:"white"
                }}>
                  3. Donate, Sell, or Subscribe: Support creators through bundles, donations, or purchases.
                </Typography>      
                <Typography variant="h4" sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1rem' },
                  fontWeight: 'bold',
                  textAlign: { xs: 'center', md: 'left' },
                  color:"white"
                }}>
                  4. Earn and Track Everything Transparently: Every action is logged through Proof of Donation.
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
              height: { xs: '300px', md: '350px' },
              position: 'relative',
              zIndex: 3,
              p: { xs: 0, md: 0 }
            }}>
              <Box
                component="img"
                src={'assets/Images/22.jpg'}
                alt="How Works"
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

export default Services;