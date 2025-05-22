import React,{useContext, useState, useEffect} from "react"
import BalanceBox from "../../../../../component/ui/BalanceBox"
import { UserContext } from "src/context/User"
import { Link } from "react-router-dom"
import MainCard from '../../ui-component/cards/MainCard'
import { tokensDetails , websiteName} from "src/constants";
import { Box ,Typography,Button} from "@mui/material"
import '/src/views/pages/Profile/buymas.css' 
import { toast } from "react-toastify";
import CopyToClipboard from 'react-copy-to-clipboard';
import {  Dialog, DialogContent, DialogContentText, IconButton,  Container, Input, InputAdornment, Grid,TextField } from '@mui/material'
import { isMobile } from "react-device-detect";
import { makeStyles } from "@mui/styles";
import { VerifyOtp } from "src/component/Modals/VerifyOtp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import axios from "axios"
import zIndex from "@mui/material/styles/zIndex"
import { useTranslation } from 'react-i18next';
import { ButtonwithAnimation } from "../../../../../component/ui/Button/button"





const useStyles = makeStyles((theme) => ({
  
   
  
   
    
    input_fild2: {
        width: "100%",
        "& input": {
            height: "45px",
        },
    },
    dilogBody: {
        paddingBottom: "20px",
        position: "relative",
        zIndex: 1,
        "& small": {
            position: "absolute",
            bottom: "13px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "13px",
            width: "100%",
            textAlign: "center",
        },
    },
    
   
    
    
   
   
    
   
    buttonContainerStyle: {
        padding: "0px 20px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin:"5px 0"
      },
      dialogWrapper: {
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        background: " #30003c",
        padding: "5px",
        zIndex:"1"
      },
      dialogAnimatedBackground: {
        content: '""',
        background: "conic-gradient(transparent 270deg, rgb(196, 1, 218), transparent)",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        aspectRatio: "1 / 1",
        width: "100%",
        animation: "$rotate 3s linear infinite",
        zIndex: 0, // Ensure the background is behind the content
      },
      dialogInnerBlurEffect: {
        content: '""',
        background: " #30003c",
        borderRadius: "inherit",
        position: "absolute",
        inset: "var(--offset)",
        height: "calc(100% - 2 * var(--offset))",
        width: "calc(100% - 2 * var(--offset))",
        backdropFilter: "blur(40px)",
        zIndex: 0, // Ensure the blur effect is behind the content
      },
      "@keyframes rotate": {
        from: {
          transform: "translate(-50%, -50%) scale(2.5) rotate(0turn)",
        },
        to: {
          transform: "translate(-50%, -50%) scale(2.5) rotate(1turn)",
        },
      },
      
      
}));







const Wallet = () => {

  const user = useContext(UserContext);
  const [openDeposit, setOpenDeposit] = useState(false);
   const [openWihdraw, setOpenWithdraw] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
         const [withdrawFees, setWithdrawFees] = useState();
         const [withdrawAddress, setWithdrawAddress] = useState("");
         const [loader, setloader] = useState(false);
         const [withdrawError, setWithdrawError] = useState("");
         const [withdrawTx, setWithdrawTx] = useState("");
         const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
               const [availableBalance, setAvailableBalance] = useState({});
           const [totalEarning, setTotalEarning] = useState({});
             const [selectedToken, setSelectedToken] = useState(tokensDetails[0]);
                   const {t} = useTranslation();
             
 
 
             const classes = useStyles();

  const availableBalance1 = {
    masBalance : parseFloat(user.userData.masBalance),
    fdusdBalance : parseFloat(user.userData.fdusdBalance),
    usdtBalance : parseFloat(user.userData.usdtBalance), 
  }

  const totalEarning1= {
    masBalance: parseFloat(user.userEarnings?.masBalance) + parseFloat(user.userEarnings?.referralBalance),
    fdusdBalance: parseFloat(user.userEarnings?.fdusdBalance),
    usdtBalance: parseFloat(user.userEarnings?.usdtBalance),
  }


  if (user.isLogin && !user.userData) {
    user.updateUserData();
  }


   useEffect(() => {
          let timer1;
          function checkechecko() {
            if (user.isLogin && user.userData._id) {
              return () => {
                clearTimeout(timer1);
              };
            } else {
              timer1 = setTimeout(() => {
                checkechecko()
              }, 200);
            }
          }
          checkechecko()
        }, []);



     useEffect(() => {
           setAvailableBalance({
             masBalance: parseFloat(user.userData?.masBalance),
             fdusdBalance: parseFloat(user.userData?.fdusdBalance),
             usdtBalance: parseFloat(user.userData?.usdtBalance),
           });
       
         }, [user.userData])




          useEffect(() => {
                 setTotalEarning({
                   masBalance: parseFloat(user.userEarnings?.masBalance) + parseFloat(user.userEarnings?.referralBalance),
                   fdusdBalance: parseFloat(user.userEarnings?.fdusdBalance),
                   usdtBalance: parseFloat(user.userEarnings?.usdtBalance),
                 });
             
               }, [user.userEarnings])


          React.useMemo(() => {
                setWithdrawFees(((parseFloat(user.userData?.withdrawFees) * parseFloat(withdrawAmount) / 100)).toFixed(2));
              }, [withdrawAmount]);
              
              

              const MAxWithdrawAmount = () => {
                setWithdrawAmount((availableBalance[selectedToken.databaseKey] - availableBalance[selectedToken.databaseKey] * parseFloat(user.userData?.withdrawFees) / 100).toFixed(2));
              }



               const withdraw = async () => {
                  
                      if (withdrawAmount === "") {
                        setWithdrawError("Please enter Amount");
                      } else if (withdrawAmount < 1) {
                        setWithdrawError("Please enter valid amount (equal or greater than 1)");
                      } else if (
                        parseFloat(withdrawAmount) + parseFloat(withdrawFees) >= parseFloat(user.userData[selectedToken.databaseKey])
                      ) {
                        setWithdrawError(`${selectedToken.name} balance is low`);
                      } else if (withdrawAddress === "") {
                        setWithdrawError("Please enter Wallet Address");
                      } else {
                        setloader(true);
                        axios({
                          method: "POST",
                          url: Apiconfigs.withdraw,
                          headers: {
                            token: sessionStorage.getItem("token"),
                          },
                          data: {
                            recipientAddress: withdrawAddress,
                            withdrawAmount: withdrawAmount,
                            coin: selectedToken?.name,
                          },
                        })
                          .then(async (res) => {
                            await user.updateUserData();
                            if (res.data.statusCode === 201) {
                              setloader(false);
                              setWithdrawTx(res.data.result.txid);
                              setOpenWithdraw(false);
                              setVerifyOTPOpen(true);
                            } else {
                              setWithdrawError("Something went wrong!");
                              setloader(false);
                            }
                          })
                          .catch((err) => {
                            setWithdrawError("Something went wrong!");
                            setloader(false);
                          });
                      }
                    };
                  
                    
                 
                  
                    const profilePageURL = websiteName + "/user-profile/" + user?.userData?.userName;



   const handleCloseDepositModal = () => {
          setOpenDeposit(false);
        };

        const handleCloseWithdrawModal = () => {
          setOpenWithdraw(false);
        };


    return(
<>
<Box overflow='hidden'>
<Box sx={{display:"flex" ,justifyContent:"center",alignItems:"center",marginTop:"5rem",marginBottom:"1rem"}}><ButtonwithAnimation>My Wallet</ButtonwithAnimation>
</Box>
    <Box sx={{
        padding: "0 5%",
        maxWidth: "1600px",
        margin: "0 auto",
        minHeight: "calc(100vh - [header-height])", // Add this (replace [header-height])
        "@media (max-width: 1200px)": { padding: "0 2%" },
        "@media (max-width: 600px)": { 
          padding: "0 10px",
          minHeight: "calc(100vh - [mobile-header-height])" 
        }
    }}>
               <div className="tableWrapper" style={{ width: "100%", overflow: "hidden" }}>
               <div className="tableAnimatedBackground"></div>
               <div className="tableInnerBlurEffect"></div>
   <Box sx={{backgroundColor:" #30003c" ,  padding: { xs: "20px 30px", md: "20px 40px" } 
   ,borderRadius:"20px",position:"relative",  width: "100%"}}>
    <Typography sx={{ 
        fontSize: { xs: "1.2rem", md: "1.6rem" },
        color: "white",
        textAlign: "center",
        mb: 3 
      }}>{t("My Balance")}</Typography>
    <BalanceBox
        availableBalance={availableBalance1}
        tokensDetails={tokensDetails}
        />
       

        <Typography sx={{ 
        fontSize: { xs: "1.5rem", md: "1.6rem" },
        color: "white",
        textAlign: "center",
        mb: 3,
        mt: 2 
      }}>{t("My Total Earings")}</Typography>
    <BalanceBox
        availableBalance={totalEarning1}
        tokensDetails={tokensDetails}
        />
        <Box align="center" mt={5} sx={{display:"flex" ,justifyContent:"space-around",
            "@media(max-width:800px)":{
                display:"grid",
                gridTemplateColumns:"1fr 1fr",
                gap:"20px"
            }
        }}>
            <Link to={"/buymas"}><Button className="primaryButton">{t("Buy MAS")}</Button></Link>
            <Link to={"/connectWallet"}><Button className="primaryButton">{t("Connect Wallet")}</Button></Link>
          <Link> <Button className="primaryButton"  onClick={() => setOpenWithdraw(true)}>{t("WithDraw")}</Button></Link> 
          <Link>  <Button className="primaryButton"  onClick={() => setOpenDeposit(true)}>{t("Deposit")}</Button></Link>


        </Box>
        </Box>
        </div>
        </Box>
        </Box>


        <Dialog
      open={openDeposit}
      fullWidth="sm"
      maxWidth="sm"
      onClose={handleCloseDepositModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={isMobile ? { height: "70%" } : { height: "100%" }}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "transparent", // Remove default background
        },
      }}
    >
      <div className={classes.dialogWrapper}>
        <div className={classes.dialogAnimatedBackground}></div>
        <div className={classes.dialogInnerBlurEffect}></div>
        <DialogContent className={classes.dilogBody}>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h3"
              align="center"
              style={{ color: "white", marginBottom: "20px" }}
            >
              {t("Deposit")}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: "white", marginBottom: "10px" }}
            >
              {t("Please make sure you use BSC (BNB Smart Chain) and send only supported tokens (MAS, USDT, BUSD)")}
            </Typography>
            <Container maxWidth="md">
              <Box mt={4}>
                <Input
                  value={user.userData?.ethAccount?.address}
                  placeholder="Wallet Address"
                  className={classes.input_fild2}
                  sx={{
                    color: "white", // Change the text color here
                    "& .MuiInput-input": {
                      color: "white", // Ensure the input text color is white
                    },
                  }}
                  startAdornment={
                    <InputAdornment position="end">
                      <CopyToClipboard text={user.userData?.ethAccount?.address}>
                        <Button onClick={() => toast.info("Copied")} sx={{ color: "white" }}>
                          {t("Copy")}
                        </Button>
                      </CopyToClipboard>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box mt={2} mb={4}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleCloseDepositModal}
                  style={{ fontSize: "15px", background: "#8c0087", color: "white" }}
                >
                  {t("Close")}
                </Button>
              </Box>
            </Container>
          </DialogContentText>
        </DialogContent>
      </div>
    </Dialog>



    <VerifyOtp
                   open={verifyOTPOpen}
                   handleClose={() => setVerifyOTPOpen(false)}
                   channels={['email']}
                   context={'withdraw'}
                   emailVerificationSent={false}
                   smsVerificationSent={false}
                   payload={withdrawTx}
                   successCallback={() => {
                       setVerifyOTPOpen(false);
                       toast.success("Withdrawal successful!");
                   }}
               />


<Dialog
                open={openWihdraw}
                fullWidth="sm"
                maxWidth="sm"
                onClose={handleCloseWithdrawModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick={loader}
                disableEscapeKeyDown={loader}
                style={isMobile ? { height: "70%" } : { height: "100%" }}
                PaperProps={{
                    sx: {
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "transparent", // Remove default background
                    },
                  }}
            >

<div className={classes.dialogWrapper}>
        <div className={classes.dialogAnimatedBackground}></div>
        <div className={classes.dialogInnerBlurEffect}></div>
                <DialogContent className={classes.dilogBody}>
                    <DialogContentText id="alert-dialog-description">
                        <Typography
                            variant="h3"
                            align="center"
                            style={{ color: "white", marginBottom: "10px" }}
                        >
                            {t("Withdraw")}
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            style={{ color: "white" , marginBottom:"20px"}}
                        >
                            <>
                                {t("Please make sure the Wallet address is")} BEP20 <br />
                                {t("(Transaction will be sent in BSC Network)")}
                            </>
                        </Typography>
                        <BalanceBox
                            availableBalance={availableBalance}
                            tokensDetails={tokensDetails}
                            setSelectedToken={setSelectedToken}
                        />
                        <Container maxWidth="md">
                            <Box mt={4}>
                                <TextField
                                    placeholder={t("Wallet Address")}
                                    value={withdrawAddress}
                                    variant="standard"

                                    className={classes.input_fild2}
                                    onChange={(e) => setWithdrawAddress(e.target.value)}
                                    sx={{
                                        color: "white", // Change the text color here
                                        "& .MuiInput-input": {
                                          color: "white", // Ensure the input text color is white
                                        },
                                        "& .MuiInput-input::placeholder": {
                                            color:"white"
                                        }, "& .MuiInput-underline:before": {
                                          borderBottomColor: "white", // Underline color before focus
                                        },
                                        "& .MuiInput-underline:after": {
                                          borderBottomColor: "white", // Underline color after focus
                                        },
                                      }}

                                />
                            </Box>
                            <Box mt={4}>
                                <TextField
                                    value={withdrawAmount}
                                    placeholder={"Minimum amount 10 " + selectedToken?.name?.toString()}
                                    className={classes.input_fild2}
                                    type="number"
                                    variant="standard"
                                    inputProps={{
                                        min:0
                                    }}
                                    sx={{marginBottom:"20px",
                                        color: "white", // Change the text color here
                                        "& .MuiInput-input": {
                                          color: "white", // Ensure the input text color is white
                                        },
                                        "& .MuiInput-input::placeholder": {
                                            color:"white"
                                        },
                                        "& .MuiInput-underline:before": {
                                          borderBottomColor: "white", // Underline color before focus
                                        },
                                        "& .MuiInput-underline:after": {
                                          borderBottomColor: "white", // Underline color after focus
                                        },
                                        
                                    }}
                                    min={10}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    endAdornment={
                                        <InputAdornment
                                            position="end"
                                            onClick={() => setOpenSelectToken(true)}
                                        >

                                            <Box style={{ cursor: "pointer" }}>
                                                <img src={selectedToken?.img} alt="" width="20px" />
                                                <ArrowDropDownIcon style={{ cursor: "pointer" }} />
                                            </Box>

                                        </InputAdornment>
                                    }
                                />
                                <Typography
                                    variant="body2"
                                    align="left"
                                    style={{ color: "white" }}
                                >
                                    <span onClick={() => MAxWithdrawAmount()} >
                                        {t("Available")}: {availableBalance[selectedToken.databaseKey]?.toFixed(2)} {selectedToken.name}
                                    </span>
                                </Typography>

                            </Box>

                            <Box mt={2} mb={4}>
                                <Typography
                                    variant="body2"
                                    align="left"
                                    style={{ color: "white" ,lineHeight:"30px"}}
                                >
                                    <span>{t("Withdraw fees")}: {withdrawAmount ? <span>{withdrawFees} {selectedToken.name}</span> : user.userData?.withdrawFees + "%"} </span>
                                    <br />
                                    {withdrawAmount ?
                                        <strong>{t("Total")}: {parseFloat(withdrawAmount) + parseFloat(withdrawFees)} {selectedToken.name}</strong> : ""
                                    }
                                </Typography>
                                <Grid  xs={12} className={classes.buttonContainerStyle}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color=""
                                    style={{ fontSize: "15px",background:" #8c0087",color:"white" }}

                                    onClick={withdraw}
                                    disabled={loader || !withdrawAmount || !selectedToken}
                                >
                                    {loader ? t("Pending...") : t(`Withdraw`)}
                                    {loader && <ButtonCircularProgress />}
                                </Button>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    onClick={() => setOpenWithdraw(false)}
                                    style={{  fontSize: "15px",background:"#8c0087",color:"white" }}
                                >
                                    {t("Close")}
                                </Button>
                                </Grid>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    style={{ color: "#f22" }}
                                >
                                    <span>{withdrawError}</span>
                                </Typography>

                            </Box>
                        </Container>

                    </DialogContentText>
                </DialogContent>
                </div>
            </Dialog>
        

</>    
)
}

export default Wallet