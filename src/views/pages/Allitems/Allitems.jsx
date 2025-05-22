import React, { useState, useContext, useEffect,useRef } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Pagination,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import CardMarketplace from "../../../component/ui/Card/CardMarketplace";
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import "src/views/pages/About/AboutUs.css";
import SearchIcon from '@mui/icons-material/Search';
import { FaSearch } from "react-icons/fa";
import ClearIcon from '@mui/icons-material/Clear';

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
  gridbox: {
    marginBottom: '50px',
    justifyContent: "center",
  },
  gridboxHover: {
    border: '10px solid red',
  },
}));

const AllItemsPage = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allItems, setAllItems] = useState([]); // Complete list for client-side
  const [displayedItems, setDisplayedItems] = useState([]); // Items to display
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [serverSearchSupported, setServerSearchSupported] = useState(true);
  const [isClientSideMode, setIsClientSideMode] = useState(false);
  const cacheRef = useRef({});

  const { t } = useTranslation();
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.2, triggerOnce: true });

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
      
      if (!searchTerm.trim() && isClientSideMode) {
        setIsClientSideMode(false);
        setServerSearchSupported(true);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, isClientSideMode]);

  // Fetch all items for client-side fallback
const fetchAllItems = async () => {
  const cacheKey = "allItems_full";

  // Check sessionStorage
  const cachedSession = sessionStorage.getItem(cacheKey);
  if (cachedSession) {
    const parsed = JSON.parse(cachedSession);
    console.log("📦 Using cached sessionStorage full list");
    setAllItems(parsed);
    filterClientSide(parsed, debouncedSearchTerm);
    return;
  }

  if (cacheRef.current[cacheKey]) {
    console.log("📦 Using cached useRef full list");
    setAllItems(cacheRef.current[cacheKey]);
    filterClientSide(cacheRef.current[cacheKey], debouncedSearchTerm);
    return;
  }

  try {
    const res = await axios({
      method: "GET",
      url: Apiconfigs.listAllNft1,
      params: { page: 1, limit: 100 },
    });
    if (res.data.statusCode === 200) {
      const items = res.data.result.docs;
      console.log("🆕 API call made for full list");

      setAllItems(items);
      filterClientSide(items, debouncedSearchTerm);

      // Cache full list
      sessionStorage.setItem(cacheKey, JSON.stringify(items));
      cacheRef.current[cacheKey] = items;
    }
  } catch (err) {
    console.error("Error fetching all items:", err);
  }
};


  // Client-side filtering
  const filterClientSide = (items, term) => {
    if (!term.trim()) {
      setIsClientSideMode(false);
      setServerSearchSupported(true);
      setDisplayedItems([]);
    } else {
      const filtered = items.filter(item => 
        item.itemName?.toLowerCase().includes(term.toLowerCase())
      );
      setDisplayedItems(filtered);
    }
  };

  // Main data fetching function
const listAllItemsHandler = async () => {
  setIsLoading(true);
  const cacheKey = JSON.stringify({ page, search: debouncedSearchTerm.trim() });

  // Check sessionStorage
  const cachedSession = sessionStorage.getItem(cacheKey);
  if (cachedSession) {
    const parsed = JSON.parse(cachedSession);
    console.log("📦 Using cached sessionStorage data for:", cacheKey);
    setDisplayedItems(parsed.items);
    setPages(parsed.pages);
    setIsLoading(false);
    return;
  }

  // Check useRef cache
  if (cacheRef.current[cacheKey]) {
    console.log("📦 Using cached useRef data for:", cacheKey);
    setDisplayedItems(cacheRef.current[cacheKey].items);
    setPages(cacheRef.current[cacheKey].pages);
    setIsLoading(false);
    return;
  }

  try {
    const params = {
      page,
      limit: 10,
    };

    if (serverSearchSupported && debouncedSearchTerm.trim()) {
      params.search = debouncedSearchTerm;
    }

    const res = await axios({
      method: "GET",
      url: Apiconfigs.listAllNft1,
      params,
    });

    if (res.data.statusCode === 200) {
      const newItems = res.data.result.docs;
      console.log("🆕 API call made with:", cacheKey);

      const cacheData = {
        items: newItems,
        pages: res.data.result.totalPages,
      };

      // Cache to both sessionStorage and useRef
      sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
      cacheRef.current[cacheKey] = cacheData;

      if (debouncedSearchTerm.trim() && newItems.length === res.data.result.totalDocs) {
        setServerSearchSupported(false);
        setIsClientSideMode(true);
        await fetchAllItems();
      } else {
        setDisplayedItems(newItems);
      }

      setPages(res.data.result.totalPages);
    }
  } catch (err) {
    console.error("API Error:", err);
    setServerSearchSupported(false);
    setIsClientSideMode(true);
    await fetchAllItems();
  } finally {
    setIsLoading(false);
  }
};


  // Load data when dependencies change
  useEffect(() => {
    if (auth.userData?._id && auth.userLoggedIn) {
      if (!isClientSideMode) {
        listAllItemsHandler();
      } else if (allItems.length > 0) {
        filterClientSide(allItems, debouncedSearchTerm);
      } else {
        fetchAllItems();
      }
    }
  }, [auth.userLoggedIn, auth.userData, page, debouncedSearchTerm, isClientSideMode]);



  return (
    <Box className={classes.container} sx={{ background: (theme) => theme.custom.PageBackGround }}>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px" }} className="bunner-animaton">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src="/assets/Images/wave10.png" alt="Description" style={{ display: 'block', transform: "scale(0.7)" }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: "bold",
                textShadow: "0px 0px 10px white"
              }}>
                Mas Marketplace
              </div>
            </div>
          </div>

          <div className="who-we-are-sec">
            <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
              <span className="who-text1">Buy And Sell Whatever Comes To Your Mind</span>
              <span className="who-text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,</span>
            </div>
            <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3}>
              <img style={{ display: "inline", width: "100%", borderRadius: "20px" }} 
                src="/assets/Images/item.webp" alt="" />
            </div>
          </div>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: "center",
            marginBottom: '10px', 
            position: "fixed",
            bottom: "70px",
            right: "15px",
            zIndex: "100",
            gap: "5px"
          }}>
            {openSearchBar && (
              <TextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="Search items by name..."
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
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchTerm && (
                        <IconButton 
                          onClick={() => {
                            setSearchTerm("");
                            setDebouncedSearchTerm("");
                          }}
                          size="small"
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      )}
                      <SearchIcon sx={{ color: '#2d013a' }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            <IconButton
              onClick={() => setOpenSearchBar(!openSearchBar)}
              sx={{
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "ease-out 0.3s"
                }
              }}
            >
              <FaSearch style={{
                fontSize: "40px",
                color: "#cdc8c8",
                cursor: "pointer",
              }}/>
            </IconButton>
          </Box>
    
    
    
    
      {isLoading ? (
        <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
          <DataLoading />
        </Box>
      ) : (
        <section>
        
          {/* Items List */}
          {auth.userLoggedIn && auth.userData?._id && (
            <>
              <Container maxWidth="xl">
                {displayedItems.length === 0 && !isLoading ? (
                  <Box align="center" mt={4} mb={5}>
                    <NoDataFound />
                  </Box>
                ) : (
                  <>
                    <Grid container className={classes.gridbox}>
                      {displayedItems.map((data, i) => (
                        <Grid
                          container
                          item
                          key={i}
                          xs={12}
                          sm={4}
                          md={3}
                          lg={2.2}
                          mb={{xs: 0, lg: 1}}
                          className={classes.gridbox}
                        >
                          <CardMarketplace data={data} />
                        </Grid>
                      ))}
                    </Grid>

                    {/* Pagination - only show if not in client-side mode */}
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

                    {/* Show indicator when using client-side filtering */}
                    {isClientSideMode && debouncedSearchTerm && (
                      <Box textAlign="center" mt={2}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Showing client-side filtered results
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </Container>
            </>
          )}
        </section>
      )}
    </Box>
  );
};

export default AllItemsPage;