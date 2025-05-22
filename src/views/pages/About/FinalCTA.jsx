import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const FinalCTA = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      sx={{
        maxWidth: 900,
        mx: 'auto',
        px: { xs: 1, md: 2 },
        py: { xs: 4, md: 6 },
        textAlign: 'center',
        background: `linear-gradient(to top right,#900098,#4d0051)`,
        borderRadius: '20px',
        color: 'white',
        mt: 4,
        boxShadow: 3
      }}
    >
      {/* Main Heading */}
      <Typography variant="h2" component="h2" sx={{
        fontWeight: 800,
        mb: 3,
        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
        lineHeight: 1.2,
        color: "white"
      }}>
       Ready to Join?
      </Typography>

      {/* Subheading */}
      <Typography variant="h5" component="p" sx={{
        maxWidth: 800,
        mx: 'auto',
        mb: 5,
        fontSize: { xs: '1rem', md: '1.2rem' },
        opacity: 0.9,
        color: "white"
      }}>
Open your wallet, create your account, and start building your professional and financial future within MAS.      </Typography>

      {/* CTA Buttons */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 3,
        mt: 4
      }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            px: 3,
            py: 1,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '50px',
            minWidth: 200,
            backgroundColor: "#2f0032"
          }}
        >
          Get Started
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{
            px: 3,
            py: 1,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '50px',
            minWidth: 200,
            borderWidth: 2,
            '&:hover': { borderWidth: 2 }
          }}
        >
          Learn More
        </Button>
      </Box>
    </MotionBox>
  );
};

export default FinalCTA;
