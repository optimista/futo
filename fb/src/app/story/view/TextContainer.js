import { Box } from '@material-ui/core'

const TextContainer = ({ children, ...props }) => <Box {...props}>{children}</Box>

export default TextContainer;
