import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";
import { slideIn,fadeIn,textVariant } from "../utils/Motion.js"
import { motion } from "framer-motion";

const data = [
  { name: "Jan", Team: 10, Investors: 5, Advisors: 2 },
  { name: "Feb", Team: 15, Investors: 10, Advisors: 5 },
  { name: "Mar", Team: 20, Investors: 15, Advisors: 8 },
  { name: "Apr", Team: 25, Investors: 20, Advisors: 12 },
  { name: "May", Team: 30, Investors: 25, Advisors: 18 },
  { name: "Jun", Team: 35, Investors: 30, Advisors: 25 },
  { name: "Jul", Team: 40, Investors: 35, Advisors: 28 },
  { name: "Aug", Team: 45, Investors: 40, Advisors: 35 },
  { name: "Sep", Team: 50, Investors: 45, Advisors: 40 },
];

const VestingChart = () => {
  return (
    <div className="min-h-screen bg-black  flex justify-center items-center">
      <div className="w-full max-w-5xl flex-col gap-16 flex p-6 rounded-lg ">
      <motion.div 
        initial="hidden"
      whileInView="show"
      viewport={{once:true,amount:0.25}}
       variants={textVariant(.3)} className=' flex flex-col items-center  md:mt-10   h-full  mt- z-10 '>

       
 
        <Typography variant={"h2"} className="text-center text-white font-bold mb-4  gradient-text pb-10" sx={{fontSize:"60px"}}>
          Detailed Vesting Percentages
        </Typography>
        </motion.div >
        
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Team"
              stackId="1"
              stroke="#6b2b99"
              fill="#6b2b99"
            />
            <Area
              type="monotone"
              dataKey="Investors"
              stackId="1"
              stroke="indigo"
              fill="#B845E8"
            />
            <Area
              type="monotone"
              dataKey="Advisors"
              stackId="1"
              stroke="#d760f3"
              fill="#d760f3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VestingChart;
