import React from 'react'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import { Typography } from '@mui/material'
import Table from '../components/ui/Table'
import { motion } from "framer-motion";



const BusinessModel = () => {
  return (
    <div className='min-h-screen bg-black text-white relative text-center flex justify-center '>
      <div className='absolute left-0 hidden xl:block'>
        <img src={img3} alt=""  className='w-[400px] h-[300px]'/>
      </div>
      <motion.div  
         animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 360],
          borderRadius: [ "50%", "50%",],
      }}
      transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: 5,
          repeatDelay: 1,
      }}
      className='w-48  h-48 rounded-full bg-[#141228] text-center flex items-center justify-center absolute top-[-100px]  '

      >
          
        <div className='w-44 h-44 border-[#7E28C0] border-4 rounded-full flex items-center justify-center'>
            <Typography  variant={"h5"} className='text-white' sx={{fontSize:"25px"}}>Business Model</Typography>
        </div>
      
        </motion.div>
    
      <div className='w-[500px]  h-[500px] rounded-b-full clip-path-half-circle border-[#7E28C0] border-4 text-center flex items-center justify-center absolute top-[-280px]  '>
        
      </div>
      <div className='absolute right-0 top-[-200px] hidden xl:block'>
        <img src={img4} alt="" className='w-[300px] h-0px]'/>
      </div>

      <Table className="mt-40 over" />
    </div>
  )
}

export default BusinessModel
