import React, { useState, useEffect ,useRef } from "react";
import { Container, Box, Typography ,useTheme, useMediaQuery} from '@mui/material'
import { makeStyles } from '@mui/styles';
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { useNavigate ,Link } from "react-router-dom";
import "./style.css";
import SectionCard from "../../../component/ui/sectionCard/SectionCard";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import NFTSection from './NFT/NFTSection'
import { create } from "lodash";
import MostPopular from "./MostPopular";
import { useTranslation } from 'react-i18next';
import Cardbundle from "../../../component/ui/Card/Cardbundle";
import Services from "./Services";
import HowWorks from "./HowWorks/HowWorks";
import Solutions from "./Solutions/Solutions";
import FAQmodel from "../../../component/FAQmodel";
import { useInView } from "react-intersection-observer";
import "src/views/pages/About/FAQ.css"
import { motion } from 'framer-motion';
import CanDoMas from "./CanDoMas";
import Features from "./Features";
import TokenUtility from "./TokenUtility";
import RoadMap from "./RoadMap";
import FinalCTA from "./FinalCTA";

const AuctionPage = ({ staticSections }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [auctionList, setAuctionList] = useState([]);
  const [allNFTList, setAllNFTList] = useState([]);
  const [allNFT1List, setAllNFT1List] = useState([]);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const [isLoadingAuctions, setIsLaodingAuctions] = useState(false);
  const {t} = useTranslation();
  const auctionCacheRef = useRef({});
  const allNftCacheRef = useRef(null);
  const allNft1CacheRef = useRef(null);
  const userCacheRef = useRef(null);

      

  
const AnimatedItem = ({ children, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const auctionNftListHandler = async () => {
    const cacheKey = "cache-auction-nft-list";
    const sessionData = sessionStorage.getItem(cacheKey);

    setIsLaodingAuctions(true);

    // 1. Check in-memory cache
    if (auctionCacheRef.current[cacheKey]) {
      console.log("✅ Using in-memory cache for auction list");
      setAuctionList(auctionCacheRef.current[cacheKey]);
      setIsLaodingAuctions(false);
      return;
    }

    // 2. Check sessionStorage
    if (sessionData) {
      console.log("✅ Using sessionStorage cache for auction list");
      const parsed = JSON.parse(sessionData);
      auctionCacheRef.current[cacheKey] = parsed;
      setAuctionList(parsed);
      setIsLaodingAuctions(false);
      return;
    }

    // 3. Fetch fresh data from API
    console.log("⏬ Fetching fresh data from API");
    try {
      const res = await axios.get(Apiconfigs.allorder, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200 && res.data.result) {
        const result = res.data.result;

        // Save to both caches
        auctionCacheRef.current[cacheKey] = result;
        sessionStorage.setItem(cacheKey, JSON.stringify(result));

        setAuctionList(result);
      }
    } catch (err) {
      console.error("❌ Error fetching auction list:", err.message);
    } finally {
      setIsLaodingAuctions(false);
    }
  };


    const listAllNftHandler = async () => {
    const cacheKey = "listAllNft_page1_limit10";

    // Check sessionStorage
    const sessionData = sessionStorage.getItem(cacheKey);
    if (sessionData) {
      console.log("✅ listAllNft: Loaded from sessionStorage");
      const parsedData = JSON.parse(sessionData);
      setAllNFTList(parsedData);
      allNftCacheRef.current = parsedData;
      return;
    }

    // Check in-memory cache
    if (allNftCacheRef.current) {
      console.log("✅ Loaded from in-memory cache (useRef)");
      setAllNFTList(allNftCacheRef.current);
      return;
    }

    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listAllNft,
        params: {
          page: 1,
          limit: 10,
        },
      });

      if (res.data.statusCode === 200) {
        const docs = res.data.result.docs;
        console.log("📡 Fetched from API");

        // Save to state
        setAllNFTList(docs);

        // Save to in-memory cache
        allNftCacheRef.current = docs;

        // Save to sessionStorage
        sessionStorage.setItem(cacheKey, JSON.stringify(docs));
      }
    } catch (err) {
      console.log("❌ Error fetching NFT list:", err.message);
    }
  };


  const listAllNft1Handler = async () => {
    const cacheKey = "listAllNft1_page1_limit10";

    // Check sessionStorage
    const sessionData = sessionStorage.getItem(cacheKey);
    if (sessionData) {
      console.log("✅ listAllNft1: Loaded from sessionStorage");
      const parsedData = JSON.parse(sessionData);
      setAllNFT1List(parsedData);
      allNft1CacheRef.current = parsedData;
      return;
    }

    // Check in-memory cache
    if (allNft1CacheRef.current) {
      console.log("✅ listAllNft1: Loaded from in-memory cache (useRef)");
      setAllNFT1List(allNft1CacheRef.current);
      return;
    }

    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listAllNft1,
        params: {
          page: 1,
          limit: 10,
        },
      });

      if (res.data.statusCode === 200) {
        const docs = res.data.result.docs;
        console.log("📡 listAllNft1: Fetched from API");

        // Save to state
        setAllNFT1List(docs);

        // Save to in-memory cache
        allNft1CacheRef.current = docs;

        // Save to sessionStorage
        sessionStorage.setItem(cacheKey, JSON.stringify(docs));
      }
    } catch (err) {
      console.log("❌ listAllNft1: Error fetching data:", err.message);
    }
  };

    const getuser = async () => {
    const cacheKey = "latestUserList_Creator_limit10";

    // Check sessionStorage
    const sessionData = sessionStorage.getItem(cacheKey);
    if (sessionData) {
      console.log("✅ getuser: Loaded from sessionStorage");
      const parsedData = JSON.parse(sessionData);
      setUserListToDisplay(parsedData);
      userCacheRef.current = parsedData;
      return;
    }

    // Check in-memory cache
    if (userCacheRef.current) {
      console.log("✅ getuser: Loaded from in-memory cache (useRef)");
      setUserListToDisplay(userCacheRef.current);
      return;
    }

    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.latestUserList,
        params: {
          limit: 10,
          userType: "Creator",
        },
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200 && res.data.result.docs) {
        const docs = res.data.result.docs;
        console.log("📡 getuser: Fetched from API");

        // Save to state
        setUserListToDisplay(docs);

        // Save to in-memory cache
        userCacheRef.current = docs;

        // Save to sessionStorage
        sessionStorage.setItem(cacheKey, JSON.stringify(docs));
      }
    } catch (err) {
      console.log("❌ getuser: Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    auctionNftListHandler().catch(console.error);
    listAllNftHandler().catch(console.error);
    listAllNft1Handler().catch(console.error);
    getuser().catch(console.error);
    let resize = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);
    return () => clearTimeout(resize);
  }, []);

 
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

 const Categories = [
  {name:t("Art"),
   image:"/assets/Images/15.jpg"
  },
  {name:t("Sports"),
    image:"/assets/Images/14.jpg"
   },
   {name:t("Collectors"),
    image:"/assets/Images/5.jpg"
   },
   {name:t("Fashion"),
    image:"/assets/Images/17.jpg"
   },
   {name:t("Video"),
    image:"/assets/Images/22.jpg"
   },
   {name:t("Music"),
    image:"/assets/Images/1.jpg"
   },
   {name:t("Cars"),
    image:"/assets/Images/4.jpg"
   },
   {name:t("Coding"),
    image:"/assets/Images/6.jpg"
   },
   {name:t("Crypto"),
    image:"/assets/Images/7.jpg"
   },
   {name:t("Education"),
    image:"/assets/Images/2.jpg"
   },
   {name:t("Trading"),
    image:"/assets/Images/22.jpg"
   },
   {name:t("Analytics"),
    image:"/assets/Images/1.jpg"
   },
   {name:t("News"),
    image:"/assets/Images/5.jpg"
   },
   {name:t("Gaming"),
    image:"/assets/Images/6.jpg"
   },
   {name:t("Privacy"),
    image:"/assets/Images/7.jpg"
   },
   {name:t("Startups"),
    image:"/assets/Images/8.jpg"
   },
   {name:t("Web3"),
    image:"/assets/Images/10.jpg"
   },
   {name:t("Security"),
    image:"/assets/Images/11.jpg"
   },
   {name:t("Wallets"),
    image:"/assets/Images/12.jpg"
   },
   {name:t("Metaverse"),
    image:"/assets/Images/13.jpg"
   },
 ]

  return (
    <>
     
       {/*<Box className="how-sol">
      
      <HowWorks/>
    <Solutions/>
    
    </Box>*/}
    <CanDoMas/>
      {ServicesSection()}
    <Features/>
    {popularCategory()}
      {CreatorsSection()}
      {BundlesSection()}
      {ItemsSection()}
      {NFTsection()}
      
     <TokenUtility/>
      
     <RoadMap/>
     <FinalCTA/>
     
      {/*FAQ()*/}
     
    </>
  );

  function NFTsection() {
    const item = staticSections.find((i) => i?.title === "NFT");

    return (
      <Box>
     <NFTSection /> 
      
     </Box> 
    );
  }

  function BundlesSection() {
    const item = staticSections.find((i) => i?.title === "Bundles");
    return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Link to={"/bundles"}  style={{ textDecoration: "none", outline: "none" }}> <ButtonwithAnimation  >{t("Bundles")}</ButtonwithAnimation></Link>
    
    </div>


  {allNFTList.length !=0 && 
  <SectionCard   
  data={allNFTList}
  CardpersonalInfo
  Bundles
  
 
    
    /> 
  }
    
    </>
     
    );
  }

  function ServicesSection() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const services = [
    { img: "/assets/Images/1.jpg", text: "Bundles", link: "/bundles" },
    { img: "/assets/Images/edu.png", text: "Education", link: "/education" },
    { img: "/assets/Images/market.png", text: "MarketPlace", link: "/items" },
    { img: "/assets/Images/rwa.png", text: "RWA", link: "/items" },
    { img: "/assets/Images/30.jpeg", text: "Transfer", link: "/user-list" },
    { img: "/assets/Images/fund.webp", text: "Fundraise", link: "/Fundraise" },
  ];

  const getCardDimensions = () => {
    if (isSmall) return { width: '140px', height: '220px' };
    if (isMedium) return { width: '180px', height: '260px' };
    return { width: '220px', height: '280px' };
  };

  const getFontSize = () => {
    if (isSmall) return '1.5rem';
    if (isMedium) return '2rem';
    return '2rem';
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      mb: 6,
      px: 2
    }}>
      <Typography variant="h2" sx={{
        fontWeight: 700,
        color: 'white',
        mb: 4,
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        textAlign: 'center'
      }}>
        MAS Services
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { 
          xs: 'repeat(2, 1fr)', 
          sm: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(6, 1fr)' 
        },
        gap: { xs: 2, md: 3 },
        maxWidth: '1400px',
        width: '100%',
        padding: { xs: 2, md: 3 },
        background: "linear-gradient(to top right, #75017b, #3a013d)",
        borderRadius: "50px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
        margin: '0 auto'
      }}>
        {services.map((item, index) => (
          <AnimatedItem key={index} index={index}>
            <Link to={item.link} style={{ textDecoration: 'none' }}>
              <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '30px',
                height: getCardDimensions().height,
                transition: 'transform 0.3s ease-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  '& .service-overlay': {
                    opacity: 0.9
                  }
                }
              }}>
                <Box
                  component="img"
                  src={item.img}
                  alt={item.text}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <Box className="service-overlay" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(58,1,61,0.8))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.3s ease',
                  opacity: 0.7
                }}>
                  <Typography sx={{
                    color: 'white',
                    fontSize: getFontSize(),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    px: 1,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </AnimatedItem>
        ))}
      </Box>
    </Box>
  );}
  
  function ItemsSection() {
    const item = staticSections.find((i) => i?.title === "Bundles");
    return (
  <>
  
  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
    <Link to={"/items"}  style={{ textDecoration: "none", outline: "none" }}>  <ButtonwithAnimation> {t("Marketplace")}</ButtonwithAnimation></Link>
    
     </div>
      {allNFT1List.length !=0 && 
          (<SectionCard   
          data={allNFT1List}
          CardpersonalInfo
          
          Marketplace
          
         
            
            /> )
     
      }
  </>
     
    );
  }

  function CreatorsSection() {
    const item = staticSections.find((i) => i?.title === "Users");
    console.log("creator",item)
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Link to={"/creators"}  style={{ textDecoration: "none", outline: "none" }}>   <ButtonwithAnimation> {t("Creators")}</ButtonwithAnimation></Link>
          
          </div>

        {userListToDisplay.length !=0 && 
        <SectionCard   
        data={userListToDisplay}
        chat
        Creators
       
          Subscribe
          />
        }  
      
      </>
     
    );
  }


  {/*  */}
  function popularCategory() {
    return(
      <Box sx={{padding:"30px 150px", 
        "@media(max-width:1200px)":{
padding:"30px 200px"
      }, "@media(max-width:800px)":{
        padding:"30px 100px"
      }
      }} display="flex" flexDirection="column" alignItems="center">
        <Typography align="center" variant="h1" color="white">{t("Popular Categories")}</Typography>
        <Box mt={2} sx={{ background:"linear-gradient(to top right,#900098,#4d0051)",
        boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.5)",
        borderRadius:"20px", 
        }}>
        
        <Box mt={1} sx={{ display: "grid",
        gridTemplateRows: "repeat(2, 150px)", // 2 rows, each 100px tall
        gridTemplateColumns: "repeat(10, 1fr)", // 10 columns, equal width
        gap: "10px", // Spacing between items
        padding: "10px",
        "@media(max-width:1200px)":{
          gridTemplateColumns: "repeat(9, 1fr)", 
        },
        "@media(max-width:1100px)":{
          gridTemplateColumns: "repeat(7, 1fr)", 
        },
        "@media(max-width:1000px)":{
          gridTemplateColumns: "repeat(6, 1fr)", 
        },
        "@media(max-width:900px)":{
          gridTemplateColumns: "repeat(5, 1fr)", 
        },
        "@media(max-width:800px)":{
          gridTemplateColumns: "repeat(4, 1fr)",
          height:"400px" ,
          overflowY:"auto",
          scrollbarWidth: "none",  // For Firefox
          "&::-webkit-scrollbar": {
            display: "none"  // For Chrome, Safari, Opera
          },
          // Enable momentum scrolling on iOS
          WebkitOverflowScrolling: "touch",
          // Prevent content from being clipped
          overscrollBehavior: "contain"
        },
        "@media(max-width:700px)":{
          gridTemplateColumns: "repeat(3, 1fr)", 
        },
       
        
        }}>

    {Categories.map((category ,index) => (

<Box alignItems="center" display="flex" flexDirection="column" m={2} key={index} sx={{ "&:hover":{
            transform:"scale(1.1)",
            transition:"ease-out 500ms"
          }}}>
<img src={category.image} style={{objectFit:"cover" ,borderRadius:"50%",marginBottom:"10px",boxShadow:"2px 5px 10px rgba(0, 0, 0, 0.6)" , width:"70px", height:"70px"}} />
  <Typography color="white" sx={{fontWeight:"bold"}}>{category.name}</Typography>
</Box>
    ))}

        </Box>
        </Box>
      </Box>
    )
  }

  function FAQ() {
    
    const { ref: ref3,inView: inView3 } = useInView({
      threshold: 0.2, 
      triggerOnce: true, 
    });
  
    const { ref: ref4,inView: inView4 } = useInView({
      threshold: 0.01, 
      triggerOnce: true,  
    });



return(
  <>
 
 <div className="faq-sec">
    <div className={`faq-top ${inView3 ? 'animate' : ''}`} ref={ref3}>
      <span className='faq-title2'>Frequently Ask Questions.</span>
      <span className='faq-desc'>here some questions that you ask a lot about</span>
      <img className='questimg' src="\assets\Images\creator2.jpg" alt="" />
    </div>
    <div className={`faq-bottom ${inView4 ? 'animate' : ''}`} ref={ref4}>
<FAQmodel/>
 </div>
 </div>

  </>
)
  }


  
  

 

  

  
};

export default AuctionPage;

const useStyles = makeStyles(() => ({
  mas: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "32px",
    fontWeight: "700",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.51",
    letterSpacing: "normal",
    texAlign: "left",
    color: "#141518",
    marginTop: "0px",
  },
  LoginBox: {},
  sectionHeading: {
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "0px",
  },
  box: {
    flexWrap: "inherit",
  },
  gridbox: {
    "@media(max-width:1280px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
}));
