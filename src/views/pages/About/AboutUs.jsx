import "./AboutUs.css";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import DoCard from "./cards/DoCard";
import VisionCard from "./cards/VisionCard";
import ChooseCard from "./cards/ChooseCard";
import ContactUs from "./ContactUs";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { Typography ,Box,useMediaQuery ,useTheme , Card, CardContent,Grid,Collapse, } from "@mui/material";
import { styled } from '@mui/system';
import UniqueFeatures from "./UniqueFeatures";
import MarketplaceCarousel from "./MarketplaceCarousel";
import TechnicalInfrastructure from "./TechnicalInfrastructure";
import DigitalEcosystem from "./DigitalEcosystem";
import MembershipTiers from "./MembershipTiers";
import Roadmap from "./Roadmap";
import WhyMasNow from "./WhyMasNow";
import FinalCTA from "./FinalCTA";


export default function AboutUs() {
    const { t } = useTranslation(); 
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { ref: ref1, inView: inView1 } = useInView({
        threshold: 0.2, 
        triggerOnce: true, 
    });

    const { ref: ref2, inView: inView2 } = useInView({
        threshold: 0.2, 
        triggerOnce: true,
    });
    
    const { ref: ref3, inView: inView3 } = useInView({
        threshold: 0.2, 
        triggerOnce: true, 
    }); 

    const weDoContent = [
        { title: "Lorem ipsum dolor sit amet", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.", src: '/assets/Images/mobile_app.webp' },
        { title: "Lorem ipsum dolor sit amet", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.", src: '/assets/Images/bt-altyapi-donusumu-basari-metodolojisi-601x520-removebg-preview.webp' },
        { title: "Lorem ipsum dolor sit amet", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.", src: '/assets/Images/—Pngtree—business professional analyzing stock market_20116370.png' },
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);

    const whoWeText = [
        "In an era defined by accelerating digitization and the intersection of commerce, knowledge, and creativity, MAS was born as an advanced digital platform, pulsing with innovation and powered by blockchain. MAS is not just a tech project—it is a response to a profound global need: a space that empowers content creators, innovators, businesses, educational institutions, and charities, giving them the wings to thrive in a secure and decentralized digital ecosystem.",
        "We don't offer a single service; we're building a smart, integrated digital ecosystem that unites commerce with creativity, education with financial transactions, and services with real experiences—all through a unified, flexible, and seamless interface. No traditional intermediaries. Minimal cost.",
        "Because the future doesn't wait, MAS bridges the familiar world of Web2 and the decentralized universe of Web3. We provide traditional internet users with a welcoming and intuitive gateway to the digital industries of tomorrow. With a user-friendly experience and familiar design, we open the doors of the new economy to millions—allowing them to become active participants in this global transformation without technical or knowledge barriers."
    ];

      const missionCards = [
    {
      title: "Empowering Creators",
      content: "We are committed to empowering millions of individuals and startups around the world to shape their financial and creative futures using Web3 tools that grant them independence from traditional financial institutions.",
      color: "rgb(144, 0, 151)"
    },
    {
      title: "Digital Ecosystem",
      content: "We offer a fertile digital ground—built on smart contracts and cryptocurrency—where they can grow their ideas, sell their content and services, manage subscriptions, send and receive money effortlessly, and expand to borderless markets.",
      color: "rgb(144, 0, 151)"
    },
    {
      title: "Beyond a Platform",
      content: "MAS is not just a platform. It's a comprehensive economic system born from the heart of the global digital transformation, inviting all believers in creative freedom to join.",
      color: "rgb(144, 0, 151)"
    }
  ];

    useEffect(() => {
        if (isHovered) return; // Don't rotate text when hovered
        
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % whoWeText.length);
        }, 4000); // Change every 4 seconds
        
        return () => clearInterval(interval);
    }, [isHovered, whoWeText.length]);

    return (
        <>
            <div style={{background:"linear-gradient(to right,#280026,#4a004f)"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"25px", overflow: "hidden"}} className="bunner-animaton">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img 
                            src="/assets/Images/wave10.png" 
                            alt="Description" 
                            style={{ display: 'flex', transform:" scale(0.7)" }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            fontSize: '2.5rem',
                            fontWeight:"bold",
                            textShadow:"0px 0px 10px white",
                        }}>
                            About Us
                        </div>
                    </div>
                </div>

                <div className="who-we-are-sec">
                    <div 
                        className={`who-top-sec ${inView2 ? 'animate' : ''}`} 
                        ref={ref2}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <span className="who-title">WHO WE ARE</span>
                        <span className="who-text2" style={{maxWidth:"600px" ,color:"white"}}>
                            {whoWeText[currentTextIndex]}
                        </span>
                        <Link to="/login"> 
                            <button className="learn-btn">Learn More</button>
                        </Link>
                    </div>
                    
                    <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3}>
                        <img className='small-screen' src="/assets/Images/28.jpg" alt="" />
                        <img className='big-screen' src="/assets/Images/28.jpg" alt="" />
                    </div>
                </div>


 <div className="how-it-work-sec" style={{marginTop:"20px"}}>
                       
                        <div style={{
                           paddingBottom:"20px",
                            color: 'white',
                            fontSize: '2.5rem',
                            fontWeight:"bold",
                            textShadow:"0px 0px 10px white",
                        }}>
                <Typography
                  component={motion.div}  // or motion.span
                  className='how-title'
                  onClick={() => setIsExpanded(!isExpanded)}
                  sx={{ cursor: "pointer" ,fontSize:"40px",fontWeight:"bold" }}
                  animate={{
        scale: [1, 1.07, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
                  Our Vision 
                </Typography>
                        </div>
                        <>
                           <Box maxWidth="1000px" margin="0 auto" px={4}>
      
        
        <Box display="flex" flexDirection="column" gap={4} sx={{background:"linear-gradient(to top right,#900098,#4d0051)" ,padding:"20px" ,borderRadius:"20px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.5)"}}>
          <Typography 
            variant="h5" 
            component="p"
            sx={{
              fontWeight: "bold",
              lineHeight: 1.6,
              fontStyle: 'italic',
              color: "White",
              textAlign: 'center',
              fontSize: isMobile ? '1rem' : '1.3rem'
            }}
          >
            "To become the world's leading digital platform—not as a technical intermediary, but as a bridge that connects creators with their audience and redefines the meaning of value in the digital age."
          </Typography>
          
          <Box 
            sx={{ 
              borderLeft: `4px solid white`,
              pl: 4,
              py: 2,
              my: 2
            }}
          >
            <Typography 
              variant="body1" 
              component="p"
              sx={{
                fontWeight: 400,
                lineHeight: 1.8,
                color: "white",
                fontSize: isMobile ? '0.9rem' : '1.1rem'
              }}
            >
              We envision a future where talent is fairly rewarded, engagement is built on trust, and income is driven by creativity—not dominance or monopolization.
            </Typography>
            
            <Typography 
              variant="body1" 
              component="p"
              sx={{
                fontWeight: 400,
                lineHeight: 1.8,
                color: "white",
                mt: 2,
                fontSize: isMobile ? '0.9rem' : '1.1rem'
              }}
            >
              MAS aspires to be a mirror of a new era—one built on transparency, speed, and openness.
            </Typography>
          </Box>
        </Box>
      </Box>
                        </>
                    
                </div>


           <div className="how-it-work-sec">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img 
                            src="/assets/Images/wave10.png" 
                            alt="Description" 
                            style={{ display: 'flex', transform:" scale(0.7)" }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            fontSize: '2.5rem',
                            fontWeight:"bold",
                            textShadow:"0px 0px 10px white",
                        }}>
                             <Typography
                  component={motion.div}  // or motion.span
                  className='how-title'
                  onClick={() => setIsExpanded2(!isExpanded2)}
                  sx={{ cursor: "pointer" ,fontSize:"40px",fontWeight:"bold" }}
                  animate={{
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
                >
                  Our Mission {isExpanded2 ? '−' : '+'}
                </Typography>
                        </div>
                    </div>

                    <Collapse in={isExpanded2} timeout="auto" unmountOnExit>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ 
          
            px: isMobile ? 2 : 4,
            backgroundColor: 'transparent'
          }}>
            <Typography 
              variant="h2" 
              sx={{
                textAlign: 'center',
                mb: 4,
                color: "white",
                fontSize: isMobile ? '1rem' : '1.5rem',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              Discover our mission to revolutionize digital economies through decentralized technologies
            </Typography>

            <Grid container spacing={1} alignItems="stretch">
              {missionCards.map((card, index) => (
                <Grid i item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card sx={{ 
                      height: '100%',
                      borderLeft: `5px solid ${card.color}`,
                      borderRadius: '12px',
                      boxShadow: theme.shadows[2],
                      transition: 'box-shadow 0.3s',
                      background:"rgb(222, 222, 222)",
                      '&:hover': {
                        boxShadow: theme.shadows[6]
                      }
                    }}>
                       <CardContent sx={{ 
                        p: 4,
                        flexGrow: 1,  // Ensures equal height
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <Typography 
                          variant="h3" 
                          gutterBottom 
                          sx={{ 
                            fontWeight: 600,
                            color: card.color,
                            mb: 2
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            lineHeight: 1.7,
                            flexGrow: 1  // Makes text take remaining space
                          }}
                        >
                          {card.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Collapse>
                </div>  



                <UniqueFeatures/>    
                <MarketplaceCarousel/>
                <TechnicalInfrastructure/>
                <DigitalEcosystem/>
                <MembershipTiers/>
                <Roadmap/>
                <WhyMasNow/>
                <FinalCTA/>


               
            </div>
        </>
    )
}