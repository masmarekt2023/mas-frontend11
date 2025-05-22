import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent,CardActions, Button } from "@mui/material";

const Fundraise = () => {
  const navigate = useNavigate();
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Mock data for fundraisers
  const [fundraisers] = useState([
    {
      id: 1,
      title: "Education for Children",
      description: "Help us provide education to underprivileged children in rural areas",
      coverPhoto: "/assets/Images/edu.png",
      amount: 5000,
      raised: 3200,
      organizer: "Education Foundation",
      fullDescription: "This fundraiser aims to build schools and provide educational materials for children in remote villages who currently have no access to proper education facilities."
    },
    {
      id: 2,
      title: "Medical Relief Fund",
      description: "Support our mission to provide medical care to those in need",
      coverPhoto: "/assets/Images/market.png",
      amount: 10000,
      raised: 4500,
      organizer: "Health Care Initiative",
      fullDescription: "Our medical relief program provides free healthcare services, medicines, and surgeries to low-income families who cannot afford medical treatment."
    },
     {
      id: 3,
      title: "Animal Shelter Support",
      description: "Help us maintain our shelter and care for abandoned animals",
      coverPhoto: "/assets/Images/2.jpg",
      amount: 3000,
      raised: 1800,
      organizer: "Paws & Care"
    },
    {
      id: 4,
      title: "Community Development",
      description: "Funds for building community centers in underserved areas",
      coverPhoto: "/assets/Images/22.jpg",
      amount: 15000,
      raised: 9200,
      organizer: "Neighborhood Builders"
    },
    // Add more mock data as needed
  ]);

  const handleCardClick = (fundraiser) => {
    navigate('/FundDetails', { state: { fundraiser } });
  };

  return (
    <div style={{ background: "linear-gradient(to right,#280026,#4a004f)", minHeight: "100vh" }}>
      {/* Header Section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "25px", overflow: "hidden" }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src="/assets/Images/wave10.png"
            alt="Description"
            style={{ display: 'flex', transform: " scale(0.7)" }}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: "bold",
            textShadow: "0px 0px 10px white",
          }}>
            Fundraise
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="who-we-are-sec">
        <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
          <span className="who-text1">Welcome to MAS Fundraisers</span>
          <span className="who-text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,</span>
        </div>

        <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3}>
          <img style={{
            display: "inline",
            width: "100%",
            borderRadius: "20px"
          }}
            src="/assets/Images/bundles.jpg" alt="" />
        </div>
      </div>

      {/* Fundraisers Grid Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" sx={{ 
          color: "white", 
          mb: 4, 
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
        }}>
          Ongoing Fundraisers
        </Typography>

        <Grid container spacing={4}>
          {fundraisers.map((fundraiser) => (
            <Grid item xs={12} sm={6} md={4} key={fundraiser.id}>
              <Card 
                sx={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column",
                  borderRadius: "12px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    cursor: "pointer"
                  }
                }}
                onClick={() => handleCardClick(fundraiser)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={fundraiser.coverPhoto}
                  alt={fundraiser.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
                    {fundraiser.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {fundraiser.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Organizer:</strong> {fundraiser.organizer}
                  </Typography>
                  <Box sx={{ 
                    height: 8, 
                    backgroundColor: "#f0f0f0", 
                    borderRadius: 4, 
                    mb: 2,
                    overflow: "hidden"
                  }}>
                    <Box sx={{ 
                      height: "100%", 
                      width: `${(fundraiser.raised / fundraiser.amount) * 100}%`, 
                      backgroundColor: "#4a004f",
                      borderRadius: 4
                    }} />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2">
                      <strong>Raised:</strong> ${fundraiser.raised}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Goal:</strong> ${fundraiser.amount}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      backgroundColor: "#4a004f",
                      "&:hover": {
                        backgroundColor: "#280026"
                      },
                      px: 4,
                      py: 1,
                      borderRadius: "50px"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle direct donation without navigation
                      console.log("Donate to:", fundraiser.title);
    navigate('/FundDetails', { state: { fundraiser } });
                    }}
                  >
                    Donate Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Fundraise;