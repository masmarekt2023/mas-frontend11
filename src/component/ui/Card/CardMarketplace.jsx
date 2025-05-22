import React, { useState, useContext, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiconfigs, { pageURL } from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import {
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Input,
  CardActions,
  IconButton,
  Button,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Dialog from "@mui/material//Dialog";
import DialogTitle from "@mui/material//Dialog";
import DialogContent from "@mui/material//DialogContent";
import DialogContentText from "@mui/material//DialogContentText";
import { red } from "@mui/material//colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import Card  from "./Card";
import ReactPlayer from "react-player";
import AdditemDialog from "../../AddItemDialog";
import CloseIcon from '@mui/icons-material/Close';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import bwipjs from 'bwip-js';
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { transform } from "lodash";
import { useTranslation } from 'react-i18next';
import "./cardComponent.css";



const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 300,
      maxHeight: 420,
      margin: 10,
      textAlign: "left",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      cursor: "pointer",
    },
    expand: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      padding: "0 10px",
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      backgroundColor: red[500],
      cursor: "pointer",
    },
  }));
const CardMarketplace = ({data}) => {
    
    
  const navigate = useNavigate();
  const classes = useStyles();
  const auth = useContext(UserContext);
  const {t} = useTranslation();


  const [isLike, setisLike] = useState(false);
  const [nbLike, setnbLike] = useState(0);
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [isBuyed, setisBuyed] = useState(false);
  const [activeBuy, setActiveBuy] = useState(true);
  const [nbBuyed, setnbBuyed] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [isVideo, setisVideo] = useState(false);
  const [openBillingDialog, setOpenBillingDialog] = useState(false); // Manages the billing dialog
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openMenu = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  let itemData = data;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen2 = () => {
    setOpenSubscribe(false);
    setOpen2(true);
  };
  let userId =
    typeof itemData.userId === "object" &&
    !Array.isArray(itemData.userId) &&
    itemData.userId !== null
      ? itemData.userId._id
      : itemData.userId;
  const isUseritem = auth?.userData?._id === userId;
  let userName = itemData.userId.userName || itemData.userDetail.userName;
  let userSpeciality =
    itemData.userId?.speciality || itemData.userDetail?.speciality;
  let profilePic =
    itemData?.userId?.profilePic ||
    itemData?.userDetail?.profilePic ||
"/assets/Images/profile.jpg"  
  const groupedImages = [
    [itemData.mediaUrl1, itemData.mediaUrl2, itemData.mediaUrl3],
    [itemData.mediaUrl4, itemData.mediaUrl5, itemData.mediaUrl6],
    [itemData.mediaUrl7, itemData.mediaUrl8, itemData.mediaUrl9],
  ];


 const subscribeToBundleHandler = async () => {
          setIsloading(true);
          await axios({
            method: "GET",
            url: Apiconfigs.order + itemData._id,
            headers: {
              token: sessionStorage.getItem("token"),
            },
          })
            .then(async (res) => {
              setIsloading(false);
              if (res.data.statusCode === 200) {
                setisBuyed(res.data.result.buyed === "yes");
                setnbBuyed(res.data.result.nb);
                setActiveBuy(true);
                setOpen2(false);
                toast.success("Buy Successfully");
                navigate("/items-details?" + itemData?._id);
              } else {
                toast.error(res.data.responseMessage);
              }
            })
            .catch((err) => {
              setIsloading(false);
              console.log(err.message);
              toast.error(err?.response?.data?.responseMessage);
            });
        };
 const unSubscribeToBundleHandler = async () => {
          setIsloading(true);
          await axios({
            method: "DELETE",
            url: Apiconfigs.unSubscription + itemData?._id,
            headers: {
              token: sessionStorage.getItem("token"),
            },
          })
            .then(async (res) => {
              setIsloading(false);
              if (res.data.statusCode === 200) {
                setIsloading(false);
                toast.success("You have unbuyed successfully.");
                setisBuyed(false);
                setnbBuyed((nb) => nb - 1);
              } else {
                toast.error("Something went wrong");
              }
            })
            .catch((err) => {
              toast.error("Something went wrong");
            });
        };
 const likeDislikeNft1handler = async (id) => {
          if (auth.userData?._id) {
            try {
              const res = await axios.get(Apiconfigs.likeDislikeNft1 + id, {
                headers: {
                  token: sessionStorage.getItem("token"),
                },
              });
              if (res.data.statusCode === 200) {
                setisLike((liked) => !liked);
                setnbLike((nb) => (isLike ? nb - 1 : nb + 1));
              } else {
                setisLike(false);
                toast.error(res.data.responseMessage);
              }
            } catch (error) {
              console.log("ERROR", error);
            }
          } else {
            toast.error("Please login");
          }
        };
useEffect(() => {
          setnbLike(itemData.likesUsers.length);
          setnbBuyed(itemData.subscribers.length);
          if (auth.userData?._id) {
            setisLike(itemData.likesUsers?.includes(auth.userData._id));
            setisBuyed(itemData.subscribers?.includes(auth.userData._id));
          }
          if (auth.userData._id && itemData._id) {
            //getSubscription().catch(console.error);
          }
        }, []);      

 function BillingDialog({ open, onClose }) {
          const [formData, setFormData] = useState({
              name: '',
              surname: '',
              phoneNumber: '',
              email: '',
              postcode: '',
              address1: '',
              address2: '',
              serialNumber: '',
          });
          const [error, setError] = useState('');
          const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
          const isMounted = useRef(true);
          const [showBillDialog, setShowBillDialog] = useState(false);
          const [showPurchaseDialog, setshowPurchaseDialog] = useState(false);
          const [billPdfUrl, setBillPdfUrl] = useState(null);
      
      
          useEffect(() => {
            // Function to generate the serial number
            const generateSerialNumber = () => {
                const now = new Date();
                return 'SN' + now.getFullYear().toString() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(3, '0') + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            };
        
            if (open) {
                const newSerialNumber = generateSerialNumber();
                setFormData(prevFormData => ({
                    ...prevFormData,
                    serialNumber: newSerialNumber  // Set the new serial number
                }));
            }
        
            // Cleanup function
            return () => {
                isMounted.current = false;
            };
        }, [open]);  // Dependency array includes `open` to trigger the effect when it changes
        
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
              ...prevState,
              [name]: value,
          }));
      };
      
          const handleSubmit = async () => {
              try {
                  console.log("data:", formData);
                  const res = await axios({
                      method: "PUT",
                      url: Apiconfigs.bill,
                      data: formData,
                      headers: {
                          token: sessionStorage.getItem("token") || "default-token",
                      },
                  });
      
                  console.log("Response from server:", res.data);
                  if (res.status !== 200) {
                      throw new Error('Form submission failed with status: ' + res.status);
                  }
              } catch (error) {
                  console.error("Error submitting form:", error);
                  if (isMounted.current) {
                      setError("Failed to submit form: " + error.message);
                  }
              }
          };
      
          const buyNow = async () => {
              try {
                  console.log("Initiating purchase:");
                  console.log("Data needed:", itemData.details, itemData.coinName, itemData.donationAmount,userName);
                  console.log("sellerId", userId);
                  console.log("ItemId", itemData._id);
                  console.log("buyerId",auth.userData._id );
                  const response = await axios({
                      method: "PUT",
                      url: Apiconfigs.order ,
                      data: {
                          //sellerId:userId, 
                          userBuyer:auth.userData._id,
                          nft1Id: itemData._id,
                          //mediaUrl: itemData.mediaUrl1,
                          //details: itemData.details,
                          //tokenName: itemData.coinName,
                          //Price: itemData.donationAmount,
                          
                      },
                      headers: {
                        token: sessionStorage.getItem("token"),
                      },
                  });
      
                  console.log("Order response:", response.data);
                  if (response.status !== 200) {
                    throw new Error('Order placement failed with status: ' + response.status);
                }
                if (isMounted.current) {
                    //setShowConfirmationDialog(true);
                    //setShowBillDialog(true);
                    setshowPurchaseDialog(true);
                }
            } catch (error) {
                console.error("Order placement error:", error);
                if (isMounted.current) {
                    if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
                        setError("Failed to place order: your balance is low");
                    } else {
                        setError("Failed to place order: " + error.message);
                    }
                }
            }
        };
      
        const handleBuy = async () => {
          // First validate all fields
          const requiredFields = ["name", "surname", "phoneNumber", "email", "postcode", "address1", "serialNumber"];
          const emptyFields = requiredFields.filter(field => !formData[field]?.trim());
          
          if (emptyFields.length > 0) {
            setError(`Please fill in all required fields: ${emptyFields.join(", ")}`);
            return; // Stop execution if fields are empty
          }
        
          try {
            await handleSubmit();
            await buyNow();
          } catch (error) {
            console.error("Unable to complete purchase:", error.message);
            setError(error.message);
          }
        };
        
        const generatePDF = async (formData, itemData) => {
          const doc = new jsPDF();

          // Get current date and time
          const now = new Date();
          const formattedDate = now.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
          const formattedTime = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
      
          const serialNumber = formData.serialNumber;  // Generate serial number
          console.log("serialNumber:",serialNumber);
      
          // Create an element to render the barcode into (a canvas)
          const canvas = document.createElement("canvas");
          let barcodeDataUrl = null; // Declare outside to widen scope
      
          try {
              bwipjs.toCanvas(canvas, {
                  bcid: 'code128',       // Barcode type
                  text: serialNumber,    // Text to encode
                  scale: 3,              // 3x scaling factor
                  height: 10,            // Bar height, in millimeters
                  includetext: true,     // Include text in the barcode
                  textxalign: 'center',  // Center-align text
              });
      
              barcodeDataUrl = canvas.toDataURL("image/png"); // Convert canvas to data URL
          } catch (error) {
              console.error('Barcode generation failed:', error);
              // Consider handling the failure case, possibly with a fallback or a message
          }
      
          const tableColumn = ["Field", "Value"];
          const tableRows = [];
      
          // Extract data from formData to populate the table
          Object.entries(formData).forEach(([key, value]) => {
              const field = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
              const rowData = [field, value];
              tableRows.push(rowData);
          });
      
          // Additional data from itemData
          tableRows.push(["Price", `${itemData.donationAmount} ${itemData.coinName}`]);
          tableRows.push(["Details", `${itemData.details}`]);
          tableRows.push(["Serial Number", serialNumber]);
          tableRows.push(["Date", formattedDate]);  // Add formatted date
          tableRows.push(["Time", formattedTime]);  // Add formatted time
      
          // Title of the document
          doc.text("Billing Information", 14, 15);
          // Adding the table to the PDF
          autoTable(doc, {
              head: [tableColumn],
              body: tableRows,
              startY: 40,
          });
      
          // If barcode is generated, position it at the top right
          if (barcodeDataUrl) {
            // Assuming the width of your barcode is about 50mm (adjust as necessary)
            const pageWidth = 210;  // A4 width in mm
            const barcodeWidth = 50;  // Width in mm
            const marginRight = 10;  // Right margin in mm
            const marginTop = 10;    // Top margin in mm
            doc.addImage(barcodeDataUrl, 'PNG', pageWidth - marginRight - barcodeWidth, marginTop, barcodeWidth, 20); // Height adjusted to 20mm
        }
        
      // Generate a Blob from the PDF
    const pdfBlob = doc.output("blob");

    try {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setshowPurchaseDialog(true);
        //setShowBillDialog(true);
        setBillPdfUrl(pdfUrl);
    } catch (error) {
        console.error('Error creating Blob URL:', error);
    }
};
          const downloadPDF = () => {
            console.log("Preparing to display bill...");
            
            generatePDF(formData, itemData);
            
        };
        const handlePreviewBill = async () => {
          setShowBillDialog(true);
          await generatePDF(formData, itemData); // Generate PDF and set URL
      };
        const handleCancel = () => {
          setShowConfirmationDialog(false);  // Close dialog on cancel
          setShowBillDialog(false);
          onClose();  // Also close the main dialog
          setOpen2(false);
          };
        
        
          return (
            <>
             <Dialog
             disableScrollLock={true}
  open={open}
  onClose={onClose}
  aria-labelledby="billing-dialog-title"
  maxWidth="sm"
  fullWidth={true}
>
  <DialogTitle id="billing-dialog-title">{t("Billing Information")}</DialogTitle>
  <DialogContent>
    <Typography variant="body1" sx={{color:"#2f0032"}}>
      {t("Please enter your billing information below:")}
    </Typography>
    {error && <Typography color="error">{error}</Typography>}
    
    {["name", "surname", "phoneNumber", "email", "postcode", "address1", "address2", "serialNumber"].map((item) => (
      <TextField
        key={item}
        margin="dense"
        label={`${item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1').trim()}${["address2"].includes(item) ? "" : ""}`}
        type={item === "phoneNumber" ? "number" : "text"}  // Set type to "number" for phoneNumber
        fullWidth
        name={item}
        value={formData[item]}
        onChange={handleChange}
        required={!["address2"].includes(item)} // address2 is optional
        error={error?.includes(item) && !formData[item]?.trim()}
        helperText={error?.includes(item) && !formData[item]?.trim() ? "This field is required" : ""}
        inputProps={{
          inputMode: item === "phoneNumber" ? "numeric" : "text",
          pattern: item === "phoneNumber" ? "[0-9]*" : undefined,
          min: item === "phoneNumber" ? "0" : undefined,
          style: {
            // Hide arrows in most browsers
            MozAppearance: item === "phoneNumber" ? 'textfield' : undefined,
            WebkitAppearance: item === "phoneNumber" ? 'none' : undefined,
            appearance: item === "phoneNumber" ? 'none' : undefined,
            margin: 0
          }
        }}
        sx={item === "phoneNumber" ? {
          // Hide arrows in Chrome/Safari
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          },
          // Hide arrows in Firefox
          '& input[type=number]': {
            MozAppearance: 'textfield'
          }
        } : undefined}
      />
    ))}
  </DialogContent>
  <br />
  <Box textAlign="center" justifyContent="space-around" display="flex" width="100%">
    <Button onClick={onClose} sx={{color:"#2f0032"}}>{t("Cancel")}</Button>
    <Button 
      onClick={handleBuy} 
      color="secondary" 
      variant="contained" 
      style={{background:"#2f0032",color:"white" }}
      disabled={Object.keys(formData).some(key => 
        !["address2"].includes(key) && !formData[key]?.trim()
      )}
    >
      {t("Buy Now")}
    </Button>
  </Box>
  <br />
</Dialog>
              
              <Dialog disableScrollLock={true} open={showConfirmationDialog} onClose={() => {}} aria-labelledby="successed-dialog-title" maxWidth="sm" fullWidth={true}>
                  <DialogTitle id="successed-dialog-title" align="center" sx={{fontSize:"20px" ,color:"#2f0032"}}>{t("successed Purchase")}</DialogTitle>
                  <DialogContent>
                      <Typography variant="body1"> {t("Your purchase was successful. You can download your bill now.")}</Typography>
                      <Box textAlign="center" mt={2}>
                          <Button onClick={downloadPDF} color="secondary" variant="contained" sx={{background:"#2f0032",color:"white" }}>{t("Download Bill")}</Button>
                          <Button onClick={handleCancel} sx={{color:"#2f0032"}}>{t("Cancel")}</Button>
                      </Box>
                  </DialogContent>
              </Dialog>
      
              <Dialog open={showPurchaseDialog} onClose={() => {}} aria-labelledby="bill-dialog-title" maxWidth="sm" fullWidth={true}>
            <DialogTitle id="bill-dialog-title">{t("Bill Preview")}</DialogTitle>
            <DialogContent>
            <Typography variant="h6" component="h2" id="successed-dialog-title" gutterBottom align="center" sx={{fontSize:"20px" ,color:"#2f0032"}}> 
            {t("Successful Purchase")}
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
            {t("Your purchase was successful. You can view your bill below:")}
            </Typography>
            <Box textAlign="center" mt={2}>
            <Button onClick={handlePreviewBill}  variant="contained" sx={{backgroundColor:" #2f0032",color:"white" ,"&:hover":{
              backgroundColor:"rgb(99, 0, 96)"
            } }}>{t("View Bill now")}</Button>
            </Box>
            </DialogContent>
            </Dialog>

            <Dialog 
        open={showBillDialog} 
        disableScrollLock={true}
        onClose={() => {}}
        aria-labelledby="bill-dialog-title" 
        maxWidth="sm" 
        fullWidth={true}
          >
           <DialogContent>
            <iframe src={billPdfUrl} style={{ width: '100%', height: '500px', border: 'none' }} title="Bill Preview"></iframe>
            </DialogContent>
            <br />
            <Box textAlign="center" mt={2}>
                <Button onClick={handleCancel} color="primary">{t("Close")}</Button>
                </Box>
                <br />
                
        </Dialog>

       
              </>
          );
      }
      

  const handleOpenImageDialog = (url) => {
    setSelectedImageUrl(url);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const handleCloseParentDialog = () => {
    setOpen2(false); // This assumes `setOpen2` is the state setter for controlling the visibility of the parent dialog
  };
  return (
    <Box dir="ltr"
  className="card-3"
  sx={{
     
    background: (theme) => theme.custom.CarBackGround,
   
  }}
>




<div className="media-contm">

       {isVideo ? (
              <div
                style={{ cursor: "pointer", background: '#000'}}
                onClick={() =>
                  isBuyed || isUseritem
                    ? navigate("/items-details?" + itemData?._id)
                    : handleClickOpen2()
                }
              >
                <ReactPlayer
                  url={itemData.mediaUrl1}
                  muted
                  playing
                  width="100%"
                  height={"166px"}
                />
              </div>
            ) : (
                <img 
                src={itemData.mediaUrl1}   
                onClick={() =>
                    (isBuyed && activeBuy) || isUseritem
                      ? navigate("/items-details?" + itemData?._id)
                      : handleClickOpen2()
                  }
                    /> 
                  
              
            )}</div>
               <div className="contentContainer">


               <Typography
       variant="h6"
       component="h6"
       style={{ color: "white", fontWeight: "bold" }}
     >
       {itemData.itemName}
     </Typography>
<Typography
       variant="h6"
       component="h6"
       style={{ color: "white", fontWeight: "bold", marginTop: 5,marginBottom :'10px' }}
     >
      {"( "}
          {itemData?.donationAmount
            ? itemData?.donationAmount
            : "Any amount"}{" "}
          {" )"}{" "}
          {itemData && itemData.coinName ? itemData.coinName : "MAS"}{" "}
     </Typography>
    

{/* info Card */}
   <Card
     titel={userName}
     text={userSpeciality}
     imgsrc={profilePic}
     AvatarClick={() => {
        navigate("/user-profile/" + userName);
  
      }}
   />

<div
            className="buttons"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
            }}
          >

       
        {auth.userData &&
          auth.userLoggedIn &&
          auth.userData._id !== userId &&
          isBuyed && (
            <Button
              className="primary"
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "12px",
                padding: "2px 3px",
              }}
              disabled={isBuyed && activeBuy}
              onClick={() => (activeBuy ? {} : handleClickOpen2())}
            >
              {activeBuy ? t("Bought") : t("Renew")}
            </Button>
          )}
        {auth?.userData?._id !== userId && !isBuyed && (
          <Button className="primary"
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: "12px",
            padding: "2px 3px",
          }} onClick={handleClickOpen2}>
            {t("Details")}
          </Button>
        )}
        {auth.userData && auth.userLoggedIn && auth.userData._id === userId && (
          <Button
            className="primary"
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
              padding: "2px 3px",
            }}
            onClick={() => navigate("/items-details?" + itemData?._id)}
          >
            {t("View")}
          </Button>
        )}
         <div
         style={{display : 'flex' ,margin:'10px' }}
          aria-label="add to favorites"
          onClick={() => likeDislikeNft1handler(itemData._id)}
        >
          <FavoriteIcon
             style={isLike ? {color: ' #FD1D1D' ,fontSize:"20px" } : { color:' #ffffff6e',fontSize:"20px"  }}/>

      <span style={{color: 'white',marginLeft:'5px',fontSize: "12px"} }>{nbLike}</span>
        </div>
        
    
 {/* edit */}
 <Dialog
        open={open}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock={true}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: "rgb(77, 0, 84)", margiBottom: "10px" }}
            >
              {itemData.itemTitle}
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <label>{t("Donation Amount")}</label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="standard-basic"
                    placeholder="30"
                    className={classes.input_fild2}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              style={{
                paddingBotton: "10px",
                borderBottom: "solid 0.5px #e5e3dd",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <label>{t("Duration")}</label>
                </Grid>
                <Grid item xs={12} md={8} className={classes.donation}>
                  <span>7 {t("Days")}</span>
                  <span>14 {t("Days")}</span>
                  <span>30 {t("Days")}</span>
                  <span>60 {t("Days")}</span>
                  <span>1 {t("Year")}</span>
                  <span>{t("Forever")}</span>
                </Grid>
              </Grid>
            </Box>

            <Box align="center">
              <label> {t("Services")}:</label>
              <Typography
                variant="body2"
                componant="p"
                style={{ color: "#000", fontSize: "20px" }}
              >
                {t("I will send you a special video every")} <br />
                {t("month specially for you! (edit)")}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <small>
                {t("Change/upload a photo or video")}
                <input type="file" />
              </small>
              <img src="/images/Rectangle.png" alt="" />
            </Box>
            <Box mt={4}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item md={4}>
                  <Link style={{ color: "#000" }} onClick={handleClose}>
                    {t("Delete this item")}
                  </Link>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{background:"#2f0032",color:"white" }}
                    onClick={handleClose}
                  >
                    {t("Cancel")}
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{background:"#2f0032",color:"white" }}
                    onClick={handleClose}
                  >
                    {t("Save Changes")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* view */}
      <Dialog
        open={open1}
        disableScrollLock={true}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: "#792034", margiBottom: "10px" }}
            >
              {t("item")} I
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{ color: "#000", borderBottom: "solid 0.5px #e5e3dd" }}
            >
              {t("My basic supporter")}
            </Typography>

            <Box align="center" mt={3}>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Donation amount")}: </span>10
                MAS
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Duration")}: </span>{t("One month")}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Number of buyers")}:</span>
                100
              </Typography>
            </Box>

            <Box align="center">
              <label> {t("Services")}:</label>
              <Typography
                variant="body2"
                componant="p"
                style={{ color: "#000", fontSize: "20px" }}
              >
               {t("I will send you a special video every")} <br />
               {t("month specially for you!")}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <img src="/images/Rectangle.png" alt="" />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      
      
      {/* buy now */}
      <Dialog
  fullWidth
  disableScrollLock={true}
  maxWidth="md"
  open={open2}
  onClose={handleClose2}
  aria-labelledby="max-width-dialog-title"
  disableBackdropClick={isLoading}
  disableEscapeKeyDown={isLoading}
  PaperProps={{
    sx: {
      backgroundImage: 'url(/assets/Images/doodle2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      
    }
  }}
>
  <DialogContent sx={{ overflow:{xs: "auto", sm: "hidden"} , padding: { xs: 2, sm: 3 } }} dir="ltr">
    <Box sx={{
            background:"rgba(255, 255, 255, 0.68)",
            padding:"20px",
            borderRadius:"20px"
          }}>
   

    {/* Big Image and Details */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on larger screens
        gap: { xs: 2, md: 3 }, // Add spacing between elements
        width: "100%",
      }}
    >
      {/* Big Image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={selectedImage ? selectedImage : itemData.mediaUrl1}
          alt="Selected"
          style={{
            width: "100%",
            maxWidth: "370px",
            height: "300px", // Make height responsive
            objectFit: "cover",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        />
      </Box>

      {/* Details Box */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2, // Add spacing between items
          backgroundColor: " #2f0032",
          borderRadius: "20px",
          padding: { xs: "10px", sm: "15px" },
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        {[
          { label: t("Title"), value: itemData.itemTitle },
          { label: t("Name"), value: itemData.itemName },
          { label: t("Price"), value: `${itemData.donationAmount} ${itemData.coinName}` },
          { label: t("Details"), value: itemData.details },
          { label: t("Owner"), value: userName },
          { label: t("Speciality"), value: userSpeciality },
        ].map((item, index) => (
          <Typography
            key={index}
            variant="h4"
            align="left"
            sx={{
              color: "#000",
              fontWeight: "bold",
              backgroundColor: "rgb(240, 240, 240)",
              borderRadius: "20px",
              padding: "5px",
            }}
          >
            {item.label}: <span>{item.value}</span>
          </Typography>
        ))}
      </Box>
    </Box>

    {/* Thumbnail Images */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems:"center",
          justifyContent:"center",
          gap: 0, // Adds spacing between images
          flexWrap:"wrap",
          overflowX: "auto", // Allows horizontal scrolling if there are too many images
          padding: 1, // Adds some padding at the bottom
          background:" #2f0032",
          borderRadius:"10px",
          width: "fit-content", // Ensures the Box only takes up as much space as its content
          boxShadow:" 0 4px 8px rgba(0, 0, 0,0.5)",
          maxWidth: "100%", // Prevents the Box from exceeding the parent container's width
        }}
      >
        {groupedImages.flat().map((url, idx) => (
          <Box
            key={idx}
            sx={{
              flexShrink: 0,
              cursor: "pointer",
              borderRadius: "10px",
              "&:hover": {
                transform: "scale(1.07)",
              },
            }}
            onClick={() => handleImageClick(url)}
          >
            {url && (
              <img
                src={url}
                alt={`Thumbnail ${idx}`}
                style={{
                  width: "60px", // Fixed width for thumbnails
                  height: "60px", // Fixed height for thumbnails
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "2px solid white",
                    margin:"0 2px"
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>

    {/* Buttons */}
   {/* Buy Now and Cancel Buttons */}
 {auth.userLoggedIn && (
    <Box mt={2} mb={0} textAlign="center" display="flex" justifyContent="right">
    
     <Button
       className={classes.BuyButton}
       onClick={() => setOpenBillingDialog(true)}
       color="secondary"  // This gives the button a distinctive color, usually the primary theme color
       variant="contained"  // This makes the button have a filled style
       disabled={isLoading}
       style={{background:"#2f0032",color:"white" }}
     >
       {isLoading ? t("Pending...") : t("Buy Now")}
       {isLoading && <ButtonCircularProgress />}
     </Button>
     &nbsp;&nbsp;
     <Button className={classes.LoginButton} onClick={handleClose2}  style={{background:"#2f0032",color:"white" }} >
       {t("Cancel")}
     </Button>
   </Box>
   )}
   <BillingDialog
   open={openBillingDialog}
   onClose={() => setOpenBillingDialog(false)}
   onSuccessfulPurchase={handleCloseParentDialog} 
 />
 
   
 
   {/* Login and Subscribe Buttons */}
   {!auth.userLoggedIn && (
     <Box mt={3} mb={3} textAlign="center" display="flex" justifyContent="right">
       <Button
         className={classes.LoginButton}
         onClick={() => {
           navigate("/login");
         }}
         style={{background:"#2f0032",color:"white" }}
 
       >
         {t("Login")}
       </Button>
       &nbsp;&nbsp;
       <Button className={classes.LoginButton} onClick={handleClose2}  style={{background:"#2f0032",color:"white" }} >
         {t("Cancel")}
       </Button>
     </Box>
   )}
   </Box>
  </DialogContent>
      {/* New Image Dialog */}
      <Dialog
        open={openImageDialog}
        disableScrollLock={true}
        onClose={handleCloseImageDialog}
        aria-labelledby="image-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <IconButton
          onClick={handleCloseImageDialog}
          style={{ position: 'absolute', right: '10px', top: '10px' }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <img src={selectedImageUrl} alt="Selected" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>

      </Dialog>

      <Dialog
        open={open3}
        disableScrollLock={true}
        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.dilogBody}>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h4" align="center" style={{ color: "#000" }}>
              {t("Enter an amount")}
            </Typography>
            <Box mt={4}>
              <Input
                placeholder="300"
                className={classes.input_fild2}
                endAdornment={
                  <InputAdornment position="end">{t("Select a token")}</InputAdornment>
                }
              />
            </Box>

            <Box mt={4}>
              <Typography variant="h4" align="center" style={{ color: "#000" }}>
                {t("Send a message")}
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                className={classes.input_fild}
                defaultValue="Default Value"
                variant="outlined"
              />
            </Box>
            <Box mt={2} mb={4}>
              <Button variant="contained" size="large" color="secondary"  style={{background:"#2f0032",color:"white" }} >
                {t("Donate now")}
              </Button>
            </Box>
            <small>{t("ETH fees and ETH fees and apply. apply.")}</small>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <AdditemDialog
        handleClose={() => setOpenEdit(false)}
        show={openEdit}
        itemData={data}
      />


            </div>

</div>

</Box>
  )
}

export default CardMarketplace
