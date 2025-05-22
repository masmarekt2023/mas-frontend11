// import React, { useState, useContext } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   InputAdornment
// } from '@mui/material/styles';
// import { UserContext } from "src/context/User";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TelegramIcon from "@material-ui/icons/Telegram";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import YouTubeIcon from "@material-ui/icons/YouTube";
// import axios from "axios";
// import Apiconfigs from "src/Apiconfig/Apiconfigs";
// import { toast } from "react-toastify";


import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'; // Correct import for MUI v5 components

import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/component/ButtonCircularProgress"; // Assuming you have your custom component

// Replacing older MUI v4 imports with the correct ones from MUI v5.
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'; // MUI v5 icons
import { Facebook as FacebookIcon, Telegram as TelegramIcon, Twitter as TwitterIcon, YouTube as YouTubeIcon } from '@mui/icons-material'; // MUI v5 icons

import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs"; 
import { toast } from "react-toastify";

export default function SocialAccounts() {
  const user = useContext(UserContext);
  const [youtube, setyoutube] = useState(user.link.useryoutube);
  const [twitter, settwitter] = useState(user.link.usertwitter);
  const [facebook, setfacebook] = useState(user.link.userfacebook);
  const [telegram, settelegram] = useState(user.link.usertelegram);
  const [isLoading, setIsloading] = useState(false);

  const save = () => {
      const formData = new FormData();
      formData.append("facebook", facebook);
      formData.append("twitter", twitter);
      formData.append("youtube", youtube);
      formData.append("telegram", telegram);
    axios({
      method: "PUT",
      url: Apiconfigs.updateprofile,
      headers: {
        token: sessionStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        toast.success("Your social links has been updated successfully");
        user.updateUserData();
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsloading(false);
    })
      .catch((error) => {
        setIsloading(false);

        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
      });


  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ background:"rgba(180, 0, 234, 0.37)" }}>
        <Typography>Social Accounts</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ background:"rgba(223, 127, 252, 0.37)" }}>
        <Box>
          <Box mb={2}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              value={facebook}
              required="false"
              placeholder="Please enter your facebook page url"
              
              // error={!facebook}
              // helperText={!facebook && "Invalid URL" }
              onChange={(e) => setfacebook(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <FacebookIcon
                      style={{ color: "#4267B2", marginRight: "3px" }}
                    /> {' https://fb.com/'}
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              required="false"
              value={twitter}
              placeholder="Please enter your twitter @username"
              // error={!twitter}
              // helperText={!twitter &&  "twitter userName"}
              onChange={(e) => settwitter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TwitterIcon style={{ color: "#1DA1F2" }} /> {' @'}
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              required="false"
              value={telegram}
              placeholder="Please enter your telegram @username"
              // error={!telegram}
              // helperText={!telegram && "Invalid telegram username"}
              onChange={(e) => settelegram(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TelegramIcon style={{ color: "	#0088cc" }} /> {' @'}
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              required="false"
              value={youtube}
              placeholder="Please enter your youtube channel url"
              // error={!youtube}
              // helperText={!youtube && "Invalid youtube channel URL"}
              onChange={(e) => setyoutube(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <YouTubeIcon style={{ color: "	#FF0000" }} /> {' https://www.youtube.com/c/'}
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box>
            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={save}
              style={{ background:"rgb(86, 1, 112)" ,color:"white"}}
            >
              {isLoading ? "Updating social links..." : "Save"}
              {isLoading && <ButtonCircularProgress />}

            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
