
import React, { useState, useContext, useEffect ,useRef } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Pagination,
  Button ,
 
} from "@mui/material";  

import { makeStyles } from '@mui/styles';
import DataLoading from "src/component/DataLoading"; 
import { useTranslation } from 'react-i18next';
import 'src/layouts/TopBar/TopBar.css'
import { useInView } from 'react-intersection-observer';
import "src/views/pages/About/AboutUs.css"
import { motion } from "framer-motion";
import CardCreators from "../../../../component/ui/Card/CardCreators";
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles(() => ({
 
  container: {
    padding: "20px 0px",
  },
  heading: {
    padding: "1.5px 0 0",
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0.5px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "6.5px",
  },
  box: {
    paddingleft: "0",
    flexWrap: "inherit",
  },
  gridbox: {
    justifyContent: 'center',
    paddingleft: "0",

    
    // "@media(max-width:1280px)": {
    //   display: "flex",
    //   justifyContent: "center",
    //   transition: 'border 0.3s ease',
    // },

  },
  gridContainer: {


    justifyContent: 'center',

  }
  
}));

const Education = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
   
  

  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });


  const creatorsMockData = [
    {
      _id: "creator1",
      profilePic: "/assets/Images/7.jpg",
      userName: "sarah_artist",
      name: "Sarah Johnson",
      speciality: "Digital Painter",
      likesUsers: ["user1", "user2", "user3"],
      followers: ["user4", "user5"]
    },
    {
      _id: "creator2",
      profilePic: "/assets/Images/22.jpg",
      userName: "mike_designs",
      name: "Michael Chen",
      speciality: "3D Animator",
      likesUsers: ["user1", "user6"],
      followers: ["user7", "user8", "user9", "user10"]
    },
    {
      _id: "creator3",
      profilePic: "/assets/Images/21.webp",
      userName: "emma_creates",
      name: "Emma Williams",
      speciality: "Illustrator",
      likesUsers: ["user2", "user5", "user7"],
      followers: ["user1", "user3"]
    },
    {
      _id: "creator4",
      profilePic: "/assets/Images/profile.jpg", // This will use the fallback image
      userName: "alex_arts",
      name: "Alex Taylor",
      speciality: "Graphic Designer",
      likesUsers: [],
      followers: ["user2", "user4", "user6"]
    }
  ];


  return (
    <Box className={classes.container}
    sx={{
     
      background: (theme) => theme.custom.PageBackGround,
     
    }}
    >
      {isLoading ? (
        <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
                                  <DataLoading />
                                  </Box>
      ) : (
        // <section>
        <Container maxWidth='xl'>

<div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"10px"
          }}
          className="bunner-animaton">
            <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src="/assets/Images/wave10.png" 
        alt="Description" 
        style={{ display: 'block' ,transform:" scale(0.7)" }}
      />
      <div style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         color: 'white',
         fontSize: '2.5rem',
          fontWeight:"bold",
         textShadow:"0px 0px 10px white"
       
      }}>
       Mas Education
      </div>
    </div>
    </div>

    <div className="who-we-are-sec"  id="who-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
        <span className="who-text1" style={{textShadow:"1px 1px 14px rgb(255, 0, 242)"}}>Become A Mas Instructor</span>
        <span className="who-text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl</span>
     
        <Button 
      component={motion.button}
      onClick={() => {navigate('/plans')}}
      variant="contained"
      animate={{
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      sx={{
        background: "#581454",
        '& span': {
          fontSize: "17px"
        }
      }}
    >
      <span>
        Become An Instructor
        </span>
        </Button>
     
      </div>
      
      <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3}>
        <img 
          style={{
            display: "inline",
            width: "100%",
            borderRadius: "20px",
            transition: "opacity 0.5s ease-in-out"
          }} 
          src={"/assets/Images/ins.avif"} 
          alt={"Become A Mas Instructor"}
        />
      </div>
    </div>
<Box display={"flex"} justifyContent={"center"}>
 <Typography variant="h2" color="white">Browse Through Our Educators</Typography>
</Box>
    <Box sx={{ 
  flexGrow: 1, 
  padding: 3,
  display: 'flex',
  justifyContent: 'center'
}}>
   
  <Grid 
    container 
    spacing={3}
    sx={{
      maxWidth: '1200px',
      width: '100%',
      justifyContent: 'center' // This centers the grid items as a group
    }}
  >
        {creatorsMockData.map((creator) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={creator._id}>
            <Box onClick={() => {navigate("/edu-courses")}}>
            <CardCreators 
              data={creator} 
            />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

                     

        
        </Container>

        // </section>
      )}


    




    </Box>
  );
};

export default Education;
