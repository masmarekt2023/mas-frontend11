import React, { useContext, useState } from 'react'
import { TableCell, TableRow, Typography, Button, Box, Avatar ,Dialog,DialogTitle,DialogContent,DialogContentText } from '@mui/material/'
import { makeStyles } from '@mui/styles';
import { DonationPopUp } from 'src/component/Modals/DonationPopUp'
import { tokensDetails } from "src/constants";
import { useNavigate } from 'react-router-dom'
import { sortAddress } from "src/utils"
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import { color } from 'framer-motion';
import { UserContext } from "src/context/User";
import BalanceBox from './ui/BalanceBox';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';





const useStyles = makeStyles(() => ({
  tbody: {
    backgroundColor:"#cdc8c8",
    
  },
  createButton: {
    background: "linear-gradient(to bottom right, #760072, #2d013a)",
    margin: '0px 10px',
  },
}))
export default function ChildTableUser({ row, index }) {
  const classes = useStyles();
  // const {t} = useTranslation();
        const {t} = useTranslation();
  
  const [openDonation, setOpenDonation] = useState(false)
  const [openBalance, setOpenBalance]  = useState(false)
  const navigate = useNavigate()
  const mastoken = tokensDetails[0];
  const user = useContext(UserContext);
const userID = user.userData._id;
  console.log("hrrr",userID)

const handleOpenBalance = () => {
      setOpenBalance(true);
}

const handleCloseBalance = () => {
  setOpenBalance(false);
}

    const [selectedToken, setSelectedToken] = useState(tokensDetails[0]);
  

    const availableBalance = {
      masBalance : parseFloat(user.userData.masBalance),
      fdusdBalance : parseFloat(user.userData.fdusdBalance),
      usdtBalance : parseFloat(user.userData.usdtBalance),
    }

  return (
    <>
      <TableRow className={classes.tbody} key={row.coinName}>

        <TableCell
        >
          {/* {index + 1} */}
          <Avatar
            style={{ width: "40px", height: "40px", backgroundColor: "#999" ,borderRadius:"20px" }}
            src={row.profilePic ? row.profilePic : "/assets/Images/profile.jpg"}
            alt=""
          />
        </TableCell>
        {/* Start Second Row */}
        <TableCell
          style={{ cursor: 'pointer', textAlign: 'center' }}
          align="Center"
          onClick={() =>
            navigate('/user-profile/' + row.userName)
          }
        >
          <Box
            style={{

              alignItems: "center",
              justifyContent: 'flex-start'
            }}>

            <Box align='left' ml={2} >
              <Typography align="center" variant='h6' style={{ color: " #43005e", fontSize: "20px", minWidth: "120px", }}>
                {row.name ? row.name : ''} {' '}
              </Typography>
              {/* <Typography variant='h5'>
                {' '} @{row.userName}
              </Typography> */}
              {/* <Typography variant='body2'>
                {sortAddress(row.ethAccount?.address)}

              </Typography> */}
            </Box>
          </Box>
        </TableCell>
        {/* End Secound Row */}

        {/* Start Third Row */}
        <TableCell style={{  color : "white" ,textAlign:"center"}} align="Center">
         
         {(userID == row._id)? 
         <Button
         className={classes.createButton}
         onClick={() => handleOpenBalance()}
          color='white'
         style={isMobile ? { padding: "" } : { padding: "4px 8px !important", lineHeight: "1.3",textAlign:"center" }}
       >
              {t("Check Balance")}
       </Button>
          : <Button
            className={classes.createButton}
            onClick={() => setOpenDonation(true)}
             color='white'
            style={isMobile ? { padding: "" } : { padding: "4px 8px !important", lineHeight: "1.3",textAlign:"center" }}
          >
                 {t("Transfer Funds")}
          </Button>}
         
         
          
          
        </TableCell>
        {/* End Third Row */}

        {/* Start Fourth Row */}
        <TableCell style={{ color: 'black' ,textAlign:"center"}} align="Center">
          <Typography variant='h5'>
            {/* {row.followers ? row.followers.length : 'N/A'} */}
            {row.walletAddress}
            <CopyToClipboard
              text={row?.ethAccount?.address}
              style={{ cursor: "pointer", marginLeft: "5px" ,color:" #43005e" }}
            >
              <FiCopy onClick={() => toast.info("Copied")} />
            </CopyToClipboard>
          </Typography>
        </TableCell>
        {/* End Fourth Row */}

        {/* Start Fivth Row */}
        <TableCell style={{ color: 'black',textAlign:"center" }} align="Center">
          <Typography variant='h5'>
            {/* {row.supporters ? row.supporters.length : 'N/A'} */}
            {row.speciality}

          </Typography>
        </TableCell>
        {/* Start Fivth Row */}

        {/* Start Fivth Row */}
        {/* <TableCell style={{ color: 'black' }} align="Center">

          <Typography variant='h5'>
            {parseFloat(row.masBalance).toFixed(2)}
          </Typography>

        </TableCell> */}
        {/*End Fivth Row */}

        {/* Start six Row */}
        {/* <TableCell style={{ color: 'black' }} align="Center">

          <Typography variant='h5'>
            {parseFloat(row.referralBalance).toFixed(2)}
          </Typography>


        </TableCell> */}
        {/* End six Row */}



      </TableRow>

      <DonationPopUp
        open={openDonation}
        handleClose={() => setOpenDonation(false)}
        userData={row}
      />

<Dialog open={openBalance} onClose={handleCloseBalance} maxWidth="sm" fullWidth disableScrollLock={true}>
<DialogTitle>
  <Typography variant='h3' color='rgb(33, 0, 46)'>{t("Your Balance")}</Typography>
  <DialogContent align="center" dir='ltr'>
    <BalanceBox
    availableBalance={availableBalance}
    tokensDetails={tokensDetails}
    />
 <Link to={"/buymas"}><Button className={classes.createButton} sx={{color:" #ffffff" ,marginTop:"20px"}}>{t("Buy MAS")}</Button></Link>
  </DialogContent>
</DialogTitle>


</Dialog>



    </>
  )
}


// const useStyles = makeStyles(() => ({
//   tbody: {
//     minWidth: 320,
//     border: '1px solid #e5e3dd',
//     '& th': {
//       border: '1px solid #e5e3dd',
//       width: "50px!important"
//     },
//     '& td': {
//       border: '1px solid #e5e3dd',
//       // width: "10px!important",
//     },
//   },
//   createButton: {
//     color: '#fff',
//     background: "linear-gradient(to bottom right, #640D5F, rgb(199, 113, 238))",
//     margin: '0px 10px',
//   },
// }))
// export default function ChildTableUser({ row, index }) {
//   const classes = useStyles()
//   const [openDonation, setOpenDonation] = useState(false)
//   const navigate = useNavigate()
//   const mastoken = tokensDetails[0];
//   return (
//     <>
//       <TableRow className={classes.tbody} key={row.coinName}>

//         <TableCell
//           classsName={classes.img}
//           style={{ color: 'black', width: "50px!important", padding: "5px!important" }}
//           align="Center"
//           component="th"
//           scope="row"
//         >
//           {/* {index + 1} */}
//           <Avatar
//             style={{ width: "60px", height: "60px", backgroundColor: "#999" }}
//             src={row.profilePic ? row.profilePic :
//               `https://avatars.dicebear.com/api/miniavs/${row._id}.svg`}
//             alt=""
//           />
//         </TableCell>
//         {/* Start Second Row */}
//         <TableCell
//           style={{ cursor: 'pointer', textAlign: 'center' }}
//           align="Center"
//           onClick={() =>
//             navigate('/user-profile/' + row.userName)
//           }
//         >
//           <Box
//             style={{

//               alignItems: "center",
//               justifyContent: 'flex-start'
//             }}>

//             <Box align='left' ml={2} >
//               <Typography align="center" variant='h6' style={{ color: "#842448", fontSize: "20px", minWidth: "120px", }}>
//                 {row.name ? row.name : ''} {' '}
//               </Typography>
//               {/* <Typography variant='h5'>
//                 {' '} @{row.userName}
//               </Typography> */}
//               {/* <Typography variant='body2'>
//                 {sortAddress(row.ethAccount?.address)}

//               </Typography> */}
//             </Box>
//           </Box>
//         </TableCell>
//         {/* End Secound Row */}

//         {/* Start Third Row */}
//         <TableCell style={{  width: "20px!important", padding: "5px!important" }} align="Center">
//           <Button
//             className={classes.createButton}
//             onClick={() => setOpenDonation(true)}

//             style={isMobile ? { padding: "" } : { padding: "4px 8px !important", lineHeight: "1.3" }}
//           >
//             Transfer Funds
//           </Button>
//         </TableCell>
//         {/* End Third Row */}

//         {/* Start Fourth Row */}
//         <TableCell style={{ color: 'black' }} align="Center">
//           <Typography variant='h5'>
//             {/* {row.followers ? row.followers.length : 'N/A'} */}
//             {sortAddress(row.walletAddress)}
//             <CopyToClipboard
//               text={row?.ethAccount?.address}
//               style={{ cursor: "pointer", marginLeft: "3px" }}
//             >
//               <FiCopy onClick={() => toast.info("Copied")} />
//             </CopyToClipboard>
//           </Typography>
//         </TableCell>
//         {/* End Fourth Row */}

//         {/* Start Fivth Row */}
//         <TableCell style={{ color: 'black' }} align="Center">
//           <Typography variant='h5'>
//             {/* {row.supporters ? row.supporters.length : 'N/A'} */}
//             {row.speciality}

//           </Typography>
//         </TableCell>
//         {/* Start Fivth Row */}

//         {/* Start Fivth Row */}
//         {/* <TableCell style={{ color: 'black' }} align="Center">

//           <Typography variant='h5'>
//             {parseFloat(row.masBalance).toFixed(2)}
//           </Typography>

//         </TableCell> */}
//         {/*End Fivth Row */}

//         {/* Start six Row */}
//         {/* <TableCell style={{ color: 'black' }} align="Center">

//           <Typography variant='h5'>
//             {parseFloat(row.referralBalance).toFixed(2)}
//           </Typography>


//         </TableCell> */}
//         {/* End six Row */}



//       </TableRow>

//       <DonationPopUp
//         open={openDonation}
//         handleClose={() => setOpenDonation(false)}
//         userData={row}
//       />
//     </>
//   )
// }
