import { Toolbar } from '@mui/material'
import PropTypes from 'prop-types'

const toolbar = t => ({
  height: 0,
  minHeight: "auto",
  position: "fixed",
  top: t.mixins.toolbar[t.breakpoints.up('sm')].minHeight / 2,
  transform: "translate(0, -50%)"
});

/**
 * - Adds two upper toolbars on the top-left and top-right.
 */
const FixedLayout = ({ children, toolbarLeft, toolbarRight }) => {
  // Last save: 13 minutes ago
  return (
    <>
      { children }
      <Toolbar disableGutters sx={t => ({ ...toolbar(t), left: 24 })}> 
        { toolbarLeft }
      </Toolbar>
      <Toolbar disableGutters sx={t => ({ ...toolbar(t), right: 24 })}>
        { toolbarRight }
      </Toolbar>
    </>
  )
}

FixedLayout.propTypes = {
  /**
   * The main content within the layout.
   */
  children: PropTypes.node,

  /**
   * The contents of the fixed toolbar on the top-left of the page besides [`core/Logo`](/docs/core-logo--default). 
   */
  toolbarLeft: PropTypes.node,
  
  /**
   * The contents of the fixed toolbar on the top-right of the page besides [`profile/ProfileMenuButton`](/docs/core-profilemenubutton--default).
   */
  toolbarRight: PropTypes.node,
};

export default FixedLayout;
