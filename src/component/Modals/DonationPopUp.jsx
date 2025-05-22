import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
  DialogTitle,
  Input,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

import Dialog from "@mui/material//Dialog";
import DialogContent from "@mui/material//DialogContent";
import DialogContentText from "@mui/material//DialogContentText";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { sortAddress } from "src/utils";
import {
  CEO_NAME,
  tokensDetails,
} from "src/constants";
import BalanceBox from "src/component/ui/BalanceBox";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
// const useStyles = makeStyles((theme) => ({
//   cards: {
//     border: "solid 0.5px #c9c7c3",
//     padding: "10px",
//     borderRadius: "10px",
//     position: "relative",
//     backgroundImage:
//       "linear-gradient(45deg, #eef2f3 90%,#8e9eab 30%, #eef2f3 90%)",
//     margin: "8px",
//     width: "90%",
//     "&:hover": {
//       transform: "scale(1.03)",
//       transition: "all 0.4s ease-in-out 0s",
//     },
//   },
//   NFTbg: {
//     width: "100%",
//     height: "100px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "12px",
//     fontWeight: "500",
//     color: "#fff",
//     marginBottom: "20px",
//     backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
//   },
//   cardContent: {
//     textAlign: "left",
//     position: "relative",
//     "& h6": {
//       marginBottom: "2px !important",
//       fontSize: "16px !important",
//       [theme.breakpoints.down("md")]: {
//         fontSize: "10px !important",
//       },

//       "& span": {
//         color: "#000",
//         paddingLeft: "5px",
//       },
//       "@media(max-width:821px)": {
//         fontSize: "11px !important",
//       },
//     },
//     "& p": {
//       fontSize: "12px",
//     },
//   },

//   cardContent2: {
//     textAlign: "left",
//     position: "relative",
//     paddingTop: "10px",
//     borderTop: "solid 0.5px #707070",
//     "&::after": {
//       position: "absolute",
//       border: " solid 0.5px #707070",
//       content: "''",
//       left: "50%",
//       top: "0",
//       transform: "translatex(-50%)",
//     },
//   },
//   btnBox: {
//     display: "flex",
//     alignItems: "center",
//     "& button": {
//       fontSize: "8px !important",
//     },
//   },
//   sublink: {
//     display: "flex",
//     justifyContent: "space-between",
//     color: "#000",
//     alignItems: "center",
//     paddingBottom: "10px",
//     position: "relative",
//     "&::after": {
//       content: "''",
//       height: " 1px",
//       width: "70%",
//       position: "absolute",
//       backgroundColor: "#f2f1ee",
//       bottom: "6px",
//       maxWidth: "100%",
//       left: "50%",
//       transform: " translateX(-50%)",
//     },
//   },

//   feedmenu: {
//     fontSize: "20px",
//     color: "#707070",
//     position: "absolute",
//     right: "0px",
//     top: "0px",
//     zIndex: "9",
//   },
//   donation: {
//     "& span": {
//       fontSize: "12px",
//       padding: "2px 5px",
//       border: "1px solid #ccc",
//     },
//   },
//   input_fild2: {
//     width: "100%",
//     "& input": {
//       height: "30px",
//     },
//   },
//   changepic: {
//     textAlign: "center",
//     "& img": {
//       width: "80%",
//     },
//     "& small": {
//       position: "relative",
//       fontSize: "12px !important",
//       "& input": {
//         position: "absolute",
//         width: "300px",
//         left: "50%",
//         transform: "translateX(-50%)",
//         opacity: "0",
//       },
//     },
//   },
//   tokenList: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "7px",
//     border: "solid 0.5px #e5e3dd;",
//     "&:hover": {
//       backgroundColor: "rgba(209, 91, 91, 0.39)",
//     },
//     "&.active": {
//       backgroundColor: "rgba(209, 91, 91, 0.39)",
//     },
//     "& h3": {
//       color: "#141518",
//       fontSize: "14px",
//     },
//   },
//   PhotoBox: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     "& img": {
//       width: "100%",
//       height: "368px",
//       paddingLeft: "149",
//       display: "flex",
//       alignItems: "center",
//       borderRadius: "15px",
//     },
//     "@media(max-width:768px)": {
//       "& img": {
//         height: "auto",
//       },
//     },
//   },
//   bundleText: {
//     "& .red": {
//       color: "#792034",
//     },
//     "& h4": {
//       color: "#141518",
//       fontSize: "20px",
//     },
//   },
//   deskiText: {
//     "& h4": {
//       marginBottom: "10px",
//       color: "#707070",
//       fontSize: "20px",
//       "& span": {
//         color: "#141518",
//       },
//     },
//   },
//   input_fild: {
//     backgroundColor: "#ffffff6e",
    
//     border: " solid 0.5px #e5e3dd",
//     color: "#141518",
//     width: "100%",
//     "&:hover": {
//       "& .MuiOutlinedInput-notchedOutline": {
//         borderColor: "transparent",
//       },
//     },
//     "& .MuiInputBase-input": {
//       color: "#141518",
//     },
//     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "transparent",
//       borderWidth: 0,
//     },
//   },
 
//   certificateimg: {
//     margiBottom: "30px",
//     width: "100%",
//     height: "auto",
//   },

//   heading: {
//     backgroundImage: "linear-gradient(to bottom, #792034, #3d101a)",
//     display: "flex",
//     justifyContent: "center",
//     padding: "20px",
//     alignItems: "center",
//     color: "#fff",
//     [theme.breakpoints.down("xs")]: {
//       padding: "10px",
//     },
//     "& img": {
//       width: "60px",
//       [theme.breakpoints.down("xs")]: {
//         width: "20px",
//       },
//     },
//     "& h6": {
//       fontSize: "15px",
//       fontWeight: "400",
//       padding: "0 20px",
//       [theme.breakpoints.down("xs")]: {
//         padding: "0 5px",
//         fontSize: "10px",
//       },
//     },
//   },
//   body: {
//     position: "relative",
//     zIndex: 2,
//     padding: "50px 20px 150px 20px",
//     [theme.breakpoints.down("xs")]: {
//       padding: "50px 20px 60px 20px",
//     },
//     "& h5": {
//       fontSize: "15px",
//       fontWeight: "400",
//       lineHeight: "1.53",
//       color: "#141518",
//     },
//     "& h2": {
//       fontSize: "23px",
//       fontWeight: "600",
//       lineHeight: "1.51",
//       paddingLeft: "5px",
//       color: "#141518",
//       [theme.breakpoints.down("xs")]: {
//         fontSize: "18px",
//       },
//     },
//     "& img": {
//       width: "30px",
//       margin: "0 5px",
//     },
//   },
//   footer: {
//     "& h5": {
//       fontSize: "15px",
//       fontWeight: "500",
//       lineHeight: "1.53",
//       color: "#141518",
//     },
//     "& p": {
//       fontSize: "10px",
//       fontWeight: "500",
//       lineHeight: "1.5",
//       color: "#141518",
//     },
//     "& span": {
//       fontSize: "9px",
//       fontWeight: "500",
//       lineHeight: "1.5",
//       color: "rgba(112, 112, 112, 0.64)",
//     },
//     "& label": {
//       fontSize: "10px",
//       fontWeight: "400",
//       lineHeight: "1.35",
//       margin: "0",
//       padding: "0",
//       color: "#707070",
//       whiteSpace: "initial !important",
//       wordBreak: "break-all",
//     },
//   },
//   certificateBox: {
//     position: "relative",
//   },
//   centerImg: {
//     position: "absolute",
//     left: "50%",
//     bottom: "30px",
//     width: "45%",
//     transform: "translateX(-50%)",
//     zIndex: 1,
//   },
//   certificate: {
//     [theme.breakpoints.down("xs")]: {
//       padding: "10px",
//     },
//   },


//   downloadButton: {
//     maxWidth: "100px",
//     backgroundColor: "#a33748",
//     borderRadius: "33px",
//     color: "white",
//     "&:hover": {
//       backgroundColor: "red",
//     },
//   },
//   nftImg: {
//     width: "100%",
//     overflow: "hidden",
//     backgroundPosition: "center !important",
//     backgroundSize: "cover !important",
//     backgroundRepeat: " no-repeat !important",
//     backgroundColor: "#ccc !important",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     border: " solid 0.5px #e5e3dd",
//   },
// }));

const useStyles = makeStyles((theme) => ({
  cards: {
    border: "solid 0.5px #c9c7c3",
    padding: "10px",
    borderRadius: "10px",
    position: "relative",
    backgroundImage:
      "linear-gradient(45deg, #eef2f3 90%,#8e9eab 30%, #eef2f3 90%)",
    margin: "8px",
    width: "90%",
    "&:hover": {
      transform: "scale(1.03)",
      transition: "all 0.4s ease-in-out 0s",
    },
  },
  NFTbg: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "20px",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
  },
  cardContent: {
    textAlign: "left",
    position: "relative",
    "& h6": {
      marginBottom: "2px !important",
      fontSize: "16px !important",
      [theme.breakpoints.down("md")]: {
        fontSize: "10px !important",
      },

      "& span": {
        color: "#000",
        paddingLeft: "5px",
      },
      "@media(max-width:821px)": {
        fontSize: "11px !important",
      },
    },
    "& p": {
      fontSize: "12px",
    },
  },
  btnCansel:{
    transition:'.5s',
    borderRadius:'15px  !important',
    cursor :'pointer',
    background:"#2d013a !important",
    color:"#fff !important",



    "&:hover": {
      // background:"linear-gradient(90deg, #6345ED 50%, #DC39FC 90%) !important"
      background:"#3d0050 !important",
      color:"#fff !important",
    }
  },
  btnTransfer:{
    background:" #2d013a !important",
    color:"#fff !important",
    transition:'.5s',
    borderRadius:'50px !important',
    cursor :'pointer',
    "&:hover": {
      background:"#3d0050 !important",
    }
  },
  cardContent2: {
    textAlign: "left",
    position: "relative",
    paddingTop: "10px",
    borderTop: "solid 0.5px #707070",
    "&::after": {
      position: "absolute",
      border: " solid 0.5px #707070",
      content: "''",
      left: "50%",
      top: "0",
      transform: "translatex(-50%)",
    },
  },
  btnBox: {
    display: "flex",
    alignItems: "center",
    "& button": {
      fontSize: "8px !important",
    },
  },
  sublink: {
    display: "flex",
    justifyContent: "space-between",
    color: "#000",
    alignItems: "center",
    paddingBottom: "10px",
    position: "relative",
    "&::after": {
      content: "''",
      height: " 1px",
      width: "70%",
      position: "absolute",
      backgroundColor: "#f2f1ee",
      bottom: "6px",
      maxWidth: "100%",
      left: "50%",
      transform: " translateX(-50%)",
    },
  },

  feedmenu: {
    fontSize: "20px",
    color: "#707070",
    position: "absolute",
    right: "0px",
    top: "0px",
    zIndex: "9",
  },
  donation: {
    "& span": {
      fontSize: "12px",
      padding: "2px 5px",
      border: "1px solid #ccc",
    },
  },
  input_fild2: {
    width: "100%",
    border: "none !important",
   
    "& input": {
      height: "30px",
    },
  },
  changepic: {
    textAlign: "center",
    "& img": {
      width: "80%",
    },
    "& small": {
      position: "relative",
      fontSize: "12px !important",
      "& input": {
        position: "absolute",
        width: "300px",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: "0",
      },
    },
  },
  tokenList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px",
    borderBottom:"2px solid rgb(171, 171, 171)",
    "&:hover": {
      backgroundColor: "rgba(182, 91, 209, 0.39)",
      borderRadius:"20px 20px 0px 0px"
    },
    "&.active": {
      backgroundColor: "rgba(209, 91, 91, 0.39)",
    },
    "& h3": {
      color: "#141518",
      fontSize: "18px",
    },
  },
  PhotoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "100%",
      height: "368px",
      paddingLeft: "149",
      display: "flex",
      alignItems: "center",
      borderRadius: "15px",
    },
    "@media(max-width:768px)": {
      "& img": {
        height: "auto",
      },
    },
  },
  bundleText: {
    "& .red": {
      color: "#792034",
    },
    "& h4": {
      color: "#141518",
      fontSize: "20px",
    },
  },
  deskiText: {
    "& h4": {
      marginBottom: "10px",
      color: "#707070",
      fontSize: "20px",
      "& span": {
        color: "#141518",
      },
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",

    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    width: "100%",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#141518",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },

  certificateimg: {
    margiBottom: "30px",
    width: "100%",
    height: "auto",
  },

  heading: {
    background:"linear-gradient(to right, #280026, #4a004f)",
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    alignItems: "center",
    color: "#fff",
    borderRadius:"10px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& img": {
      width: "60px",
      [theme.breakpoints.down("xs")]: {
        width: "20px",
      },
    },
    "& h6": {
      fontSize: "15px",
      fontWeight: "400",
      padding: "0 20px",
      [theme.breakpoints.down("xs")]: {
        padding: "0 5px",
        fontSize: "10px",
      },
    },
  },
  body: {
    position: "relative",
    zIndex: 2,
    padding: "20px",
    backgroundColor:"rgb(223, 223, 223)",
    marginBottom:"20px",
    borderRadius:"20px",
    boxShadow:" 0 4px 8px rgba(0, 0, 0,0.5)",

    [theme.breakpoints.down("xs")]: {
      padding: "50px 20px 60px 20px",
    },
    "& h5": {
      fontSize: "15px",
      fontWeight: "400",
      lineHeight: "1.53",
      color: "#141518",
    },
    "& h2": {
      fontSize: "23px",
      fontWeight: "600",
      lineHeight: "1.51",
      paddingLeft: "5px",
      color: "#141518",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
    "& img": {
      width: "30px",
      margin: "0 5px",
    },
  },
  footer: {
    "& h5": {
      fontSize: "15px",
      fontWeight: "500",
      lineHeight: "1.53",
      color: "#141518",
    },
    "& p": {
      fontSize: "10px",
      fontWeight: "500",
      lineHeight: "1.5",
      color: "#141518",
    },
    "& span": {
      fontSize: "9px",
      fontWeight: "500",
      lineHeight: "1.5",
      color: "rgba(112, 112, 112, 0.64)",
    },
    "& label": {
      fontSize: "10px",
      fontWeight: "400",
      lineHeight: "1.35",
      margin: "0",
      padding: "0",
      color: "#707070",
      whiteSpace: "initial !important",
      wordBreak: "break-all",
    },
  },
  
  certificateBox: {
    position: "relative",
  },
  centerImg: {
    position: "absolute",
    left: "50%",
    bottom: "30px",
    width: "45%",
    transform: "translateX(-50%)",
    zIndex: 1,
  },
  certificate: {
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },

  downloadButton: {
    maxWidth: "100px",
    backgroundColor: "#a33748",
    borderRadius: "33px",
    color: "white",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  nftImg: {
    width: "100%",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    backgroundColor: "#ccc !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: " solid 0.5px #e5e3dd",
  },

  
  
}));
export const DonationPopUp = ({ open, handleClose, userData }) => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [isLoading, setIsloading] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(tokensDetails[0]);
  const [donationMessage, setDonationMessage] = useState("");
  const [serialNumber, setSerialNumber] = useState("f");
  const [download, setDownload] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [openSelectToken, setOpenSelectToken] = useState(false);
  const {t} = useTranslation();
  

  const availableBalance = {
    masBalance : parseFloat(user.userData.masBalance),
    fdusdBalance : parseFloat(user.userData.fdusdBalance),
    usdtBalance : parseFloat(user.userData.usdtBalance),
  }

  const MAxAmount = () => {
    setDonationAmount((availableBalance[selectedToken.databaseKey] - availableBalance[selectedToken.databaseKey]*parseFloat(user.userData.withdrawFees)/100).toFixed(2));
  }

  const donloadBadge = () => {
    setDownload(true);
    const certificate = document.getElementById(`certificate_UI`);

    html2canvas(certificate, { useCORS: true, allowTaint: true }).then(
      (canvas) => {
        canvas.toBlob(
          function (blob) {
            const imgData = URL.createObjectURL(blob);

            var pdf = new jsPDF({
              orientation: "landscape",
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(
              imgData,
              "JPEG",
              0,
              0,
              pdfWidth,
              pdfHeight,
              "",
              "FAST"
            );
            pdf.save(`${serialNumber}.pdf`);
            setDownload(false);
          },
          "image/jpeg",
          1.0
        );
      }
    );
  };

  const donationWithoutBlockchainHandler = async () => {
    if(selectedToken === "select"){
      toast.error(`Please Select Cryptocurrency.`);
      return;
    }
    if (
      parseFloat(donationAmount) >
      parseFloat(user?.userData[selectedToken.databaseKey])
    ) {
      toast.error(`Your ${selectedToken.name} balance is insufficient.`);
      return;
    } 
    setIsloading(true);
    try {
      const res = await axios.post(
        Apiconfigs.donation,
        {
          amount: donationAmount,
          userId: userData._id,
          coinName: selectedToken.name,
          message: donationMessage,
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );

      toast.success(res.data.responseMessage);
      setIsloading(false);
      if (res.data.statusCode === 200) {
        setSerialNumber(res.data.result);
        setOpenCertificate(true);
      }
      setTimeout(() => {}, 100);
      await user.updateUserData();
    } catch (error) {
      setIsloading(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
      console.log("Error", error);
    }
  };

  const currentDate = new Date();
  let cHour = currentDate.getHours().toString().padStart(1,0);
  cHour =  cHour % 12 || 12 ;
  const ampm = cHour >= 12 ? "PM" : "AM";
  const cMin = currentDate.getMinutes().toString().padStart(2,0);
  const cSec = currentDate.getSeconds().toString().padStart(2,0);
  const cDay = currentDate.getDate();
  const cMonth = currentDate.getMonth() + 1;
  const cYear = currentDate.getFullYear();

  const cDate = `${ampm} ${cHour}:${cMin}:${cSec}  ${cDay}/${cMonth}/${cYear} `
  
  return (
    <Box>
      <Dialog
        open={open}
        fullWidth="sm"
        maxWidth="sm"
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={isLoading}
        disableEscapeKeyDown={isLoading}
        disableScrollLock={true}
      >
        <DialogContent dir="ltr" >
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: " #2d013a", marginBottom: "10px" }}
              dir="rtl"
            >
             {t("Send donation to")} {userData.userName}
            </Typography>

            <BalanceBox 
              availableBalance={availableBalance} 
              tokensDetails={tokensDetails}
              setSelectedToken={setSelectedToken} 
            />

            <Box>
              <Grid container spacing={2}>
                
                <Grid item xs={12} sx={{marginBottom:"20px"}}>
                <Box mt={4}>
                <Input 
                  value={donationAmount}
                  placeholder={t("Minimum amount 1 ")+selectedToken?.name?.toString()}
                  className={classes.input_fild2}
                  type="number"
                  inputProps={{
                    min:0
                  }}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  endAdornment={
                    <InputAdornment
                      position="end"
                      onClick={() => setOpenSelectToken(true)}
                    >
                      <Box style={{ cursor: "pointer" }}>
                        <img src={selectedToken?.img} alt="" width="20px"/>
                        <ArrowDropDownIcon style={{ cursor: "pointer" }} />
                      </Box>
                    </InputAdornment>
                  }
                />
                <Typography
                  variant="body2"
                  align="left"
                  style={{ color: "#000" }}
                  dir='rtl'
                > 
                  <span onClick={() => MAxAmount()} >
                    {t("Available")}: {availableBalance[selectedToken.databaseKey].toFixed(2)} {selectedToken.name} 
                  </span>
                </Typography>
                
              </Box>
            
                </Grid>
              </Grid>
            </Box>
            
            <Box>
              <Grid container spacing={2}>
                
                <Grid item xs={12}>
                  <TextField
variant="standard"
                  placeholder={t("Donation Note")}
                    multiline
                    maxRows={3}
                    className={classes.input_fild2}
                    type="text"
                    onChange={(e) => setDonationMessage(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={4}>
              <Grid container alignItems="center" spacing={2}>
              <Grid item md={12}>
              <Typography
              variant="body2"
              align="left"
              style={{ color: "#000" }}
              dir='rtl'
            > 
              <span>{t("Transaction fees")}: {donationAmount ? (parseFloat(donationAmount)*parseFloat(user.userData.withdrawFees)/100) : user.userData.withdrawFees+"%"} {selectedToken.name}</span>
              <br/>
              { 
                  donationAmount ? <strong>{userData.name} Will receive: {parseFloat(donationAmount) - (parseFloat(user.userData.withdrawFees)*parseFloat(donationAmount)/100)} {selectedToken.name}</strong> : ""
              }
            </Typography>
            </Grid>
            <Box display="flex" justifyContent="center" marginTop="20px">
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => handleClose()}
                    disabled={isLoading}
                  className={classes.btnCansel}

                  >
                    {t("Cancel")}
                  </Button>
                  <Button
                  className={classes.btnTransfer}
                    variant="contained"
                    size="large"
                    color="secondary"
                    sx={{backgroundColor:" #2d013a", marginLeft:"20px"}}
                    disabled={ isLoading  || donationAmount < 1 || selectedToken == "select"}
                    onClick={donationWithoutBlockchainHandler}
                  >
                    {t("Transfer Funds")} {isLoading && <ButtonCircularProgress />}
                  </Button>
                  </Box>
                </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>



      {openCertificate && serialNumber && (
        <Dialog
          open={openCertificate}
          fullWidth="md"
          maxWidth="md"
          onClose={() => {
            setOpenCertificate(false);
            handleClose();
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: {
              backgroundImage: 'url(/assets/Images/doodle2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              
            }
          }}
        >
          <Box id="certificate_UI">
            <DialogContent className={classes.certificate}>
              <Box className={classes.certificateBox}>
                
                <Box className={classes.body} align="start">
                <Box className={classes.heading} mb={2}>
                  <img src="\assets\Images\masfooter-logo.svg"  style={{width:"50px"}}/>
                  <Typography align="center" sx={{color:"white" ,fontSize:"24px" ,fontWeight:"bold" ,
                    "@media(max-width:700px)":{
                      fontSize:"16px"
                    }
                  }}>
                  {t("Transaction Receipt")}
                  </Typography>
                  <img src="\assets\Images\masfooter-logo.svg"  style={{width:"50px"}}/>
                </Box>
                  <Box display="flex" alignItems="center" marginBottom="10px"> 
                  <Typography variant="h3" sx={{marginRight:"5px"}}>
                    {t("From")}:

                  </Typography>
                  <Typography variant="h4">
                    {user?.userData?.name
                      ? user?.userData?.name
                      : sortAddress(
                          user?.userData?.walletAddress
                            ? user?.userData?.walletAddress
                            : user?.userData?.ethAccount?.address
                        )}
                  </Typography>
                  </Box>

                  <Box display="flex" alignItems="start" marginBottom="15px" flexDirection="column">
                  <Typography variant="h3" sx={{marginRight:"5px"}}>
                     {t("Sender Wallet Address")}:
                     </Typography>
                  <Typography  sx={{fontSize:"15px" ,
                    "@media(max-width: 800px)":{
                      fontSize:"10px"
                    }
                  }}>
                    {` (${
                      user?.userData?.walletAddress
                        ? user?.userData?.walletAddress
                        : user?.userData?.ethAccount?.address
                    })`}
                  </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" marginBottom="15px">
                  <Typography variant="h3" sx={{marginRight:"5px"}}
                  >
                  {t("Amount")}:     
                  </Typography>            
                     <Typography variant="h4">
                      {donationAmount + ``}
                    </Typography>
                    <Typography variant="h4" >{" " + selectedToken.name}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" marginBottom="15px">
                    <Typography variant="h3" sx={{marginRight:"5px"}}>
                     {t("To")}:
                     </Typography>
                  <Typography variant="h4">
                    {userData?.name
                      ? userData.name
                      : userData?.ethAccount?.address
                      ? sortAddress(userData?.ethAccount.address)
                      : sortAddress(userData?.walletAddress)}
                  </Typography>
                  </Box>

                  <Box display="flex" alignItems="start" marginBottom="15px" flexDirection="column">
                  <Typography variant="h3" sx={{marginRight:"5px"}}>
                    {t("Receiver Wallet Address")}:
                     </Typography>
                  <Typography sx={{fontSize:"15px" ,
                    "@media(max-width: 800px)":{
                      fontSize:"10px"
                    }
                  }}>
                    {`(${
                      userData?.ethAccount?.address
                        ? userData?.ethAccount?.address
                        : userData?.walletAddress
                    })`}
                  </Typography>
                  </Box>


                  <Box display="flex" alignItems="start" marginBottom="15px" flexDirection="column">
                    <Typography variant="h3" sx={{marginRight:"5px"}}>
                    {t("Transaction Hash")}:
                    </Typography>
                  <Typography variant="h4">
                  {serialNumber}
                                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" marginBottom="15px">
                    <Typography variant="h3" sx={{marginRight:"5px"}}>
                      {t("Note")}:
                    </Typography>
                  <Typography variant="h4">
                    {donationMessage ? donationMessage : "No Note"}
                  </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" marginBottom="15px">
                    <Typography variant="h3" sx={{marginRight:"5px"}}>
                      {t("Date")}:
                    </Typography>
                  <Typography variant="h4">
                    {cDate}
                  </Typography>
                  </Box>


                </Box>
                <Box className={classes.footer}>
                  <Grid
                    container
                    spacing={2}
                    style={{ alignItems: "center" }}
                  >
                    <Grid item xs={3} align="center">
                      <Typography variant="h5" style={{ color: "rgb(158, 91, 209)" }}>
                       {/* {CEO_NAME} */}
                      </Typography>
                      <Typography variant="body2">{/* اس للحوالات المصرفية*/}</Typography>
                    </Grid>
                    <Grid item xs={6} align="center">
                      <Typography style={{fontSize:"14px"}}>{/*Digital Transfer*/}</Typography>
                    </Grid>
                    <Grid item xs={3} align="center">
                      
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </DialogContent>
          </Box>
          <Box
            mt={2}
            pb={4}
            sx={{ width: "100%", maxWidth: "200px", margin: "auto",display:"flex",alignItems:"center",justifyContent:"center" }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={donloadBadge}
              disabled={download}
              sx={{
                backgroundColor:"#4a004f",
                "&:hover":{
                  backgroundColor:"rgb(112, 2, 120)"
                }
              }}
            >
              {t("Download")} <FiDownload /> {download && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Dialog>
      )}

                 {/* select Token */}
      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={openSelectToken}
        onClose={() => setOpenSelectToken(false)}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <DialogTitle align="center" className={classes.dailogTitle} sx={{color:" #2d013a" ,fontSize:"20px",fontWeight:"bold"}}>
            {t("Select a token")}
          </DialogTitle>
          {tokensDetails.map((data, i) => {
            return (
              <Box
              key={i}
                mt={3}
                onClick={() => {
                  {
                    setSelectedToken(data);
                    setOpenSelectToken(false);
                  }
                }}
                className={classes.tokenList}
              >
                <Typography variant="h3">
                  {data.name}
                </Typography>
                <img
                  src={data.img}
                  style={{ height: 20, width: 20 }}
                  alt="coin"
                />
              </Box>
            );
          })}
        </DialogContent>
      </Dialog>
      
      

    </Box>

    
  );
};


