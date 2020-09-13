const themeBase = createMuiTheme({
  palette: {
    primary: { main: '#000000'},
    secondary: { main: '#cccccc' },
    error: { main: red.A400 },
    background: { default: '#ffffff' },
    text: { primary: "rgba(0, 0, 0, 0.8)" }
  },
  transitions: {
    duration: {
      shortest: 200,
      shorter: 250,
      short: 300,
      standard: 375,
      complex: 450,
      enteringScreen: 250,
      leavingScreen: 200
    }
  }
});

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: { root: { borderWidth: "0 0 1px 0" } },
    MuiAvatar: { root: { height: themeBase.spacing(4), width: themeBase.spacing(4) } },
    MuiBackdrop: { root: { backgroundColor: "rgba(255,255,255,0.6)" } },
    MuiButton: {
      root: {
        borderRadius: 2,
        transition: "none",
        margin: "0 1rem",
        '&:first-child:not($sizeLarge)': { marginLeft: 0 },
        '&:last-child:not($sizeLarge)': { marginRight: 0 }
      },
      contained: { fontWeight: 400 },
      outlinedPrimary: {
        borderColor: themeBase.palette.text.primary,
        '&:hover': { backgroundColor: "transparent" }
      },
      sizeLarge: {
        display: "block",
        margin: "1rem auto"
      },
      textPrimary: {
        '&:hover': { backgroundColor: "transparent", textDecoration: "underline" }
      }
    },
    MuiCard: {
      root: {
        border: 0,
        borderTop: "1px solid "+themeBase.palette.divider,
        '&:last-of-type': { borderBottom: "1px solid "+themeBase.palette.divider }
      }
    },
    MuiCardHeader: { action: { alignSelf: "auto", marginRight: 0, marginTop: 0 } },
    MuiCardContent: { root: { paddingTop: 0, paddingLeft: themeBase.spacing(8) } },
    MuiDialogActions: { root: { padding: themeBase.spacing(2, 3) } },
    MuiDialogContent: { root: { padding: themeBase.spacing(2, 3) } },
    MuiDialog: { paper: { padding: themeBase.spacing(3) } },
    MuiFormControl: {
      marginNormal: { marginBottom: themeBase.spacing(2), marginTop: themeBase.spacing(1) }
    },
    MuiIconButton: {
      colorPrimary: {
        '&:hover': {
          backgroundColor: "transparent"
        }
      },
      colorSecondary: {
        '&:hover': {
          backgroundColor: "transparent",
          color: themeBase.palette.primary.main,
          transition: 'color '+themeBase.transitions.duration.shorter+'ms '+themeBase.transitions.easing.easeInOut+' 0ms'
        }
      }
    },
    MuiInput: {
      underline: {
        '&:after': { display: "none" },
        '&:before': { borderBottomColor: themeBase.palette.type === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)' },
        '&:hover:not($disabled):before, &$focused:before': { borderWidth: 1 }
      }
    },
    MuiInputBase: { root: { lineHeight: "inherit" } },
    MuiFilledInput: {
      root: { borderTopLeftRadius: 2, borderTopRightRadius: 2, borderBottomLeftRadius: 2, borderBottomRightRadius: 2 },
      input: { padding: '10px 12px' },
      inputMarginDense: { paddingBottom: 10, paddingTop: 10 }
    },
    MuiOutlinedInput: {
      root: { '&$focused > .MuiOutlinedInput-notchedOutline': { borderWidth: 1 } },
      input: { padding: "10px 12px" },
      inputMarginDense: { paddingBottom: 10, paddingTop: 10 },
      notchedOutline: {
        borderColor: themeBase.palette.type === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        transition: 'border-color '+themeBase.transitions.duration.shorter+'ms '+themeBase.transitions.easing.easeInOut+' 0ms',
      }
    },
    MuiList: { padding: { paddingBottom: themeBase.spacing(0.5), paddingTop: themeBase.spacing(0.5) } },
    MuiListItemIcon: { root: { color: "#bdbdbd", minWidth: "auto" } },
    MuiListItemText: { inset: { paddingLeft: themeBase.spacing(1.5) } },
    MuiMenuItem: { root: {
      paddingBottom: themeBase.spacing(0.5), paddingTop: themeBase.spacing(0.5)
    } },
    MuiPaper: { rounded: { borderRadius: 2 } },
    MuiPopover: {
      paper: {
        boxShadow: "1px 1px 1px rgba(0,0,0,0.12)"
      }
    }
  },
  palette: themeBase.palette,
  props: {
    MuiAppBar: {
      color: "inherit",
      elevation: 1,
    },
    MuiButton: {
      color: "primary",
      disableElevation: true,
      variant: "contained"
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiDialog: { fullWidth: true, maxWidth: "xs", PaperProps: { elevation: 0 }, scroll: "body" },
    MuiDialogTitle: { disableTypography: true },
    MuiFilledInput: {
      disableUnderline: true
    },
    MuiIconButton: {
      color: "primary",
      disableRipple: true,
      disableFocusRipple: true,
      size: "small"
    },
    MuiListItemText: {
      disableTypography: true,
      inset: true
    },
    MuiLink: {
      component: Link
    },
    MuiMenu: {
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      getContentAnchorEl: null,
      transformOrigin: { vertical: 'top', horizontal: 'right' },
      TransitionComponent: Fade
    },
    MuiMenuItem: { dense: true },
    MuiPaper: { variant: "outlined" },
    MuiSkeleton: { animation: "wave" },
    MuiTextField: { margin: "dense" },
    MuiToolbar: { variant: "dense" }
  },
  typography: {
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h5: { fontWeight: 500, lineHeight: 1.5 },
    button: { fontWeight: 300 }
  }
})
