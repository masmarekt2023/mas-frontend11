
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
import { useNavigate } from "react-router-dom";
import Cardcourse from "../../../../component/ui/Card/Cardcourse";



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

const Courses = () => {
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


  const courseMockData = [
   {
    _id: "12345",
    mediaUrl1: "/assets/Images/2.jpg", // or video URL
    courseName: "Sample Course",
    donationAmount: 30,
    coinName: "MAS",
    duration: "1 Month",
    details: "This is a sample course description",
    likesUsers: [], // array of user IDs who liked
    subscribers: [], // array of user IDs who subscribed
    userId: {
      _id: "user123",
      userName: "sampleUser",
      speciality: "Sample Speciality",
      profilePic: "https://example.com/profile.jpg"
    },
    userDetail: { // fallback if userId is not an object
      userName: "sampleUser",
      speciality: "Sample Speciality",
      profilePic: "https://example.com/profile.jpg"
    }
  },
    {
  _id: "course_web101",
  mediaUrl1: "/assets/Images/31.jpg",
  courseName: "Web Development",
  donationAmount: 50,
  coinName: "MAS",
  duration: "3 Months",
  details: "Learn HTML, CSS, JavaScript, React",
  likesUsers: ["user1", "user2", "user3"],
  subscribers: ["user4", "user5"],
  userId: {
    _id: "instructor_web",
    userName: "webMaster",
    speciality: "Full-Stack Developer",
    profilePic: "https://example.com/web-instructor.jpg"
  },
  userDetail: {
    userName: "webMaster",
    speciality: "Full-Stack Developer",
    profilePic: "https://example.com/web-instructor.jpg"
  }
},
 {
  _id: "course_art202",
  mediaUrl1: "/assets/Images/25.webp",
  courseName: "Digital Painting",
  donationAmount: 40,
  coinName: "MAS",
  duration: "2 Months",
  details: "Master Procreate and Photoshop for stunning digital artwork",
  likesUsers: ["user6", "user7"],
  subscribers: ["user8", "user9", "user10"],
  userId: {
    _id: "instructor_art",
    userName: "artGuru",
    speciality: "Digital Artist",
    profilePic: "https://example.com/art-instructor.jpg"
  },
  userDetail: {
    userName: "artGuru",
    speciality: "Digital Artist",
    profilePic: "https://example.com/art-instructor.jpg"
  }
},
{
  _id: "course_art202",
  mediaUrl1: "/assets/Images/react.png",
  courseName: "React JS 2025",
  donationAmount: 150,
  coinName: "MAS",
  duration: "1 Months",
  details: "Become Reactjs master in 30days or less",
  likesUsers: ["user6", "user7"],
  subscribers: ["user8", "user9", "user10"],
  userId: {
    _id: "instructor_art",
    userName: "Bader Altabbaa",
    speciality: "Digital Artist",
    profilePic: "https://example.com/art-instructor.jpg"
  },
  userDetail: {
    userName: "artGuru",
    speciality: "Digital Artist",
    profilePic: "https://example.com/art-instructor.jpg"
  }
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

   
<Box display={"flex"} justifyContent={"center"}>
 <Typography variant="h2" color="white">(Username) Courses
 </Typography>
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
        {courseMockData.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
            <Box onClick={() => {navigate("/courses-details?6818cc5361a61b5978e0ebf8")}}>
              <Cardcourse  data={course}/>
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

export default Courses;
