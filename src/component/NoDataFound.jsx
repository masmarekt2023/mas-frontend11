import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';


export default function NoDataFound() {
      const {t} = useTranslation();
  
  return (
    <Box align="center" mt={4} mb={5}>
      <Typography
        variant="h1"
        style={{
          color: '#43005e',
          marginBottom: '10px',
          padding: '10px',
          fontSize: '17px',
          backgroundColor:"#cdc8c8",
          borderRadius:"20px",
          margin:"0 50px"
        }}
      >
        {t("NO DATA FOUND")}!
      </Typography>
      <img src="/images/nodata.png" style={{width:"180px"}} />
    </Box>
  )
}
