import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from "@mui/styles"; 

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ButtonwithAnimation } from "src/component/ui/Button/button";


// project-import

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
  
};




// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = React.forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          marginTop:"70px",
          border: border ? '1px solid' : 'none',
          borderRadius:"0",
          borderColor: 'divider',
          backgroundColor:"white",
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
        
          ...sx
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && <CardHeader  sx={{  '& .MuiCardHeader-title': {
      fontSize: '1.8rem', // Custom font size
      fontWeight: 'bold', // Custom font weight
      color: ' #43005e',
      display:"flex",
      justifyContent:"center",
      
    },}}  
    title={<ButtonwithAnimation>{title}</ButtonwithAnimation>} action={secondary} />}
        
        {darkTitle && title && <CardHeader sx={headerSX} title={<ButtonwithAnimation>{title}</ButtonwithAnimation>} action={secondary} />}

      

        {/* card content */}
       
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
