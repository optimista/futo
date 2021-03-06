import { Fade } from '@material-ui/core'
import { alpha, createTheme, darken, lighten } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import NextLink from 'next/link'
import { forwardRef } from 'react'

const Link = forwardRef(({ className, children, ...props }, _) =>
  <NextLink {...props}><a className={className}>{children}</a></NextLink>);

const theme = createTheme({
  palette: {
    primary: { main: '#000000'},
    secondary: { main: '#cccccc' },
    error: { main: red[600], dark: red[600] }, // setting dark for contained buttons (hover state)
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
      styleOverrides: { root: { borderRadius: 0, justifyContent: "center", marginBottom: theme.spacing(3), marginTop: theme.spacing(1), width: "100%" } },
      variants: [
        {
          props: { severity: "error", variant: 'outlined' },
          style: {
            color: getColor(theme.palette.primary.main, 0.6),
            border: `1px solid ${theme.palette.primary.main}`,
            [`& > .MuiAlert-icon`]: { color: theme.palette.primary.main },
          },
        },
        {
          props: { severity: "error", variant: 'standard' },
          style: {
            border: 0,
            color: getColor(theme.palette.primary.main, 0.6),
            backgroundColor: getBackgroundColor(theme.palette.primary.main, 0.9),
            [`& > .MuiAlert-icon`]: { color: theme.palette.primary.main }
          },
        },
        {
          props: { severity: "success", variant: 'standard' },
          style: { border: 0 },
        },
      ]
    },
    MuiAppBar: {
      defaultProps: { color: "inherit", elevation: 1 },
      styleOverrides: { root: { borderWidth: "0 0 1px 0" } }
    },
    MuiBadge: {
      defaultProps: { color: "primary" },
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
    MuiCardHeader: { styleOverrides: { action: { alignSelf: "center" } } },
    MuiCircularProgress: { defaultProps: { color: "inherit", size: 24 } },
    MuiContainer: { defaultProps: { disableGutters: true } },
    MuiCssBaseline: { styleOverrides: { em: { fontStyle: "normal", fontWeight: "bold", textDecoration: "underline" } } },
    MuiLink: { defaultProps: { component: Link } },
    MuiSkeleton: { defaultProps: { animation: "wave" } },
    MuiSvgIcon: { styleOverrides: { fontSizeLarge: {
      fontSize: theme.typography.pxToRem(28)
    } } },
    MuiToolbar: { defaultProps: { variant: "dense" } },

    // Buttons
    MuiButton: {
      defaultProps: { disableElevation: true, variant: "contained"  },
      styleOverrides: {
        contained: { fontWeight: 400, padding: theme.spacing(1, 4) },
        outlined: { padding: theme.spacing(0.875, 3.875), '&:hover': { backgroundColor: theme.palette.background.default } },
        outlinedPrimary: { borderColor: theme.palette.primary.main },
        outlinedError: { borderColor: theme.palette.error.main },
      }
    },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiIconButton: {
      defaultProps: { color: "primary", disableRipple: true, disableFocusRipple: true, size: "small" },
      styleOverrides: {
        root: { padding: theme.spacing(0.5) },
        colorSecondary: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
            color: theme.palette.primary.main,
          }
        }
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
    MuiDialogTitle: { defaultProps: { disableTypography: true }, styleOverrides: { root: { padding: theme.spacing(0, 0, 1, 0) } } },
    
    // Form
    MuiFormControl: { styleOverrides: { marginDense: { marginBottom: theme.spacing(1), marginTop: theme.spacing(2) }, marginNormal: { marginBottom: theme.spacing(3) } } },
    MuiFormHelperText: { styleOverrides: { root: { bottom: "-0.1rem", position: "absolute", transform: "translate(0, 100%)" } } },
    MuiInput: { styleOverrides: { underline } },
    MuiInputBase: { styleOverrides: { root: { lineHeight: 1.5 }, inputAdornedEnd: { marginRight: theme.spacing(1) } } },
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
    MuiListItemIcon: { styleOverrides: { root: { marginRight: theme.spacing(1.5), minWidth: "auto", '& > .MuiSvgIcon-root': { color: theme.palette.text.primary } } } },
    MuiListItemText: { defaultProps: { disableTypography: true } },

    // Menu / Tooltip
    MuiMenuItem: { defaultProps: { dense: true }, styleOverrides: { root: { paddingBottom: theme.spacing(0.5), paddingTop: theme.spacing(0.5) } } },
    MuiPaper: { defaultProps: { variant: "outlined" }, styleOverrides: { rounded: { borderRadius: 2 } } },
    MuiPopover: { defaultProps: { // I think I don't use Popover at all to be honest (Menu and Tooltip are both Popper)
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      transformOrigin: { vertical: 'top', horizontal: 'right' },
      TransitionComponent: Fade
    }},
    MuiTooltip: { 
      defaultProps: {
        enterDelay: 500,
        enterNextDelay: 500,
        PopperProps: { disablePortal: true },
        TransitionComponent: Fade,
        TransitionProps: { timeout: 100 }
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
    }
  },
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
