import React, { useState } from 'react'
import { Nav_links } from "../constants/index"
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";




const Footer = () => {
  const [active, setactive] = useState('')

  return (
    <footer className='  p-12 text-center flex flex-col gap-6 bg-gideient text-white'>
      <h2 className=' text-2xl  '>Logo</h2>
      <ul className='list-none  sm:flex flex-row gap-10 justify-center items-center  '>
        {Nav_links.map((link) => {
          return (
            <li key={link.name} className={`${active === link.name ? "text-white" : "text-secondary"} hover:text-white  font-medium cursor-pointer`}
              onClick={() => {
                setactive(link.name)
              }
              }>
              <a href={`#${link.name}`}>{link.name}</a>
            </li>
          )

        }
        )}

      </ul>
      <div className=" gap-5 items-center justify-center imt-10">
          <div className="flex items-center justify-center gap-5">
          
          <div className="text-[#13eed4]  bg-[#17023C]  opacity-80 py-2 px-2 rounded-md cursor-pointer">
          <FaFacebook />
          </div>
          <div className="text-[#13eed4]  bg-[#17023C]  opacity-80 py-2 px-2 rounded-md cursor-pointer">
          <FaTwitter />
          </div>
          <div className="text-[#13eed4]  bg-[#17023C]  opacity-80 py-2 px-2 rounded-md cursor-pointer">
          <TfiLinkedin />
          </div>

          </div>
        
      
         </div>
  


      <p className=' text-[12px] '>Copyright © 2024 Mas devlopment.</p>

    </footer>
  )
}

export default Footer
