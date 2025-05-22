import React, { useEffect, useState ,useRef} from "react";
import AuctionPage from "../AuctionPage";
import BannerSection from "../BannerSection";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import LandingSection from "src/views/pages/Home/LandingSection/LandingSection";
import './Main.css'
import { Box } from "@mui/material";
import HowWorks from "../HowWorks/HowWorks";
import Solutions from "../Solutions/Solutions";
import Services from "../Services";
import { ButtonwithAnimation } from "../../../../component/ui/Button/button";
import { useTranslation } from 'react-i18next';
import DataLoading from "../../../../component/DataLoading";
import CookieConsent from "../../../../cookies/CookieConsent";
import RoadMap from "../RoadMap";
import CanDoMas from "../CanDoMas";



export default function Main() {
      const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
  
  const [state, setState] = useState({
    bannerDetails: [],
    bannerDuration: undefined,
    landingSections: [],
    staticSections: []
  });
  const { bannerDuration, bannerDetails, landingSections, staticSections } = state;
  const cacheRef = useRef({});
    const cacheRef1 = useRef({});


  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

   const getBannerContentHandler = async () => {
    const cacheKey = "cache-banner-content";
    const sessionData = sessionStorage.getItem(cacheKey);

    // 1. Check in-memory cache
    if (cacheRef.current[cacheKey]) {
      console.log("✅ Using in-memory cache for banner");
      updateState({ bannerDetails: cacheRef.current[cacheKey] });
      setIsLoading(false);
      return;
    }

    // 2. Check sessionStorage
    if (sessionData) {
      console.log("✅ Using sessionStorage cache for banner");
      const parsed = JSON.parse(sessionData);
      cacheRef.current[cacheKey] = parsed; // sync to memory
      updateState({ bannerDetails: parsed });
      setIsLoading(false);
      return;
    }

    // 3. Fetch fresh data
    console.log("⏬ Fetching fresh banner data from API");
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listBanner,
      });

      if (res.data.statusCode === 200) {
        const bannerDocs = res.data.result.docs;

        // Cache in memory and sessionStorage
        cacheRef.current[cacheKey] = bannerDocs;
        sessionStorage.setItem(cacheKey, JSON.stringify(bannerDocs));

        updateState({ bannerDetails: bannerDocs });
      }
    } catch (error) {
      console.error("❌ Error fetching banner content:", error);
    } finally {
      setIsLoading(false);
    }
  };

   const getBannerDuration = async () => {
    const cacheKey = "cache-banner-duration";
    const sessionData = sessionStorage.getItem(cacheKey);

    // 1. In-memory cache
    if (cacheRef1.current[cacheKey]) {
      console.log("✅ Using in-memory cache for banner duration");
      updateState({ bannerDuration: cacheRef1.current[cacheKey] });
      return;
    }

    // 2. Session storage cache
    if (sessionData) {
      console.log("✅ Using sessionStorage cache for banner duration");
      const parsed = JSON.parse(sessionData);
      cacheRef1.current[cacheKey] = parsed;
      updateState({ bannerDuration: parsed });
      return;
    }

    // 3. Fresh fetch
    console.log("⏬ Fetching fresh banner duration from API");
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.getBannerDuration,
      });

      if (res.data.statusCode === 200) {
        const duration = res.data.result;

        // Cache in both memory and sessionStorage
        cacheRef1.current[cacheKey] = duration;
        sessionStorage.setItem(cacheKey, JSON.stringify(duration));

        updateState({ bannerDuration: duration });
      }
    } catch (error) {
      console.error("❌ Error fetching banner duration:", error);
    }
  };

 {/* const getLandingPageSectionsHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.landingContentList,
      });
      if (res.data.statusCode === 200) {
        updateState({ landingSections: res.data.result });
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log("mm",landingSections)*/}
{/*
  async function getStaticSections() {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.staticSectionList,
      });
      if (res.data.statusCode === 200) {
        updateState({ staticSections: res.data.result });
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log("sta",staticSections)*/}

  useEffect(() => {
    getBannerDuration().catch(console.error);
    getBannerContentHandler().catch(console.error);
    {/*getLandingPageSectionsHandler().catch(console.error);*/}
    {/*getStaticSections().catch(console.error);*/}
  }, []);

  useEffect(() => {
    console.log(bannerDuration);
  }, [bannerDuration]);


  
  return (
    <Box className="home" 
   
    sx={{
     
      background: (theme) => theme.custom.PageBackGround,
     
    }}
   
    >

{isLoading ? (<>

 <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
        <DataLoading />
        </Box>
</>) :  (<>



  <Box>
    <CookieConsent/>

{bannerDetails.length > 0 && (
  <BannerSection
    bannerDetails={bannerDetails}
    bannerDuration={bannerDuration}
  />
)}

<Services/>


<AuctionPage staticSections={staticSections}/>

</Box>
</>)}




    </Box>
  );
}
