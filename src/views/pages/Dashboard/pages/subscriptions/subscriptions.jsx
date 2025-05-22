import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Grid, Pagination } from '@mui/material'; 
import { makeStyles } from '@mui/styles';
import axios from "axios";
import Apiconfigs from "../../../../../Apiconfig/Apiconfigs";
import Cardbundle from "../../../../../component/ui/Card/Cardbundle";
import { ButtonwithAnimation } from "../../../../../component/ui/Button/button";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  subscriptionBox: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    backgroundColor:"white"
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

export default function Subscriptions() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [state, setState] = useState({
    subscriptions: [],
    subsPage: 1,
    subsPages: 1,
  });

  const [bundleSubsCache, setBundleSubsCache] = useState({});  // Using state for cache


  const { subscriptions, subsPage, subsPages } = state;

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  // Fetch bundle subscription list
    const getBundleSubscriptionListHandler = async () => {
    const cacheKey = `subs-page-${subsPage}`;

    // Use cached data if available
    if (bundleSubsCache[cacheKey]) {
      console.log("Using cached data for", cacheKey);
      const { docs, totalPages } = bundleSubsCache[cacheKey];
      updateState({
        subscriptions: docs,
        subsPages: totalPages,
      });
      return;
    }

    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.mysubscription,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        params: {
          limit: 4,
          page: subsPage,
        },
      });

      if (res.data.statusCode === 200) {
        const { docs, totalPages } = res.data.result;

        // Cache the result using setBundleSubsCache
        setBundleSubsCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: { docs, totalPages },
        }));

        updateState({
          subscriptions: docs,
          subsPages: totalPages,
        });
        console.log("Fetched and cached data for", cacheKey);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getBundleSubscriptionListHandler().catch(console.error);
  }, [subsPage]); // Watch only subsPage for updates

  return (
    <div className={classes.subscriptionBox}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5rem", marginBottom: "1rem" }}>
        <ButtonwithAnimation>Bundles</ButtonwithAnimation>
      </Box>

      <Box>
        <Grid container spacing={2} className={classes.bunbox} justifyContent="center">
          {subscriptions.map((data, i) => {
            return (
              <Grid item key={i} lg={3} md={4} sm={6} xm={12} style={{ display: "flex", justifyContent: "center" }}>
                <Cardbundle data={data.nftId} />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {subsPages > 1 && (
        <Box mb={2} mt={2} display="flex" justifyContent="center" style={{ marginTop: 40 }}>
          <Pagination
            count={subsPages}
            page={subsPage}
            onChange={(e, v) => updateState({ subsPage: v })}
          />
        </Box>
      )}
    </div>
  );
}
