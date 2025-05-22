import React, { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';  // Ethereum-related functions
import Web3 from 'web3';  // Web3 library for Ethereum interactions
import axios from 'axios';  // For making API requests
import Apiconfigs from "src/Apiconfig/Apiconfigs";  // Custom API config file
import { UserContext } from "src/context/User";  // Custom context for user
import { tokensDetails } from "src/constants";  // Constants for tokens
import BalanceBox from "src/component/ui/BalanceBox";  // Custom component for balance display
import { useTranslation } from 'react-i18next';


import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';  // Material UI v5 components

import { makeStyles } from '@mui/styles';  // Styling solution for your components

import BigNumber from 'bignumber.js';  // BigNumber for handling large values in JS (important for handling tokens, etc.)
import { useWallet } from './WalletContext';  // Custom hook for wallet-related operations
import { ButtonwithAnimation } from '../../../component/ui/Button/button';
import { Padding } from '@mui/icons-material';
import './buymas.css'; 





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90vh',
    background: 'linear-gradient(to right,#280026,#4a004f)',
    color:"white",
    padding: theme.spacing(2),

  },
  balanceContainer: {
    marginBottom: theme.spacing(2),
    width: '90%',
    maxWidth: '600px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    width: '90%',
    maxWidth: '600px',
   
  },
  label: {
    marginRight: theme.spacing(1),
    
    
  },
  textBox: {
    flex: 1,
    
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '200px',
  },
}));

const ConnectWallet = () => {
  const classes = useStyles();
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [chargeDialogOpen, setChargeDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usdtAmount, setUsdtAmount] = useState("");
  const [masAmount, setMasAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(tokensDetails[0]);
  const user = useContext(UserContext);
  const [availableBalance, setAvailableBalance] = useState({});
  const { usdtBalance,fdusdBalance } = useWallet();
  const usdtBalanceInUSDT = usdtBalance.dividedBy(new BigNumber(10).exponentiatedBy(18));
  //const fdusdBalanceInFDUSD = fdusdBalance.dividedBy(new BigNumber(10).exponentiatedBy(18));
  const [metaMaskAddress, setMetaMaskAddress] = useState('');
  const [coin, setCoin] = useState('MAS');
  const [price, setPrice] = useState(null);
        const {t} = useTranslation();
  

  const usdtContractAddress = '0x55d398326f99059fF775485246999027B3197955';
  const usdtContractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// Specify the provider URL for the BSC testnet
  const providerUrl = 'https://cold-nameless-crater.bsc.discover.quiknode.pro/d4669858ede933d6642ec6309ba5089c338ead7c/';
// Instantiate Web3 with the provider URL
  const web3 = new Web3(providerUrl);
  const contract = new web3.eth.Contract(usdtContractABI, usdtContractAddress,providerUrl);
  const adminWalletAddress = '0x12d57224ee2efe9c13b8560372eff6e273ad6d61';

   // Function to calculate Mas amount based on the entered USDT amount
   const calculateMasAmount = (usdtAmount) => {
    // Perform your calculation here
    // For example, let's say Mas amount is 10% of USDT amount
    const masAmount = parseFloat(usdtAmount) * 10; // 10% of USDT amount
    return masAmount.toFixed(2); // Rounded to 2 decimal places
  };
// Function to get MetaMask address
const getMetaMaskAddress = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      setMetaMaskAddress(accounts[0]);
    }
  }
};
// Call the function to get MetaMask address
useEffect(() => {
  getMetaMaskAddress();
}, []);
useEffect(() => {
  // Fetch the current price of MAS coins when the component mounts
  const fetchPrice = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: Apiconfigs.price, // Update the URL to your backend API endpoint
        headers: {
          token: sessionStorage.getItem("token"),
        },
        params: { coin },
      });

      // Check if response data is defined before accessing properties
  if (response.data && response.data.price !== undefined) {
    setPrice(response.data.price);
  } else {
    console.error('Invalid response data:', response.data);
  }
} catch (error) {
  console.error('Error fetching cryptocurrency price:', error.message);
  // You might want to display an error message to the user
}
  };
  fetchPrice();
}, [coin]);
  // Function to handle changes in the USDT amount input field
  const handleUsdtAmountChange = (e) => {
    const { value } = e.target;
    setUsdtAmount(value);
    const calculatedMasAmount = calculateMasAmount(value);
    setMasAmount(calculatedMasAmount);
  };
  useEffect(() => {
    // Function to fetch balances
    const fetchBalances = async () => {
      // Code to fetch balances
    };
    fetchBalances();
  }, [provider, account]);
  // Usage
  const Internalwallet = () => {
    const ethAddress = user?.userData?.ethAccount?.address;
    return ethAddress;
  };
  // Usage
  Internalwallet();
  const walletAddress = Internalwallet();
   console.log(walletAddress); // Use the Ethereum address as needed

  const sendMasToBackend = async () => {
    console.log('Sending Mas amount to backend');
  
    try {
      const response = await axios({
        method: 'POST',
        url: Apiconfigs.Buy, // Replace with your backend API endpoint
        headers: {
          token: sessionStorage.getItem('token'), // Assuming you have a token stored in session storage
        },
        data: {
          masAmount: masAmount, // Pass the masAmount to the backend
          walletAddress: walletAddress,
          // Add any other data you need to send to the backend
        },
      });
  
      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error sending Mas amount to backend:', error.message);
    }
  };
  
  const buymas = async () => {
    setLoading(true);
    try {
      if (window.ethereum) {
        // Requesting user accounts from MetaMask
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
  
        // Check if user approved the request
        if (accounts.length > 0) {
          const walletAddress = accounts[0];
  
          // Specify the amount you want to send in USDT
          const amountInUsdt = usdtAmount; // Replace with the desired amount
  
          // Prepare the transaction data
          const transactionParameters = {
            from: walletAddress,
            to: usdtContractAddress, // USDT contract address
            value: '0x0', // Set value to 0 for token transactions
            data: `0xa9059cbb${ethers.utils.defaultAbiCoder.encode(
              ['address', 'uint256'],
              [adminWalletAddress, ethers.utils.parseUnits(amountInUsdt, 18).toString()]
            ).slice(2)}`,
          };
  
          // Open MetaMask window to confirm the transaction
          const result = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
  
          console.log('Transaction sent:', result);
  
          // Send Mas amount to backend
          await sendMasToBackend(masAmount);
  
          // Reset input fields or perform any other necessary actions
          setUsdtAmount("");
          setMasAmount("");
          
          // Close the charge dialog
          setChargeDialogOpen(false);
  
          // Show the success dialog
          setSuccessDialogOpen(true);
  
          // Automatically close the success dialog after 2 seconds
          setTimeout(() => {
            setSuccessDialogOpen(false);
          }, 6000);
        } else {
          console.error('User denied account access');
        }
      } else {
        console.warn('MetaMask not found');
      }
    } catch (error) {
      console.error('Error buying Mas:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setAvailableBalance({
      masBalance: parseFloat(user.userData?.masBalance),
      fdusdBalance: parseFloat(user.userData?.fdusdBalance),
      usdtBalance: parseFloat(user.userData?.usdtBalance),
    });
  }, [user.userData])
  
  return (
    <div className={classes.root}>
       <div className="tableWrapper" style={{maxWidth:"100%", width:"800px"}}>
       <div className="tableAnimatedBackground"></div>
       <div className="tableInnerBlurEffect"></div>
      <Box className="buybox" sx={{maxWidth:"100%", width:"800px" ,display:"flex" ,flexDirection:"column",alignItems:"center" ,backgroundColor:"#30003c", borderRadius:"20px"}}>
    <Box dir='ltr' className={classes.balanceContainer}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px',marginTop:"20px" }}>
        <h2>{t("Buy $MAS Coin")}</h2>
      </div>
      <Typography  variant="h5" component="h5" sx={{ color:"white",marginBottom:"10px"}}>
        {t("Your Balance")}
      </Typography>
      <BalanceBox
        availableBalance={availableBalance}
        tokensDetails={tokensDetails}
      />
    </Box>
      <br />
      <Box className={classes.inputContainer}>
        <Typography className={classes.label} variant="subtitle1" sx={{ color:"white"}}>{t("Enter Amount")} :</Typography>
        <TextField
        variant="standard"
          className={classes.textBox}
          type="number"
          value={usdtAmount}
          onChange={handleUsdtAmountChange}
          inputProps={{
            min: 0,
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              marginLeft:"5px" // Text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Placeholder color
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "white", // Underline color before focus
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white", // Underline color after focus
            },
            marginLeft:"10px",
            "& input[type=number]": {
              "-moz-appearance": "textfield", // Firefox
            },
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
              "-webkit-appearance": "none", // Safari and Chrome
              margin: 0,
            },
          }}
        />
      </Box>
      <br />
      <Box className={classes.inputContainer}>
        <Typography className={classes.label} variant="subtitle1" sx={{ color:"white"}}>{t("Mas Amount ")}:</Typography>
        <TextField
        variant="standard"
          className={classes.textBox}
          type="text"
          value={masAmount}
          readOnly
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              marginLeft:"5px" // Text color
            },
            "& .MuiInputLabel-root": {
              color: "white", // Placeholder color
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "white", // Underline color before focus
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white", // Underline color after focus
            },
            marginLeft:"15px"
          }}
        />
      </Box>
      <br />
      <Box className={classes.buttonContainer}>
        <Button
          className="primaryButton"
          fullWidth
          variant="contained"
          onClick={buymas}
          disabled={!web3 || !contract || loading}
        >
          {loading ? t('Processing...') : t('Swap')}
        </Button>
      </Box>
      <br />
    <div>
      {metaMaskAddress?  <div><p style={{marginBottom:"10px"}}>{t("External wallet")}: {metaMaskAddress}</p> <p style={{marginBottom:"10px"}}> {t("USDT Balance in External wallet")}: {usdtBalanceInUSDT.toFixed(3)}</p></div>
      :
      <></>
}
              
              {/*<p>FDUSD Balance in External wallet: {fdusdBalanceInFDUSD.toFixed(3)}</p>*/}
            </div>
            </Box> 
            </div> 
          </div>
    
  );

};

export default ConnectWallet;
