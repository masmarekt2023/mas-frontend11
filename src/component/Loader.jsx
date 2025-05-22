import React from 'react'
import { Box } from '@mui/material/'
export default function Loader() {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src="/loader/Spinner-2.gif" alt="" />
    </Box>
  )
}
