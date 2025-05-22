import React, { useState, useContext, useEffect } from 'react';
import {
  Card, CardContent, Typography, Button, Box, List,
  ListItem, ListItemIcon, Divider, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "src/context/User";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FiDownload } from "react-icons/fi";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { tokensDetails, websiteName } from "src/constants";
import BalanceBox from "../../../component/ui/BalanceBox";
import axios from "axios";
import Apiconfigs from "../../../Apiconfig/Apiconfigs";

const PlanCard = ({ plan, currencyType, billingType }) => {
  const [open, setOpen] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useContext(UserContext);
  const [download, setDownload] = useState(false);

  const availableBalance1 = {
    masBalance: parseFloat(user.userData.masBalance),
    fdusdBalance: parseFloat(user.userData.fdusdBalance),
    usdtBalance: parseFloat(user.userData.usdtBalance),
  };

  

  const handleBuyPlan = async () => {
    try {
      const token = sessionStorage.getItem("AccessToken");
if (!token) {
  console.error("🚫 No token found, user must log in");
  return;
}
      const res = await axios.post(
        Apiconfigs.buyPlan,
        {
          planId: plan._id,
          coinName: currencyType,
          //billingType,
        },
        {
          headers: {
          token: sessionStorage.getItem("AccessToken")
}
        }
      );
      if (res.data.statusCode === 200) {
        setSuccessMessage("Plan purchased successfully!");
        setOpen(false);
        setOpenReceipt(true);
      } else {
        setErrorMessage(res.data.responseMessage || "Failed to buy plan.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.responseMessage || "An error occurred.");
    }
  };


  const currentDate = new Date();
  const cDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  const currentPrice = plan.price?.[currencyType]?.[billingType] ?? "N/A";
  const billingLabel = billingType === "monthly" ? "per month" : "per year";

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={cardVariants}>
        <Card
          sx={{
            width: 300,
            minHeight: 550,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 10,
            border: "2px solid rgb(255, 255, 255)",
            "&:hover": {
              transform: "scale(1.02)",
              transition: "ease-out 0.3s",
              boxShadow: "0px 0px 10px white"
            }
          }}
        >
          <Box sx={{ p: 3, textAlign: 'center', background: (theme) => theme.custom?.CarBackGround || "#4a004f" }}>
            <Typography variant="h6" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>{plan.name}</Typography>
            <Typography variant="body2" sx={{ color: "white", opacity: 0.9 }}>{plan.subtext}</Typography>
          </Box>

          <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1, color: "#2f0032" }}>
              {currentPrice} {currencyType}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{billingLabel}</Typography>
            <Divider sx={{ my: 2 }} />
            <List sx={{ minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {plan.features.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckIcon color="primary" fontSize="small" /></ListItemIcon>
                  <Typography variant="body2">{feature}</Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>

          <Box sx={{ p: 2, textAlign: 'center', background: (theme) => theme.custom?.CarBackGround || "#4a004f" }}>
            <Button variant="contained" size="large" sx={{ py: 1.5, borderRadius: 10, backgroundColor: "#2f0032" }} onClick={() => setOpen(true)}>
              Buy Now
            </Button>
          </Box>
        </Card>
      </motion.div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <Typography sx={{ fontSize: { xs: "1.2rem", md: "1.6rem" }, color: "black", textAlign: "center", mb: 3 }}>{t("My Balance")}</Typography>
        <BalanceBox availableBalance={availableBalance1} tokensDetails={tokensDetails} />
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>{plan.name}</span>
          <div style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => setOpen(false)}><AiOutlineClose /></div>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ background: "rgba(255, 255, 255, 0.68)", padding: "10px", borderRadius: "20px" }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1, color: "#2f0032" }}>{currentPrice} {currencyType}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{billingLabel}</Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              {plan.features.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><CheckIcon color="primary" fontSize="small" /></ListItemIcon>
                  <Typography variant="body2">{feature}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {!auth.userLoggedIn ? (
            <>
              <Button onClick={() => setOpen(false)} sx={{ background: "#2f0032", color: "white" }}>Cancel</Button>
              <Button onClick={() => navigate("/login")} sx={{ background: "#2f0032", color: "white" }}>Login</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setOpen(false)} sx={{ background: "#2f0032", color: "white" }}>Cancel</Button>
              <Button onClick={handleBuyPlan} sx={{ background: "#2f0032", color: "white" }}>Buy Plan</Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage("")}>
        <Box sx={{ px: 2, py: 1, background: "green", color: "white", borderRadius: 1 }}>{successMessage}</Box>
      </Snackbar>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
        <Box sx={{ px: 2, py: 1, background: "red", color: "white", borderRadius: 1 }}>{errorMessage}</Box>
      </Snackbar>
    </>
  );
};

export default PlanCard;