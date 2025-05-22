
import React, { useState, useContext, useEffect ,useRef} from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Pagination,  // Corrected import
  TextField, // Add TextField import
  InputAdornment, // For search icon
  IconButton
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import Bundlecard from "src/component/NewBundleCard";  
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs"; 
import { UserContext } from "src/context/User"; 
import DataLoading from "src/component/DataLoading"; 
import NoDataFound from "src/component/NoDataFound"; 
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import Cardbundle from "../../../component/ui/Card/Cardbundle";
import { useTranslation } from 'react-i18next';
import 'src/layouts/TopBar/TopBar.css'
import { useInView } from 'react-intersection-observer';
import "src/views/pages/About/AboutUs.css"
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import { FaSearch } from "react-icons/fa";
import { Clear } from "@mui/icons-material";




const useStyles = makeStyles(() => ({
 
  container: {
    padding: "20px 0px",
  },
  heading: {
    padding: "1.5px 0 0",
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0.5px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "6.5px",
  },
  box: {
    paddingleft: "0",
    flexWrap: "inherit",
  },
  gridbox: {
    justifyContent: 'center',
    paddingleft: "0",

    
    // "@media(max-width:1280px)": {
    //   display: "flex",
    //   justifyContent: "center",
    //   transition: 'border 0.3s ease',
    // },

  },
  gridContainer: {


    justifyContent: 'center',

  }
  
}));

const AllBundlesPage = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [openSeachBar , SetOpenSearchBar] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
const [allBundles, setAllBundles] = useState([]); // Complete list for client-side filtering
const [filteredBundles, setFilteredBundles] = useState([]); // What actually gets displayed
const [serverSearchSupported, setServerSearchSupported] = useState(true);
const [isClientSideMode, setIsClientSideMode] = useState(false); // Track if we're in client-side mode
const inMemoryCache = useRef({});
const CACHE_KEY = "allBundlesCache"; // Key for sessionStorage


  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Always reset to page 1 when search changes
      
      // When search is cleared, switch back to server-side mode
      if (!searchTerm.trim() && isClientSideMode) {
        setIsClientSideMode(false);
        setServerSearchSupported(true);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, isClientSideMode]);


    const {t} = useTranslation();

    const { ref: ref2,inView: inView2 } = useInView({
            threshold: 0.2, 
            triggerOnce: true,
          });
        
          const { ref: ref3,inView: inView3 } = useInView({
            threshold: 0.2, 
            triggerOnce: true, 
          }); 
  

     const fetchAllBundles = async () => {
  const fullCacheKey = "full_bundle_list";

  if (inMemoryCache.current[fullCacheKey]) {
    console.log("[CACHE] Loaded full bundles from in-memory cache");
    filterClientSide(inMemoryCache.current[fullCacheKey], debouncedSearchTerm);
    return;
  }

  const storedCache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "{}");
  if (storedCache[fullCacheKey]) {
    console.log("[CACHE] Loaded full bundles from sessionStorage");
    inMemoryCache.current[fullCacheKey] = storedCache[fullCacheKey];
    filterClientSide(storedCache[fullCacheKey], debouncedSearchTerm);
    return;
  }

  try {
    console.log("[API] Fetching all bundles for client-side filtering");
    const res = await axios({
      method: "GET",
      url: Apiconfigs.listAllNft,
      params: { page: 1, limit: 100 },
    });

    if (res.data.statusCode === 200) {
      const bundles = res.data.result.docs;
      setAllBundles(bundles);
      filterClientSide(bundles, debouncedSearchTerm);

      // Cache it
      inMemoryCache.current[fullCacheKey] = bundles;
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          ...storedCache,
          [fullCacheKey]: bundles,
        })
      );
    }
  } catch (err) {
    console.error("Error fetching all bundles:", err);
  }
};


         // Client-side filtering function
  const filterClientSide = (bundles, term) => {
    if (!term.trim()) {
      // When search is cleared in client-side mode, we need to reset
      setIsClientSideMode(false);
      setServerSearchSupported(true);
      setFilteredBundles([]); // Clear results to trigger server fetch
    } else {
      const filtered = bundles.filter(bundle => 
        bundle.bundleName?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBundles(filtered);
    }
  };

          // Main data fetching function
 const listAllNftHandler = async () => {
  setIsLoading(true);

  const cacheKey = `${page}_${debouncedSearchTerm.trim() || "all"}`;
  
  // Check sessionStorage
  const storedCache = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "{}");
  if (inMemoryCache.current[cacheKey]) {
    console.log("[CACHE] Loaded from in-memory cache:", cacheKey);
    setFilteredBundles(inMemoryCache.current[cacheKey].bundles);
    setPages(inMemoryCache.current[cacheKey].pages);
    setIsLoading(false);
    return;
  } else if (storedCache[cacheKey]) {
    console.log("[CACHE] Loaded from sessionStorage:", cacheKey);
    inMemoryCache.current[cacheKey] = storedCache[cacheKey];
    setFilteredBundles(storedCache[cacheKey].bundles);
    setPages(storedCache[cacheKey].pages);
    setIsLoading(false);
    return;
  }

  // Otherwise fetch from API
  try {
    console.log("[API] Fetching bundles for:", cacheKey);
    const params = {
      page: page,
      limit: 10,
    };

    if (serverSearchSupported && debouncedSearchTerm.trim()) {
      params.search = debouncedSearchTerm;
    }

    const res = await axios({
      method: "GET",
      url: Apiconfigs.listAllNft,
      params,
    });

    if (res.data.statusCode === 200) {
      const newBundles = res.data.result.docs;

      if (debouncedSearchTerm.trim() && newBundles.length === res.data.result.totalDocs) {
        setServerSearchSupported(false);
        setIsClientSideMode(true);
        await fetchAllBundles(); // fallback
      } else {
        setFilteredBundles(newBundles);
        setPages(res.data.result.totalPages);

        const cacheData = {
          bundles: newBundles,
          pages: res.data.result.totalPages,
        };

        // Save to both caches
        inMemoryCache.current[cacheKey] = cacheData;
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            ...storedCache,
            [cacheKey]: cacheData,
          })
        );
      }
    }
  } catch (err) {
    console.error("[API ERROR]:", err);
    setServerSearchSupported(false);
    setIsClientSideMode(true);
    await fetchAllBundles();
  } finally {
    setIsLoading(false);
  }
};


          // Load data when dependencies change
  useEffect(() => {
    if (auth.userData?._id && auth.userLoggedIn) {
      if (!isClientSideMode) {
        listAllNftHandler();
      } else if (allBundles.length > 0) {
        // If we have client-side data, just filter it
        filterClientSide(allBundles, debouncedSearchTerm);
      } else {
        // Initial load when in client-side mode
        fetchAllBundles();
      }
    }
  }, [auth.userLoggedIn, auth.userData, page, debouncedSearchTerm, isClientSideMode]);

 

  return (
    <Box className={classes.container}
    sx={{
     
      background: (theme) => theme.custom.PageBackGround,
     
    }}
    >
<div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"10px"
          }}
          className="bunner-animaton">
            <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src="/assets/Images/wave10.png" 
        alt="Description" 
        style={{ display: 'block' ,transform:" scale(0.7)"}}
      />
      <div style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         color: 'white',
         fontSize: '2.5rem',
          fontWeight:"bold",
         textShadow:"0px 0px 10px white"
       
      }}>
       Mas Bundles
      </div>
    </div>
    </div>

    <div className="who-we-are-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
      <span className="who-text1">Discover Mas Bundles And Choose The Best for You</span>
      <span className="who-text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,</span>
        </div>
        
        <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3} >
          <img style={{
            display:"inline",
            width:"100%",
            borderRadius:"20px"
          }} 
          src="/assets/Images/bundles.jpg" alt="" />
        </div>
      </div>

      <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems:"center",
            marginBottom: '10px', 
            position:"fixed",
            bottom:"70px",
            right:"15px",
            zIndex:"100",
            gap:"5px"
          }}>
            {openSeachBar && <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Search Bundle by name..."
            
              sx={{
                maxWidth: '300px',
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.24)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchTerm && (
                      <IconButton 
                        onClick={() => setSearchTerm("")}
                        size="small"
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    )}
                    <SearchIcon sx={{ color: '#2d013a' }} />
                  </InputAdornment>
                ),
              }}
            />}
            <IconButton
            onClick={() => SetOpenSearchBar(!openSeachBar)}
            sx={{
              "&:hover":{
                transform:"scale(1.2)",
                transition:"ease-out 1s"
              }
            }}
            >
            <FaSearch   style={{fontSize:"40px"
            ,  color:"#cdc8c8",
              cursor:"pointer",
             
            }}/>
            </IconButton>
           
           
          </Box>


      {isLoading ? (
        <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
               <DataLoading />
               </Box>
      ) : (
        // <section>
        <Container maxWidth='xl'>





 
     

        
             

          {auth.userLoggedIn && auth.userData?._id && (
            <>
             
              {/* <Container maxWidth="xl"> */}
                {filteredBundles.length === 0 ? (
            <Box align="center" mt={4} mb={5}>
              <NoDataFound />
            </Box>
                ) : (
                  ""
                )}
                <Grid 
                container 
                
                
                className={classes.gridContainer}>
                  {filteredBundles.map((data, i) => {
                    return (
                      <Grid
                      container
                      item
                      key={i}
                      xs={12}
                      sm={4}
                      md={3}
                      lg={2.2}
                mb={2}

                      className={classes.gridbox}
                    >
                      <Cardbundle data={data} />
                    </Grid>

                     
                    //   <Grid
                    //     item
                    //     key={i}
                    //     xs={12}
                    //     sm={6}
                    //     md={4}
                    //     lg={3}
                    //     className={classes.gridbox}
                    //     //onMouseEnter={() => setHoveredIndex(i)}
                    //   //onMouseLeave={() => setHoveredIndex(null)}
                    //  // style={hoveredIndex === i ? { border: '10px solid red' } : null}
                    //   >
                    //     <Bundlecard
                    //       data={data}
                    //       index={i}
                    //       callbackFn={listAllNftHandler}
                    //     />
                    //   </Grid>
                    );
                  })}
                </Grid>
              {/* </Container> */}
              {!isClientSideMode && pages > 1 && (
                <Box mb={2} mt={2} display="flex" justifyContent="center" dir="ltr">
                  <Pagination
                    count={pages}
                    page={page}
                    onChange={(e, v) => setPage(v)}
                    sx={{
                      "& .MuiPaginationItem-root": { color: "white" },
                      "& .MuiPaginationItem-page.Mui-selected": { color: "grey" },
                      "& .MuiPaginationItem-ellipsis": { color: "white" },
                    }}
                  />
                </Box>
              )}




            </>
          )}
        </Container>

        // </section>
      )}
    </Box>
  );
};

export default AllBundlesPage;
