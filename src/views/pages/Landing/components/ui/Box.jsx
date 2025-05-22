import React from 'react'
import { Typography } from '@mui/material'

const Box = ({title,descrption,icon}) => {
  return (
    <div className=' bg-[#141228] w-[330px] rounded-2xl transition-all shadow-md min-h-[380px] py-10 px-2 text-center flex flex-col gap-10 hover:border-2 border-[#7E28C0]'>
      <div className='text-center  flex justify-center text-[70px] text-white'>{icon}</div>
     <Typography variant={"h4"} className='gradient-text_box  h-[50px]' sx={{fontSize:"30px"}}>{title}</Typography>
     <Typography  className='text-white '>{descrption}</Typography>

    </div>
  )
}

export default Box
