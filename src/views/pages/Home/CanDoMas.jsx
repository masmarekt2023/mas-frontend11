import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import {
  School as EducatorsIcon,
  Palette as ArtistsIcon,
  SportsEsports as GameDevIcon,
  Favorite as CharityIcon,
  Work as ProfessionalsIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedCard = ({ children, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    delay: index * 100
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

const CanDoMas = () => {
  const features = [
    {
      icon: <EducatorsIcon fontSize="large" sx={{ color: "#4d0051" }} />,
      title: "Educators",
      description: "Deliver lessons and get paid in crypto"
    },
    {
      icon: <ArtistsIcon fontSize="large" sx={{ color: "#4d0051" }} />,
      title: "Artists",
      description: "Sell your creative work or offer perks"
    },
    {
      icon: <GameDevIcon fontSize="large" sx={{ color: "#4d0051" }} />,
      title: "Game Developers",
      description: "Monetize your game economy"
    },
    {
      icon: <CharityIcon fontSize="large" sx={{ color: "#4d0051" }} />,
      title: "Charities & NGOs",
      description: "Receive verified donations"
    },
    {
      icon: <ProfessionalsIcon fontSize="large" sx={{ color: "#4d0051" }} />,
      title: "Professionals",
      description: "Offer services and receive support"
    }
  ];

  return (
    <Box sx={{
      maxWidth: 1200,
      mx: 'auto',
      px: { xs: 2, sm: 3, md: 4 },
      py: 6,
      textAlign: 'center'
    }}>
      {/* Header Section */}
      <Typography variant="h3" component="h2" sx={{
        fontWeight: 700,
        color: 'white',
        mb: 2,
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
      }}>
        What You Can Do on MAS
      </Typography>
      
      <Typography variant="h5" component="h3" sx={{
        mb: 6,
        color: 'rgb(139, 137, 137)',
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
      }}>
        A Full Ecosystem for Digital Creativity & Giving
      </Typography>

      {/* Cards Grid */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <AnimatedCard index={index}>
              <Card sx={{
                height: '100%',
                background: "linear-gradient(to top right,#900098,#4d0051)",
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                },
                borderRadius: 3,
                boxShadow: 3
              }}>
                <CardContent sx={{
                  flexGrow: 1,
                  p: { xs: 2, sm: 3 },
                  textAlign: 'center'
                }}>
                  <Box sx={{
                    display: 'inline-flex',
                    p: 2,
                    mb: 2,
                    backgroundColor: 'primary.light',
                    borderRadius: '50%',
                    color: 'primary.contrastText'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h4" gutterBottom sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.4rem' },
                    color: "white"
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: 'white',
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                  }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CanDoMas;