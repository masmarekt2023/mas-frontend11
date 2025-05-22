import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Input,
  MenuItem,
  Select,
  Collapse,
} from '@mui/material';
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useContext ,useRef} from "react";
import { UserContext } from "src/context/User";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import All from "./All";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import Loader from "src/component/Loader";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import DataLoading from '../../../../component/DataLoading';

const useStyles = makeStyles((theme) => ({
  root: {background:"linear-gradient(to right, #280026,#4a004f)"
   },
  bannerimg: {
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "100% !important",
    backgroundRepeat: " no-repeat !important",
    height: "100px",
    borderRadius: "10px",
    "@media(max-width:1010px)": {
      height: "140px",
      borderRadius: "25px",
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },
  subsection: {
    display: "flex",
    justifyContent: "start",
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
  text1: {
    marginLeft: "16px",
    "@media(max-width:375px)": {
      marginTop: "5px",
      marginLeft: "0px",
    },
    "& h4": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "40px",
      lineHeight: "130%",
      "@media(max-width:1010px)": {
        fontSize: "30px",
      },
      "@media(max-width:930px)": {
        fontSize: "25px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#000",
    },
  },
  whitebox: {
    background: "rgba(255, 255, 255, 0.61)",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },

  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  file: {
    padding: "10px 10px 10px 10px",
    // background: "#FCF2FA",
    borderRadius: "50%",
  },

  boxsection: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "40px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
      textAlign: "center",
    },
  },
  box3: {
    display: "flex",
    alignItems: "center",
    paddingTop: "13px",
    "& h6": {
      color: "#C6BECC",
      marginLeft: "10px",
      paddingBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "12px",
      },
    },
  },
  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: " #D200A5",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  btnbox1: {
    "@media(max-width:818px)": {
      marginTop: "5px",
    },
    "& Button": {
      margin: "5px",
    },
    "& h6": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  price: {
    paddingBottom: "11px",
    "& h6": {
      fontWeight: "bold",
      fontSize: "10px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  box4: {
    backgroundColor: "#FCF2FA",
    borderRadius: "16px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },
  socialMediaIcon: {
    fontSize: "30px",
    color: "#C6BECC",
  },
  btnfollow2: {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(24px)",
    borderRadius: "10px",
    marginRight: "10px",
    padding: "15px 15px",
    
    "@media(max-width:818px)": {
      padding: "6px 16px",
    },
    "& h2": {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "28px",
      lineHeight: "130%",
      textAlign: "center",
      color: "#FFFFFF",
      "@media(max-width:818px)": {
        fontSize: "18px",
      },
    },
    "& h5": {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
      color: "#FFFFFF",
      textAlign: "center",
      "@media(max-width:818px)": {
        fontSize: "12px",
      },
    },
  },

  headbox2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
    marginBottom: "15px",
    "@media(max-width:767px)": {
      display: "block",
      padding: "0 10px",
    },
  },
  btnhead: {
    display: "flex",
    flexDirection: "column",
    marginTop: "-0px",
    "@media(max-width:800px)": { marginTop: "20px", marginBottom: "20px" },
  },
  profileimg: {
    backgroundColor: "#fafafa",
    marginTop: "0px",
    overflow: "hidden",
    width: "175px",
    height: "175px",
    borderRadius: "10px",
    position: "relative",
    border: "2px solid #FFFFFF",
    "@media(max-width:1010px)": {
      marginTop: "0px",
      width: "110px",
      height: "110px",
    },
    "@media(max-width:800px)": {
      marginTop: "0px",
      width: "90px",
      height: "90px",
    },
    "& .editprofilebutton": {
      background: "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      position: "absolute",
      right: "3px",
      bottom: "3px",
      "@media(max-width:800px)": {
        width: "35px",
        height: "35px",
      },
      "& svg": {
        color: "#FFFFFF",
      },
    },
    "& img": {
      minHeight: "100%",
      minWidth: "100%",
      height: "auto",
      width: "auto",
    },
  },

  FollowingBox: {
    overflowx: "scroll",
  },
  profileWallet: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "@media(max-width:767px)": {
      borderBottom: "1px solid gray",
    },

    "& h6": {
      color: "#00000",
      "@media(max-width:800px)": { fontSize: "17px" },
    },
  },
  customizedButton: {
    position: "absolute",
    top: "-42px",
    right: "-9px",
    color: "#fff",
  },
  tabBtn: {
    "@media(max-width:767px)": {
      marginTop: "10px",
    },

    "& button": {
      borderRadius: "10px",
      fontWeight: "600",
      fontSize: "14px",
      marginRight: "4px",
      "&.active": {
        color: "#fff",
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
        background:
          "linear-gradient(261.87deg, #62D3F0 13.12%, #35A5F5 83.57%)",
      },
    },
  },
  dlflex: {
    "& label": {
      padding: "0px",
    },
  },
  buttonBox: {
    display: "flex",
    "@media(max-width:768px)": {
      marginTop: "10px",
    },
  },
  bundleData: {
    display: "flex",
    alignItems: "center",
    "& h4": {
      fontSize: "14px",
      fontWeight: "400",
    },
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
export default function BundleDetails() {
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

  const [bundleDetails, setBundleDetails] = useState({});
  const [isVideo, setIsVideo] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [isLoadingBunldeView, setIsLoadingBundleView] = useState(false);
  const [isLoadingConetent, setIsLoadingContent] = useState(false);
  const [isFilterTrue, setIsFilterTrue] = useState(false);
  const [bunfleId, setBundleId] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const bundleDetailsCache = useRef({});
  const BUNDLE_DETAILS_CACHE_KEY = "bundleDetailsCache";
const bundleContentCache = useRef({});
const BUNDLE_CONTENT_CACHE_KEY = "bundleContentCache";
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
    getBundleContentListHandler(bundleDetails?._id);
    setIsFilterTrue(false);
  };




  const getBundleDetailsHandler = async (id) => {
  setIsLoadingBundleView(true);

  const cacheKey = `bundle_${id}`;

  // Load from sessionStorage if available
  const storedCache = JSON.parse(sessionStorage.getItem(BUNDLE_DETAILS_CACHE_KEY) || "{}");

  if (bundleDetailsCache.current[cacheKey]) {
    console.log("[CACHE] Loaded bundle details from in-memory cache:", cacheKey);
    const cachedData = bundleDetailsCache.current[cacheKey];
    setBundleDetails(cachedData);
    getBundleContentListHandler(cachedData._id);
    setIsLoadingBundleView(false);
    const isSubbed = cachedData.subscribers?.includes(auth?.userData?._id);
    if (isSubbed) setIsSubscribed(true);
    return;
  } else if (storedCache[cacheKey]) {
    console.log("[CACHE] Loaded bundle details from sessionStorage:", cacheKey);
    const cachedData = storedCache[cacheKey];
    bundleDetailsCache.current[cacheKey] = cachedData;
    setBundleDetails(cachedData);
    getBundleContentListHandler(cachedData._id);
    setIsLoadingBundleView(false);
    const isSubbed = cachedData.subscribers?.includes(auth?.userData?._id);
    if (isSubbed) setIsSubscribed(true);
    return;
  }

  // Otherwise fetch from API
  try {
    console.log("[API] Fetching bundle details for ID:", id);
    const res = await axios({
      method: "GET",
      url: Apiconfigs.mynft + id,
    });

    if (res.data.statusCode === 200) {
      const bundle = res.data.result;
      console.log("responseBundleDeatils-----", bundle);
      setBundleDetails(bundle);
      getBundleContentListHandler(bundle._id);

      // Update caches
      bundleDetailsCache.current[cacheKey] = bundle;
      sessionStorage.setItem(
        BUNDLE_DETAILS_CACHE_KEY,
        JSON.stringify({
          ...storedCache,
          [cacheKey]: bundle,
        })
      );

      const isSubbed = bundle.subscribers?.includes(auth?.userData?._id);
      if (isSubbed) {
        console.log("responseFilter---->>>", isSubbed);
        setIsSubscribed(true);
      }
    }
  } catch (error) {
    console.log("[API ERROR]", error);
  } finally {
    setIsLoadingBundleView(false);
  }
};

  const getBundleContentListHandler = async (bundleId) => {
  setContentList([]);
  setIsLoadingContent(true);

  const searchKey = selectedFilter.searchKey || "";
  const fromDate = selectedFilter.startDate || "";
  const toDate = selectedFilter.endDate || "";

  const cacheKey = `bundle_${bundleId}_search_${searchKey}_from_${fromDate}_to_${toDate}`;
  const storedCache = JSON.parse(sessionStorage.getItem(BUNDLE_CONTENT_CACHE_KEY) || "{}");

  // Check in-memory cache
  if (bundleContentCache.current[cacheKey]) {
    console.log("[CACHE] Loaded bundle content from in-memory cache:", cacheKey);
    setContentList(bundleContentCache.current[cacheKey]);
    setIsLoadingContent(false);
    setIsFilterTrue(false);
    return;
  }

  // Check sessionStorage cache
  if (storedCache[cacheKey]) {
    console.log("[CACHE] Loaded bundle content from sessionStorage:", cacheKey);
    const cachedContent = storedCache[cacheKey];
    bundleContentCache.current[cacheKey] = cachedContent;
    setContentList(cachedContent);
    setIsLoadingContent(false);
    setIsFilterTrue(false);
    return;
  }

  // API fetch if not cached
  try {
    console.log("[API] Fetching bundle content list:", cacheKey);
    const res = await axios({
      method: "GET",
      url: Apiconfigs.bundleContentList,
      params: {
        nftId: bundleId,
        search: searchKey || null,
        fromDate: fromDate || null,
        toDate: toDate || null,
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    });

    if (res.data.statusCode === 200) {
      const docs = res.data.result.docs;
      console.log("response--list---", docs);
      setContentList(docs);
      setIsFilterTrue(false);

      // Update caches
      bundleContentCache.current[cacheKey] = docs;
      sessionStorage.setItem(
        BUNDLE_CONTENT_CACHE_KEY,
        JSON.stringify({
          ...storedCache,
          [cacheKey]: docs,
        })
      );
    }
  } catch (error) {
    console.log("[API ERROR]", error);
  } finally {
    setIsLoadingContent(false);
  }
};

  
  useEffect(() => {
    const bundleId = location.search.split("?");
    if (bundleId[1]) {
      getBundleDetailsHandler(bundleId[1]);
      setBundleId(bundleId[1]);
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
        getBundleContentListHandler(bundleDetails?._id);
      }
    }
  }, [selectedFilter, isFilterTrue]);

  useEffect(() => {
    if (bundleDetails.mediaUrl) {
      setIsVideo(handleVideo(bundleDetails.mediaUrl));
    }
  }, [bundleDetails]);


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
          getBundleDetailsHandler(bunfleId);
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
          getBundleDetailsHandler(bunfleId);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <Box className={classes.root}>
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
                             {bundleDetails?.bundleName ? bundleDetails?.bundleName : "Bundle"}

          </div>
        </div>
    
        </div>
        <Container maxWidth="lg">

          
      
          <Box className={classes.headbox2}>
            <Box style={{ display: "flex", flexWrap: "wrap" }}>
              {isVideo ? (
                <Box>
                  <Box className={classes.profileimg}>
                    <ReactPlayer
                      url={bundleDetails?.mediaUrl}
                      playing
                      muted
                      controls
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  //style={{ background: `url(${bundleDetails?.mediaUrl})` }}
                  className={classes.profileimg}
                >
                  <img
                    src={bundleDetails?.mediaUrl}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              )}
              <Box className={`${classes.text1} seats`}>
                <Typography variant="h2" sx={{color:"white"}}>
              Bundle Name:    {bundleDetails?.bundleName ? bundleDetails?.bundleName : ""}
                </Typography>
               
                <Typography  sx={{color:"rgb(153, 108, 164)",fontSize:'1.5rem'
                  ,"@media(max-width:900px)":{
                    fontSize:'1rem'
                  }}}>
               Bundle Details:   {bundleDetails?.details ? bundleDetails?.details : ''}
                </Typography> 
                <Box mt={1}>
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.bundleData}
                  >
                    <Typography variant="h4"  sx={{color:"white"}}>Donation Amount:</Typography>&nbsp;
                    <Typography variant="h4"  sx={{color:"rgb(178, 178, 178)"}}>
                      {bundleDetails?.donationAmount
                        ? bundleDetails?.donationAmount
                        : "0"}
                      MAS
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.bundleData}
                  >
                    <Typography variant="h4"  sx={{color:"white"}}>Time Duration:</Typography>&nbsp;
                    <Typography variant="h4" sx={{color:"rgb(178, 178, 178)"}}>
                      {bundleDetails?.duration ? bundleDetails?.duration : "0"}
                    </Typography>
                  </Box>
                  {/*{auth?.userData?._id !== bundleDetails?.userId && (
                    <Box
                      display="flex"
                      alignItems="center"
                      className={classes.bundleData}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        onClick={() => {
                          if(isLogin) {
                          if (isSubscribed) {
                            unSubscribeNowHandler();
                          } else {
                            subscribeNowHandler();
                          }} else {
                            navigate("/login");
                          }
                        }}
                        disabled={isLoading}
                      >
                        {isSubscribed ? "Unsubscribe" : "Subscribe"}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  )}*/}
                </Box>
              </Box>
            </Box>
            <Box className={classes.btnhead}>
              <Box
                className={classes.btnfollow2}
                onClick={() => setOpenBuy(true)}
              >
                <Typography variant="h2"  sx={{color:"white"}}>
                  {bundleDetails?.subscribers
                    ? bundleDetails?.subscribers?.length
                    : "0"}
                </Typography>
                <Typography variant="h5">Subscribers</Typography>
              </Box>
              <Button
                onClick={() => setShowSearch((prevState) => !prevState)}
                style={{ marginTop: 10 ,color:"white"}}
              >
                <SearchIcon fontSize={"large"} />
              </Button>
            </Box>
          </Box>
          <Collapse in={showSearch}>
            <Box className={classes.whitebox}>
              <Container>
                <Box className={classes.idtxt}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={8} className={classes.dlflex}>
                      <label>Start date:</label>
                      <TextField
                        id="datetime-local"
                        onChange={_onInputChange}
                        name="startDate"
                        value={selectedFilter.startDate}
                        type="datetime-local"
                        defaultValue="2021-09-12T23:08"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={8} className={classes.dlflex}>
                      <label>End date:</label>
                      <TextField
                        id="datetime-local"
                        onChange={_onInputChange}
                        value={selectedFilter.endDate}
                        name="endDate"
                        type="datetime-local"
                        defaultValue="2021-09-12T23:08"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={8} className={classes.dlflex}>
                      <label>Search</label>
                      <Input
                        placeholder="Search by title"
                        className={classes.input_fild2}
                        value={selectedFilter.searchKey}
                        fullWidth
                        type="text"
                        name="searchKey"
                        onChange={_onInputChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={0}>
                    <Grid item xs={12} md={8} className={classes.dlflex}>
                      <label> Select post type </label>
                      <Box>
                        <Select
                          fullWidth
                          value={selectedFilter.type}
                          name="type"
                          onChange={_onInputChange}
                        >
                          {currencies.map((data, i) => {
                            return (
                              <MenuItem key={data.value} value={data.value}>
                                {data.label}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={8} className={classes.dlflex}>
                      <Box className={classes.buttonBox}>
                        <Button
                          color="secondary"
                          size="large"
                          variant="contained"
                          style={{ marginRight: "10px" ,background:" #2f0032",color:'white'}}
                          onClick={() =>
                            isLogin ? setIsFilterTrue(true) : navigate("/login")
                          }
                        >
                          Apply
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          color="primary"
                          style={{ background:"#2f0032",color:'white'}}

                          onClick={() =>
                            isLogin ? clearFilterHandler() : navigate("/login")
                          }
                        >
                          Clear
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Box>
          </Collapse>
          <Grid container spacing={3}>
            <Grid item md={12} sm={12} xs={12} lg={12}>
              <Box>
                <All
                  contentList={contentList}
                  auth={auth}
                  isLoadingConetent={isLoadingConetent}
                  isSubscribed={isSubscribed}
                  bundleDetails={bundleDetails}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        </>
      )}
    </Box>
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
