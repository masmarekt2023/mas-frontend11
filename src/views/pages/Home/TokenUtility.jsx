import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { 
  Bolt as PowerIcon,
  Percent as FeesIcon,
  SwapHoriz as SwapIcon,
  AccountTree as ChainIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TokenUtility = () => {
  const utilities = [
    { 
      icon: <PowerIcon color="white" sx={{ fontSize: "40px" }} />,
      text: "Power donations, bundles, purchases" 
    },
    { 
      icon: <FeesIcon color="white" sx={{ fontSize: "40px" }} />,
      text: "Reduced fees for holders" 
    },
    { 
      icon: <SwapIcon color="white" sx={{ fontSize: "40px" }} />,
      text: "Easy swapping with USDT/USDC" 
    },
    { 
      icon: <ChainIcon color="white" sx={{ fontSize: "40px" }} />,
      text: "Built on newest Chains" 
    }
  ];

  // Animation variants
  const leftBoxVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const rightBoxVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3 // Slight delay after left box
      }
    }
  };

  const [leftRef, leftInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [rightRef, rightInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <Box sx={{
      mx: 'auto',
      px: { xs: 3, md: 4 },
      py: { xs: 4, md: 4 },
      textAlign: 'center',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {/* Header */}
      <Typography variant="h3" component="h2" sx={{
        fontWeight: 'bold',
        color: 'white',
        mb: 1,
        fontSize: { xs: '1.6rem', md: '2rem' }
      }}>
        $MAS Token Utility & Incentives
      </Typography>
      
      <Typography variant="h5" component="h3" sx={{
        mb: { xs: 3, md: 4 },
        color: 'rgb(139, 137, 137)',
        fontSize: { xs: '1.25rem', md: '1.5rem' }
      }}>
        The MAS Token: Fueling the Ecosystem
      </Typography>

      {/* Content Boxes */}
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} 
        sx={{ flexDirection: { xs: "column", md: "row" } }}>
        {/* Left Box - Slides from left */}
        <motion.div
          ref={leftRef}
          initial="hidden"
          animate={leftInView ? "visible" : "hidden"}
          variants={leftBoxVariants}
          style={{ flex: 1 }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 550,
            mx: 'auto'
          }}>
            <List sx={{ width: '100%' }}>
              {utilities.map((utility, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 2
                        }}>
                          <Box sx={{ 
                            display: 'inline-flex',
                            p: 1,
                            bgcolor: '#4d0051',
                            borderRadius: '20%',
                            color: 'primary.contrastText'
                          }}>
                            {utility.icon}
                          </Box>
                          <Typography variant="h3" component="span" sx={{ 
                            fontWeight: 600,
                            textAlign: 'left',
                            color: "white",
                            fontSize: { xs: '1.25rem', md: '1.5rem' } // Adjusted for better responsiveness
                          }}>
                            {utility.text}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < utilities.length - 1 && (
                    <Divider sx={{ 
                      my: 1,
                      mx: 'auto',
                      width: '80%',
                      bgcolor: 'divider'
                    }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </motion.div>

        {/* Right Box - Slides from right */}
        <motion.div
          ref={rightRef}
          initial="hidden"
          animate={rightInView ? "visible" : "hidden"}
          variants={rightBoxVariants}
          style={{ flex: 1 }}
        >
          <Box sx={{
            flex: 1,
            maxWidth: '100%',
            paddingLeft: { xs: 0, md: 4 },
            paddingTop: { xs: 4, md: 0 },
            width: '100%'
          }}>
            <img 
              style={{
                width: "100%",
                borderRadius: "20px",
                display: "block",
                maxWidth: 550,
                margin: "0 auto"
              }} 
              src="/assets/Images/bundles.jpg" 
              alt="MAS Token Utilities" 
            />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default TokenUtility;