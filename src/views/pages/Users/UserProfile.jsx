import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import Profile from "./Profile";
import BundlesCard from "src/component/NewBundleCard";
import { useParams } from "react-router-dom";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import DataLoading from "src/component/DataLoading";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({}));

function UserProfile() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { username } = useParams();

  const [userData, setUserData] = useState(null);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const userCacheRef = useRef({});

  useEffect(() => {
    const cacheKey = `userProfile_${username}`;

    // 1. Check sessionStorage cache
    const sessionData = sessionStorage.getItem(cacheKey);
    if (sessionData) {
      console.log("✅ Loaded from sessionStorage cache");
      const parsed = JSON.parse(sessionData);
      setUserData(parsed);
      userCacheRef.current[cacheKey] = parsed; // Sync with memory
      return;
    }

    // 2. Check in-memory cache
    if (userCacheRef.current[cacheKey]) {
      console.log("✅ Loaded from in-memory cache (useRef)");
      setUserData(userCacheRef.current[cacheKey]);
      return;
    }

    // 3. Fallback to API
    console.log("📡 Fetching from API...");
    const fetchUser = async () => {
      try {
        const res = await axios.get(Apiconfigs.getUser + username);
        const result = res.data.result[0];

        // Save to both caches
        userCacheRef.current[cacheKey] = result;
        sessionStorage.setItem(cacheKey, JSON.stringify(result));

        setUserData(result);
        console.log("✅ Data saved to cache (memory + sessionStorage)");
      } catch (err) {
        console.error("❌ API Error:", err);
      }
    };

    fetchUser();
  }, [username]);

  if (!userData) return <DataLoading />;
  const hasBundles = userData?.bundleDetails?.length > 0;

  return (
    <Box>
      <Profile
        data={userData}
        isabout={true}
        userListToDisplay={userListToDisplay}
      />
      <Container maxWidth="xl">
        {hasBundles && (
          <Box align="center" mt={3}>
            <ButtonwithAnimation>{t("Bundles")}</ButtonwithAnimation>
          </Box>
        )}
        <Grid container style={{ margin: "30px auto" }} dir="ltr">
          {userData?.bundleDetails?.map((data, i) => (
            <Grid
              item
              key={i}
              lg={3}
              xl={2}
              md={4}
              sm={6}
              xs={12}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <BundlesCard data={data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default UserProfile;
