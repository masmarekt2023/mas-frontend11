import React, { useEffect, useState } from "react";
import Typography from '../../../../component/ui/typography/typography';
import './Solutions.css'
import axios from "axios";
import Apiconfigs from '../../../../Apiconfig/Apiconfigs';
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";



const Solutions = () => {

  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 {/* const getLandingPageSectionsHandler = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: Apiconfigs.landingContentList,
      });
      if (res.data.statusCode === 200 && res.data.result.length > 0) {
        // Get only the first item (index 0) from the array
        setSectionData(res.data.result[1]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLandingPageSectionsHandler();
  }, []);*/}


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
 {/* if (!sectionData) return null;*/}

 const AnimatedBox = ({ children }) => {
    const [ref, inView] = useInView({
      threshold: 0.5,
      triggerOnce: true
    });
  
    return (
      <motion.div
        ref={ref}
        initial={{ 
          opacity: 0,
          x:  100 
        }}
        animate={{ 
          opacity: inView ? 1 : 0,
          x: inView ? 0 : 100 
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
<>
<AnimatedBox>
<Box className='HowWorks'
    component={motion.div}
                  animate={{
                    scale: [1, 1.009, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}>
<div className="HowWorks-content">
        <Typography component='headTitle'>Key Features</Typography>
                <h2 className="HowWorks-subtitle">Why MAS Stands Out</h2>

<Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"10px"} mt={2}>
                  <h2 className="HowWorks-section-title" style={{textAlign:"center" ,color:"white"}}> 
    Blockchain Transparency
          </h2>
           <h2 className="HowWorks-section-title" style={{textAlign:"center" ,color:"white"}}>Proof of Donation (PoD) </h2>
                      <h2 className="HowWorks-section-title" style={{textAlign:"center" ,color:"white"}}>Ultra-low Fees (0.5%) </h2>

           <h2 className="HowWorks-section-title" style={{textAlign:"center" ,color:"white"}}> Donation Certificates</h2>

           <h2 className="HowWorks-section-title" style={{textAlign:"center" ,color:"white"}}>Multi-Currency Support </h2>

           <h2 className="HowWorks-section-title" style={{textAlign:"center" ,color:"white"}}>Social & Matchmaking Tools </h2>
</Box>
        </div>
        

        
      


      <div className="HowWorks-image-container">
      <img 
          src={'assets/Images/15.jpg'} 
          alt={"How it works"} 
          className="HowWorks-image" 
        />     
         </div>
      </Box>
      </AnimatedBox>
</>
  )
}

export default Solutions
