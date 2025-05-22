import React from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  
} from '@mui/material'
import HomeCard from "src/component/HomeCard";
import parse from "html-react-parser";
import { makeStyles } from '@mui/styles';
import  HowWorks from'../HowWorks/HowWorks'
import Solutions from '../Solutions/Solutions'

import './LandingSection.css'

export default function LandingSection({ item, index ,children}) {

 
  return (
    <Container  maxWidth="xl">
      <Box
     className={`LandingSection`} 
       
    sx={{
     
      background: (theme) => theme.custom.BoxBackGroundReseve
     
    }}
      
    >
      {index % 2 === 0 && <HowWorks title={item?.title} description={item?.description}  contents={item?.contents} img={item?.contentFile}/>}
      {index %2 ===1 &&  <Solutions title={item?.title}  description={item?.description} contentFile={item?.contentFile} />}
     {children}
   
      
    </Box>
    </Container>



  );


}


