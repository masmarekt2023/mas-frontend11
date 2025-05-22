import React, { useState } from "react";
import { Typography } from "@mui/material";
import { styles } from '../Styles'
import { slideIn,fadeIn,textVariant } from "../utils/Motion.js"
import { motion } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    "What is IEO and what is its purpose?",
    "How can I participate in an IEO?",
    "What role does blockchain technology play?",
    "Is the IEO platform safe for global usage?",
    "What happens after an IEO sale?",
    "What is special about this mission?",
    "What will users find in IEO tokens?",
    "What is the roadmap toward financial security?",
    "Is there any staking added for IEO token buyers?",
    "Where is the IEO being placed?",
  ];

  return (
    <div className={`min-h-screen bg-gideient-rotate p-8 text-white flex justify-center items-center flex-col ${styles.paddingX}`}>
         <motion.div 
        initial="hidden"
      whileInView="show"
      viewport={{once:true,amount:0.25}}
       variants={textVariant(.3)} className=' flex flex-col items-center  md:mt-10   h-full  mt- z-10 '>
 <Typography variant={"h2"} className=" text-center mb-6 text-white" sx={{fontSize:"55px"}}>FAQ</Typography>
        <motion.p  variants={fadeIn("","",0.1,1)}className="text-lg text-gray-400 text-center text-gray-300 mb-8">
          Frequently Asked Questions
        </motion.p>
       
 </motion.div>
       



        <div className="flex flex-wrap gap-4">
  {faqs.map((question, index) => (
    <div
      key={index}
      className="bg-black shadow-md p-4 rounded-lg md:w-[48%] w-full transition-all outline-none relative"
    >
      <button
        onClick={() => toggleAnswer(index)}
        className="flex justify-between items-center w-full text-left font-medium text-lg"
      >
        <span className="gradient-text">{question}</span>
        <span>{activeIndex === index ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out   ${
          activeIndex === index ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <div className="mt-4 text-gray-300">
          This is the answer to the question. (You can customize the answers
          here.)
        </div>
      </div>
    </div>
  ))}
</div>

   
    </div>
  );
};

export default FAQ;
