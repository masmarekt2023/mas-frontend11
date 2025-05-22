
import React, { useEffect, useState } from "react";
import '../login/login.css';
import { Link } from 'react-router-dom'; // استيراد Link
import { Box, Button, DialogTitle, TextField } from "@mui/material";
import Typography from "../../../../component/ui/typography/typography";

import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { isValidEmail, isValidPassword } from "src/CommanFunction/Validation";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';


function ForgetPassword() {
    const [resetloader, setresetloader] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [emailvalid, setemailvalid] = useState(true);
      const [resendTimer, setresendTimer] = useState();
        const [passvalid, setpassvalid] = useState(true);
            const {t} = useTranslation();
        
      
    

    const [email, setemail] = useState("");
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
    return (
        <div className="Loginstyle">
            <section className="section1" style={{padding:"1rem 3rem"}}>
                <form>
                     {verificationSent &&
              <DialogTitle>
                <Typography
                  variant="h4"
                  style={{ color: "#792034", marginBottom: "10px", textAlign: 'center' }}
                >
                  Security verification
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "#999", marginBottom: "10px", textAlign: 'center' }}
                >
                  To secure your account, please complete the following verification.
                </Typography>
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenForgotPassword(false)}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
}

{!verificationSent &&
                <Box mt={3}>
                
                <span className="Logintitle" style={{marginBottom:"20px"}}> {t("Forget Password")}</span>
                    <p
                        style={{
                            color: 'white',
                            fontWeight: '400',
                            textAlign: 'center',
                            marginBottom:"20px"
                        }}
                    >{t("Enter the email address associated with your account and we'll send you a code to reset your password")}</p>
                    <div className="">
                        <ion-icon name="mail-outline"></ion-icon>
                        <TextField
                        fullWidth
                           className="auth-input"
                      variant="standard"
                        label={t("Your Email Account")}
                            placeholder={email}
                            autoComplete="off"
              sx={{ '& .MuiFormHelperText-root':{
                color:"red"
              }}}
                            type="email"
                            error={!emailvalid}
                            helperText={
                                !emailvalid && t("Incorrect Email.")
                            }
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value);
                                setemailvalid(isValidEmail(email));
                            }}
                        />
                     
                    </div>

                </Box>
              }  


                {verificationSent &&
                <Box mt={3}>
                  <TextField
                   className="auth-input"
                      variant="standard"
                    fullWidth
                    margin="normal"
                    label="Email Verification Code"
                    name="code"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button variant="text" onClick={forgotPasswordHandler} disabled={resendTimer || loader}>
                            {resendTimer ? `Resend in ${resendTimer}s` : 'Get Code'}
                          </Button>
                        </InputAdornment>
                      ),
                      maxLength: 6,
                    }}
                    error={code.length != 6}
                    helperText={
                      "Enter the 6-digit code sent to your email"
                    }
                    value={code}
                    onChange={(e) => setcode(e.target.value)}
                  />
                  <TextField
                    type={showpass ? "text" : "password"}
                    hintText="At least 8 characters"
                    fullWidth
                    name="newPassword"
                    label="Enter your new password"
                    error={!passvalid}
                    onBlur={() => { setpassvalid(isValidPassword(pass)) }}
                    value={pass}
                    onChange={(e) => { setpass(e.target.value); setpassvalid(isValidPassword(pass)) }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setshowpass(!showpass)}
                          >
                            {showpass ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText>
                    {!isValidPassword(pass) && (
                      <span>
                        Must be at least 8 characters long<br />
                        Must have at least 1 uppercase letter<br />
                        Must have at least 1 lowercase letter<br />
                        Must have at least 1 digit<br />
                        Must have at least 1 special case character<br />
                      </span>
                    )}
                  </FormHelperText>
                </Box>
              }  


{!verificationSent &&
              <Button
                sx={{marginTop :"20px"}}
               className="primaryButton"
                variant="contained"
                size="large"
                fullWidth
                onClick={forgotPasswordHandler}
                disabled={resetloader || !emailvalid}
              >
                {t("Continue")} {resetloader && <ButtonCircularProgress />}
              </Button>
            }
            {verificationSent &&
              <Button
               className="primaryButton"
                variant="contained"
               
                type="submit"
                disabled={resetloader || code.length != 6 || !passvalid}
                onClick={resetPaswordHandler}
              >
                Submit and Reset
                {resetloader && <ButtonCircularProgress />}
              </Button>
            }

                


                </form>
            </section>
        </div>

    );
}

export default ForgetPassword;