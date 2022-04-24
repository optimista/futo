import { CircularProgress, Fade } from '@mui/material'
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { alpha, createTheme, darken, lighten } from '@mui/material/styles';
import NextLink from 'next/link'
import { forwardRef } from 'react'

const Link = forwardRef(({ className, children, ...props }, _) =>
  <NextLink {...props}><a className={className}>{children}</a></NextLink>);

const theme = createTheme({
  palette: {
    primary: { main: '#000000'},
    secondary: { main: '#cccccc' },
    background: { default: '#ffffff' },
    text: { primary: "rgba(0, 0, 0, 0.8)" },
    action: {
      disabled: undefined, // because I want color of font to be inherit and not grey on grey
      disabledBackground: "rgba(0, 0, 0, 0.24)",
      focus: "rgba(0, 0, 0, 0.18)", // MenuItem on hover - different leveling
      focusOpacity: 0.18,
      hover: "rgba(0, 0, 0, 0.06)",
      hoverOpacity: 0.06,
      selected: "rgba(0, 0, 0, 0.12)",
      selectedOpacity: 0.12
    }
  },
  transitions: {
    duration: {
      shortest: 100,
      shorter: 250,
      short: 300,
      standard: 375,
      complex: 450,
      enteringScreen: 250,
      leavingScreen: 200
    }
  }
});

const getColor = theme.palette.mode === 'light' ? darken : lighten;
const getBackgroundColor = theme.palette.mode === 'light' ? lighten : darken;
const underline = {
  '&:after': {
    borderBottomWidth: 1, opacity: 0, transform: "none",
    transition: theme.transitions.create('opacity', { duration: theme.transitions.duration.shorter, easing: theme.transitions.easing.easeInOut })
  },
  '&.Mui-focused:after': { opacity: 1 },
  '&.Mui-error:after': { opacity: 1 },
  '&:before': { borderBottomColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)' },
  '&:hover:not(.Mui-disabled):before': { borderBottomWidth: 1 },
};

export default createTheme({
  components: {
    // Misc
    MuiAlert: {
      defaultProps: { severity: "error" },
      styleOverrides: { icon: { fontSize: "1.375rem", height: "1.375rem", width: "1.375rem" }, root: { justifyContent: "center", width: "100%" } },
      variants: [
        {
          props: { variant: "outlined" },
          style: { borderColor: theme.palette.grey[200], borderRadius: 6, color: theme.palette.text.primary, '& > .MuiAlert-icon': { color: theme.palette.primary.main } }
        },
        {
          props: { variant: "standard" },
          style: { border: 0, borderRadius: 0 }
        },
        {
          props: { severity: "error", variant: 'standard' },
          style: { backgroundColor: getBackgroundColor(theme.palette.primary.main, 0.9), color: getColor(theme.palette.primary.main, 0.6), '& > .MuiAlert-icon': { color: theme.palette.primary.main } },
        },
        {
          props: { severity: "info", variant: 'standard' },
          style: { backgroundColor: theme.palette.error.dark, color: theme.palette.common.white, fontWeight: "bold", '& > .MuiAlert-icon': { color: theme.palette.common.white } },
        },
      ]
    },
    MuiAppBar: {
      defaultProps: { color: "inherit" },
      styleOverrides: { root: { borderWidth: "0 0 1px 0" } }
    },
    MuiBadge: {
      defaultProps: { color: "error" },
      variants: [
        { 
          props: { variant: "small" },
          style: { '& > .MuiBadge-badge': { fontSize: "0.66rem", minWidth: 16, height: 16, width: 16 } }
        },
        {
          props: { overlap: "rectangular", variant: "standard" },
          style: { '& > .MuiBadge-anchorOriginTopRightRectangular': { transform: "translate(36%, -36%)" } }
        }
      ]
    },
    MuiCardHeader: { styleOverrides: { action: { alignSelf: "center", marginBottom: 0, marginTop: 0, marginRight: 0 } } },
    MuiCircularProgress: { defaultProps: { size: 24 } },
    MuiContainer: { defaultProps: { disableGutters: true } },
    MuiCssBaseline: { styleOverrides: { em: { fontStyle: "normal", fontWeight: "bold", textDecoration: "underline" } } },
    MuiLink: { defaultProps: { component: Link, underline: "hover" } },
    MuiSkeleton: { defaultProps: { animation: "wave" } },
    MuiSnackbar: { defaultProps: { anchorOrigin: { horizontal: "right", vertical: "bottom" }, TransitionComponent: Fade, TransitionProps: { exit: false } }, styleOverrides: {
      root: { backgroundColor: theme.palette.background.default },
      anchorOriginBottomRight: { bottom: 24, left: "auto", right: 24 }
    }},
    MuiSnackbarContent: { styleOverrides: { root: {
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.grey[200],
      borderRadius: 6,
      color: theme.palette.text.primary,
      [theme.breakpoints.up('sm')]: {
        minWidth: "auto",
      }
    }, message: { padding: 0 } } },
    MuiSvgIcon: { styleOverrides: { 
      fontSizeInherit: { height: "inherit", width: "inherit" },
      fontSizeLarge: { height: "1.75rem", width: "1.75rem" },
      fontSizeMedium: { height: "1.5rem", width: "1.5rem" }
    }},

    // Buttons
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true, variant: "contained"  },
      styleOverrides: {
        root: { padding: theme.spacing(1, 4) },
        contained: { fontWeight: 400 },
        startIcon: { '&>.MuiSvgIcon-root:nth-of-type(1)': { fontSize: "1.375rem", height: "1.375rem", width: "1.375rem" } },
        outlined: { padding: theme.spacing(0.875, 3.875), '&:hover': { backgroundColor: theme.palette.background.default } }, // Padding because of border
        outlinedPrimary: { borderColor: theme.palette.primary.main }, // It's actually lighter and darkens only on hover
        outlinedError: { borderColor: theme.palette.error.main }, // It's actually lighter and darkens only on hover
        text: { borderRadius: 6, padding: theme.spacing(1, 2) }
      }
    },
    // If we don't disableRipple for ButtonBase, it will persist for IconButton. If we put disableRipple to IconButton, it will cancel out the hover for IconButton
    MuiButtonBase: { defaultProps: { disableRipple: true, LinkComponent: Link } }, 
    MuiIconButton: {
      defaultProps: { color: "primary", disableFocusRipple: true, size: "small" },
      styleOverrides: {
        colorSecondary: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
            color: theme.palette.primary.main,
          }
        },
        sizeSmall: { padding: theme.spacing(0.5) }
      }
    },
    MuiLoadingButton: {
      defaultProps: { loadingIndicator: <CircularProgress color="inherit" size={24} />, variant: "contained" },
      styleOverrides: {
        root: {
          // MuiLoadingButton-loading shouldn't be here, but upwards instead of root key, the same for containedPrimary actually... This is mess! 
          '&.MuiLoadingButton-loading.MuiButton-containedPrimary.Mui-disabled': { backgroundColor: theme.palette.primary.main }, 
          '&.MuiLoadingButton-loading > .MuiLoadingButton-loadingIndicator': { color: theme.palette.primary.contrastText },
          '&.MuiLoadingButton-loading.MuiButton-containedError.Mui-disabled': { backgroundColor: theme.palette.error.main }, 
        },
      }
    },

    // Dialog
    MuiBackdrop: { styleOverrides: { root: { backgroundColor: "rgba(255,255,255,0.6)" } } },
    MuiDialog: { 
      defaultProps: { fullWidth: true, maxWidth: "xs", scroll: "body" },
      styleOverrides: { paper: { boxSizing: "content-box", padding: theme.spacing(5, 6) } },
    },
    MuiDialogActions: { styleOverrides: { root: { padding: theme.spacing(2, 0, 0, 0), '& > :not(:first-of-type)': { marginLeft: theme.spacing(2) } } } },
    MuiDialogContent: { styleOverrides: { root: { padding: theme.spacing(1, 0) } } },
    MuiDialogTitle: { defaultProps: { sx: { typography: "h5" } }, styleOverrides: { root: { padding: theme.spacing(0, 0, 1, 0) } } },
    
    // Form
    MuiFormControl: { styleOverrides: { marginDense: { marginBottom: theme.spacing(1), marginTop: theme.spacing(2) }, marginNormal: { marginBottom: theme.spacing(3) } } },
    MuiFormHelperText: { styleOverrides: { root: { bottom: "-0.1rem", position: "absolute", transform: "translate(0, 100%)" } } },
    MuiInput: { styleOverrides: { underline } },
    MuiInputBase: { styleOverrides: { root: { lineHeight: 1.5 }, adornedEnd: { '& > .MuiSvgIcon-root': { flexShrink: 0 } }, inputAdornedEnd: { marginRight: theme.spacing(1) } } }, // flexShrink not to cut width from adornment
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.875rem", fontWeight: 300, letterSpacing: 2, textTransform: "uppercase" }, animated: { transitionDuration: theme.transitions.duration.shortest },
        filled: { '&.MuiInputLabel-shrink': { transform: "translate(12px, -9px) scale(0.75)" } }
      }
    },
    MuiFilledInput: { styleOverrides: { input: { paddingTop: theme.spacing(1.25), paddingBottom: theme.spacing(1.25) }, underline } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { '&.Mui-focused > .MuiOutlinedInput-notchedOutline': { borderWidth: 1 } },
        input: { padding: "10px 12px" },
        inputMarginDense: { paddingBottom: 10, paddingTop: 10 },
        notchedOutline: { 'legend': { letterSpacing: 2 } }
      }
    },
    MuiTextField: { defaultProps: { fullWidth: true, margin: "normal", variant: "standard" } },

    // List
    MuiList: { styleOverrides: { root: { '&:focus': { outline: "none" } }, padding: { padding: theme.spacing(0.5, 0) } } },
    MuiListItemIcon: { styleOverrides: { root: { marginRight: theme.spacing(1.5), minWidth: "auto !important", '& > .MuiSvgIcon-root': { color: theme.palette.text.primary } } } },
    MuiListItemText: { defaultProps: { disableTypography: true } },

    // Menu / Tooltip
    MuiMenuItem: { defaultProps: { dense: true }, styleOverrides: { root: { paddingBottom: theme.spacing(0.5), paddingTop: theme.spacing(0.5) }, dense: { [`& .${listItemIconClasses.root} > svg`]: { height: "1.375rem", width: "1.375rem" } } } },
    MuiPaper: { defaultProps: { variant: "outlined" }, styleOverrides: { rounded: { borderRadius: 2 } } },
    MuiPopper: { styleOverrides: { root: { zIndex: 1150 } } },
    MuiTooltip: { 
      defaultProps: {
        enterDelay: 500,
        enterNextDelay: 500,
        PopperProps: { disablePortal: true },
        TransitionComponent: Fade
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[800],
          border: "1px solid "+theme.palette.divider,
          color: "white",
          padding: theme.spacing(0.25, 0.5)
        }, 
        popper: {
          '&[data-popper-placement*="bottom"] > div.MuiTooltip-tooltip': {
            marginTop: theme.spacing(0.5),
            [theme.breakpoints.up('sm')]: {
              marginTop: theme.spacing(0.5),
            }, 
          },
          '&[data-popper-placement*="top"] > div.MuiTooltip-tooltip': {
            marginBottom: theme.spacing(0.5),
            [theme.breakpoints.up('sm')]: {
              marginBottom: theme.spacing(0.5),
            }, 
          }
        },
      }
    },
  },
  mixins: { toolbar: { [theme.breakpoints.up('sm')]: { minHeight: 56 } } },
  palette: theme.palette,
  shape: { borderRadius: 2 },
  transitions: theme.transitions,
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h5: { fontWeight: 500, lineHeight: 1.5 },
    button: { fontWeight: 300 }
  },
  zIndex: { tooltip: 1000 }
});
