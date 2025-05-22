import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiconfigs, { pageURL } from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import "./componentStyle.css";
import {
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Input,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

import { Link } from "react-router-dom";
import Dialog from "@mui/material//Dialog";
import DialogContent from "@mui/material//DialogContent";
import DialogContentText from "@mui/material//DialogContentText";
import { red } from "@mui/material//colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import ButtonCircularProgress from "./ButtonCircularProgress";
import MenuItem from "@mui/material//MenuItem";
import Menu from "@mui/material//Menu";
import ReactPlayer from "react-player";
import AddBundleDialog from "./AddBundleDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    margin:"0 10px"
  },
  media: {
    height:"150px",
    cursor: "pointer",
  },
  expand: {
    
   
  },
  avatar: {
    backgroundColor: red[500],
    cursor: "pointer",
  },
}));

export default function BundleCard({ data }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const auth = useContext(UserContext);

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
    const {t} = useTranslation();
  
  const [isVideo, setisVideo] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openMenu = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  let BundleData = data;

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
    typeof BundleData.userId === "object" &&
    !Array.isArray(BundleData.userId) &&
    BundleData.userId !== null
      ? BundleData.userId._id
      : BundleData.userId;
  const isUserBundle = auth.userData._id === userId;
  let userName = BundleData.userId.userName || BundleData.userDetail.userName;
  let userSpeciality =
    BundleData.userId?.speciality || BundleData.userDetail?.speciality;
  let profilePic =
    BundleData?.userId?.profilePic ||
    BundleData?.userDetail?.profilePic ||
    `https://avatars.dicebear.com/api/miniavs/${userName}.svg`;
  

     useEffect(() => {
            const videoExtensions = ["mp4", "avi", "wmv", "mov", "mkv", "flv", "webm", "mpeg", "3gp", "ogv"];
          
            const mediaUrl = BundleData?.mediaUrl;
            if (mediaUrl) {
              const extension = mediaUrl.split('.').pop().toLowerCase();
              if (videoExtensions.includes(extension)) {
                setisVideo(true); // It's a video
              } 
            }
          }, [BundleData]);
  //const bundleMediaFormat = BundleData.mediaUrl.split(".").slice(-1)[0];
  //let isVideo = videoFormats.includes(bundleMediaFormat);

  /*const getSubscription = async () => {
          try {
            const data = await axios({
              method: "GET",
              url: `${Apiconfigs.getSubscription}/${auth.userData._id}/${BundleData._id}`,
              headers: {
                token: sessionStorage.getItem("token"),
              },
            });
            if (data.status === 200) {
              setActiveSubscribe(data.data.result.subscriptionStatus === "ACTIVE");
            }
          } catch (err) {
            console.log(err.message);
          }
        };*/

  const subscribeToBundleHandler = async () => {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + BundleData._id,
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
          navigate("/bundles-details?" + BundleData?._id);
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
  const unSubscribeToBundleHandler = async () => {
    setIsloading(true);
    await axios({
      method: "DELETE",
      url: Apiconfigs.unSubscription + BundleData?._id,
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
  const likeDislikeNfthandler = async (id) => {
    if (auth.userData?._id) {
      try {
        const res = await axios.get(Apiconfigs.likeDislikeNft + id, {
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
    saveAs(BundleData?.mediaUrl);
  };

  useEffect(() => {
    setnbLike(BundleData.likesUsers.length);
    setnbSubscribed(BundleData.subscribers.length);
    if (auth.userData?._id) {
      setisLike(BundleData.likesUsers?.includes(auth.userData._id));
      setisSubscribed(BundleData.subscribers?.includes(auth.userData._id));
    }
    if (auth.userData._id && BundleData._id) {
      //getSubscription().catch(console.error);
    }
  }, []);

  return (
    <Box sx={{ transform: 'scale(0.85)' }}>
    <Card style={{background: "linear-gradient(to top right,rgb(115, 0, 121), #180226)" ,width:"100%" ,maxWidth:"260px", margin:"5px"}}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="user"
            alt={userName}
            src={profilePic}
            className={classes.avatar}
            onClick={() => {
              navigate("/user-profile/" + userName);
            }}
          />
        }
        action={
          <IconButton
            aria-label="more"
            onClick={handleClick}
            aria-haspopup="true"
            aria-controls="long-menu"
            sx={{color:"white"}}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={<p style={{ fontWeight: "bold", margin: 0 ,color:"white"}}>{userName}</p>}
        subheader={
          <p style={{ margin: 0, color: "white" }}>{userSpeciality}</p>
        }
      />
      {isVideo ? (
        <div
        
          style={{ cursor: "pointer", background: '#000' }}
          className={classes.media}

          onClick={() =>
            isSubscribed || isUserBundle
              ? navigate("/bundles-details?" + BundleData?._id)
              : handleClickOpen2()
          }
        >

          <ReactPlayer
            url={BundleData.mediaUrl}
            
            muted
            playing
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <CardMedia
          className={classes.media}
          image={BundleData.mediaUrl}
          title={BundleData.bundleName}
          onClick={() =>
            (isSubscribed && activeSubscribe) || isUserBundle
              ? navigate("/bundles-details?" + BundleData?._id)
              : handleClickOpen2()
          }
        />
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleCloseMenu}
        open={openMenu}
      >
        {isUserBundle && (
          <MenuItem
            key={"Edit"}
            onClick={() => {
              setAnchorEl(false);
              setOpenEdit(true);
            }}
            style={{ fontSize: 14 }}
          >
            {t("Edit")}
          </MenuItem>
        )}
        <MenuItem
          key={"Copy"}
          onClick={() => {
            navigator.clipboard.writeText(
              `${pageURL}/bundles-details?${BundleData?._id}`
            );
            setAnchorEl(false);
          }}
          style={{ fontSize: 12 }}
        >
          {t("Copy")}
        </MenuItem>
      </Menu>
      <CardContent>
        <Typography
          variant="h5"
          component="h5"
          style={{ color: "#fff", fontWeight: "bold" ,marginBottom:"10px"}}
        >
          {BundleData.bundleName}
        </Typography>
        <Typography
          variant="h5"
          component="h5"
          style={{ color: "#fff", fontWeight: "bold" ,marginBottom:"10px"}}
        >
          {"( "}
          {BundleData?.donationAmount
            ? BundleData?.donationAmount
            : "Any amount"}{" "}
          {" )"}{" "}
          {BundleData && BundleData.coinName ? BundleData.coinName : "MAS"}{" "}
          {" for "}
          {BundleData?.duration ? BundleData?.duration : "Ever"}
        </Typography>
        <Typography
          variant="body2"
          color="#fff"
          component="p"
          sx={{marginBottom:"10px"}}
        >
          {BundleData?.details}
        </Typography>
        
   
        <IconButton
          aria-label="add to favorites"
          onClick={() => likeDislikeNfthandler(BundleData._id)}
        >
          <FavoriteIcon
            style={isLike ? { color: red[800] } : { color: "rgb(207, 141, 236)" }}
          />
        </IconButton>
        <span style={{color:"white"}}>{nbLike}</span>
        {auth.userData &&
          auth.userLoggedIn &&
          auth.userData._id !== userId &&
          isSubscribed && (
            <Button
            sx={{ color:"white !important" ,background:"linear-gradient(to bottom right,rgb(212, 6, 205),rgb(0, 0, 0))",margin:"0 20px"}}
            disabled={isSubscribed && activeSubscribe}
              onClick={() => (activeSubscribe ? {} : handleClickOpen2())}
            >
              {activeSubscribe ? t("Subscribed") : t("Renew")}
            </Button>
          )}
        {auth?.userData?._id !== userId && !isSubscribed && (
          <Button 
          sx={{ color:"white" ,background:"linear-gradient(to bottom right,rgb(212, 6, 205),rgb(0, 0, 0))",margin:"0 20px"}}
          onClick={handleClickOpen2}>
            {t("Details")}
          </Button>
        )}
        {auth.userData && auth.userLoggedIn && auth.userData._id === userId && (
          <Button
          sx={{ color:"white" ,background:"linear-gradient(to bottom right,rgb(212, 6, 205),rgb(0, 0, 0))",margin:"0 20px"}}
            onClick={() => navigate("/bundles-details?" + BundleData?._id)}
          >
            {t("View")}
          </Button>
        )}
</CardContent>     

      {/* edit */}
      <Dialog
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
              {BundleData.bundleTitle}
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
                    {t("Delete this bundle")}
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
              {t("Bundle")} 
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
                       url={BundleData.mediaUrl}
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
                     src={BundleData.mediaUrl}
                     alt=""
                     style={{ width: "100%", height: "300px", objectFit:"fill" }}
                   /></div>
                 )}
               </Box>
               <Box mt={3} className={classes.bundleText} textAlign="center">
                 <Typography variant="h4">{BundleData.bundleTitle}</Typography>
               </Box>
     
               <Box mt={2} className={classes.deskiText}>
                 <Typography variant="h4" align="left" color="textSecondary">
                   {t("Donation amount")}:
                   <span>
                     {BundleData.donationAmount} {BundleData.coinName}
                   </span>
                 </Typography>
                 <Typography variant="h4" align="left" color="textSecondary">
                   {t("Duration")}: <span> {BundleData.duration}</span>
                 </Typography>
                 <Grid container spacing={2}>
                   <Grid item xs={12} md={3} lg={2}>
                     <Typography variant="h4" align="left" color="textSecondary">
                       {t("Details")}:
                     </Typography>
                   </Grid>
                   <Grid item xs={12} md={9} lg={10}>
                     <Typography variant="body2" align="left" color="textSecondary">
                       {BundleData?.details}
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
     
                           onClick={subscribeToBundleHandler}
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
      <AddBundleDialog
        handleClose={() => setOpenEdit(false)}
        show={openEdit}
        bundleData={data}
      />
    </Card>
    </Box>
  );
}
