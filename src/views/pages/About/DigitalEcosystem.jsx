import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Avatar
} from '@mui/material';
import {
  Person,
  School,
  SportsEsports,
  LocalMall,
  Group,
  Store
} from '@mui/icons-material';
import { Image } from '@mui/icons-material';

const ecosystemItems = [
  { icon: <Person />, text: "Content creators" },
  { icon: <School />, text: "Students and educators" },
  { icon: <SportsEsports />, text: "Game developers" },
  { icon: <LocalMall />, text: "Physical goods traders and producers" },
  { icon: <Group />, text: "Supportive users and service seekers" },
  { icon: <Store />, text: "Small and medium-sized digital businesses" }
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const DigitalEcosystem = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      px: isMobile ? 3 : 8,
      py: 4,
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <Grid container spacing={6} alignItems="center">
        {/* Left Column - Content */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                mb: 2,
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: "white"
              }}
            >
              🌐 Digital Ecosystem
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                color: 'rgb(139, 137, 137)'
              }}
            >
              MAS is more than a platform
              <br/>it's a dynamic digital ecosystem hosting:
            </Typography>

            <List sx={{ width: '100%' ,background:"linear-gradient(to top left,#900098,#4d0051)" ,px:2 ,borderRadius:"20px"}}>
              {ecosystemItems.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={itemVariants}
                  
                >
                    
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: '50px' }}>
                      <Avatar sx={{ 
                        bgcolor: "white",
                        color: '#4d0051',
                        width: 42,
                        height: 42
                      }}>
                        {item.icon}
                      </Avatar>
                    </ListItemIcon>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem' ,color:"white" }}>
                      {item.text}
                    </Typography>
                  </ListItem>
                  
                </motion.div>
              ))}
            </List>
          </motion.div>
        </Grid>

        {/* Right Column - Image */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src="/assets/Images/—Pngtree—business professional analyzing stock market_20116370.png" // Replace with your image path
              alt="Digital Ecosystem"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DigitalEcosystem;