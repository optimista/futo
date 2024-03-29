import { Container } from '@mui/material'

const centerDecorator = ({ sx = {}, ...props } = { sx: {} }) => (Story, { viewMode }) =>
  viewMode === "docs" ? <Story /> : <Container maxWidth="md" sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", ...sx }} {...props}><Story /></Container>

export { centerDecorator };
