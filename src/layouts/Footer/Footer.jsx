import React, { Suspense, useState, useRef } from "react";
import useSWR from 'swr';
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, Container, Typography, Snackbar, Box } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { CgFacebook } from "react-icons/cg";
import { FaTelegram, FaTwitterSquare, FaDiscord, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // Close icon from Ant Design
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import './footer.css';
import { Link } from "react-router-dom";
import axios from "axios";
import NoDataFound from "src/component/NoDataFound";
import { useTranslation } from 'react-i18next';


const Footer = () => {
const cacheRef = useRef({});
 
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { t } = useTranslation();

  const wrappedFetcher = async (url) => {
  const cacheKey = `cache-${url}`;
  const sessionData = sessionStorage.getItem(cacheKey);

  // 1. Check in-memory cache
  if (cacheRef.current[cacheKey]) {
    console.log("✅ Using in-memory cache for", cacheKey);
    return cacheRef.current[cacheKey];
  }

  // 2. Check sessionStorage
  if (sessionData) {
    console.log("✅ Using sessionStorage cache for", cacheKey);
    const parsed = JSON.parse(sessionData);
    cacheRef.current[cacheKey] = parsed; // sync to memory
    return parsed;
  }

  // 3. Fetch from API
  console.log("⏬ Fetching fresh data for", cacheKey);
  const res = await axios.get(url, {
    headers: {
      token: sessionStorage.getItem("token"),
    },
  });

  const result = res.data.result;

  // Store in memory and sessionStorage
  cacheRef.current[cacheKey] = result;
  sessionStorage.setItem(cacheKey, JSON.stringify(result));

  return result;
};

const { data: staticContent } = useSWR(Apiconfigs.staticContentList, wrappedFetcher, { suspense: true });
const { data: socialLinks } = useSWR(Apiconfigs.listSocial, wrappedFetcher, { suspense: true });


console.log("soc",staticContent);
const [selectedItem, setSelectedItem] = useState(null);

const handleClickOpen = (item) => {
  setSelectedItem(item);
  setOpen(true);

};

const handleClose = () => {
  setOpen(false);
  setSelectedItem(null);
};

const handleFormOpen = (item) => {
  setSelectedItem(item);
  setOpenForm(true);
}

const handleCloseForm = () => {
  setOpenForm(false);
  setSelectedItem(null);
};

const scrollToTop = () => {
  window.scrollTo({top: 0 , behavior: "smooth"})
}


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
    
    <form onSubmit={handleSubmit}>
      <TextField
        label={t("Email")}
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label={t("Subject")}
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
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
      />
      <Button type="submit" variant="contained"  fullWidth sx={{backgroundColor:"#43005e",marginTop:"10px" ,"&:hover":{backgroundColor:"rgb(99, 0, 139)"}}}>
        {t("Submit")}
      </Button>
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
    <footer
      
      className="footer"
    >
        <Container maxWidth='xl'>

      <div
        className="footer-content"
      >
        {/* Logo Section */}
        <div className="footer-logo-container">
  <Link to="/" onClick={scrollToTop} className="footer-link">
    <img
      src="\assets\Images\masfooter-logo.svg"
      alt="Logo"
      className="footer-logo-img"
    />
  </Link> 
  <span className="footer-title">{t("MAS Platform")}</span>
</div>



        {/* Marketplace Section */}
        <div>
        <ul className="footer-list">
          <h3 className="footer-section-header"></h3>
          {staticContent.slice(0, 3).map((row) => (
            <>     
           <li key={row.title} className="footer-list-item" onClick={() => handleClickOpen(row)}>
  <span>{row.title}</span>
  <div className="footer-list-divider" />
  <div className="footer-list-dot" />
</li>
             
            
            </> 
            ))}

{staticContent.slice(7, 8).map((row) => (
  <>  
            <li className="footer-list-item" onClick={() => handleFormOpen(row)}>
            <span style={{cursor:"pointer"}}>{row.title}</span>
            <div className="footer-list-divider" />
            <div className="footer-list-dot" />
            </li>
            </> 
            ))}
            </ul>
      

      <Dialog open={open} onClose={handleClose}  maxWidth="lg" fullWidth  disableScrollLock={true}
 PaperProps={{
  sx: {
    backgroundImage: 'url(/assets/Images/doodle2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  }
}}>
        <DialogTitle sx={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center"}} color="#43005e">
          <span style={{
            fontSize:"24px"
          }}>{selectedItem?.title}</span>
          <div style={{fontSize:"20px",cursor:"pointer"}} onClick={handleClose}><AiOutlineClose/></div>
          </DialogTitle>
         <DialogContent>
          <Box sx={{
            background:"rgba(255, 255, 255, 0.68)",
            padding:"20px",
            borderRadius:"20px"
          }}>
    {selectedItem?.description ? ( // Check if description exists
      <DialogContentText>{selectedItem.description}</DialogContentText>
    ) : (
     <div style={{padding:"20px 60px"}}> <NoDataFound /> </div>// Render NoDataFound if no description
    )}
    </Box>
  </DialogContent>
      </Dialog>

        </div> 
           

        {/* My Account Section */}
        <div>
          <h3 className="footer-section-header"></h3>
          <ul className="footer-list">
          {staticContent.slice(3,5).map((row) => (
            <>
            <Link
                        style={{ color: 'white', textDecoration: 'none', }}
                        to={"/corporate/" + row.type}
                        state={{
                          data: {
                            title: row.title,
                            html: row.description
                          }
                        }}
                      >
                       
                     
            <li key={row.title} className="footer-list-item">
                <span>{row.title}</span>
                <div className="footer-list-divider" />
                <div className="footer-list-dot" />
              </li>
              </Link>
            
            </>
              
            ))}

            
{staticContent.slice(5, 7).map((row) => (
            <>     
            <li key={row.title} className="footer-list-item"  onClick={() => handleClickOpen(row)}>
                <span style={{cursor:"pointer"}}>{row.title}</span>
                <div className="footer-list-divider" />
                <div className="footer-list-dot" />
              </li>
             
            
            </>
            
              
            ))}

          </ul>
          
        </div>
        

        {/* Community Section */}
        <div >
          <h3 className="footer-section-header">{t("Join The Community")}</h3>
          <div  className="iconContainer">
         
         
          <div  className="footer-icon-wrapper" >
          <Link to={socialLinks[2]?.link} target="_blank" rel="noreferrer">
              <AiOutlineClose  className="footer-icon"/>
            </Link>

            </div>
         
         
          <div  className="footer-icon-wrapper" >
          <Link to={socialLinks[0]?.link} target="_blank" rel="noreferrer">
              <FaInstagram  className="footer-icon"/>
            </Link>

            </div>


            <div  className="footer-icon-wrapper" >
          <Link to={socialLinks[0]?.link} target="_blank" rel="noreferrer">
              <FaWhatsapp  className="footer-icon"/>
            </Link>

            </div>



            <div  className="footer-icon-wrapper">
          <Link to={socialLinks[3]?.link} target="_blank" rel="noreferrer">
              <FaTelegram className="footer-icon"/>
            </Link>

            </div>


            

            
        
            <div  className="footer-icon-wrapper">
          <Link to={socialLinks[1]?.link} target="_blank" rel="noreferrer">
              <FaDiscord  className="footer-icon"/>
            </Link>

            </div>

            
           
          </div>
        </div>
      </div>
      </Container>


      <Dialog open={openForm} onClose={handleCloseForm}  maxWidth="sm" fullWidth  disableScrollLock={true}
 PaperProps={{
  sx: {
    backgroundImage: 'url(/assets/Images/doodle2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  }
}}>
        <DialogTitle sx={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center"}} color=" #43005e">
          <span style={{
            fontSize:"24px"
          }}>{selectedItem?.title}</span>
          <div style={{fontSize:"20px",cursor:"pointer"}} onClick={handleCloseForm}><AiOutlineClose/></div>
          </DialogTitle>
         <DialogContent>
          <Box sx={{
                      background:"rgba(255, 255, 255, 0.68)",
                      padding:"20px",
                      borderRadius:"20px"
                    }}>
          <ContactForm/>
          </Box>
  </DialogContent>
      </Dialog>

    </footer>
  );
};



export default Footer;
