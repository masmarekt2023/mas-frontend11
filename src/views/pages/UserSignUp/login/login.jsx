
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  FormHelperText,
  IconButton,
  InputAdornment,  
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,  
} from "@mui/material"; 
import { makeStyles } from "@mui/styles"; 
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility"; 
import VisibilityOff from "@mui/icons-material/VisibilityOff"; 
import CloseIcon from "@mui/icons-material/Close";
import { isValidEmail, isValidPassword } from "src/CommanFunction/Validation";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import './login.css'
import { useTranslation } from 'react-i18next';





const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loginBox: {
    width: isMobile ? '100%' : '50vw',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent",
  },

  splash: {
    width: isMobile ? '100%' : '50vw',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  btnflex: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  labelText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#000",
  },
  inputText: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      border: "solid 1px #4441",
      borderRadius: "20px",
      backgroundColor: "transparent",
    },
    "& .MuiOutlinedInput-input": {
      padding: '10px',
      fontSize: "14px",
      fontWeight: "500",
      color: "#000",
      backgroundColor:"transparent"
    }
  },
  paper: {
    display: "flex",
    alignItems: "center",
    "& a": {
      fontWeight: "700",
      textDecoration: "underline",
      color: "#000",
    },
    "& label": {
      paddingTop: "0 !important",
      color: "#141518",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [splash, setSplash] = useState("");


  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [emailvalid, setemailvalid] = useState(true);
  const [passvalid, setpassvalid] = useState(true);

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const [showpass, setshowpass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [resetloader, setresetloader] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [code, setcode] = useState("");
  const [resendTimer, setresendTimer] = useState();
    const {t} = useTranslation();
  

  useEffect(() => {
    if (user.userLoggedIn) {
      navigate("/");
    }
  }, [user.userLoggedIn]);

  useEffect(() => {
    let emailtimeout;
    if (resendTimer && resendTimer >= 0) {
      emailtimeout = setTimeout(() => setresendTimer(resendTimer - 1), 1000);
    } else {
      setresendTimer();
      clearTimeout(emailtimeout);
    }
  });

  useEffect(() => {
    setemailvalid(true);
    setpassvalid(true);
  }, []);

  const forgotPasswordHandler = () => {
    setresetloader(true);
    setemailvalid(isValidEmail(email));
    if (emailvalid) {
      axios({
        method: "POST",
        url: Apiconfigs.forgotPassword,
        data: {
          email: email
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success("Email send successfuly!");
            setresetloader(false);
            setVerificationSent(true);
            setresendTimer(60);
          } else {
            toast.error(res.data.responseMessage);
            setresetloader(false);
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.responseMessage);
          } else {
            toast.error(err.message);
          }
          console.log(err.message);
          setresetloader(false);
        });
    } else {
      setresetloader(false);
    }
  };
  const resetPaswordHandler = async () => {
    setresetloader(true);
    setemailvalid(isValidEmail(email));
    setpassvalid(isValidPassword(pass));
    if (emailvalid && passvalid && code.length == 6) {
      axios({
        method: "POST",
        url: Apiconfigs.resetPassword,
        data: {
          email: email,
          password: pass,
          otp: code,
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            toast.success(res.data.responseMessage);
            setOpenForgotPassword(false);
          } else {
            toast.error(res.data.responseMessage);
          }
          setresetloader(false);
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.responseMessage);
          } else {
            toast.error(err.message);
          }
          setresetloader(false);
        });
    }

  };
  const Login = async () => {
  setemailvalid(isValidEmail(email));
  setpassvalid(isValidPassword(pass));
  if (emailvalid && passvalid) {
    setLoader(true);
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.userlogin,
        data: {
          email: email,
          password: pass,
        },
      });

      if (Object.entries(res.data.result).length > 0) {
        if (!res.data?.result?.isNewUser) {
          toast(
            ` 👋 Welcome Back ${res.data?.result?.name || res.data?.result?.userName}`
          );
        }

        sessionStorage.setItem("AccessToken", res.data.result.token); 
        await user.updatetoken(res.data.result.token);

        if (!res.data?.result?.isEmailVerified || !res.data?.result?.isPhoneVerified) {
          navigate("/profilesettings");
        } else {
          navigate("/");
        }
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
    setLoader(false);
  }
};

  useEffect(() => {
    const url = 'https://api.unsplash.com/photos/random?client_id=YC94t2S3Nge47lJvxYFndgORX0JUr4Ym7BfrSqfHUzU'
    const fetchSplash = async () => axios.get(url).then(res => {
      console.log(res)
      setSplash(res.data.urls.regular)
    });
    fetchSplash();

  }, [])
  return (
    <div dir="ltr" className="Loginstyle">
    <section className="section1">
   <form onSubmit={Login}>
       <span className="Logintitle">{t("LOGIN")}</span>
       <div className="">
          
           <TextField
           className="auth-input"
           sx={{width:"300px",
            '& input:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 30px white inset !important', // Change 'white' to your desired background color
              backgroundColor: 'transparent !important',
            },
            '& .MuiFormHelperText-root':{
              color:"red"
            }
            }}
           label={t("Email")}
                error={!emailvalid}
                // placeholder={email}  
                variant="standard"
                autoComplete="off"
               
                type="email"
                helperText={!emailvalid && t("Incorrect Email.")}
                value={email}
                onBlur={(e) => setemailvalid(isValidEmail(e.target.value))}
                onChange={(e) => {
                  setemail(e.target.value);
                  setemailvalid(isValidEmail(e.target.value));
                }}
                />
       
           
       </div>
       <div className="" style={{marginTop:"50px" }}>
           
           <TextField
           className="auth-input"
           sx={{width:"300px",
            '& .MuiFormHelperText-root':{
              color:"red"
            }
            }}
             fullWidth
             label={t("Password")}
             variant="standard"
                type={showpass ? "text" : "password"}
                error={!passvalid}
                helperText={
                  !passvalid && t("Password must contain at least 8 characters, one uppercase, one number and one special case character")
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setshowpass(!showpass)}
                        sx={{
                          color: "white", 
                        }}
                      >
                        {showpass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={pass}
                onChange={(e) => {
                  setpass(e.target.value);
                  setpassvalid(isValidPassword(e.target.value));
                }}
                onBlur={(e) => setpassvalid(isValidPassword(e.target.value))}
                // className={classes.inputText}
              />
      
       </div>
       <div className="forget">
           <label>
               <input type="checkbox" /> {t("Remember Me")}
           </label>
         
           <Link to="/Forget">{t("Forget Password")}</Link>
       </div>

      
         <Button
        className="primaryButton"
        fullWidth
                variant="contained"
                size="large"
                
                onClick={Login}
                disabled={loader || !passvalid || !emailvalid}
              >
                {t("Login")}{loader && <ButtonCircularProgress />}
              </Button>
     
     
     
       <div className="register">
           <p>{t("Don't have an account?")} <Link  to="/create-account">{t("Sign up")}</Link></p>
       </div>
   </form>
   
</section>
</div>


    
  );
}
