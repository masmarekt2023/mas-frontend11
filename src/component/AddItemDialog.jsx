import React, { useEffect, useState } from "react";
import Dialog from "@mui/material//Dialog";
import DialogTitle from "@mui/material//DialogTitle";
import DialogContent from "@mui/material//DialogContent";
import {
  Grid,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  IconButton,
  Box,Popover,
  Typography
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { ArrowDropDown, ArrowUpward } from "@mui/icons-material";

import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Apiconfigs from "../Apiconfig/Apiconfigs";
import { tokensDetails } from "../constants/index";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import LinearProgress from "@mui/material/LinearProgress";
import { useTranslation } from 'react-i18next';


import { toast } from "react-toastify";

const AdditemDialog = ({ show, handleClose, itemData }) => {
  const [isEdit, setIsEdit] = useState(!!itemData);
  const classes = useStyles();
  const [mediaUrl, setMediaUrl] = useState(isEdit ? itemData.mediaUrl : "");
  const [mediaUrls, setMediaUrls] = useState(isEdit && Array.isArray(itemData.mediaUrls) ? itemData.mediaUrls : []);
       const {t} = useTranslation();
 

  const [uploadCounter, setUploadCounter] = useState(0);

  // Yup inputs validation
  const schema = yup.object({
    file: yup.mixed().required("File is required"),
    itemTitle: yup.string().required("Enter title please"),
    itemName: yup.string().required("Enter name please"),
    details: yup.string().required("Enter description please"),
    duration: yup.number().min(1, "Select a ending date"),
    donationAmount: yup
      .number()
      .min(1, "Enter donation amount please")
      .positive("the price should be positive number"),
    coinName: yup.string().required("Enter coin name"),
  });

  // React hook form for handle form data
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      file: null,
      itemTitle: isEdit ? itemData.itemTitle : "",
      itemName: isEdit ? itemData.itemName : "",
      donationAmount: isEdit ? itemData.donationAmount : "",
      duration: isEdit ? +itemData.duration.split(" ")[0] : "",
      details: isEdit ? itemData.details : "",
      coinName: isEdit ? itemData.coinName : "MAS",
    },
  });

  useEffect(() => {
    setMediaUrl(isEdit ? itemData.mediaUrl : "");
  }, [show]);

  /* Main Return */

  return (
    <Dialog
    fullWidth={true}
      maxWidth={"md"}
      open={show}
      onClose={uploadCounter === 0 ? handleClose : null}
      aria-labelledby="max-width-dialog-title"
      dir="ltr"
      scroll="body"
      PaperProps={{
        sx: {
          backgroundImage: 'url(/assets/Images/doodle2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          maxHeight: '90vh',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle
       sx={{ 
        textAlign: "center", 
        color: "black", 
        fontWeight: "bold",
        fontSize: "1.2rem",
        py: 1
      }}
      >
        {isEdit ? t("Edit item") : t("Create an item")}
      </DialogTitle>
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{
                     background: "rgba(255, 255, 255, 0.85)",
                     borderRadius: "12px",
                     p: 2,
                     maxHeight: 'calc(90vh - 64px)',
                     display: 'flex',
                     flexDirection: 'column'
                  }}>
  <Grid container  spacing={2} sx={{ flex: 1, overflow: 'auto' }}>
    {InputList()}
    <Grid item xs={12} sm={5} style={{ textAlign: 'center' }}>
      {MediaBox()}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        {MediaInput()}
      </div>
    </Grid>
    {FormButtons()}
  </Grid>
  </Box>
</DialogContent>
    </Dialog>
  );

  /* Main Return */

  function MediaBox() {
    const maxImages = 9;
    const emptySlots = maxImages - mediaUrls.length;

    return (
      <Box sx={{ 
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
        border: '1px solid #ddd',
        borderRadius: 1,
        mb: 2
      }}>
        <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#666' }}>
          {t("Upload your images here")}
        </Typography>
        <Grid container spacing={1}>
          {mediaUrls.map((url, index) => (
            <Grid item xs={4} key={index}>
              <Box sx={{ 
                position: 'relative',
                height: 100,
                border: '1px solid #eee',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <img 
                  src={url} 
                  alt={`Selected ${index + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <IconButton 
                  onClick={() => removeImage(index)} 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    color: 'error.main',
                    backgroundColor: 'rgba(255,255,255,0.7)'
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
          {Array.from({ length: emptySlots }, (_, i) => (
            <Grid item xs={4} key={i + mediaUrls.length}>
              <Box 
                onClick={() => document.getElementById('file-input').click()}
                sx={{
                  height: 100,
                  border: '2px dashed #ddd',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <CloudUploadIcon sx={{ color: 'text.disabled' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
        {uploadCounter > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" align="center">
              {t("Uploading")} {uploadCounter}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={uploadCounter}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'primary.dark',
                },
              }}
            />
          </Box>
        )}
      </Box>)
}

function removeImage(index) {
    const filteredUrls = mediaUrls.filter((_, idx) => idx !== index);
    setMediaUrls(filteredUrls);
}


function FormButtons() {
  const onSubmit = handleSubmit(async (data) => {
    try{
      if(isEdit){
        await edititem(data)
      }
      else {
        await createitem(data)
      }
      window.location.reload()
    } catch (error) {
      console.error("Submission error:", error);
    }
  }, () => console.log(errors));
    return (
      <Grid xs={12} className={classes.buttonContainerStyle}>
        <Button
          variant="contained"
          onClick={handleClose}
          color="primary"
          size="large"
          style={{ background:"#2f0032",color:'white',margin:"0 5px"}}

        >
          {t("Cancel")}
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          size="large"
          style={{ background:"#2f0032",color:'white',margin:"0 5px"}}

          className={classes.submitButton}
          disabled={isEdit && !dirtyFields.file}
        >
          {isEdit ? t("Edit") : t("Create")}
        </Button>
      </Grid>
    );
  }

  function MediaInput() {
    const { field } = useController({
        name: "file",
        control,
    });

    const { onChange, ref, name } = field;
    const handleFileChange = (files) => {
      if (files.length > 0) {
          const file = files[0]; // Get the single file
          const newUrl = URL.createObjectURL(file); // Create a URL for this single file
          setMediaUrls([...mediaUrls, newUrl]); // Append new URL to existing URLs
      }
  };
  

    return (
        <>
            <input
                accept="image/*"
                style={{ display: "none" }}
                className={classes.input}
                id="file-input"
                multiple={false}
                onChange={(e) => {
                    onChange(e.target.files[0]);
                    handleFileChange(e.target.files);
                }}
                ref={ref}
                name={name}
                type="file"
            />
        </>
    );
}

  function InputList() {
    return (
      <Grid item xs={12} sm={7}>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["itemTitle"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>{t("item Title")}</label>
            <Input
              {...register("itemTitle")}
              className={classes.input}
              placeholder={t("Enter item Title")}
              disabled={isEdit}
              inputProps={{maxLength: 16}}
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["itemTitle"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["itemName"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>{t("item Name")}</label>
            <Input
              {...register("itemName")}
              className={classes.input}
              placeholder={t("Enter item Name")}
              disabled={isEdit}
              inputProps={{maxLength: 16}}

            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["itemName"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["donationAmount"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>{t("Amount")}</label>
            <Input
              {...register("donationAmount")}
              className={classes.input}
              inputProps={{
                min: 0,
              }}
              placeholder={"Enter Donation Amount"}
              disabled={isEdit}
              type={"number"}
              endAdornment= {<Box zIndex='1'>{CoinSelector()}</Box>}
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {typeof watch("donationAmount") === "number" &&
              errors["donationAmount"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["duration"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>{t("Duration")}</label>
            <Input
              {...register("duration")}
              className={classes.input}
              inputProps={{
                min: 0,
              }}
              placeholder={"Enter Duration"}
              disabled={isEdit}
              type={"number"}
              endAdornment={
                <p style={{ margin: "0px 10px", fontSize: 14 }}>{t("Days")}</p>
              }
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {typeof watch("duration") === "number" &&
              errors["duration"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["details"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>{t("Details")}</label>
            <Input
              {...register("details")}
              className={classes.input}
              placeholder={t("Enter your item's details")}
              disabled={isEdit}
              multiline={true}
              inputProps={{maxLength: 50}}

            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["details"]?.message}
          </p>
        </>
      </Grid>
    );
  }

  function CoinSelector() {
     return (
       <InputAdornment position="end">
         <Select
           className={classes.select}
           value={watch("coinName")}
           onChange={(event) => setValue("coinName", event.target.value)}
           disabled={isEdit}
         >
           {tokensDetails.map((item, index) => (
             <MenuItem
               key={index}
               value={item.name}
               style={{
                 padding: "5px",
                 display: "flex",
                 alignItems: "center",
                 gap: 5,
               }}
             >
               <p style={{ margin: 0, width: 50 }}>{item.name}</p>
               <img src={"/"+ item.img} style={{ width: 25 }} />
             </MenuItem>
           ))}
         </Select>
       </InputAdornment>
     );
   }


  async function createitem(data) {
    try {
        const formData = new FormData();
        // Append text fields first
        formData.append("itemTitle", data.itemTitle);
        formData.append("itemName", data.itemName);
        formData.append("details", data.details);
        formData.append("donationAmount", data.donationAmount);
        formData.append("duration", `${data.duration} ${data.duration > 1 ? "days" : "day"}`);
        formData.append("coinName", data.coinName);
        // Append URLs as separate fields
        mediaUrls.forEach((url, index) => {
          formData.append(`url${index + 1}`, url); // Appending as url1, url2, ..., url9
      });

        // Convert URLs to File objects and append them
        const filePromises = mediaUrls.map(async (url, index) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], `image${index}.png`, { type: 'image/png' });
        });

        const files = await Promise.all(filePromises);
        files.forEach(file => formData.append("images", file));

        const res = await axios({
          method: "POST",
          url: Apiconfigs.addNft1,
          data: formData,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
        });

        if (res.data.statusCode === 200) {
            toast.success("Item created successfully");
            handleClose();
        } else {
            throw new Error('Failed to create item');
        }
    } catch (err) {
        console.error(err);
        toast.error("An error occurred while creating the item.");
    }
   
}

  async function edititem(data) {
    const formData = new FormData();
    formData.append("_id", itemData._id);
    formData.append("mediaUrl", data.file);
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.editNft,
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token: sessionStorage.getItem("token"),
        },
        onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
      });
      if (res.data.statusCode === 200) {
        toast.success("item edited successfully");
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  }

  function onUploadProgress(progressEvent) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadCounter(percentCompleted);
  }

  function isVideoType(url) {
    return url.includes("video");
  }
};

export default AdditemDialog;

const useStyles = makeStyles(() => ({
  inputContainer: {
    borderWidth: 2,
    borderColor: "#2f0032",
    borderStyle: "solid",
    borderRadius: 5,
    padding: "10px",
    marginBottom: 10,
    transition: "border-color 0.3s ease-in",
    "&:focus-within": {
      borderColor: "rgb(192, 72, 72)",
      "& label": {
        color: "rgb(192, 72, 72)",
        transition: "color 0.3s ease-in",
      },
    },
    "&>label": {
      fontWeight: "500",
      color: "black",
      fontSize: 14,
    },
  },
  deleteIcon: {
    color: 'red', // Set the color property to red
},

  input: {
    width: "100%",
    "&::before": {
      content: "none",
    },
    "&::after": {
      content: "none",
    },
    "&>input": {
      width: "100%",
    },
  },

  select: {
    "&::before": {
      content: "none",
    },
    "&::after": {
      content: "none",
    },
    "& div:focus": {
      background: "transparent",
    },
    "&>div": {
      display: "flex",
      alignItems: "center",
    },
  },

  uploadBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    height: "calc(100% - 10px)",
    border: "2px #ddd solid",
    "&>.MuiButton-label": {
      flexDirection: "column",
    },
  },

  uploadIcon: {
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px #ddd solid",
    borderRadius: "50%",
  },

  buttonContainerStyle: {
    padding: "0px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  submitButton: {

    "&:hover": {
      boxShadow: "0px 0px 0px 0px",
      backgroundColor: "rgba(81, 0, 94, 0.95) !important",
    },
  },

  mediaBox: {
    width: "100%",
    marginBottom: 0,
  },

  mediaBoxInfo: {
    background: "rgba(0,0,0,0.1)",
    marginTop: -6,
    padding: 20,
    borderRadius: "0px 0px 10px 10px",
    height: "50%",
  },

  mediaPreview: {
    width: '100%',  // Same as empty box width
    height: '100px', // Same as empty box height
    overflow: 'hidden', // Ensures no part of the image spills out
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #ccc',  // Optional, for visual consistency
    borderRadius: '5px',       // Optional, matches empty box
},
img: {
    width: 'auto',
    height: '100%', // Ensures the image covers the full height
    maxWidth: '100%',  // Ensures the image width does not exceed the box
},


mediaBoxHeader: {
  width: '100%',
  marginBottom: '10px', // Adjust spacing as needed
  color: '#666',
  textAlign: 'center',
  fontWeight: 'bold',
},


emptyBox: {
  width: '100%',
  height: '40px',
  border: '2px dashed #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
},
plusIcon: {
  fontSize: '24px',
  color: '#ccc',
},

uploadCounter: {
  position: "relative",
  marginTop: 30,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Ensures vertical centering in the column
  alignItems: "center", // Centers content horizontally
  width: '100%', // Ensures it takes the full width of its container
  textAlign: 'center', // Centers any text inside the div
},

  uploadCounterIcon: {
    position: "absolute",
    marginBottom: 20,
    animation: "$upAndDown 2s ease-in-out infinite",
  },

  "@keyframes upAndDown": {
    "0%": {
      top: 0,
    },
    "50%": {
      top: -15,
    },
    "100%": {
      top: 0,
    },
  },
}));
