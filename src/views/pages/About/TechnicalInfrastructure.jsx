import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import { 
  AccountBalanceWallet, 
  Code, 
  Link, 
  Verified 
} from '@mui/icons-material';

const infrastructureItems = [
  {
    title: "Binance Smart Chain",
    description: "Built on BSC (Binance Smart Chain) using BEP-20 tokens",
    icon: <Link fontSize="large" />
  },
  {
    title: "Smart Contracts",
    description: "Smart contracts automate all operations: donations, payments, distributions",
    icon: <Code fontSize="large" />
  },
  {
    title: "Wallet Integration",
    description: "Integrated with wallets like MetaMask and Trust Wallet",
    icon: <AccountBalanceWallet fontSize="large" />
  },
  {
    title: "Proof of Donation",
    description: "PoD mechanism to transparently document every act of support",
    icon: <Verified fontSize="large" />
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const TechnicalInfrastructure = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
         <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          align="center"
          sx={{ 
            fontWeight: 800,
            mb: 2,
            fontSize: isMobile ? '2rem' : '2.5rem',
            color: "white"
          }}
        >
          Technical Infrastructure
        </Typography>
        
        <Divider sx={{ 
          mb: 6, 
          width: '100px', 
          height: '4px', 
          background: "white",
          mx: 'auto'
        }} />
      </motion.div>
    <Box sx={{ 
      px: isMobile ? 3 : 4,
      py: 4,
      background: `linear-gradient(to top left,#900098, #4d0051)`,
      borderRadius: '16px',
      maxWidth: '1000px',
      mx: 'auto',
      my: 4
    }}>
     

      <Grid container spacing={4}>
        {infrastructureItems.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.div
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              style={{ height: '100%' }}
            >
              <Box sx={{
                height: '100%',
                p: 4,
                background: theme.palette.background.paper,
                borderRadius: '12px',
                borderLeft: `4px solid rgb(56, 0, 59)`,
                boxShadow: theme.shadows[2],
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                },
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: `#4d0051`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 1
                }}>
                  {item.icon}
                </Box>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    fontSize: isMobile ? '1.5rem' : '1.75rem'
                  }}
                >
                  {item.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 2,
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}
                >
                  {item.description}
                </Typography>
                
                <Box sx={{ mt: 'auto' }}>
                  <Chip 
                    label={`Feature ${index + 1}`} 
                    color="primary" 
                    size="small" 
                    sx={{ fontWeight: 600 ,background:"#4d0051"}} 
                  />
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default TechnicalInfrastructure;