import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
//import { Button } from "../components/ui/button";
import { styles } from "../Styles";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";
import { MdMenu } from "react-icons/md";
import { Nav_links } from "../constants";
import Button from "../components/ui/button";





const NavBar = () => {
    const [openList, setOpenList] = useState(false);
    console.log(openList)
    return (
  
      <div className={`p-5  ${styles.paddingX}    `} style={{background:"linear-gradient(to right,#260441,#2E044F)"}}>
        <div className="flex justify-between items-center py-2  text-white">
          <div className="flex gap-10">
            <p> Logo</p>
            {/* <Logo /> */}
            <ul
              className={`absolute flex flex-col items-start ps-5 shadow-md lg w-full left-0 py-5 gap-x-9 gap-y-3 z-[55] transition-all duration-300 ease-in text-myGray-600 text-white
                                  lg:static lg:flex-row lg:items-center lg:pe-0 lg:shadow-none lg:w-auto lg:h-auto lg:py-0 raleway
                                  ${openList ? " top-16 " : " top-[-490px] "}`}
            >
              {Nav_links.map((link) => (
                <NavLink to={link.to} key={link.to} className={"hover:text-[#bb52dc] transition-all duration-500 "}>
                  {link.name}
                </NavLink>
              ))}
              <li className="">
                {/* <MultiLangDropdown /> */}
              </li>
  
            </ul>
          </div>
  
          <div className=" gap-5 items-center hidden xl:flex">
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
  
            <Link to="/" className="hidden xl:block">
  
              <Button>APPLICATION TEST</Button>
            </Link>
          </div>
  
          <div
            onClick={() => {
              setOpenList(!openList);
            }}
            className="lg:hidden cursor-pointer text-4xl"
          >
            <MdMenu name={openList ? "close" : "menu"} />
  
          </div>
        </div>
      </div>
  
    );
  };
  export default NavBar;