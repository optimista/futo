const theme = createMuiTheme({
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

export default createMuiTheme({
  overrides: {
    MuiAppBar: { root: { borderWidth: "0 0 1px 0" } },
    MuiAvatar: { root: { height: theme.spacing(4), width: theme.spacing(4) } },
    MuiBackdrop: { root: { backgroundColor: "rgba(255,255,255,0.6)" } },
    MuiButton: {
      root: {
        borderRadius: 2,
        margin: "0 1rem",
        '&:first-child:not($sizeLarge)': { marginLeft: 0 },
        '&:last-child:not($sizeLarge)': { marginRight: 0 }
      },
      contained: { fontWeight: 400 },
      outlinedPrimary: {
        borderColor: theme.palette.text.primary,
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
        borderTop: "1px solid "+theme.palette.divider,
        '&:last-of-type': { borderBottom: "1px solid "+theme.palette.divider }
      }
    },
    MuiCardHeader: { action: { alignSelf: "auto", marginRight: 0, marginTop: 0 } },
    MuiCardContent: { root: { paddingTop: 0, paddingLeft: theme.spacing(8) } },
    MuiDialogActions: { root: { padding: theme.spacing(2, 3) } },
    MuiDialogContent: { root: { padding: theme.spacing(2, 3) } },
    MuiDialog: { paper: { padding: theme.spacing(3) } },
    MuiFormControl: {
      marginNormal: { marginBottom: theme.spacing(2), marginTop: theme.spacing(1) }
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
          color: theme.palette.primary.main,
          transition: theme.transitions.create('color', { duration: theme.transitions.duration.shorter, easing: theme.transitions.easing.easeInOut })
        }
      }
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottomWidth: 1, opacity: 0, transform: "none",
          transition: theme.transitions.create('opacity', { duration: theme.transitions.duration.shorter, easing: theme.transitions.easing.easeInOut })
        },
        '&$focused:after': { opacity: 1 },
        '&$error:after': { opacity: 1 },
        '&:before': { borderBottomColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)' },
        '&:hover:not($disabled):before': { borderBottomWidth: 1 }
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
        borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        transition: theme.transitions.create('border-color', { duration: theme.transitions.duration.shorter, easing: theme.transitions.easing.easeInOut })
      }
    },
    MuiList: { padding: { paddingBottom: theme.spacing(0.5), paddingTop: theme.spacing(0.5) } },
    MuiListItemIcon: { root: { color: "#bdbdbd", minWidth: "auto" } },
    MuiListItemText: { inset: { paddingLeft: theme.spacing(1.5) } },
    MuiMenuItem: { root: {
      paddingBottom: theme.spacing(0.5), paddingTop: theme.spacing(0.5)
    } },
    MuiPaper: { rounded: { borderRadius: 2 } },
    MuiPopover: {
      paper: {
        boxShadow: "1px 1px 1px rgba(0,0,0,0.12)"
      }
    }
  },
  palette: theme.palette,
  props: {
    MuiAppBar: { color: "inherit", elevation: 1 },
    MuiButton: { color: "primary", disableElevation: true, variant: "contained" },
    MuiButtonBase: { disableRipple: true },
    MuiCircularProgress: { color: "inherit", size: 24 },
    MuiDialog: { fullWidth: true, maxWidth: "xs", PaperProps: { elevation: 0 }, scroll: "body" },
    MuiDialogTitle: { disableTypography: true },
    MuiFilledInput: { disableUnderline: true },
    MuiIconButton: { color: "primary", disableRipple: true, disableFocusRipple: true, size: "small" },
    MuiListItemText: { disableTypography: true, inset: true },
    MuiLink: { component: Link },
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
});
