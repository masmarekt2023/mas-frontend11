export default function componentStyleOverrides(theme) {
  const bgColor = theme.colors?.grey50;
  return {

        MuiTextField: {
      styleOverrides: {
        root: {
          "&.auth-input": { // تخصيص حقول الإدخال التي تحتوي على فئة auth-input فقط
            "& .MuiInputBase-input": {
              color: "white", // لون النص
            },
            "& .MuiInputLabel-root": {
              color: "white", // لون التسمية
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // لون التسمية عند التركيز
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "white", // لون الحدود قبل التركيز
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white", // لون الحدود عند التمرير
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white", // لون الحدود عند التركيز
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: (props) => ({
          "&.primaryButton": {
            padding: "5px",
            borderRadius: "15px",
            cursor: "pointer",
            transition: "all 0.3s",
            color: "white",
            minWidth : "110px",
            
            background: props.theme.custom.gradientButton,
            "&:hover": {
              background: props.theme.custom.hoverGradientButton,
            },
          },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "white", 
          // color: "#ffffff", 
          borderRadius: "12px", 
          padding: "20px", 
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", 
        },
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.7)", 
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDark,
          padding: '24px'
        },
        title: {
          fontSize: '1.125rem'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: theme.darkTextPrimary,
            backgroundColor: theme.menuSelectedBack,
            '&:hover': {
              backgroundColor: theme.menuSelectedBack,
              
            },
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected
            }
          },
          '&:hover': {
            backgroundColor: theme.menuSelectedBack,
            color: theme.menuSelected,
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: '36px'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        color: "white",

        primary: {
          color: "white"
        },
         '&.Mui-selected':{
          // color: "#000"

         }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          '&::placeholder': {
            color: theme.darkTextSecondary,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.colors?.grey400
          },
          '&:hover $notchedOutline': {
            borderColor: theme.colors?.primaryLight
          },
          '&.MuiInputBase-multiline': {
            padding: 1
          }
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: '15.5px 14px',
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0
            }
          }
        },
        inputAdornedStart: {
          paddingLeft: 4
        },
        notchedOutline: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.colors?.grey300
          }
        },
        mark: {
          backgroundColor: theme.paper,
          width: '4px'
        },
        valueLabel: {
          color: theme?.colors?.primaryLight
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: 1
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit'
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,
          background: theme.colors?.grey700
        }
      }
    }
  };
}
