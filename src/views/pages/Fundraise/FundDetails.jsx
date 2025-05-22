import React, { useState ,useContext ,useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Container,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment
} from "@mui/material";
import { UserContext } from "src/context/User";
import { jsPDF } from "jspdf";
import { FiDownload } from "react-icons/fi";



const FundDetails = () => {
  const { state } = useLocation();
  const fundraiser = state?.fundraiser;
  const [openDonationDialog, setOpenDonationDialog] = useState(false);
   const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [error, setError] = useState(false);
      const user = useContext(UserContext);
        const receiptRef = useRef(null);

  

  if (!fundraiser) {
    return <div>Fundraiser not found</div>;
  }

   const handleOpenDonationDialog = () => {
    setOpenDonationDialog(true);
  };

  const handleCloseDonationDialog = () => {
    setOpenDonationDialog(false);
    setDonationAmount("");
    setError(false);
      setOpenReceiptDialog(false);
  };

  const handleDonationAmountChange = (e) => {
    const value = e.target.value;
    setDonationAmount(value);
    
    // Validate amount is a positive number
    if (value && (isNaN(value) || parseFloat(value) <= 0)) {
      setError(true);
    } else {
      setError(false);
    }
  };

    const handleDonationSubmit = () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setError(true);
      return;
    }
    
    // Close donation dialog and open receipt dialog
    setOpenDonationDialog(false);
    setOpenReceiptDialog(true);
  };

   const downloadReceipt = () => {
    const doc = new jsPDF();
    
    // Add logo or header
    doc.setFontSize(20);
    doc.setTextColor("#4a004f");
    doc.text("MAS Fundraisers", 105, 20, { align: "center" });
    
    // Add receipt title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("DONATION RECEIPT", 105, 30, { align: "center" });
    
    // Add divider
    doc.line(20, 35, 190, 35);
    
    // Add donation details
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.text(`Receipt #: ${Math.floor(Math.random() * 1000000)}`, 20, 55);
    
    doc.text(`Fundraiser: ${fundraiser.title}`, 20, 70);
    doc.text(`Organizer: ${fundraiser.organizer}`, 20, 80);
    doc.text(`Donation Amount: $${parseFloat(donationAmount).toFixed(2)}`, 20, 90);
    
    // Add thank you message
    doc.setFontSize(14);
    doc.text("Thank you for your donation!", 105, 120, { align: "center" });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("MAS Fundraisers - Making a difference together", 105, 280, { align: "center" });
    
    // Save the PDF
    doc.save(`Donation_Receipt_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
     <div style={{ background: "linear-gradient(to right,#280026,#4a004f)", minHeight: "100vh" }}>
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={fundraiser.coverPhoto}
          alt={fundraiser.title}
          sx={{ borderRadius: "12px", objectFit: "cover", mb: 3 }}
        />
        
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: "bold" ,color:"white"}}>
          {fundraiser.title}
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mr: 2 ,color:"white"}}>
            Organized by: <strong>{fundraiser.organizer}</strong>
          </Typography>
          <Chip label="Verified" color="success" size="small" />
        </Box>
        
        <Box sx={{ 
          backgroundColor: "#f5f5f5", 
          p: 3, 
          borderRadius: "8px",
          mb: 4
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">
              <strong>${fundraiser.raised}</strong> raised of ${fundraiser.amount} goal
            </Typography>
            <Typography variant="h6">
              {Math.round((fundraiser.raised / fundraiser.amount) * 100)}% funded
            </Typography>
          </Box>
          <Box sx={{ 
            height: 10, 
            backgroundColor: "#e0e0e0", 
            borderRadius: 5, 
            mb: 2,
            overflow: "hidden"
          }}>
            <Box sx={{ 
              height: "100%", 
              width: `${(fundraiser.raised / fundraiser.amount) * 100}%`, 
              backgroundColor: "#4a004f",
              borderRadius: 5
            }} />
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" ,color:"white" }}>
          About this fundraiser
        </Typography>
        <Typography variant="body1" paragraph color="white">
          {fundraiser.fullDescription}
        </Typography>
        
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                      <Button
                          variant="contained"
                          onClick={handleOpenDonationDialog}

                          size="large"
                          sx={{
                              backgroundColor: "#4a004f",
                              "&:hover": {
                                  backgroundColor: "#280026"
                              },
                              px: 6,
                              py: 2,
                              borderRadius: "50px",
                              fontSize: "1.1rem"
                          }}
                      >
                          Donate Now
                      </Button>
                  </Box>
      </Box>
    </Container>

     <Dialog open={openDonationDialog} onClose={handleCloseDonationDialog} maxWidth="xs" fullWidth disableScrollLock>
        <DialogTitle sx={{ color: "#4a004f", fontWeight: "bold" }}>
          Donate to {fundraiser.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Donation Amount"
              value={donationAmount}
              onChange={handleDonationAmountChange}
              error={error}
              helperText={error ? "Please enter a valid amount" : ""}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                type: "number",
                inputProps: { min: 0 }
              }}
              autoFocus
            />
          </Box>
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Your donation will help support: {fundraiser.description}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDonationDialog}
            sx={{ color: "#4a004f" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDonationSubmit}
            variant="contained"
            disabled={!donationAmount || error}
            sx={{ 
              backgroundColor: "#4a004f",
              "&:hover": {
                backgroundColor: "#280026"
              },
              "&:disabled": {
                backgroundColor: "#cccccc"
              }
            }}
          >
            Submit Donation
          </Button>
        </DialogActions>
      </Dialog>



        {/* Receipt Dialog */}
     <Dialog 
  open={openReceiptDialog} 
  onClose={handleCloseDonationDialog} 
  disableScrollLock
  fullWidth 
  maxWidth="md" 
  PaperProps={{
    sx: {
      backgroundImage: 'url(/assets/Images/doodle2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  }}
>
  <Box id="receipt_UI">
    <DialogContent sx={{
      padding: 4,
      color: "white",
      "@media(max-width:700px)": {
        padding: 2
      }
    }}>
      <Box sx={{
 display: "flex",
 flexDirection: "column",
  alignItems: "center",
 backgroundColor: "rgb(223, 223, 223)",
 padding: "20px",
 borderRadius: "20px",


      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          mb: 3,
          gap: 2,
          background:"linear-gradient(to right, #280026, #4a004f)",
          width:"100%",
          p:3,
          borderRadius:"10px"
        }}>
          <img src="/assets/Images/masfooter-logo.svg" style={{ width: "50px" }} />
          <Typography align="center" sx={{
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            "@media(max-width:700px)": {
              fontSize: "16px"
            }
          }}>
            Donation Receipt
          </Typography>
          <img src="/assets/Images/masfooter-logo.svg" style={{ width: "50px" }} />
        </Box>

        <Box sx={{ width: "100%" }}>
          <Box my={2}>
            <Typography variant="h3" sx={{ marginRight: "5px" }}>
              Name: {user.userData?.name || "N/A"}
            </Typography>
          </Box>

          <Box my={2}>
            <Typography variant="h3" sx={{ marginRight: "5px" }}>
              Email: <Typography sx={{
                fontSize: "20px",
                "@media(max-width: 800px)": {
                  fontSize: "14px"
                }
              }}> 
                {user.userData?.email || "N/A"} 
              </Typography>
            </Typography>
          </Box>

          <Box my={2}>
            <Typography variant="h3" sx={{ marginRight: "5px" }}>
              Fundraiser: <Typography sx={{
                fontSize: "20px",
                "@media(max-width: 800px)": {
                  fontSize: "14px"
                }
              }}>
                {fundraiser.title}
              </Typography>
            </Typography>
          </Box>

          <Box my={2}>
            <Typography variant="h3" sx={{ marginRight: "5px" }}>
              Amount: ${parseFloat(donationAmount).toFixed(2)}
            </Typography>
          </Box>

          <Box my={2}>
            <Typography variant="h3" sx={{ marginRight: "5px" }}>
              Date: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </DialogContent>

    <Box
      mt={2}
      pb={4}
      sx={{ 
        width: "100%", 
        maxWidth: "200px", 
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center" 
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={downloadReceipt}
        sx={{
          backgroundColor: "#4a004f",
          "&:hover": {
            backgroundColor: "rgb(112, 2, 120)"
          }
        }}
      >
        Download <FiDownload />
      </Button>
    </Box>
  </Box>
</Dialog>
    </div>
  );
};

export default FundDetails;