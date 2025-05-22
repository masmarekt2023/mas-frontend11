
import React, { useState, useContext, useEffect ,useRef } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Pagination,
  Button ,
  Dialog,
  DialogTitle,
  DialogContent,TextField,Snackbar,InputAdornment,Input,Select
} from "@mui/material";  
import MuiAlert from '@mui/material/Alert';

import { makeStyles } from '@mui/styles';
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs"; 
import { UserContext } from "src/context/User"; 
import DataLoading from "src/component/DataLoading"; 
import NoDataFound from "src/component/NoDataFound"; 
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import Cardcourse from "../../../component/ui/Card/Cardcourse";
import { useTranslation } from 'react-i18next';
import 'src/layouts/TopBar/TopBar.css'
import { useInView } from 'react-intersection-observer';
import "src/views/pages/About/AboutUs.css"
import { Link ,useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Close icon from Ant Design
import { ArrowDropDown, ArrowUpward } from "@mui/icons-material";
import { motion } from "framer-motion";




const useStyles = makeStyles(() => ({
 
  container: {
    padding: "20px 0px",
  },
  heading: {
    padding: "1.5px 0 0",
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0.5px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "6.5px",
  },
  box: {
    paddingleft: "0",
    flexWrap: "inherit",
  },
  gridbox: {
    justifyContent: 'center',
    paddingleft: "0",

    
    // "@media(max-width:1280px)": {
    //   display: "flex",
    //   justifyContent: "center",
    //   transition: 'border 0.3s ease',
    // },

  },
  gridContainer: {


    justifyContent: 'center',

  }
  
}));

const Education = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allNFT2List, setAllNFT2List] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [currentContentIndex, setCurrentContentIndex] = useState(0);
    const intervalRef = useRef(null);
    const [open ,setOpen] = useState(false);
    const [value ,setValue] = useState('');
    const cacheRef = useRef({});
  

  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-sec');
    nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpen = () => {
     setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    intervalRef.current = setInterval(() => {
      setCurrentContentIndex(prev => (prev + 1) % contentData.length);
    }, 5000);
 }

 




 const RequestForm = () => {
         const [username ,setUsername] = useState(auth.userData?.userName);
         const [email , setEmail] = useState(auth.userData?.email);
         const [type ,setType] = useState('');
         const [message , setMessage ] = useState('');
         const [openSnackBar ,setOpenSnackBar ] = useState(false);
         const [snackbarMessage, setSnackbarMessage ] = useState('');
         const [snackbarSeverity, setSnackbarSeverity] = useState('success');
       

         const types = [
          'Instructor',
          'School',
          'University',
          'Educational Institution'
         ]
        
         const [openType ,setOpenType] = useState(false);
        
         const handleOpenType = () => {
          setOpenType(true);
         }
        
         const handleCloseType = () => {
          setOpenType(false);
         } 
        
         const handleSelectType = (type) => {
          setType(type);
          handleCloseType();
         }




       
         const handleSubmit = async (e) => {
           e.preventDefault();
        
       
         const formspreeEndpoint = 'https://formspree.io/f/xeoajvaq';
       
         const formData = new URLSearchParams();
         formData.append('username',username);
         formData.append('email', email);
         formData.append('type',type);
         formData.append('message', message);
       
       try {
         const response = await axios.post(formspreeEndpoint, formData ,{
           headers: {
             'Content-Type' : 'application/x-www-form-urlencoded',
           },
         });
         
         if(response.status === 200){
           setSnackbarMessage('Message sent successfully!');
           setSnackbarSeverity('success');
           setUsername('');
           setType('');
           setEmail('');
           setMessage('');
           console.log(response.data,"heeeeey");
         }
         else {
           setSnackbarMessage('Failed to send message. Please try again.');
           setSnackbarSeverity('error');
         }
       }
       
       catch(error){
         setSnackbarMessage('An error occurred. Please try again.');
         setSnackbarSeverity('error');
       } 
       
       finally {
         setOpenSnackBar(true);
       }
       
         };
       
       
       const handleCloseSnackbar = () => {
         setOpenSnackBar(false);
       };
       
       return (
         <Container maxWidth="sm">
           
           <form onSubmit={handleSubmit}>
           <TextField
               label={t("UserName")}
               type="username"
               fullWidth
               margin="normal"
               value={username}
               readOnly
               required
             />
          
             <TextField
               label={t("Email")}
               type="email"
               fullWidth
               margin="normal"
               value={email}
               readOnly
               required
               
             />
               <TextField
          label="Type"
          value={type}
          onClick={handleOpenType}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDown />
              </InputAdornment>
            )
          }}
          required
        />
             
             <TextField
               label={t("Tell us why you want to beacome an instructor")}
               fullWidth
               margin="normal"
               multiline
               rows={3}
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               required
             />
             <Button type="submit" variant="contained"  fullWidth sx={{backgroundColor:"#43005e",marginTop:"10px" ,"&:hover":{backgroundColor:"rgb(99, 0, 139)"}}}>
               {t("Submit")}
             </Button>
           </form>
       
           <Snackbar
               open={openSnackBar}
               autoHideDuration={6000}
               onClose={handleCloseSnackbar}
             >
              
             
               <MuiAlert
                 elevation={6}
                 variant="filled"
                 onClose={handleCloseSnackbar}
                 severity={snackbarSeverity}
               >
                 {snackbarMessage}
               </MuiAlert>
             </Snackbar>
       
           

             <Dialog open={openType} onClose={handleCloseType}>
<DialogTitle align="center" color="#2f0032" sx={{fontSize:"18px"}}>Select a type</DialogTitle>
<DialogContent>
          <Box display="flex" flexDirection="column">
           {types.map((type,index) => (
            <Button
            key={index}
            onClick={() => handleSelectType(type)}
            style={{ margin: "5px 0" ,color:" #2f0032"}}
            >
              {type}
            </Button>
           ))

           }
          </Box>
          </DialogContent>
    </Dialog>

         </Container>)
       
        }



const contentData = [
  {
    text1:"Choose The Courses That Match Your Mind",
    text2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl",
    image:"/assets/Images/edu.avif",
    btn:"Learn More",
    action: scrollToNextSection ,
  },
  {
    text1:"Become A Mas Instructor",
    text2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl",
    image:"/assets/Images/ins.avif",
    btn:"Become An Instructor",
    action: () => {navigate('/plans')},
  },
]

useEffect(() => {

  if(!open) {
  intervalRef.current = setInterval(() => {
    setCurrentContentIndex(prev => (prev + 1) % contentData.length);
  }, 4000); }

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [open,contentData.length]);

const [forceRender, setForceRender] = useState(0);

useEffect(() => {
  setForceRender(prev => prev + 1);
}, [currentContentIndex]);





const listAllNft2Handler = async () => {
    const cacheKey = `nftList_page_${page}`;

    // 1. Check sessionStorage for cached data
    const cachedSession = sessionStorage.getItem(cacheKey);
    if (cachedSession) {
        const parsed = JSON.parse(cachedSession);
        console.log("📦 Using cached NFT data from sessionStorage:", cacheKey);
        setAllNFT2List(parsed.docs);
        setPages(parsed.pages);
        setIsLoading(false);
        return;
    }

    // 2. Check useRef cache
    if (cacheRef.current[cacheKey]) {
        console.log("📦 Using cached NFT data from useRef:", cacheKey);
        const cached = cacheRef.current[cacheKey];
        setAllNFT2List(cached.docs);
        setPages(cached.pages);
        setIsLoading(false);
        return;
    }

    // 3. Fetch from API if no cache found
    try {
        console.log("🆕 Fetching NFT list via API for:", cacheKey);
        const res = await axios({
            method: "GET",
            url: Apiconfigs.listAllNft2,
            params: {
                page: page,
                limit: 10
            }
        });

        if (res.data.statusCode === 200) {
            setAllNFT2List(res.data.result.docs);
            setPages(res.data.result.pages);

            const cachedData = {
                docs: res.data.result.docs,
                pages: res.data.result.pages
            };

            // Cache the data
            sessionStorage.setItem(cacheKey, JSON.stringify(cachedData));
            cacheRef.current[cacheKey] = cachedData;
        }
    } catch (err) {
        console.log("❌ Error fetching NFT list:", err.message);
    } finally {
        setIsLoading(false);
    }
};


  useEffect(() => {
    if (auth.userData?._id && auth.userLoggedIn) {
      listAllNft2Handler();
    }
  }, [auth.userLoggedIn, auth.userData, page]);

  console.log("cor",allNFT2List)

  return (
    <Box className={classes.container}
    sx={{
     
      background: (theme) => theme.custom.PageBackGround,
     
    }}
    >
      {isLoading ? (
        <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
                                  <DataLoading />
                                  </Box>
      ) : (
        // <section>
        <Container maxWidth='xl'>

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
        style={{ display: 'block' ,transform:" scale(0.7)" }}
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
       Mas Courses
      </div>
    </div>
    </div>

    <div className="who-we-are-sec" key={`section-${forceRender}`} id="who-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
        <span className="who-text1" style={{textShadow:"1px 1px 14px rgb(255, 0, 242)"}}>{contentData[currentContentIndex].text1}</span>
        <span className="who-text2">{contentData[currentContentIndex].text2}</span>
     
        <Button 
      component={motion.button}
      onClick={contentData[currentContentIndex].action}
      variant="contained"
      animate={{
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      sx={{
        background: "#581454",
        '& span': {
          fontSize: "17px"
        }
      }}
    >
      <span>
        {contentData[currentContentIndex].btn}
        </span>
        </Button>
     
      </div>
      
      <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3}>
        <img 
          style={{
            display: "inline",
            width: "100%",
            borderRadius: "20px",
            transition: "opacity 0.5s ease-in-out"
          }} 
          src={contentData[currentContentIndex].image} 
          alt={contentData[currentContentIndex].text1}
        />
      </div>
    </div>


             

          {auth.userLoggedIn && auth.userData?._id && (
            <>
             
              {/* <Container maxWidth="xl"> */}
                {allNFT2List.length === 0 ? (
                  <Box align="center" mt={4} mb={5}>
                    <NoDataFound />
                  </Box>
                ) : (
                  ""
                )}
                <Grid 
                container 
                
               id="next-sec" 
                className={classes.gridContainer}>
                  {allNFT2List.map((data, i) => {
                    return (
                      <Grid
                      container
                      item
                      key={i}
                      xs={12}
                      sm={4}
                      md={3}
                      lg={2.2}
                mb={2}

                      className={classes.gridbox}
                    >
                      <Cardcourse data={data} />
                    </Grid>

                     
                    //   <Grid
                    //     item
                    //     key={i}
                    //     xs={12}
                    //     sm={6}
                    //     md={4}
                    //     lg={3}
                    //     className={classes.gridbox}
                    //     //onMouseEnter={() => setHoveredIndex(i)}
                    //   //onMouseLeave={() => setHoveredIndex(null)}
                    //  // style={hoveredIndex === i ? { border: '10px solid red' } : null}
                    //   >
                    //     <Coursecard
                    //       data={data}
                    //       index={i}
                    //       callbackFn={listAllNft2Handler}
                    //     />
                    //   </Grid>
                    );
                  })}
                </Grid>
              {/* </Container> */}
              <Box mb={2} mt={2} display="flex" justifyContent="center" dir="ltr">
                <Pagination
                    count={pages}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                    sx={{
                      "& .MuiPaginationItem-root": { color: "white" }, // Change text color
                      "& .MuiPaginationItem-page.Mui-selected": {  color: "grey" }, // Change selected color
                      "& .MuiPaginationItem-ellipsis": { color: "white" }, // Change ellipsis color
                    }}
                />
              </Box>
            </>
          )}
        </Container>

        // </section>
      )}


    <Dialog open={open} onClose={handleClose} disableScrollLock  fullWidth maxWidth="sm" PaperProps={{
  sx: {
    backgroundImage: 'url(/assets/Images/doodle2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  }
}}>
<DialogTitle sx={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center"}} color=" #43005e">
   <span style={{
              fontSize:"24px" ,fontWeight:"bold"
            }}>Become An Instructor</span>
            <div style={{fontSize:"20px",cursor:"pointer"}} onClick={handleClose}><AiOutlineClose/></div>
</DialogTitle>
<DialogContent>
  <Box sx={{
                       background:"rgba(255, 255, 255, 0.68)",
                       padding:"10px",
                       borderRadius:"20px"
                     }}>
<span style={{
              fontSize:"16px"
            }}>Send A Request To MASplatform Administration</span>
          
<RequestForm/>
<span style={{
              fontSize:"12px"
            }}>*Will respond in 3days maximum</span>
                     </Box>
</DialogContent>
    </Dialog>




    </Box>
  );
};

export default Education;
