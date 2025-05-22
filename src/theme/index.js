// import _ from "lodash";
// // import { colors, createTheme, responsiveFontSizes } from "@mui/material/";
// import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { colors } from '@mui/material';
// import typography from "./typography";

// const baseOptions = {
//   typography,
//   overrides: {
//     MuiButton: {
//       root: {
//         "&.primaryButton": {
//           background: "linear-gradient(to bottom right, #640D5F, rgb(199, 113, 238))",
//           border: "none",
//           padding: "10px 15px",
//           borderRadius: "15px",
//           cursor: "pointer",
//           width: "auto",
//           transition: "background-color 0.3s",
//           color: "white",
//           minHeight: "50px",
//           width: "150px",
//           "&:hover": {
//             background: "linear-gradient(to bottom right, #640D5F, rgb(8, 8, 56))",
//           },
//         },
//       },
//     MuiFormControlLabet: {
//       root: {
//         marginRight: "0 !important",
//         padding: "0 !important",
//       },
//     },

//     MuiCheckbox: {
//       colorSecondary: {
//         "&.Mui-checked": {
//           color: "#b03f48",
//         },
//       },
//     },
//     MuiFormLabel: {
//       root: { color: "#222" },
//     },
//     MuiList: {
//       padding: {
//         padding: "10px",
//       },
//     },
//     MuiListSubheader: {
//       root: {
//         color: "#000000",
//         fontSize: "22px !important",
//         fontWeight: "600 !important",
//         lineHeight: "33px !important",
//       },
//     },

//     MuiOutlinedInput: {
//       notchedOutline: {
//         borderColor: "transparent",
//       },
//       input: {
//         padding: "7px",
//       },
//     },
//     MuiPopover: {
//       root: {
//         zIndex: 99999,
//       },
//     },
//     MuiListItem: {
//       gutters: {
//         paddingLeft: 0,
//       },
//     },
//     MuiListItemSecondaryAction: {
//       root: {
//         right: 0,
//       },
//     },
//     MuiDialog: {
//       paperScrollPaper: {
//         Width: 450,
//         maxWidth: "100%",
//       },
//       paper: {
//         overflowY: "unset",
//       },
//     },
//     MuiInputBase: {
//       input: {
//         fontSize: 14,
//         color: "#222",
//       },
//     },
  
//     MuiBackdrop: {
//       root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
//     },
//     MuiButton: {
//       containedSizeLarge: {
//         "@media(max-width:767px)": {
//           padding: "8px 10px !important",
//           fontSize: "10px",
//         },
//       },
//       containedSecondary: {
//         background: "linear-gradient(180deg, #c04848 0%, #480048 100%);",
//         filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
//         borderRadius: "50px",
//         color: "#fff",
//         fontSize: "14px",
//         // lineHeight: " 21px",
//         padding: "5px 19px",
//         "&:hover": {
//           // background:"#fff !important",
//           background: "linear-gradient(180deg, #480048 0%, #c04848 100%);",
//         },
//       },

//       containedPrimary: {
//         backgroundColor: "#fff",
//         filter: "drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))",
//         borderRadius: "50px",
//         color: "#000",
//         fontSize: "15px",
//         lineHeight: " 21px",
//         padding: "10px 39px",
//       },
//       contained: {
//         borderRadius: "50px",
//         color: "#141518",
//         fontWeight: 600,
//         background: "#fff",
//         padding: "5px 19px",
//         backgroundColor: "#fff",
//         "&:hover": {
//           backgroundColor: "#e5e3dd !important",
//         },
//       },
//       outlinedPrimary: {
//         borderRadius: "50px",
//         color: "#0D8CCD",
//         fontWeight: 600,
//         padding: "5px 19px",
//         border: "2px solid #0D8CCD",
//         "&:hover": {
//           background:
//             "linear-gradient(180deg, #039BE3 0%, #039BE2 0.01%, #3A4B6E 100%), #000000",
//           border: "2px solid #0D8CCD",
//           color: "#fff",
//         },
//       },
//       outlinedSizeSmall: {
//         padding: "6px 23px",
//         fontSize: "16px",
//         lineHeight: " 24px",
//       },
//     },
//     MuiDrawer: {
//       paperAnchorDockedLeft: {
//         borderRight: "0",
//       },
//     },
//     MuiMenu: {
//       paper: { top: "47px" },
//     },

//     MuiTypography: {
//       subtitle1: {
//         color: "#000",
//         fontSize: "14px",
//         fontWeight: 500,
//         lineHeight: " 16px",
//       },
//     },
//   },
// }
// }


// const themesOptions = {
//   typography: {
//     fontWeight: 400,
//     fontFamily: "'Poppins', sans-serif",
//   },
//   palette: {
//     type: "light",
//     action: {
//       primary: "#20509e",
//     },
//     background: {
//       default: "#FBFBFD",
//       dark: "#f3f7f9",
//       paper: colors.common.white,
//     },
//     primary: {
//       main: "#898989",
//       dark: "#de0d0d",
//       light: "#de0d0d",
//     },
//     secondary: {
//       main: "#fff",
//     },
//     warning: {
//       main: "#ffae33",
//       dark: "#ffae33",
//       light: "#fff1dc",
//     },
//     success: {
//       main: "#54e18c",
//       dark: "#54e18c",
//       light: "#e2faec",
//     },
//     error: {
//       main: "#ff7d68",
//       dark: "#ff7d68",
//       light: "#ffe9e6",
//     },
//     text: {
//       primary: "#52565c",
//       secondary: "#999999",
//     },
//     common: {
//       black: "#222222",
//     },
//   },
// };
// const Theme = {
//   palette: {
//     primary: {
//       main: "#fff",
//       contrastText: "#fff",
//     },
//     secondary: {
//       main: "#fff",
//     },
//   },
//   // تعريف المتغيرات داخل theme
//   custom: {
//     gradientButton: "linear-gradient(to bottom right, #640D5F, rgb(199, 113, 238))",
//     hoverGradientButton: "linear-gradient(to bottom right, #640D5F, #080838)",
//     PageBackGround :"linear-gradient(to bottom left, #640D5F, black)",
//     CarBackGround :"linear-gradient(to top right, #640D5F, rgb(1, 15, 78))",
//     BoxBackGround :"linear-gradient(to right, rgba(54, 26, 58, 0.533), #640D5F)",
//     BoxBackGroundReseve :"linear-gradient(to left, #0008, #640D5F)",



//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "&.auth-input": { // تخصيص حقول الإدخال التي تحتوي على فئة auth-input فقط
//             "& .MuiInputBase-input": {
//               color: "white", // لون النص
//             },
//             "& .MuiInputLabel-root": {
//               color: "white", // لون التسمية
//             },
//             "& .MuiInputLabel-root.Mui-focused": {
//               color: "white", // لون التسمية عند التركيز
//             },
//             "& .MuiInput-underline:before": {
//               borderBottomColor: "white", // لون الحدود قبل التركيز
//             },
//             "& .MuiInput-underline:hover:before": {
//               borderBottomColor: "white", // لون الحدود عند التمرير
//             },
//             "& .MuiInput-underline:after": {
//               borderBottomColor: "white", // لون الحدود عند التركيز
//             },
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: (props) => ({
//           "&.primaryButton": {
//             padding: "10px 15px",
//             borderRadius: "15px",
//             cursor: "pointer",
//             transition: "all 0.3s",
//             color: "white",
//             minWidth : "100px",
//             minHeight: "50px",
//             background: props.theme.custom.gradientButton,
//             "&:hover": {
//               background: props.theme.custom.hoverGradientButton,
//             },
//           },
//         }),
//       },
//     },
//     MuiDialog: {
//       styleOverrides: {
//         paper: {
//           backgroundColor: "white", 
//           // color: "#ffffff", 
//           borderRadius: "12px", 
//           padding: "20px", 
//           boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", 
//         },
//         root: {
//           "& .MuiBackdrop-root": {
//             backgroundColor: "rgba(0, 0, 0, 0.7)", 
//           },
//         },
//       },
//     },

    

//   }
//   }

// export const CreateTheme = (config = {}) => {
//   let theme = createTheme(_.merge({}, baseOptions, themesOptions,Theme));

//   if (config.responsiveFontSizes) {
//     theme = responsiveFontSizes();
//   }

//   return theme;
// };


import { createTheme } from '@mui/material/styles';

// assets
import colors from '../../public/assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography.jsx';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption),
      custom: {
    gradientButton: "linear-gradient(to bottom right, #760072, #2d013a)",
    // gradientButton: "#298a33",

    hoverGradientButton: "linear-gradient(to bottom right, #2d013a,#d300cc)",
    PageBackGround :"linear-gradient(to right,#280026,#4a004f)",
    // PageBackGround:"#e7efeb",
    // PageBackGround:"#f7f2c5",


    CarBackGround :"linear-gradient(to top right,#900098,#4d0051)",
    BoxBackGround :"linear-gradient(to right, rgba(54, 26, 58, 0.533), #180226)",
    // BoxBackGround :"linear-gradient(to top right,#0bab8f,#a8d1d3)",
    // BoxBackGround :"linear-gradient(to top right,#67554d, #c98a77 , #986b5f ,#f7f2c5)",


    BoxBackGroundReseve :"linear-gradient(to top right,#75017b,#3a013d)",



  },
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
