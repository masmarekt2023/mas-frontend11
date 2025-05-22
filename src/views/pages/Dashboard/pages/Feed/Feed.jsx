import React, { useEffect, useState ,useRef} from "react";
import { Box, Typography, Grid, Pagination } from '@mui/material'; // Fixed the imports for MUI v5
import { makeStyles } from '@mui/styles';
import FeedCard from "src/component/FeedCard";

import NoDataFound from "src/component/NoDataFound";
import axios from "axios";
import Apiconfigs from "../../../../../Apiconfig/Apiconfigs";
import MainCard from "../../ui-component/cards/MainCard";
import { useTranslation } from 'react-i18next';
import { ButtonwithAnimation } from "../../../../../component/ui/Button/button";


const useStyles = makeStyles(() => ({
  LoginBox: {    
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "20px",
      color: "#1b1a1a",
      "& span": {
        fontWeight: "300",
      },
    },
  },

  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  bunbox: {
    "@media(max-width:600px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

export default function Login() {
        const {t} = useTranslation();
  const feedCache = useRef({});
  const [state, setState] = useState({
    allFeed: [],
    page: 1,
    pages: 1,
  });
  const { allFeed, page, pages } = state;
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  const privateFeeds = allFeed.filter((i) => i.postType === "PRIVATE");

  const classes = useStyles();

  useEffect(() => {
    getFeedListHandler().catch(console.error);
  }, [state.page]);

  return (<>
           <Box sx={{display:"flex" ,justifyContent:"center",alignItems:"center",marginTop:"5rem"}}><ButtonwithAnimation>My Feed</ButtonwithAnimation></Box>
       
    <Box className={classes.LoginBox} >
      <Box>
        {allFeed && allFeed.length === 0 ? (
          <Box align="center" mt={2} mb={1}>
            <NoDataFound />
          </Box>
        ) : (
          ""
        )}
        <Grid container spacing={3} className={classes.bunbox}>
          {allFeed?.map((data, i) => {
            return (
              <Grid item lg={3} md={5.2} sm={6} xm={12} key={i}>
                <FeedCard
                  updateList={getFeedListHandler}
                  data={data}
                  index={i}
                  key={i}
                />
              </Grid>
            );
          })}
        </Grid>
        {pages > 1 && (
          <Box
            mb={2}
            mt={2}
            display="flex"
            justifyContent="center"
            style={{ marginTop: 40 }}
          >
            <Pagination
              count={pages}
              page={page}
              onChange={(e, v) => updateState({ page: v })}
            />
          </Box>
        )}
      </Box>
    </Box>
    </>
  );

 async function getFeedListHandler(page) {
  const cacheKey = `feed-page-${page}`;

  // 1. Check in-memory cache first
  if (feedCache.current[cacheKey]) {
    console.log("Using in-memory cache for", cacheKey);
    const { docs, totalPages } = feedCache.current[cacheKey];
    updateState({ allFeed: docs, pages: totalPages });
    return;
  }

  // 2. Then check sessionStorage
  const sessionData = sessionStorage.getItem(cacheKey);
  if (sessionData) {
    console.log("Using sessionStorage cache for", cacheKey);
    try {
      const parsed = JSON.parse(sessionData);
      updateState({ allFeed: parsed.docs, pages: parsed.totalPages });

      // Also add to in-memory cache for faster reuse
      feedCache.current[cacheKey] = parsed;
      return;
    } catch (e) {
      console.warn("Failed to parse sessionStorage for", cacheKey);
    }
  }

  // 3. Fallback to API request
  try {
    const res = await axios({
      method: "GET",
      url: Apiconfigs.getMyfeed,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        page,
        limit: 4,
      },
    });

    if (res.data.statusCode === 200) {
      const { docs, totalPages } = res.data.result;
      console.log("feed",docs)

      // Cache to memory
      feedCache.current[cacheKey] = { docs, totalPages };

      // Cache to sessionStorage
      sessionStorage.setItem(cacheKey, JSON.stringify({ docs, totalPages }));

      updateState({ allFeed: docs, pages: totalPages });
      console.log("Fetched from API and cached", cacheKey);
    }
  } catch (err) {
    console.log("API Error:", err.message);
  }
}
}
