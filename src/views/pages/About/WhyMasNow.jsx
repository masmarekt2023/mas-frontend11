import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  Grid,
  Paper,
  Avatar,Divider
} from '@mui/material';
import {
  TrendingUp,
  MonetizationOn,
  Public,
  Hub
} from '@mui/icons-material';

const reasons = [
  {
    icon: <TrendingUp />,
    title: "Rising Demand",
    description: "Growing need for Web3 solutions in the Arab world",
    color: "primary"
  },
  {
    icon: <MonetizationOn />,
    title: "Financial Gap",
    description: "Lack of support for creators beyond platforms like Patreon",
    color: "secondary"
  },
  {
    icon: <Public />,
    title: "Bank-Free Model",
    description: "Ideal solution for countries with financial restrictions",
    color: "success"
  },
  {
    icon: <Hub />,
    title: "Unified Platform",
    description: "First to combine payments, marketplaces, games, and content on blockchain",
    color: "info"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  })
};

const WhyMasNow = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      px: isMobile ? 3 : 8,
      py: 4,
      maxWidth: '1400px',
      mx: 'auto'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          align="center"
          sx={{ 
            fontWeight: 700,
            mb: 2,
            fontSize: isMobile ? '2rem' : '2.5rem',
            color: "white"
          }}
        >
          Why MAS, Why Now?
        </Typography>
        <Divider sx={{ 
          width: '80px', 
          height: '4px', 
          bgcolor: "white",
          mx: 'auto',
          mb: 6
        }} />
      </motion.div>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Large featured card */}
        <Grid item xs={12} md={6}>
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            variants={cardVariants}
          >
            <Paper elevation={4} sx={{
              height: '100%',
              p: 4,
              borderRadius: '16px',
              background: `linear-gradient(135deg, #4d0051 0%,rgba(255, 255, 255, 0.58) 100%)`,
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700,
                mb: 3,
                fontSize: isMobile ? '1.8rem' : '2.2rem',
                color:"white"
              }}>
                The Perfect Timing
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: '1.2rem',
                mb: 3,
                color:"rgb(205, 205, 205)"
              }}>
                MAS arrives at the intersection of technological readiness and market demand
              </Typography>
              <Avatar sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: 'white',
                color: "#4d0051",
                mt: 'auto',
                alignSelf: 'flex-end'
              }}>
                <TrendingUp fontSize="large" />
              </Avatar>
            </Paper>
          </motion.div>
        </Grid>

        {/* Smaller cards grid */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={4} sx={{ height: '100%' }}>
            {reasons.map((reason, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  custom={index + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  variants={cardVariants}
                  style={{ height: '100%' }}
                >
                  <Paper elevation={3} sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    background:"linear-gradient(to top left,#900098,#4d0051)"
                  }}>
                    <Avatar sx={{ 
                      width: 50, 
                      height: 50, 
                      bgcolor: "white",
                      color: "#4d0051",
                      mb: 2
                    }}>
                      {reason.icon}
                    </Avatar>
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.4rem',
                      color:"white"
                    }}>
                      {reason.title}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: 'white',
                      fontSize: '1rem'
                    }}>
                      {reason.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ 
          height: '4px',
          background: `white    `,
          borderRadius: '2px'
        }}
      />
    </Box>
  );
};

export default WhyMasNow;