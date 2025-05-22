import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  IconButton
} from '@mui/material';
import {
  CheckCircle as CompletedIcon,
  Autorenew as InProgressIcon,
  Schedule as UpcomingIcon,
  AllInclusive as FutureIcon,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Digital marketplace launch and Testing the market",
    status: "completed",
    icon: <CompletedIcon />
  },
  {
    phase: "Phase 2",
    title: "Launch of Proof of Donation + certificate feature",
    status: "in-progress",
    icon: <InProgressIcon />
  },
  {
    phase: "Phase 3",
    title: "Integration of social network + smart delivery system",
    status: "upcoming",
    icon: <UpcomingIcon />
  },
  {
    phase: "Phase 4",
    title: "Expansion into gaming and international remittance services",
    status: "future",
    icon: <FutureIcon />
  }
];

const Roadmap = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const x = useTransform(scrollXProgress, [0, 1], ['0%', '-50%']);

  const scroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ 
      px: isMobile ? 2 : 6,
      py: 2,
      mx: 'auto',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Typography 
        variant="h2" 
        align="left"
        sx={{ 
          fontWeight: 800,
          mb: 3,
          fontSize: isMobile ? '2.2rem' : '2.5rem',
          background: 'white',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Roadmap
      </Typography>

      {!isMobile && (
        <>
          <IconButton 
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)'
              }
            }}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
          <IconButton 
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              zIndex: 2,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)'
              }
            }}
          >
            <ChevronRight fontSize="large" />
          </IconButton>
        </>
      )}

      <Box 
        ref={containerRef}
        sx={{ 
          display: 'flex',
          gap: 4,
          px: isMobile ? 2 : 4,
          py: 2,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': {
            display: 'none' // Hide scrollbar for Chrome/Safari
          },
          cursor: isMobile ? 'grab' : 'auto',
          '&:active': {
            cursor: isMobile ? 'grabbing' : 'auto'
          }
        }}
      >
        {roadmapItems.map((item, index) => (
          <Paper 
            key={index}
            elevation={3}
            sx={{
              minWidth: isMobile ? '85vw' : '400px',
              width:"100%",
              maxWidth:"400px",
              flexShrink: 0,
              p: 4,
              background:"linear-gradient(to top left,#900098,#4d0051)",
              borderRadius: '16px',
              borderLeft: `6px solid white`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[6]
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Box sx={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                bgcolor: "white",
                  
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 
                  item.status === 'completed' ? theme.palette.success.dark :
                  item.status === 'in-progress' ? theme.palette.warning.dark :
                  item.status === 'upcoming' ? theme.palette.info.dark :
                  theme.palette.secondary.dark
              }}>
                {item.icon}
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700 ,color:"white" }}>
                {item.phase}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 3, color: 'white', fontSize: '1.1rem' }}>
              {item.title}
            </Typography>

            <Chip 
              label={
                item.status === 'completed' ? 'Completed' :
                item.status === 'in-progress' ? 'In Progress' :
                item.status === 'upcoming' ? 'Coming Soon' :
                'Future Plan'
              }
              sx={{
                bgcolor: "white",
                color: 
                  item.status === 'completed' ? theme.palette.success.dark :
                  item.status === 'in-progress' ? theme.palette.warning.dark :
                  item.status === 'upcoming' ? theme.palette.info.dark :
                  theme.palette.secondary.dark,
                fontWeight: 600
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Roadmap;