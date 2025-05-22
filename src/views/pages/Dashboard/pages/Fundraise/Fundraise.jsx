import React, { useContext, useState } from "react";
import { UserContext } from "src/context/User";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { Dialog, DialogContent, DialogActions, DialogTitle, InputAdornment, TextField } from '@mui/material';
import { ButtonwithAnimation } from "../../../../../component/ui/Button/button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  previewCard: {
    maxWidth: 345,
    margin: "2rem auto",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    
  },
  coverImage: {
    height: 160,
    objectFit: "cover"
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px !important",
    background:"linear-gradient(to top left, #75017b, #3a013d)"
  },
  amountText: {
    fontWeight: "bold",
    color: "#2f0032"
  }
}));

const Fundraise = () => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    username: user.userData?.userName || '',
    email: user.userData?.email || '',
    phone: user.userData?.phone || '',
    amount: '',
    description: '',
    passportPhoto: null,
    coverPhoto: null
  });

  const [errors, setErrors] = useState({
    amount: false
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({ amount: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      const numericValue = parseFloat(value) || 0;
      if (numericValue < 0) {
        setErrors({ ...errors, amount: true });
        return;
      } else {
        setErrors({ ...errors, amount: false });
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        [name]: file,
        [`${name}Preview`]: reader.result
      }));
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (parseFloat(formData.amount) < 0) {
      setErrors({ ...errors, amount: true });
      return;
    }
    
    console.log(formData); // You can replace this with API call
    setSubmitted(true);
    handleClose();
  };

  const handleDonate = () => {
    // Handle donate button click
    console.log("Donate button clicked for:", formData.username);
  };

  return (
    <>
      <Box overflow='hidden'>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"5rem", marginBottom:"1rem"}}>
          <ButtonwithAnimation>My Fundraise</ButtonwithAnimation>
        </Box>

        <Box className={classes.masBoxFlex}>
          <Typography variant="h6" color="black"></Typography>
          <Box display="flex" mt={2}>
            <Button
              variant="contained"
              size="large"
              sx={{background:"#2f0032", color:'white'}}
              onClick={handleOpen}
            >
              Create a Fundraiser
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Dialog for creating fundraiser */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{fontSize:"20px", color:"#2f0032"}}>Create a Fundraiser</DialogTitle>
        
        <DialogContent>
          <form onSubmit={handleSubmit}>
             <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              readOnly
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              readOnly
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              readOnly
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Amount to Collect"
              name="amount"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: { min: 0 }
              }}
              value={formData.amount}
              onChange={handleChange}
              error={errors.amount}
              helperText={errors.amount ? "Amount cannot be negative" : ""}
            />
            
            <TextField
              margin="normal"
              fullWidth
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              label="Upload Passport Photo"
              name="passportPhoto"
              onChange={handleFileChange}
              required
            />

            <TextField
              margin="normal"
              fullWidth
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
              label="Upload Cover Photo"
              name="coverPhoto"
              onChange={handleFileChange}
              required
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
            
            <Typography variant="body2" color="textSecondary" gutterBottom>
              We will answer you in a maximum of 3 business days
            </Typography>
          </form>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} sx={{color:"#2f0032"}}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            type="submit"
            sx={{background:"#2f0032", color:'white'}}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Card after submission */}
      {submitted && (
        <Card className={classes.previewCard}>
          {formData.coverPhotoPreview && (
            <CardMedia
              component="img"
              className={classes.coverImage}
              image={formData.coverPhotoPreview}
              alt="Fundraiser cover"
            />
          )}
          <CardContent className={classes.cardContent}>
            <Box>
                 <Typography variant="h5" component="div" color="white">
                {formData.title}
              </Typography>
              <Typography variant="h6" component="div" color="white">
                {formData.username}
              </Typography>
              <Typography variant="body2" className={classes.amountText} color="white">
                ${formData.amount} goal
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              size="small"
              sx={{background:"#2f0032", color:'white'}}
              onClick={handleDonate}
            >
              Donate
            </Button>
          </CardContent>
        </Card>
      )}
    </>    
  );
}

export default Fundraise;