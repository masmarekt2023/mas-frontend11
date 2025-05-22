import React, { useEffect, useState ,useRef} from "react";
import { Box, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

// import ItemCard from "src/component/NewItemCard";
import UserDetailsCard from "src/component/UserCard";
import axios from "axios";
import Apiconfigs from "../../../../../Apiconfig/Apiconfigs";
import { Pagination } from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import CardCreators from '../../../../../component/ui/Card/CardCreators';
import { useTranslation } from 'react-i18next';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
  } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'
import { ButtonwithAnimation } from "../../../../../component/ui/Button/button";
  

const useStyles = makeStyles(() => ({
    subscriptionBox: {
        overflowX: "auto",
        whiteSpace: "nowrap",
    },
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
        paddingTop: "20px",
        marginLeft: "25px",
        marginRight: "15px",
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
    bunbox: {
   
        display: "flex",
        justifyContent: "center",
      
    },
}));

export default function sales() {
          const {t} = useTranslation();
    const itemSubsCache = useRef({});
    const classes = useStyles();
    const [state, setState] = useState({
        sales: [],
        subsPage: 1,
        subsPages: 1,
        userList: [],
        userPage: 1,
        userPages: 1,
    });
    const { sales, subsPage, subsPages, userList, userPage, userPages } =
        state;
    const updateState = (data) =>
        setState((prevState) => ({ ...prevState, ...data }));

    useEffect(() => {
        getItemSubscriptionListHandler().catch(console.error);
    }, [state.subsPage]);

    useEffect(() => {
        myFollowingHandler().catch(console.error);
    }, [state.userPage]);

    return (<>
           <Box sx={{display:"flex" ,justifyContent:"center",alignItems:"center",marginTop:"5rem"}}><ButtonwithAnimation>My Sales</ButtonwithAnimation></Box>
       
            <div className={classes.subscriptionBox}>
                <Box className={classes.LoginBox} >

                    <Box>
                               <TableContainer component={Paper} >
                                <Table>
                                  <TableHead sx={{background:"linear-gradient(to top right,#900098,#4d0051)"}}>
                                    <TableRow>
                                             <TableCell sx={{color:"white"}}>{t("Title")}</TableCell>
                                             <TableCell sx={{color:"white"}}>{t("Name")}</TableCell>
                                             <TableCell sx={{color:"white"}}>{t("Price")}</TableCell>
                                             <TableCell sx={{color:"white"}}>{t("Status")}</TableCell>
                                             <TableCell sx={{color:"white"}}>{t("Action")}</TableCell>
                                             
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {sales.map((items, i) => {
                                      return (
                                       <TableRow key={i}>
                                        <TableCell>
                                         {items.title}
                                        </TableCell>
                                        <TableCell>
                                         {items.name}
                                        </TableCell>
                                        <TableCell>
                                         {items.masPrice} MAS
                                        </TableCell>
                                        <TableCell>
                                         {items.status}
                                        </TableCell>
                                         <TableCell>
                                                            <Tooltip title="View" placement="right"><Link to={"/items-details?"+ items.nft1Id}><FaEye size={20} color='#4d0051'/></Link></Tooltip>
                                                            </TableCell>
                                       </TableRow>)
                                    })}
                                    </TableBody>
                                    </Table>
                                    </TableContainer>
                             
                              
                                
                           
                            </Box>
                    {subsPages > 1 && (
                        <Box
                            mb={2}
                            mt={2}
                            display="flex"
                            justifyContent="center"
                            style={{ marginTop: 40 }}
                        >
                            <Pagination
                                count={subsPages}
                                page={subsPage}
                                onChange={(e, v) => updateState({ subsPage: v })}
                            />
                        </Box>
                    )}
                </Box>
             {/* <Box className={classes.LoginBox} mb={5}> 
                    <Box className={classes.masBoxFlex}>
                        <Typography variant="h6" style={{fontSize:"1.8rem" ,color:"#43005e"}}>Users</Typography>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            {userList.map((data, i) => {
                                return (
                                    <Grid item key={i} lg={3} md={4} sm={6} xm={12}>
                                        <CardCreators
                                            data={data}
                                            chat

                                            subscriptionBox

                                            // CardpersonalInfo={CardpersonalInfo}
                                            Subscribe
                                        />

                                    </Grid>
                                );
                            })}
                        </Grid>
                        {userPages > 1 && (
                            <Box
                                mb={2}
                                mt={2}
                                display="flex"
                                justifyContent="center"
                                style={{ marginTop: 40 }}
                            >
                                <Pagination
                                    count={userPages}
                                    page={userPage}
                                    onChange={(e, v) => updateState({ userPage: v })}
                                />
                            </Box>
                        )}
                    </Box>
                </Box> */}
            </div>
            </>

    );

    async function getItemSubscriptionListHandler() {
  const cacheKey = `item-subs-page-${subsPage}`;
const cachedData = sessionStorage.getItem(cacheKey);

// Check if data is cached
if (cachedData) {
  console.log("Using cached data for", cacheKey);
  const { docs, totalPages } = JSON.parse(cachedData);
  updateState({
    sales: docs,
    subsPages: totalPages,
  });
  return;
}

// If not cached, fetch data
try {
  const res = await axios({
    method: "GET",
    url: Apiconfigs.mysales,
    headers: {
      token: sessionStorage.getItem("token"),
    },
    params: {
      limit: 6,
      page: subsPage,
    },
  });

  if (res.data.statusCode === 200) {
    const { docs, totalPages } = res.data.result;

    // Cache the result in sessionStorage
    sessionStorage.setItem(cacheKey, JSON.stringify({
      docs,
      totalPages,
    }));

    updateState({
      sales: docs,
      subsPages: totalPages,
    });
    console.log("Fetched and cached data for", cacheKey);
  }
} catch (err) {
  console.log(err.message);
}

}


    async function myFollowingHandler() {
        await axios({
            method: "GET",
            url: Apiconfigs.profileFollowingList,
            headers: {
                token: sessionStorage.getItem("token"),
            },
            params: {
                limit: 4,
                page: userPage,
            },
        })
            .then(async (res) => {
                if (res.data.statusCode === 200) {
                    updateState({
                        userList: res.data.result.docs,
                        userPages: res.data.result.pages,
                    });
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}
