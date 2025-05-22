import React from 'react'
import { makeStyles } from '@mui/styles';

import Footer from './Footer/Footer'
import TopBar from './TopBar/TopBar'


const MainLayout = ({ children }) => {
  
  return (
    <div >
      <TopBar />
      <div >{children}</div>
      <Footer />
    

    </div>
  )
}

export default MainLayout
