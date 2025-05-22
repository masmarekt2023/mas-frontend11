import React, { useState, useEffect, useContext ,useRef } from "react";
import axios from "axios";  // For making API calls
import Apiconfigs from "src/Apiconfig/Apiconfigs";  // Custom API configurations
import { useNavigate } from "react-router-dom";  // For navigation
import { UserContext } from "src/context/User";  // For accessing user context
import { useTranslation } from 'react-i18next';


// Material UI imports for UI components
import { 
  Box, 
  Paper, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableBody, 
  Table 
} from '@mui/material';  // Ensure this import works with MUI v5

import { makeStyles } from '@mui/styles';  // To style your components; consider using styled or sx in future projects
import moment from "moment";  // For handling dates and times

// Your custom components for displaying no data or loading state
import NoDataFound from "src/component/NoDataFound"; 
import DataLoading from "src/component/DataLoading";

// Correct MUI v5 Pagination import
import { Pagination } from '@mui/material';  // Use the Pagination component from MUI v5

// Custom utility functions
import { sortAddress } from "src/utils";

// React-icons for copy functionality
import { FiCopy } from "react-icons/fi";

// Toasts for notifications
import { toast } from "react-toastify";

// For copy-to-clipboard functionality
import { CopyToClipboard } from "react-copy-to-clipboard"; 

const useStyles = makeStyles((theme) => ({
  input_fild: {
    backgroundColor: "#ffffff6e",
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    height: "48px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "20px",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#141518",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  LoginBox: {
    paddingTop: "60px",
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "20px",
      color: "#000",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  dailogTitle: {
    textAlign: "Center",
    "& h2": {
      color: "#141518",
      fontSize: "23px",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  UploadBox: {
    border: "solid 0.5px #707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "110px",
  },
  input_fild22: {
    width: "100%",
    "& input": {
      height: "45px",
      border: 0,
    },
    "& .MuiInput-underline:before": {
      border: 0,
    },
  },
  dlflex: {
    "& div": {
      marginTop: "2rem",
      "& span": {
        border: "1px solid #e8e7e7",
        fontSize: "20px",
        padding: "7px",
        marginRight: "6px",
      },
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  table: {
    minWidth: 320,
    border: "1px solid #e5e3dd",
    "& th": {
      border: "1px solid #e5e3dd",
    },
    "& td": {
      border: "1px solid #e5e3dd",
    },
  },
  tbody: {
    "&:nth-of-type(even)": {
      backgroundColor: "#f3f3f3",
    },
  },
}));

export default function TransactionHistory() {
        const {t} = useTranslation();
  const transactionsCache = useRef({});

  const classes = useStyles();
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [transactionsList, setTransactionsList] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const transactionsListHandler = async () => {
  const cacheKey = `transactions-page-${page}`;
  setLoadingTransactions(true);

  // 1. Check in-memory cache
  if (transactionsCache.current[cacheKey]) {
    const cached = transactionsCache.current[cacheKey];
    console.log(`✅ Using in-memory cache for ${cacheKey}`);
    setTransactionsList(cached.docs);
    setPages(cached.totalPages);
    setLoadingTransactions(false);
    return;
  }

  // 2. Check sessionStorage
  const sessionData = sessionStorage.getItem(cacheKey);
  if (sessionData) {
    try {
      const parsed = JSON.parse(sessionData);
      console.log(`✅ Using sessionStorage for ${cacheKey}`);
      setTransactionsList(parsed.docs);
      setPages(parsed.totalPages);
      // Store into in-memory cache
      transactionsCache.current[cacheKey] = parsed;
      setLoadingTransactions(false);
      return;
    } catch (err) {
      console.warn(`⚠️ Failed to parse sessionStorage data for ${cacheKey}`, err);
    }
  }

  // 3. Fallback to API call
  try {
    const res = await axios({
      method: "GET",
      url: Apiconfigs.transactionList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        limit: 10,
        page: page,
      },
    });

    if (res.data.statusCode === 200) {
      const docs = res?.data?.result?.docs;
      const totalPages = res?.data?.result?.totalPages;

      console.log(`🌐 Fetched data from API for ${cacheKey}`);
      setTransactionsList(docs);
      setPages(totalPages);

      const cacheValue = { docs, totalPages };
      transactionsCache.current[cacheKey] = cacheValue;
      sessionStorage.setItem(cacheKey, JSON.stringify(cacheValue));
    }
  } catch (err) {
    console.error(`❌ API error for ${cacheKey}:`, err.message);
  } finally {
    setLoadingTransactions(false);
  }
};

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      transactionsListHandler();
    }
  }, [page]);
  return (

    <Box className={classes.LoginBox} mb={5} mt={3}> 

      {transactionsList && transactionsList.length === 0 ? (
        <Box align="center" mt={4} mb={5}>
          <NoDataFound />
        </Box>
      ) : (
        <TableContainer className={classes.Paper} component={Paper}>
          {loadingTransactions ? (
            <DataLoading />
          ) : (
            <Table className={classes.table} aria-label="simple table">
              <TableHead
               sx={{
     
                background: (theme) => theme.custom.CarBackGround,
               
              }}
            >
                <TableRow>
                  
                 
                 
                  <TableCell align="Center" style={{ color: "white" }}>
                   {t("From")}
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    {t("To")}
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    {t("Amount")}
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    {t("Type")}
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                  {t("Transactions Hash")}
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    {t("Status")}
                  </TableCell>
                  <TableCell align="Center" style={{ color: "white" }}>
                    {t("Payment date")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionsList &&
                  transactionsList?.map((row, index) => (
                    <TableRow className={classes.tbody} key={row.coinName}>
                      
                    
                     
                      <TableCell
                      style={
                        (row.transactionType === "Withdraw" || row.transactionType === "Donation")
                          ? { color: "blue", cursor: "pointer" }
                          : { color: "black" }
                      }
                      onClick={() => {
                        if (row.transactionType === "Withdraw" || row.transactionType === "Donation" ) {
                          navigate("/user-profile/"+row.userId.userName);
                        }
                      }}
                      >
                        {
                          (row.transactionType === "Withdraw" || 
                          row.transactionType === "Donation"||
                          row.transactionType === "buying") ? row.userId.userName : 
                          row.transactionType === "Deposit" ? sortAddress(row.fromAddress) : "N/A"  
                          
                          }
                          
                      </TableCell>
                      <TableCell
                        style={
                          row?.toDonationUser?._id
                            ? { color: "blue", cursor: "pointer" }
                            : { color: "black" }
                        }
                        align="Center"
                        onClick={() => {
                          if (row.transactionType == "Donation") {
                            navigate("/user-profile/"+row?.toDonationUser?.userName);                          }
                        }}
                      >
                        { 
                         (row.transactionType == "Donation" ||
                         row.transactionType === "buying") ?  row.toDonationUser.userName :  
                         (row.transactionType == "Withdraw") ? sortAddress(row.recipientAddress) : auth.userData.userName
                        }
                      </TableCell>
                      <TableCell style={{ color: "black" }} align="Center">
                        { (row.transactionType === "Donation") ?
                         (auth.userData._id === row.toDonationUser._id ) ? (parseFloat(row.amount)-parseFloat(row.adminCommission)).toFixed(2) : parseFloat(row.amount).toFixed(2) : 
                         (row.transactionType === "Withdraw") ? (parseFloat(row.amount)+parseFloat(row.adminCommission)).toFixed(2) : 
                         parseFloat(row.amount).toFixed(2)
                        }&nbsp;
                        {row?.coinName}
                      </TableCell>
                      <TableCell style={{ color: "black" }} align="Center">
                        {row?.transactionType
                          ? row?.transactionType?.toUpperCase()
                          : "N/A"}
                      </TableCell>

                      <TableCell style={{ color: "black" }} align="Center">
                      <span >
                      {row?.transactionHash || row?._id || ""}
                      </span> &nbsp;
                      <CopyToClipboard
                           style={{ cursor: "pointer" }}
                          text={row?.transactionHash || row?._id || ""}
                        >
                <FiCopy onClick={() => toast.info("data Copied")} />
              </CopyToClipboard>
                      </TableCell>
                      <TableCell style={{ color: "black" }} align="Center">
                        {row?.transactionStatus}
                      </TableCell>
                      <TableCell style={{ color: "black" }} align="Center">
                        {moment(row.updatedAt).format("DD-MM-YYYY hh:mm A")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
        <Box mb={2} mt={2} display="flex" justifyContent="center">
          <Pagination
            count={pages}
            page={page}
            onChange={(e, v) => setPage(v)}
          />
        </Box>
    </Box>
  );
}
