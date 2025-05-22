import React from 'react'
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { slideIn } from "../utils/Motion.js"
import {SectionWrapper} from '../hoc'
const IeoSpecifics = () => {
  return (
   
  
    <div className={` min-h-screen  flex justify-between items-center  flex-wrap `}>
    


<motion.div   variants={slideIn('left', 'tween', 0.2, 1)} className='md:w-[45%] w-full text-center md:text-left'>
    <Typography variant="h3" className=" font-bold gradient-text mb-4" sx={{fontSize:"50px"}}>IEO Specifics</Typography>
         <Typography className="text-gray-300  mb-6">
           The token will be issued instantly to the buyer wallet address after the IEO sale.
           Staking rewards will be distributed quarterly.
         </Typography>
    </motion.div>
   



 <motion.div 
        variants={slideIn('right','tween',0.2,1)} className=' md:w-1/2  w-full'>
     
         {/* Token Specs Table */}
         <div className="p- rounded-lg mb-6 flex flex-col gap-3 transition-all duration-75">
           <h2 className="text-white font-bold mb-2  px-4">Token Specs</h2>
           <div className='flex text-white justify-between  button_gr py-3 rounded-md px-4 hover:opacity-60'>
             <p>Total supply:</p>
             <p>1,000,000</p>
 
           </div>
 
           <div className='flex text-white justify-between  button_gr py-3 rounded-md px-4 hover:opacity-60'>
             <p>TIEO price:</p>
             <p>1$0.10</p>
 
           </div>
 
           <div className='flex text-white justify-between  button_gr py-3 rounded-md px-4 hover:opacity-60'>
             <p>Hardcap:</p>
             <p>$100,000</p>
 
           </div>
 
         </div>
 
         {/* Proceeds Schedule Table */}
 
         <div className="p- rounded-lg mb-6 flex flex-col gap-3">
           <h2 className="text-white font-bold mb-2  px-4">Proceeds schedule</h2>
           <div className='flex text-white justify-between  button_gr py-3 rounded-md px-4 hover:opacity-60'>
             <p>Date:</p>
             <div className='flex justify-between gap-10'>
                 <p>Q1	</p>
                 <p>Q2</p>
                 <p>Q3</p>
             </div>
 
           </div>
 
           <div className='flex text-white justify-between  button_gr py-3 rounded-md px-4 hover:opacity-60'>
             <p>Token %:</p>
             <div className='flex justify-between gap-10'>
                 <p>25%</p>
                 <p>25%</p>
                 <p>50%
                 </p>
             </div>
 
           </div>
 
        
 
         </div>
 
       
 </motion.div>
     
     </div>
   

  
  )
}
export default SectionWrapper(IeoSpecifics,"IeoSpecifics"," bg-black   ") 


