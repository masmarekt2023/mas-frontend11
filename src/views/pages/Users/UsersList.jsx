import React, { useState, useEffect, useContext ,useRef} from "react";
import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Paper,
  InputAdornment,
  Input,
  Container,
  TextField,
} from '@mui/material';  

import { makeStyles } from '@mui/styles';

import NoDataFound from "src/component/NoDataFound";
import SearchIcon from "@mui/icons-material/Search";  
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import Loader from "src/component/Loader";
import { Pagination } from "@mui/material";  
import ChildTableUser from "../../../component/userRow";
import { UserContext } from "src/context/User";
import { isMobile } from 'react-device-detect';
import theme from "../../../theme";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import './UsersList.css'; 
import { useTranslation } from 'react-i18next';
import DataLoading from "../../../component/DataLoading";





const useStyles = makeStyles(() => ({
  LoginBox: {
    paddingBottom: "0px",
  },
  websiteButton: {
    border: "solid 0.5px #707070",
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: "17.5px",
    color: "#141518",
    width: "100%",
    borderRadius: "0",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding:"0 50px",
    "& h6": {
      fontSize: "28px",
      color: "#000",
    },
    "@media(max-width:900px)":{
      flexDirection:"column"

    }
  },
  paddingContainer: {
    padding: "20px 30px  10px 30px",
    // marginTop: "-30px",
    
  },
  table: {
    minWidth: 320,
  },
  table: {
    border: "none",
    "& th": {
      border: "none",
      padding: "10px!important",
    },
    "& td": {
      border: "none",
      padding: "6px!important",
    },
  },
  createButton: {
    color: "#fff",
    backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    margin: "0px 10px",
    // "@media(max-width:768px)": {
    //   display: "none",
    // },
  },
  whitebox: {
    background: "#FFFFFF",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "15px",
  },

  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  ss: {
    width: "700px!important",
  },
  ranking: {
    padding: "1px!important"
  },
  profile: {
    padding: "1px!important",
  },
  input_fild2: {
    "&:before": {
      width: "0!important"
    },
  }
}));

export default function UsersList() {
  const classes = useStyles();
  const {t} = useTranslation();
  const auth = useContext(UserContext);
  const [allUserList, setAllUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const cacheRef = useRef({});
  const [filterData, setFilterData] = useState({
    userType: "",
    searchKey: "",
  });
  const _onInputChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    setPage(1);
  };


const getAllUserListHandler = async () => {
  const cacheKey = `users_${filterData.searchKey}_${filterData.userType}_${page}`;

  // 1. Try sessionStorage first
  const cachedSession = sessionStorage.getItem(cacheKey);
  if (cachedSession) {
    const parsed = JSON.parse(cachedSession);
    console.log("📦 Using cached data from sessionStorage for:", cacheKey);
    setAllUserList(parsed.rankingOrder);
    setPages(parsed.totalPages);
    setIsLoadingData(false);
    return;
  }

  // 2. Then try useRef cache
  if (cacheRef.current[cacheKey]) {
    console.log("📦 Using cached data from useRef for:", cacheKey);
    setAllUserList(cacheRef.current[cacheKey].rankingOrder);
    setPages(cacheRef.current[cacheKey].totalPages);
    setIsLoadingData(false);
    return;
  }

  // 3. Otherwise, fetch from API
  setIsLoadingData(true);
  try {
    const res = await axios.get(Apiconfigs.allUserList, {
      params: {
        search: filterData.searchKey || null,
        type: filterData.userType || null,
        limit: 12,
        page: page,
      },
    });

    if (res.data.statusCode === 200) {
      console.log("🆕 API call made for:", cacheKey);

      let rankingOrder = res.data.result.docs;
      rankingOrder.sort((a, b) => b.masBalance - a.masBalance || b.followers.length - a.followers.length);

      const totalPages = res.data.result.totalPages;
      const cachedData = { rankingOrder, totalPages };

      // Cache the data
      sessionStorage.setItem(cacheKey, JSON.stringify(cachedData));
      cacheRef.current[cacheKey] = cachedData;

      // Update UI state
      setAllUserList(rankingOrder);
      setPages(totalPages);
    }
  } catch (error) {
    console.error("❌ API error:", error);
  } finally {
    setIsLoadingData(false);
  }
};



  useEffect(() => {
    getAllUserListHandler();
  }, [page, filterData]);

  return (

<Box 
    sx={{
     padding:"20px 0",
      background: (theme) => theme.custom.PageBackGround,
     
    }}
    >
      
      <Box className={classes.masBoxFlex}
        >
          <ButtonwithAnimation  >{t("Users")}</ButtonwithAnimation>
          {/* {isMobile ? "" : <Typography variant="h6">Users</Typography>} */}
          <Box variant="h6" sx={{ display: "flex", justifyContent: "end", width: "100%" ,
            "@media(max-width:850px)":{
              marginTop:"30px"
            }
          }}>
                                   
            
            
          <TextField
  placeholder={t("Find User")}
  variant="standard"
  className={classes.input_fild2}
  value={filterData.searchKey}
  sx={{
    width: "180px",
    margin: "5px 0",
    border: "3px solid #581454",
    borderRadius: "10px",
    padding: "2px 5px",
    background: "rgb(220, 220, 220)",
    '& .MuiInputBase-input::placeholder': {
      color: 'black', // Change placeholder color
      opacity: 0.75, // Ensure full opacity
    },
    "& .MuiInputBase-input": {
      textAlign: "center", // Center the text
    },
  }}
  InputProps={{
    sx: {
      '&:before': {
        borderBottom: 'none', // Remove the bottom border
      },
      '&:after': {
        borderBottom: 'none', // Remove the bottom border on focus
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: 'none', // Remove the bottom border on hover
      },
    },
    endAdornment: (
      <InputAdornment position="end" sx={{ color: 'black' , opacity: 0.5}}>
        <SearchIcon />
      </InputAdornment>
    ),
  }}
  type="text"
  name="searchKey"
  onChange={_onInputChange}
/>
          </Box>
        </Box>

{isLoadingData ? (
   <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
                 <DataLoading />
                 </Box>
) : (

  <Container maxWidth='xl'
    dir="ltr" >
     
<Box className={classes.paddingContainer} >

      <Box className={classes.LoginBox}  >
        {/* Start Title */}
        
       
        {/* End Title */}

        {/* Start Serach */}
        {/* {!isMobile &&
          <Box className={classes.whitebox}>
            <Container>
              <Box className={classes.idtxt}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={8} className={classes.dlflex}>
                    {isMobile ? "" : <label style={{ padding: "0px" }}>Search</label>}
                    <Input
                      placeholder="Search by wallet Address or name"
                      className={classes.input_fild2}
                      value={filterData.searchKey}
                      fullWidth
                      type="text"
                      name="searchKey"
                      onChange={_onInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>


              </Box>
            </Container>
          </Box>} */}
        {/*End Serach */}

        {/* Start Table */}
        <div className="tableWrapper">
            <div className="tableAnimatedBackground"></div>
            <div className="tableInnerBlurEffect"></div>
            <TableContainer className="tableindex"  style={isMobile ? { width: "400px!important" } : { width: "100%"}} sx={{border:"none"}} component={Paper}>
              <Table aria-label="simple table" sx={{border:"2px solid #581454" }}>
                <TableHead sx={{ background: "linear-gradient(to right,rgba(77, 20, 96, 0.96),rgb(44, 0, 47))"  }}>
                  <TableRow>
                    <TableCell className={classes.ranking} align="Center" style={{ color: "white", padding: "1px", width: "10px !important", textAlign: "center" }}>
                      {t("Img")}
                    </TableCell>
                    <TableCell className={classes.profile} align="Center" style={{ color: "white", textAlign: "center" }}>
                      {t("Name")}
                    </TableCell>
                    <TableCell align="Center" style={{ color: "white", textAlign: "center" }}>
                      {t("Action")}
                    </TableCell>
                    <TableCell align="Center" style={{ color: "white", textAlign: "center" }}>
                      {t("Wallet Address")}
                    </TableCell>
                    <TableCell align="Center" style={{ color: "white", textAlign: "center" }}>
                      {t("Speciality")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUserList && allUserList?.map((row, index) => (
                    <ChildTableUser row={row} index={index} key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        {/* End Table */}

        <Box mt={3}>{isLoadingData && <Loader />}</Box>
        <Box mt={3}>
          {!isLoadingData && allUserList && allUserList.length === 0 && (
            <NoDataFound />
          )}
        </Box>
        <Box mb={2} mt={2} display="flex" justifyContent="center">
          <Pagination
            count={pages}
            page={page}
            onChange={(e, v) => setPage(v)}
            sx={{
              "& .MuiPaginationItem-root": { color: "white" }, // Change text color
              "& .MuiPaginationItem-page.Mui-selected": {  color: "white" }, // Change selected color
              "& .MuiPaginationItem-ellipsis": { color: "white" }, // Change ellipsis color
            }}
          />
        </Box>
      </Box>
    </Box>

</ Container>

)}
    
    
</Box>
  );
}
