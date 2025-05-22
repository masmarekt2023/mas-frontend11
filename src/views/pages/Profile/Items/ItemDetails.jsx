import {
  Box,
  Container,
  Dialog,
  IconButton,
  Grid,
  Typography,
 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect, useContext ,useRef } from "react";
import { UserContext } from "src/context/User";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import Loader from "src/component/Loader";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import CloseIcon from '@mui/icons-material/Close';
import { color } from 'framer-motion';
import { transform } from 'lodash';
import DataLoading from '../../../../component/DataLoading';

const useStyles = makeStyles((theme) => ({
  root: { background:"linear-gradient(to right, #280026,#4a004f)"
  },


}));

const currencies = [
  {
    value: "PUBLIC",
    label: "PUBLIC",
  },
  {
    value: "PRIVATE",
    label: "PRIVATE",
  },
];
export default function itemDetails() {
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  const location = useLocation();
  const classes = useStyles();
  const isLogin = !!sessionStorage.getItem("token");
  const [selectedFilter, setSelectedFilter] = useState({
    startDate: "",
    endDate: "",
    searchKey: "",
    type: "",
  });

  const [itemDetails, setitemDetails] = useState({});
  const [isVideo, setIsVideo] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [isLoadingBunldeView, setIsLoadingItemView] = useState(false);
  const [isLoadingConetent, setIsLoadingContent] = useState(false);
  const [isFilterTrue, setIsFilterTrue] = useState(false);
  const [bunfleId, setItemId] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(itemDetails?.mediaUrl1);
  const cacheRef = useRef({});
  const cacheRef1 = useRef({});
  

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...selectedFilter, [name]: value };
    setSelectedFilter(temp);
  };
  const clearFilterHandler = () => {
    setSelectedFilter({
      startDate: "",
      endDate: "",
      searchKey: "",
      type: "",
    });
    getItemContentListHandler(itemDetails?._id);
    setIsFilterTrue(false);
  };

  const getitemDetailsHandler = async (id) => {
  const cacheKey = `itemDetails_${id}`;

  // Check sessionStorage first
  const cachedSession = sessionStorage.getItem(cacheKey);
  if (cachedSession) {
    const parsed = JSON.parse(cachedSession);
    console.log("📦 Using cached sessionStorage data for item:", id);
    setitemDetails(parsed);
    setIsLoadingItemView(false);
    return;
  }

  // Check useRef cache
  if (cacheRef.current[cacheKey]) {
    console.log("📦 Using cached useRef data for item:", id);
    setitemDetails(cacheRef.current[cacheKey]);
    setIsLoadingItemView(false);
    return;
  }

  try {
    setIsLoadingItemView(true);
    const res = await axios({
      method: "GET",
      url: Apiconfigs.mynft1 + id,
    });

    if (res.data.statusCode === 200) {
      console.log("🆕 API call made for item details:", id);

      const itemData = res.data.result;
      setitemDetails(itemData);
      getItemContentListHandler(itemData._id);

      setIsLoadingItemView(false);

      // Cache to both sessionStorage and useRef
      sessionStorage.setItem(cacheKey, JSON.stringify(itemData));
      cacheRef.current[cacheKey] = itemData;

      const filterFunForCurrentSubscriber = itemData.subscribers?.filter((value) => {
        return value === auth?.userData?._id;
      });

      console.log("responseFilter---->>>", filterFunForCurrentSubscriber);
      if (filterFunForCurrentSubscriber[0]) {
        setIsSubscribed(true);
      }
    }
  } catch (error) {
    console.log(error);
    setIsLoadingItemView(false);
  }
};




const getItemContentListHandler = async (ItemId) => {
  const cacheKey = `itemContentList_${ItemId}_${selectedFilter.searchKey || ""}_${selectedFilter.startDate || ""}_${selectedFilter.endDate || ""}`;

  // Check sessionStorage first
  const cachedSession = sessionStorage.getItem(cacheKey);
  if (cachedSession) {
    const parsed = JSON.parse(cachedSession);
    console.log("📦 Using cached sessionStorage data for item content:", ItemId);
    setContentList(parsed);
    setIsLoadingContent(false);
    return;
  }

  // Check useRef cache
  if (cacheRef1.current[cacheKey]) {
    console.log("📦 Using cached useRef data for item content:", ItemId);
    setContentList(cacheRef1.current[cacheKey]);
    setIsLoadingContent(false);
    return;
  }

  try {
    setContentList([]); // Reset content list
    setIsLoadingContent(true);
    const res = await axios({
      method: "GET",
      url: Apiconfigs.ItemContentList,
      params: {
        nftId: ItemId,
        search: selectedFilter.searchKey ? selectedFilter.searchKey : null,
        fromDate: selectedFilter.startDate ? selectedFilter.startDate : null,
        toDate: selectedFilter.endDate ? selectedFilter.endDate : null,
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    });

    if (res.data.statusCode === 200) {
      console.log("🆕 API call made for item content list:", ItemId);

      const contentData = res.data.result.docs;
      setContentList(contentData);
      setIsLoadingContent(false);
      setIsFilterTrue(false);

      // Cache to both sessionStorage and useRef
      sessionStorage.setItem(cacheKey, JSON.stringify(contentData));
      cacheRef1.current[cacheKey] = contentData;
    }
  } catch (error) {
    console.log(error);
    setIsLoadingContent(false);
  }
};



  useEffect(() => {
    const ItemId = location.search.split("?");
    if (ItemId[1]) {
      getitemDetailsHandler(ItemId[1]);
      setItemId(ItemId[1]);
    }
  }, [location]);
  useEffect(() => {
    if (
      selectedFilter.startDate !== "" ||
      selectedFilter.endDate !== "" ||
      selectedFilter.searchKey !== "" ||
      selectedFilter.type !== ""
    ) {
      if (isFilterTrue) {
        getItemContentListHandler(itemDetails?._id);
      }
    }
  }, [selectedFilter, isFilterTrue]);

  useEffect(() => {
    if (itemDetails.mediaUrl) {
      setIsVideo(handleVideo(itemDetails.mediaUrl));
    }
  }, [itemDetails]);
  const subscribeNowHandler = async (isCheck) => {
    // if (parseFloat(auth?.userData?.masBalance) > 0) {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + bunfleId,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          auth.updateUserData();
          toast.success("You have subscribed successfully");
          getitemDetailsHandler(bunfleId);
          // if (callbackFn) {
          //   callbackFn()
          // }
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
        toast.error(err?.response?.data?.responseMessage);
      });
    // } else {
    //   toast.error('Your wallet balance is insufficient')
    // }

    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };
  const unSubscribeNowHandler = async () => {
    // const coinDetails = getCoinkDetails(data.coinName)
    setIsloading(true);
    await axios({
      method: "DELETE",
      url: Apiconfigs.unSubscription + bunfleId,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          setIsloading(false);
          auth.updateUserData();
          setIsSubscribed(false);
          toast.success("You have unsubscribed successfully.");
          getitemDetailsHandler(bunfleId);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const handleClickOpen = (imgUrl) => {
    setCurrentImg(imgUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <Box className={classes.root}>
    <Box>
      {isLoadingBunldeView ? (
       <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
              <DataLoading />
              </Box>
      ) : (

        <>
          <div style={{display:"flex" ,flexDirection:"column" ,alignItems:"center", justifyContent:"center" ,overflow: "hidden"}}   className="bunner-animaton">
   
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src="/assets/Images/wave10.png" 
            alt="Description" 
            style={{ display: 'flex' ,transform:" scale(0.7)"  }}
          />
          <div style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             color: 'white',
             fontSize: '2.5rem',
              fontWeight:"bold",
             textShadow:"0px 0px 10px white",
          }}
        >
                             {itemDetails?.itemName ? itemDetails?.itemName : ""}

          </div>
        </div>
    
        </div>
        <Container maxWidth="lg">
          <Box
            style={{ background: "url(/images/banner1.png)" }}
          ></Box>

          
          <Box sx={{display:"flex", alignItems:"center",padding:"20px", justifyContent:"space-between" , 
          "@media(max-width:750px)":{flexDirection:"column"
          }}}>

            <Box sx={{display:"flex" ,padding:"20px" ,alignItems:"center"}}>
              {isVideo ? (
                
                  <Box  sx={{width:"100%" ,height:"200px" ,border:"2px solid white", borderRadius:"20px"}}>
                    <ReactPlayer
                      url={itemDetails?.mediaUrl1}
                      playing
                      controls
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
            
              ) : (
                <Box sx={{width:"200px" ,height:"200px" ,border:"2px solid white", borderRadius:"20px",}}
                  //style={{ background: `url(${itemDetails?.mediaUrl})` }}
                 
                >
                  <img
                    src={itemDetails?.mediaUrl1}
                    style={{ width: "100%", height: "100%", borderRadius:"20px"}}
                  />
                </Box>
              )}
              
        <Box sx={{display:"flex" ,flexDirection:"column" ,alignContent:"center",padding:"20px"}}>
               
                <Typography variant="h2" sx={{color:"white" ,fontSize:"2rem",
                   "@media(max-width:750px)":{
                    fontSize:"1.4rem"
                   }
                }}>
                  {itemDetails?.itemName ? itemDetails?.itemName : ""}
                </Typography>
                
                <Box display="flex"
                    alignItems="center">
                <Typography variant="h5" sx={{color:"grey" ,fontSize:"1.2rem",
                   "@media(max-width:750px)":{
                    fontSize:"0.8rem"
                   }
                }}>Details:</Typography>&nbsp;
              
                 <Typography variant="h5" sx={{color:"grey",fontSize:"1.2rem",
                   "@media(max-width:750px)":{
                    fontSize:"0.8rem"
                   }
                 }}>
                  {itemDetails?.details ? itemDetails?.details : ''}
                </Typography> 
                </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <Typography variant="h5" sx={{color:"grey"}}>Price:</Typography>&nbsp;
                    <Typography variant="h5" sx={{color:"grey"}}>
                      {itemDetails?.donationAmount
                        ? itemDetails?.donationAmount
                        : "0"}
                      {itemDetails.coinName}
                    </Typography>
                  </Box>
               
              </Box>
              </Box>
            
            <Box >
              <Box
                onClick={() => setOpenBuy(true)}
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                sx={{padding:"15px", background: "rgba(255, 255, 255, 0.3)", borderRadius:"20px",    backdropFilter: "blur(24px)",
                    "@media(max-width:750px)":{
                      padding:"10px 100px",
                      marginTop:"20px"
                    }
                }}
              >
                <Typography variant="h2" sx={{color:"white"}}>
                  {itemDetails?.subscribers
                    ? itemDetails?.subscribers?.length
                    : "0"}
                </Typography>
                <Typography variant="h5" sx={{color:"white"}}>buyers</Typography>
              </Box>
            </Box>
          </Box>
        </Container>

        <Box sx={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  padding: "40px",
  "@media(max-width: 1000px)":{
    flexDirection:"row"
  }
 
}}>
  {/* Big Preview Image */}
  <Box sx={{
    width: "100%",
    maxWidth: "550px",
    height: "300px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
     "@media(max-width: 1000px)":{
      maxWidth:"350px",
      height:"250px"
     }
  }}>
    <img
      src={currentImg || itemDetails?.mediaUrl1}
      alt="Main preview"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </Box>

  {/* Thumbnail Grid */}
  <Box sx={{
   display:"flex",
   justifyContent:"center",
    gap: 2,
    width: "fit-content",
    backgroundImage: 'url(/assets/Images/doodle3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
    padding:"12px",
    borderRadius:"20px",   
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    "@media(max-width: 1000px)":{
      flexDirection:"column",
      padding:"5px"
    }

 
  }}>
    {Array.from({ length: 9 }).map((_, index) => {
      const mediaUrl = itemDetails?.[`mediaUrl${index + 1}`];
      if (!mediaUrl) return null;

      return (
        <Box
          key={index}
          sx={{
            aspectRatio: "1/1",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
            width:"90px",
            border: mediaUrl === currentImg ? "3px solid #8e19d2" : "3px solid #2f0032",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
              borderColor: "#8e19d2",
              
            },
            "@media(max-width: 1000px)":{
                width:"60px"
              }
          }}
          onClick={() => setCurrentImg(mediaUrl)}
        >
          <img
            src={mediaUrl}
            alt={`Thumbnail ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      );
    })}
  </Box>
</Box>
        </>
      )}
    </Box>


    


</Box>  </>
  );

  function handleVideo(url) {
    const videoFormats = [
      "mp4",
      "avi",
      "wmv",
      "mov",
      "mkv",
      "flv",
      "webm",
      "mpeg",
      "3gp",
      "ogv",
    ];
    const format = url.split(".").slice(-1)[0];
    return videoFormats.includes(format);
  }
}
