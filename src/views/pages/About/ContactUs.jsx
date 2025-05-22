import React, {useState} from "react";
import { useInView } from "react-intersection-observer";
import "./ContactUs.css";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText ,TextField,Button,Container,Typography,Snackbar, Box } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';


// Import React Icons
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function ContactUs() {
    
  const {t} = useTranslation();
  
  const cardData = [
        {
          id: 1,
          icon: <FaMapMarkerAlt className="contact-icons" />,
          title: "Head Office",
          desc: "istanbul-fatih akdeniz cd. no.61 TÜRKİYE-İSTANBUL",
        },
        {
          id: 2,
          icon: <FaEnvelope className="contact-icons" />,
          title: "Email Us",
          desc: "masdevelopment11@gmail.com",
        },
        {
          id: 3,
          icon: <FaPhone className="contact-icons" />,
          title: "Call us",
          desc: "Phone : +905365439850",
        },
        {
          id: 4,
          icon: <FaUser className="contact-icons" />,
          title: "Free Consultations",
          desc: "Phone : +905394955991",
        },
      ];
    
      const { ref: ref1, inView: inView1 } = useInView({
        threshold: 0.2,
        triggerOnce: true,
      });
    
      const { ref: ref2, inView: inView2 } = useInView({
        threshold: 0.2,
        triggerOnce: true,
      });


      const ContactForm = () => {
        const [email , setEmail] = useState('');
        const [subject , setSubject ] = useState('');
        const [message , setMessage ] = useState('');
        const [openSnackBar ,setOpenSnackBar ] = useState(false);
        const [snackbarMessage, setSnackbarMessage ] = useState('');
        const [snackbarSeverity, setSnackbarSeverity] = useState('success');
      
      
        const handleSubmit = async (e) => {
          e.preventDefault();
       
      
        const formspreeEndpoint = 'https://formspree.io/f/xeoajvaq';
      
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('subject', subject);
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
          setEmail('');
          setSubject('');
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
          <Typography variant="h2" color="white" textAlign="center">Fill the Form</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label={t("Email")}
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgb(250, 249, 249) !important", // Force background
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  "&:hover": {
                    backgroundColor: "rgb(250, 249, 249) !important",
                  },
                  "&.Mui-focused": { // Active/focused state
                    backgroundColor: "rgb(250, 249, 249) !important",
                  },
                  "&.MuiFilledInput-underline:before, &.MuiFilledInput-underline:after": {
                    borderBottom: "none",
                  },
                },
                // Fix for the input itself (not just the wrapper)
                "& .MuiFilledInput-input": {
                  backgroundColor: "rgb(250, 249, 249) !important",
                  borderRadius: "12px",
                  "&:focus": {
                    backgroundColor: "rgb(250, 249, 249) !important",
                  }
                }
              }}
            />
            <TextField
              label={t("Subject")}
              fullWidth
              margin="normal"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgb(250, 249, 249) !important", // Force background
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  "&:hover": {
                    backgroundColor: "rgb(250, 249, 249) !important",
                  },
                  "&.Mui-focused": { // Active/focused state
                    backgroundColor: "rgb(250, 249, 249) !important",
                  },
                  "&.MuiFilledInput-underline:before, &.MuiFilledInput-underline:after": {
                    borderBottom: "none",
                  },
                },
                // Fix for the input itself (not just the wrapper)
                "& .MuiFilledInput-input": {
                  backgroundColor: "rgb(250, 249, 249) !important",
                  borderRadius: "12px",
                  "&:focus": {
                    backgroundColor: "rgb(250, 249, 249) !important",
                  }
                }
              }}
            />
            <TextField
              label={t("Message")}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              variant="filled"
              sx={{
                "& .MuiFilledInput-root": {
                  backgroundColor: "rgb(250, 249, 249) !important", // Force background
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  "&:hover": {
                    backgroundColor: "rgb(250, 249, 249) !important",
                  },
                  "&.Mui-focused": { // Active/focused state
                    backgroundColor: "rgb(250, 249, 249) !important",
                  },
                  "&.MuiFilledInput-underline:before, &.MuiFilledInput-underline:after": {
                    borderBottom: "none",
                  },
                },
                // Fix for the input itself (not just the wrapper)
                "& .MuiFilledInput-input": {
                  backgroundColor: "rgb(250, 249, 249) !important",
                  borderRadius: "12px",
                  "&:focus": {
                    backgroundColor: "rgb(250, 249, 249) !important",
                  }
                }
              }}
            />
            <Box display='flex' justifyContent='center'>
            <Button type="submit" variant="contained"   sx={{backgroundColor:"rgb(84, 0, 85)",marginTop:"10px" ,"&:hover":{backgroundColor:"rgb(102, 2, 107)"}}}>
              {t("Submit")}
            </Button>
            </Box>
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
      
          
        </Container>)
      
       }



      return (
        <>
          <div style={{
              background:"linear-gradient(to right,#280026,#4a004f)",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              padding:"20px 0"
          }}>
            <ButtonwithAnimation>Contact us</ButtonwithAnimation>
          </div>
          <div className="touch-sec">
            <div className={`touch-top ${inView1 ? "animate" : ""}`} ref={ref1}>
              <div className="t-top-1">
                <span>Get in touch</span>
                <span>Don't hesitate to contact us for more information.</span>
              </div>

              <div className="t-top-2">
                <span>Follow our social network</span>
                <div className="soical-cont">
                  <a href="https://www.facebook.com/masmarkeating/">
                    <FaFacebookF className="soical-icon" />
                  </a>
                  <a href="https://www.instagram.com/mas_digital_marketing/">
                    <FaInstagram className="soical-icon" />
                  </a>
                  <a href="https://www.tiktok.com/@masdigitalmarketing">
                    <FaTiktok className="soical-icon" />
                  </a>
                </div>
              </div>
            </div>
            <div className="touch-bottom">
              <div className="contact-cards">
                {cardData.map((card, index) => {
                  const { ref, inView } = useInView({
                    threshold: 0.1,
                    triggerOnce: true,
                  });

                  return (
                    <div
                      ref={ref}
                      key={card.id}
                      className={`contact-card-body ${
                        index % 2 === 0 ? "direction-left" : "direction-right"
                      } ${inView ? "animate" : ""}`}
                      style={{ transitionDelay: `${index * 0.2}s` }}
                    >
                      {card.icon}
                      <span className="contact-title">{card.title}</span>
                      <span className="contact-desc">{card.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{display:"flex" ,justifyContent:"center" ,alignItems:"center" ,background:"linear-gradient(to right,#280026,#4a004f)",padding:"10px"}}>
          <div style={{background:"linear-gradient(to top right,#900098,#4d0051)" ,width:"fit-content",padding:"20px",borderRadius:"50px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.5)"}}>   
          <ContactForm/> 
          </div> 
          </div>  
        </>
      )
}