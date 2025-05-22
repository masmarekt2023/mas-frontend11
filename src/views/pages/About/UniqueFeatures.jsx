import React from 'react';
import { motion } from 'framer-motion';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';

const features = [
  {
    title: "Blockchain Economy",
    description: "Full blockchain-based internal and external financial transaction system",
    emoji: "⛓️"
  },
  {
    title: "Low Fees",
    description: "Ultra-low transaction fees (starting at 0.5%)",
    emoji: "💸"
  },
  {
    title: "Flexible Subscriptions",
    description: "Flexible subscription bundling system",
    emoji: "🔄"
  },
  {
    title: "Social Hub",
    description: "Social interface for interaction and reputation building",
    emoji: "💬"
  },
  {
    title: "Unified Marketplace",
    description: "Unified marketplace for digital goods, physical products, services, and games",
    emoji: "🛍️"
  },
  {
    title: "$MAS Rewards",
    description: "Reward and loyalty system using $MAS token",
    emoji: "🪙"
  }
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    transition: { duration: 0.3 }
  }
};

const UniqueFeatures = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box sx={{ 
      px: isMobile ? 2 : 6,
      py: 1,
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            fontSize: isMobile ? '2.2rem' : '2.5rem',
            background: `white`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
           What Makes MAS Unique?
        </Typography>
        
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ 
            mb: 6, 
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: 'rgb(139, 137, 137)'
          }}
        >
          MAS doesn't replicate traditional platforms—it redefines the creator-user relationship through:
        </Typography>
      </motion.div>
      
      <Grid 
        container 
        spacing={4} 
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        {features.map((feature, index) => (
          <Grid 
            item 
            key={index} 
            xs={12} 
            sm={6} 
            md={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minHeight: '350px'
            }}
          >
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '300px',
                maxHeight:"300px"
              }}
            >
              <Card 
                sx={{ 
                  width: '100%',
                  height: '100%',
                  minHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  background: `linear-gradient(to top right,#5f0064,#1d0033)`,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 12px 40px ${theme.palette.primary.light}40`
                  }
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: 4,
                  '&:last-child': { pb: 4 }
                }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: '4rem',
                      textAlign: 'center',
                      mb: 2,
                      lineHeight: 1
                    }}
                  >
                    {feature.emoji}
                  </Typography>
                  
                  <Typography 
                    variant="h3" 
                    component="h3"
                    sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      textAlign: 'center',
                      color:"white"
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1"
                    sx={{ 
                      textAlign: 'center',
                      color: 'white',
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UniqueFeatures;