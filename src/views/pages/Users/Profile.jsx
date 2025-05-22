import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Avatar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { sortAddress } from "src/utils";
import { DonationPopUp } from 'src/component/Modals/DonationPopUp'
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { useTranslation } from 'react-i18next';




const useStyles = makeStyles((theme) => ({
  profilebg: {
    boxShadow: " 0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundImage: " linear-gradient(to bottom,rgb(79, 8, 105),rgb(60, 0, 60))",
    height: "250px",
    width: "100%",
  },
  bgimg: {
    width: "100%",
    height: "100%",
    objectFit:"cover"
  },
  profileText: {
    padding:"0 20px ",
    "& h3": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "25px",
      fontWeight: "500",
      color: "#000",
    },
    "& h5": {
      fontSize: "16px",
      fontWeight: "700",
      color: "#707070",
    },
    "& p": {
      fontSize: "14px",
      fontWeight: "300",
      color: "#707070",
    },
  },
  masBox: {
    backdropFilter: " blur(15px)",
    border: "solid 0.5px #e5e3dd",
    backgroundColor: "#fff",
    padding: "10px",
    "& ul": {
      display: "flex",
      padding: "0",
      justifyContent: "center",
      "& li": {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        "&::after": {
          content: " ''",
          position: "absolute",
          height: "70%",
          width: "1px",
          backgroundColor: "#e5e3dd",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
        },
        "&:last-child::after": {
          display: "none",
        },
      },
    },
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& button": {
      height: "30px",
      fontSize: "12px",
    },
  },
  avatar: {
    width: " 220px !important",
    height: " 220px  !important",
    cursor: "pointer",
    marginTop: '-120px',
    border:"3px solid white"
  },
  textname: {
    "@media(max-width:1025px)": {
      paddingTop: "15px !important",
    },
  },
  walletAndRefferal: {
    border: "1px solid #8d2948",
    borderRadius: "10px",
    width: "fit-content",
    padding: "10px",
    position: "relative",
  },
  copyItem: {
    top: "0",
    position: "absolute",
    cursor: "pointer",
    width: "100%",
    height: "100%",
    left: "0",
    opacity: "0",
  }
}));

export default function Profile({ data, isabout }) {

  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [openDonation, setOpenDonation] = useState(false);
  const userCardData = data;
  const [isSubscribed, setisSubscribed] = useState(false);
        const {t} = useTranslation();
  

  // start Handle subscribe function
  const subscribeToUserHandler = async () => {
    if (auth.userData?._id) {
      await axios({
        method: "GET",
        url: Apiconfigs.followProfile + userCardData._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            setisSubscribed(res.data.result.subscribed == "yes");
          } else {
            toast.error(res.data.result);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.responseMessage);
        });
    } else {
      toast.error("Please Login");
    }
  }
  // End Handle subscribe function


  const initChat = async (id) => {
    setIsLoading(true);
    axios({
      method: "POST",
      url: Apiconfigs.initChat,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: {
        user: id
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result._id)
          navigate('/chat/' + res.data.result._id);
        } else {
          toast.error(res.data.responseMessage);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        setIsLoading(false);
      });


  }

  useEffect(() => {
    if (data?.isSubscribe) {
      setIsSubscribe(true);
    } else {
      setIsSubscribe(false);
    }
  }, [data]);

  const subscribeUser = async () => {
    if (auth.userLoggedIn && auth.userData?._id && data?._id) {
      try {
        setIsLoading(true);
        const res = await axios.get(Apiconfigs.followProfile + data?._id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setIsSubscribe(!isSubscribe);
          toast.success(res.data.responseMessage);
        } else {
          toast.error(res.data.responseMessage);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("ERROR", error.message);

        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
      }
    } else {
      toast.error("Please login");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  let userType = sessionStorage.getItem("userType");

  return (
    <Box>
      {!isabout && (
        <Typography variant="h3" align="center">
          About the creator:
        </Typography>
      )}
      <Box className={classes.profilebg}>
        {data?.coverPic && (
          <img
            src={data?.coverPic ? data?.coverPic : "images/bg.png"}
            className={classes.bgimg}
          />
        )}
      </Box>


      
      <Box
                 
        sx={{ display: "flex", justifyContent:"flex-start",
      padding:'0 20px' ,
      flexDirection:{
        xs: "column",
        sm:"row",
        md:"row"
      }
    }}
      >
      <Box>
<Avatar
                onClick={() =>
                  history.push({
                    pathname: "/user-profile",
                    search: data?._id,
                  })
                }
                src={data?.profilePic ? data.profilePic
                  : "/assets/Images/profile.jpg"
                }
                className={classes.avatar}
              />

</Box>  
<Box>
  <div>
  <div style={{
    display:"flex",
    alignItems:"center",
  }}>
<span style={{ color: "black", padding: "3px 10px", margin: "0px" ,fontSize:"35px" }}>
                  {data?.name
                    ? data.name
                    : data?.ethAccount?.address
                      ? sortAddress(data?.ethAccount.address)
                      : sortAddress(data?.walletAddress)}
                </span>
                <Typography variant="h3" >
                {data?.planType === "Diamond" && (
                  <img
                    src="/images/gold-check.svg"
                    style={{ width: "30px", marginLeft: "5px" }}
                  />
                )}
                {data?.planType === "Diamond" && (
                  <img
                    src="/images/blue-check.svg"
                    style={{ width: "30px", marginLeft: "5px" }}
                  />
                )}
                {data?.planType === "Silver" && (
                  <img
                    src="/images/white_check.svg"
                    style={{ width: "30px", marginLeft: "5px" }}
                  />
                )}
                {data?.planType === "Mas Plus" && (
                  <img
                    src="/images/icon.png"
                    style={{ width: "30px", marginLeft: "5px" }}
                  />
                )}
                &nbsp;

               
              </Typography>
             
              </div>
              <div>
              <Typography
                variant="body2"
              
              >
                {data ? data.bio : ""}
              </Typography>
              </div>
              </div>
             
</Box>
</Box>
        <Box className={classes.profileText}>

              {/* Start Wallet Adreess */}
              <Box mt={2} mb={1}>
                {data?.ethAccount?.address && (
                  <Typography className={classes.walletAndRefferal} variant="h6" >
                    {t("Wallet Address")} :  {sortAddress(data?.ethAccount?.address)}&nbsp;
                    <CopyToClipboard
                      text={data?.ethAccount?.address}
                      style={{ cursor: "pointer" }}
                      className={classes.copyItem}
                    >
                      <FiCopy onClick={() => toast.info("Copied")} />
                    </CopyToClipboard>
                  </Typography>
                )}
              </Box>
            

              {/* Start Referral Code */}
              <Box mt={2} mb={1} className={classes.textname}>
                {/* {data?.referralCode && ( */}
                <Typography variant="h6" className={classes.walletAndRefferal} style={{ color: '#000' }}>
                  {t("Referral")} : {data?.referralCode}&nbsp;
                  <CopyToClipboard
                    text={data?.referralCode}
                    style={{ cursor: "pointer" }}
                  >
                    <FiCopy onClick={() => toast.info("Copied")} />
                  </CopyToClipboard>
                </Typography>
                {/* )} */}
              </Box>
              </Box>
              {/* End Referral Code */}



              {/* Start Buttons Chat Donate Subscribe */}
              <Box sx={{
                padding:"0 20px"
              }}>
              {auth?.userData?._id !== data?._id && (
                <Box mt={2} mb={2} style={{ width: "320px", display: "flex", justifyContent: "space-between" }}>
                  {data?.userType === "Creator" && userType === "User" && (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={() => {
                        if (auth?.userData?._id !== data?._id) {
                          subscribeUser();
                        } else {
                          toast.error("You can not subscribe yourself");
                        }
                      }}
                      disabled={isLoading}
                    >
                      {isSubscribe ? t("Unsubscribe") : t("Subscribe")}
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  )}
                  {data?.userType === "Creator" && userType === "Creator" && (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={() => {
                        if (auth?.userData?._id !== data?._id) {
                          subscribeUser();
                        } else {
                          toast.error("You can not subscribe yourself");
                        }
                      }}
                      disabled={isLoading}
                    >
                      {isSubscribe ? t("Unsubscribe") : t("Subscribe")}
                      {isLoading && <ButtonCircularProgress />}
                    </Button>
                  )}

                  {/* Start Donate Button */}
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{ background:"#2f0032",color:'white'}}

                    onClick={() => {
                      if (auth?.userData?._id) {
                        if (auth?.userData?._id !== data?._id) {
                          setOpenDonation(true);
                        } else {
                          toast.error("You can not donate yourself");
                        }
                      } else {
                        toast.error("Please Login");
                        setTimeout(() => {
                          navigate("/login");
                        }, 1000);
                      }
                    }}
                  >
                    {t("Donate")}
                  </Button>
                  {/* End Donate Button */}

                  {/* Start Chat Button */}
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{ background:"#2f0032",color:'white'}}
                    onClick={() => {
                      if (auth?.userData?._id) {
                        if (auth?.userData?._id !== data?._id) {
                          initChat(data?._id)
                        } else {
                          toast.error("You can not chat yourself");
                        }
                      } else {
                        toast.error("Please Login");
                        setTimeout(() => {
                          navigate("/login");
                        }, 1000);
                      }
                    }}
                  >
                    {t("Chat")}
                  </Button>
                  {/* End Chat Button */}

                  {/* Start Subscribe Button */}
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={subscribeToUserHandler}
                    style={{ background:"#2f0032",color:'white'}}

                  >
                    {isSubscribed ? t('Subscribed') : t('Subscribe')}
                  </Button>
                  {/* End Subscribe Button */}
                </Box>
              )}
              </Box>
              {/* End Buttons Chat Donate Subscribe */}


          
           
        
      

      <DonationPopUp
        open={openDonation}
        handleClose={() => setOpenDonation(false)}
        userData={data}
      />
    </Box>
  );
}
