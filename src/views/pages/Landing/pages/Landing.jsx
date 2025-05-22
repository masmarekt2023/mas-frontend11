
import { Typography } from "@mui/material";
import img1 from "../assets/Image_1.png"
import img2 from "../assets/Image_2.png"
import { slideIn, fadeIn, textVariant } from "../utils/Motion.js"
import { motion } from "framer-motion";
import CountdownTimer  from '../components/ui/CountdownTime.jsx'
import Button from "../components/ui/button.jsx";



const Landing = () => {
  return (
    <div className=' stars   min-h-screen text-center flex justify-center items-center rubik ' style={{background:"linear-gradient(to right,#260441,#2E044F)"}}>
      <div className='absolute bottom-[-75px] left-[-40px] hidden xl:block'>
        <img src={img1} alt="" className='w-[500px] h-[700px]' />
      </div>



      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={textVariant(.3)} className=' flex flex-col items-center  md:mt-10   z-10 '>


        <Typography variant="h1" className='xl:w-[60%] w-full   gradient-text ' sx={{fontSize:"69px"}}>Marvelous Agency of
          Support is adigithelL  platform that aims to help
          creatorst

        </Typography>

        <motion.p variants={fadeIn("", "", 0.1, 1)} className=' w-[70%] mx-auto mt-2 text-gray-400'>by helping them achieve more by matching them with potential clients and connecting with their audience. Based on blockchain technology, the mas platform will feature increased transparency, being at the same time very easy to use.</motion.p>
        <Typography className='text-[#734B91] my-3'>2-3rd December 2021</Typography>
     


        <CountdownTimer  />
        <Button >GET STARTED</Button>


      </motion.div>
      <div className='absolute bottom-[-50px] right-0 hidden xl:block  overflow-hidden '>
        <img src={img2} alt="" className='w-[400px] h-[500px]' />
      </div>
    </div>
  )
}

export default Landing
