import React, {useState, useEffect ,useRef} from "react";
import {
    Container, Grid,
    Box,
    Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles';

import {useLocation, useParams} from "react-router";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import MetaverseCard from "./MetaverseCard";
import { ButtonwithAnimation } from "src/component/ui/Button/button";
import { useTranslation } from 'react-i18next';
import DataLoading from "../../component/DataLoading";
import "src/views/pages/About/AboutUs.css"
import { useInView } from 'react-intersection-observer';




import IMG1 from "./img/card 1.jpeg"
import IMG2 from "./img/card2.jpeg"
import IMG3 from "./img/card3.jpeg"
import IMG5 from "./img/card5.jpeg"
import IMG6 from "./img/card6.jpeg"
import { setLocale } from "yup";

const useStyles = makeStyles((theme) => ({

    title: {
        fontSize: "30px",
        fontWeight: "600",
        marginBottom: "10px",
        textAlign: "center",
        borderBottom: "solid 1px #e5e3dd",
        paddingBottom: "10px",
        color: "#141518",
        [theme.breakpoints.down("sm")]: {
            fontSize: "20px",
        },
    },
}));


export default function StaticPage() {
    var dataArray = [IMG1, IMG2, IMG3, IMG5, IMG6];

    const classes = useStyles();
    const location = useLocation();
    const {pageName} = useParams();
    let data = location.state?.data;
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
      const [isLoading, setIsLoading] = useState(true);
      const cacheRef = useRef({});
    const [datas, setdatas] = useState();
          const {t} = useTranslation();

            const { ref: ref2,inView: inView2 } = useInView({
                      threshold: 0.2, 
                      triggerOnce: true,
                    });
                  
                    const { ref: ref3,inView: inView3 } = useInView({
                      threshold: 0.2, 
                      triggerOnce: true, 
                    }); 
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        let isMounted = true;
        
       const fetchData = async () => {
    const cacheKey = `staticPage_${pageName}`;

    // 1. Try sessionStorage first
    const cachedSession = sessionStorage.getItem(cacheKey);
    if (cachedSession) {
        const parsed = JSON.parse(cachedSession);
        console.log("📦 Using cached static page from sessionStorage for:", cacheKey);
        if (isMounted) {
            setTitle(parsed.title);
            setContent(parsed.description);
            setIsLoading(false);
        }
        return;
    }

    // 2. Then try useRef cache
    if (cacheRef.current[cacheKey]) {
        console.log("📦 Using cached static page from useRef for:", cacheKey);
        const cached = cacheRef.current[cacheKey];
        if (isMounted) {
            setTitle(cached.title);
            setContent(cached.description);
            setIsLoading(false);
        }
        return;
    }

    // 3. Use provided prop `data` if available
    if (data) {
        console.log("🗃 Using passed-in static data for:", cacheKey);
        if (isMounted) {
            setTitle(data.title);
            setContent(data.html);
            setIsLoading(false);
        }
        return;
    }

    // 4. Otherwise, fetch from API
    try {
        console.log("🆕 Fetching static page via API for:", cacheKey);
        const res = await axios.get(`${Apiconfigs.viewStaticPage}?type=${pageName}`);

        if (res.data?.result && isMounted) {
            const { title, description } = res.data.result;
            setTitle(title);
            setContent(description);

            const cachedData = { title, description };
            sessionStorage.setItem(cacheKey, JSON.stringify(cachedData));
            cacheRef.current[cacheKey] = cachedData;
        }
    } catch (error) {
        console.error("❌ Error fetching static page:", error);
    } finally {
        if (isMounted) {
            setIsLoading(false);
        }
    }
};

        setIsLoading(true);
        fetchData();
    
        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, [data, pageName]); // Make sure to include all dependencies

    

    return (title && content) ? (
        <Box 
    sx={{
     padding:"20px 0",
      background: (theme) => theme.custom.PageBackGround,
     
    }}
    >

        {isLoading ? (
             <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
                           <DataLoading />
                           </Box>
        ) : ( 
        <Container maxWidth="xl" >

<div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"10px"
          }}
          className="bunner-animaton">
            <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src="/assets/Images/wave10.png" 
        alt="Description" 
        style={{ display: 'block' ,transform:" scale(0.7)"}}
      />
      <div style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         color: 'white',
         fontSize: '2.5rem',
          fontWeight:"bold",
         textShadow:"0px 0px 10px white"
       
      }}>
       {t(title)}
      </div>
    </div>
    </div>

    <div className="who-we-are-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
      <span className="who-text1">Discover Mas Metaverse</span>
      <span className="who-text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,</span>
        </div>
        
        <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3} >
          <img style={{
            display:"inline",
            width:"100%",
            borderRadius:"20px"
          }} 
          src="/assets/Images/bundles.jpg" alt="" />
        </div>
      </div>

             <div style={{display:"flex" ,flexDirection:"column",alignItems:"center", padding:"20px 40px"}}>
              <div style={{marginBottom:"20px"}}>
              <ButtonwithAnimation>{t(title)}</ButtonwithAnimation>  
              </div>
              <div>
            <Grid container spacing={2}>
                {dataArray.length > 0 ?
                    dataArray.map((data, i) => {
                        return <Grid
                        
                            item
                            key={i}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            className={classes.gridbox}
                        >
                            <MetaverseCard
                                data={data}
                                key={i}
                            />
                        </Grid>
                    })
                    : <div> {t("no Item")}</div>
                }
            </Grid>
            </div>
            </div>

        </Container>)}

       
        </Box>
    ) : (<Box padding='250px' display='flex' justifyContent='center' alignItems='center' sx={{
        background: (theme) => theme.custom.PageBackGround,

    }}>
        <DataLoading />
        </Box>)
}

/*
<MetaverseCard
                data={data}
                key={i}
              />
*/
