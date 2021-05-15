import { pct } from '@futo-ui/utils'
import { Box } from '@material-ui/core'

const AspectRatioBox = ({ children, ratio = 1 }) =>
  <Box sx={{ position: "relative" }}> 
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, '& > *:not([role="tooltip"])': { height: "100%", width: "100%" } }}>
      {children}
    </Box>
    <Box sx={{ paddingBottom: pct(1/ratio) }} />
  </Box>

export default AspectRatioBox;
