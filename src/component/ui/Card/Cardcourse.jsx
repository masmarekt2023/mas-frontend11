import { FaHeart, FaComment } from "react-icons/fa"; // استيراد أيقونة النقاط الثلاثة
import "./cardComponent.css";
import Card  from "./Card";
import { useNavigate } from "react-router-dom";
import { UserContext } from "src/context/User";
import { Badge, Box, Button,   Input,CardActions,InputAdornment, CardMedia, Dialog, DialogContent, DialogContentText, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { BsChat } from "react-icons/bs";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Apiconfigs, { pageURL } from "src/Apiconfig/Apiconfigs";
import ReactPlayer from "react-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material//colors";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import AddCourseDialog from "../../AddCourseDialog";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { FiCopy } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';





const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    maxHeight: 420,
    margin: 10,
    textAlign: "left",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    cursor: "pointer",
  },
  expand: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "0 10px",
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
    cursor: "pointer",
  },
}));

function Cardcourse({
  

  data,

}) {


    const navigate = useNavigate();
  
    const auth = useContext(UserContext);
    const classes = useStyles();
    const {t} = useTranslation();

    const [isLike, setisLike] = useState(false);
    const [nbLike, setnbLike] = useState(0);
    const [openSubscribe, setOpenSubscribe] = useState(false);
    const [isSubscribed, setisSubscribed] = useState(false);
    const [activeSubscribe, setActiveSubscribe] = useState(true);
    const [nbSubscribed, setnbSubscribed] = useState(0);
    const [isLoading, setIsloading] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [isVideo, setisVideo] = useState(false);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const openMenu = Boolean(anchorEl);
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    let CourseData = data;
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClose1 = () => {
      setOpen1(false);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };
  
    const handleClose3 = () => {
      setOpen3(false);
    };
  
    const handleClickOpen2 = () => {
        setOpenSubscribe(false);
        setOpen2(true);
      };
    let userId =
      typeof CourseData.userId === "object" &&
      !Array.isArray(CourseData.userId) &&
      CourseData.userId !== null
        ? CourseData.userId._id
        : CourseData.userId;
    const isUserCourse = auth.userData._id === userId;
    let userName = CourseData.userId.userName || CourseData.userDetail.userName;
    let userSpeciality =
      CourseData.userId?.speciality || CourseData.userDetail?.speciality;
    let profilePic =
      CourseData?.userId?.profilePic ||
      CourseData?.userDetail?.profilePic ||
"/assets/Images/profile.jpg"    
      useEffect(() => {
        const videoExtensions = ["mp4", "avi", "wmv", "mov", "mkv", "flv", "webm", "mpeg", "3gp", "ogv"];
      
        const mediaUrl1 = CourseData?.mediaUrl1;
        if (mediaUrl1) {
          const extension = mediaUrl1.split('.').pop().toLowerCase();
          if (videoExtensions.includes(extension)) {
            setisVideo(true); // It's a video
          } 
        }
      }, [CourseData]);

      

  
    const subscribeToCourseHandler = async () => {
      setIsloading(true);
      await axios({
        method: "GET",
        url: Apiconfigs.subscribeNow + CourseData._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          setIsloading(false);
          if (res.data.statusCode === 200) {
            setisSubscribed(res.data.result.subscribed === "yes");
            setnbSubscribed(res.data.result.nb);
            setActiveSubscribe(true);
            setOpen2(false);
            toast.success("Subscribe Successfully");
            navigate("/courses-details?" + CourseData?._id);
          } else {
            toast.error(res.data.responseMessage);
          }
        })
        .catch((err) => {
          setIsloading(false);
          console.log(err.message);
          toast.error(err?.response?.data?.responseMessage);
        });
    };
    const unSubscribeToCourseHandler = async () => {
      setIsloading(true);
      await axios({
        method: "DELETE",
        url: Apiconfigs.unSubscription + CourseData?._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          setIsloading(false);
          if (res.data.statusCode === 200) {
            setIsloading(false);
            toast.success("You have unsubscribed successfully.");
            setisSubscribed(false);
            setnbSubscribed((nb) => nb - 1);
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    };
    const likeDislikeNft2handler = async (id) => {
      if (auth.userData?._id) {
        try {
          const res = await axios.get(Apiconfigs.likeDislikeNft2 + id, {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          });
          if (res.data.statusCode === 200) {
            setisLike((liked) => !liked);
            setnbLike((nb) => (isLike ? nb - 1 : nb + 1));
          } else {
            setisLike(false);
            toast.error(res.data.responseMessage);
          }
        } catch (error) {
          console.log("ERROR", error);
        }
      } else {
        toast.error("Please login");
      }
    };
  
    const downLoadFile = () => {
      saveAs(CourseData?.mediaUrl1);
    };
  
    useEffect(() => {
      setnbLike(CourseData.likesUsers.length);
      setnbSubscribed(CourseData.subscribers.length);
      if (auth.userData?._id) {
        setisLike(CourseData.likesUsers?.includes(auth.userData._id));
        setisSubscribed(CourseData.subscribers?.includes(auth.userData._id));
      }
      if (auth.userData._id && CourseData._id) {
        //getSubscription().catch(console.error);
      }
    }, []);
  
  return (
    <Box dir="ltr"
  className="card-3"
  sx={{
     
    background: (theme) => theme.custom.CarBackGround,
   
  }}
>
<div className="media-cont">
{isVideo ? (
        <div
          style={{ cursor: "pointer", background: '#000' ,borderRadius:"20px"}}
          onClick={() =>
            isSubscribed || isUserCourse
              ? navigate("/courses-details?" + CourseData?._id)
              : handleClickOpen2()
          }
        >
          <ReactPlayer
            url={CourseData.mediaUrl1}
            muted
            playing
            width="100%"
            height="150px"
          />
        </div>
      ) : (
         <img src={CourseData?.mediaUrl1}  onClick={() =>
            (isSubscribed && activeSubscribe) || isUserCourse
              ? navigate("/courses-details?" + CourseData?._id)
              : handleClickOpen2()
          }
          /> 
      
      )}
      </div>
        <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleCloseMenu}
        open={openMenu}
      >
        {isUserCourse && (
          <MenuItem
            key={"Edit"}
            onClick={() => {
              setAnchorEl(false);
              setOpenEdit(true);
            }}
            style={{ fontSize: 14 }}
          >
            {"Edit"}
          </MenuItem>
        )}
        <MenuItem
          key={"Copy"}
          onClick={() => {
            navigator.clipboard.writeText(
              `${pageURL}/courses-details?${CourseData?._id}`
            );
            setAnchorEl(false);
          }}
          style={{ fontSize: 12 }}
        >
          {"Copy"}
          
        </MenuItem>
      </Menu>


 
   <div className="contentContainer">

<Box display="flex" alignItems="center">
   <Typography
          variant="h6"
          component="h6"
          style={{ color: "white", fontWeight: "bold" ,margin:"0 5px",fontSize:"16px" }}
        >
          {CourseData.courseName}
        </Typography>
       {/* <FiCopy color="white" cursor="pointer" onClick={() => {
                    navigator.clipboard.writeText(
                      `${pageURL}/coroses-details?${CourseData?._id}`
                    );
                    toast.info("Copied")}} />*/} 

        
        </Box>
  <Typography
          variant="h6"
          component="h6"
          style={{ color: "white", fontWeight: "bold", marginTop: 5 }}
        >
          {"( "}
          {CourseData?.donationAmount
            ? CourseData?.donationAmount
            : "Any amount"}{" "}
          {" )"}{" "}
          {CourseData && CourseData.coinName ? CourseData.coinName : "MAS"}{" "}
          {" for "}
          {CourseData?.duration ? CourseData?.duration : "Ever"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{ marginTop: 5 }}
        >
          {CourseData?.details}
        </Typography>

  {/* info Card */}
      <Card
        titel={userName}
        text={userSpeciality}
        imgsrc={profilePic}
        AvatarClick={() => {
            navigate("/user-profile/" + userName);
          }}
      />
      {/* button */}

         <div
            className="buttons"
            
              style={{
                display: "flex",
                flexDirection:"row",
                alignItems: "center",
                justifyContent:"space-between",
                marginTop: "10px",
            }}
          >
            

              
       
     <div>
        {auth.userData &&
          auth.userLoggedIn &&
          auth.userData._id !== userId &&
          isSubscribed && (
            <Button
             className="primary" 
             style={{
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
              padding: "2px 3px",
            }}
              disabled={isSubscribed && activeSubscribe}
              onClick={() => (activeSubscribe ? {} : handleClickOpen2())}
            >
              {activeSubscribe ? t("Subscribed") : t("Renew")}
            </Button>
          )}
        {auth?.userData?._id !== userId && !isSubscribed && (
        
          <Button 
         className="primary"
         style={{
          color: "white",
          fontWeight: "600",
          fontSize: "12px",
          padding: "2px",
        }}
          onClick={handleClickOpen2}>
            {t("Details")}
          </Button>
        )}
    
        {auth.userData && auth.userLoggedIn && auth.userData._id === userId && (


            
          <Button
            className="primary"
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
              padding: "2px",
            }}
            onClick={() => navigate("/courses-details?" + CourseData?._id)}
          >
            {t("View")}
          </Button>
        )}</div>   

<div 

          aria-label="add to favorites"
          onClick={() => likeDislikeNft2handler(CourseData._id)}
          style={{display : 'flex' }}
        >
          <FavoriteIcon
             style={isLike ? {color: ' #FD1D1D' ,fontSize:"20px" } : { color:' #ffffff6e',fontSize:"20px"  }}/>
             
      <span style={{color: 'white',marginLeft:'5px',fontSize: "12px"} }>{nbLike}</span>
      </div>
      </div> 
            
          {/* edit */}
        <Dialog
          disableScrollLock={true}
          open={open}
          fullWidth="sm"
          maxWidth="sm"
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: "rgb(60, 0, 75)", margiBottom: "10px" }}
            >
              {CourseData.courseTitle}
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                <label>{t("Donation Amount")}</label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="standard-basic"
                    placeholder="30"
                    className={classes.input_fild2}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              style={{
                paddingBotton: "10px",
                borderBottom: "solid 0.5px #e5e3dd",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                <label>{t("Duration")}</label>
                </Grid>
                <Grid item xs={12} md={8} className={classes.donation}>
                <span>7 {t("Days")}</span>
                  <span>14 {t("Days")}</span>
                  <span>30 {t("Days")}</span>
                  <span>60 {t("Days")}</span>
                  <span>1 {t("Year")}</span>
                  <span>{t("Forever")}</span>
                </Grid>
              </Grid>
            </Box>

            <Box align="center">
            <label> {t("Services")}:</label>
            <Typography
                variant="body2"
                componant="p"
                style={{ color: "#000", fontSize: "20px" }}
              >
                {/*I will send you a special video every <br />
                month specially for you! (edit)*/}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <small>
              {t("Change/upload a photo or video")}
              <input type="file" />
              </small>
              <img src="/images/Rectangle.png" alt="" />
            </Box>
            <Box mt={4}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item md={4}>
                  <Link style={{ color: "#000" }} onClick={handleClose}>
                    {t("Delete this course")}
                  </Link>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{background:"#2f0032",color:"white" }}
                    onClick={handleClose}
                  >
                    {t("Cancel")}
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{background:"#2f0032",color:"white" }}
                    onClick={handleClose}
                  >
                    {t("Save Changes")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* view */}
      <Dialog
        open={open1}
        disableScrollLock={true}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: "rgb(71, 0, 89)", margiBottom: "10px" }}
            >
              {t("Course")} 
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{ color: "#000", borderBottom: "solid 0.5px #e5e3dd" }}
            >
              {t("My basic supporter")}
            </Typography>

            <Box align="center" mt={3}>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Donation amount")}: </span>10
                MAS
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Duration")}: </span>{t("One month")}
                </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Number of subscribers")}:</span>
                100
              </Typography>
            </Box>

            <Box align="center">
            <label> {t("Services")}:</label>
            <Typography
                variant="body2"
                componant="p"
                style={{ color: "#000", fontSize: "20px" }}
              >
               {t("I will send you a special video every")} <br />
               {t("month specially for you!")}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <img src="/images/Rectangle.png" alt="" />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* Subscribe now */}
      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        disableScrollLock={true}
        open={open2}
        onClose={handleClose2}
        aria-labelledby="max-width-dialog-title"
        disableBackdropClick={isLoading}
        disableEscapeKeyDown={isLoading}
      >
        <DialogContent>
          <Box className={classes.PhotoBox}>
            {isVideo ? (
              <div>
                <ReactPlayer
                  url={CourseData.mediaUrl1}
                  muted
                  controls
                  playing
                  width="100%"
                  height="auto"
                />
                {auth.userData &&
                  auth.userLoggedIn &&
                  auth.userData._id !== userId &&
                  isSubscribed && (
                    <Box>
                      <Grid
                        lg={12}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          className={classes.downloadButton}
                          fullWidth
                          onClick={downLoadFile}
                        >
                          {t("Download")}
                        </Button>
                      </Grid>
                    </Box>
                  )}
              </div>
            ) : (
              <div style={{width:"100%" ,height:"300px"}}>
              <img
                src={CourseData.mediaUrl1}
                alt=""
                style={{ width: "100%", height: "300px", objectFit:"fill" }}
              /></div>
            )}
          </Box>
          <Box mt={3} className={classes.CourseText} textAlign="center">
            <Typography variant="h4">{CourseData.courseTitle}</Typography>
          </Box>

          <Box mt={2} className={classes.deskiText}>
            <Typography variant="h4" align="left" color="textSecondary">
              {t("Donation amount")}:
              <span>
                {CourseData.donationAmount} {CourseData.coinName}
              </span>
            </Typography>
            <Typography variant="h4" align="left" color="textSecondary">
              {t("Duration")}: <span> {CourseData.duration}</span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} lg={2}>
                <Typography variant="h4" align="left" color="textSecondary">
                  {t("Details")}:
                </Typography>
              </Grid>
              <Grid item xs={12} md={9} lg={10}>
                <Typography variant="body2" align="left" color="textSecondary">
                  {CourseData?.details}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {!auth.userLoggedIn && (
            <Box mt={3} mb={3} textAlign="center">
              <Button 
              className={classes.LoginButton} 
              onClick={handleClose2}
              style={{background:"#2f0032",color:"white" }}

              >
                {t("Cancel")}
              </Button>
              &nbsp;&nbsp;
              <Button
                className={classes.LoginButton}
                onClick={() => {
                  navigate("/login");
                }}
                style={{background:"#2f0032",color:"white" }}

              >
                {t("Login")}
              </Button>
            </Box>
          )}
          {auth.userData &&
            auth.userLoggedIn &&
            auth.userData._id !== data.userId && (
              <Box mt={3} mb={3} textAlign="center">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ background:"#2f0032",color:'white'}}

                  onClick={() => {
                    handleClose2();
                  }}
                  disabled={isLoading}
                >
                {t("Cancel")}

                </Button>
                &nbsp;&nbsp;&nbsp;
                {auth.userData &&
                  auth.userLoggedIn &&
                  auth.userData._id !== userId && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{ background:"#2f0032",color:'white'}}

                      onClick={subscribeToCourseHandler}
                      disabled={isLoading}
                    >
                      {isLoading ? t("pending...") : t("Subscribe now")}
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  )}
              </Box>
            )}
        </DialogContent>
      </Dialog>

      <Dialog
      disableScrollLock={true}
        open={open3}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.dilogBody}>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h4" align="center" style={{ color: "#000" }}>
            {t("Enter an amount")}
            </Typography>
            <Box mt={4}>
              <Input
                placeholder="300"
                className={classes.input_fild2}
                endAdornment={
                  <InputAdornment position="end">{t("Select a token")}</InputAdornment>
                }
              />
            </Box>

            <Box mt={4}>
              <Typography variant="h4" align="center" style={{ color: "#000" }}>
              {t("Send a message")}
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                className={classes.input_fild}
                defaultValue="Default Value"
                variant="outlined"
              />
            </Box>
            <Box mt={2} mb={4}>
              <Button variant="contained" size="large" color="secondary" style={{background:"#2f0032",color:"white" }} >
              {t("Donate now")}
              </Button>
            </Box>
            <small>{t("ETH fees and ETH fees and apply. apply.")}</small>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <AddCourseDialog
        handleClose={() => setOpenEdit(false)}
        show={openEdit}
        CourseData={data}
      />
        
          </div>
    

 
</Box>


    
  );
}

export default Cardcourse;
