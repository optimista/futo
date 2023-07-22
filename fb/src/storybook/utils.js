import { Container } from '@mui/material'

import { FocusLayout } from 'core/layouts'

const DEFAULT_AVATAR = "/storybook/mockup-avatar.jpg";

const centerDecorator = ({ sx = {}, ...props } = { sx: {} }) => (Story, { viewMode }) =>
  viewMode === "docs" ? <Story /> : <Container maxWidth="md" sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", ...sx }} {...props}><Story /></Container>

const focusLayoutDecorator = Story => 
  <FocusLayout maxWidth="xs"><Story /></FocusLayout>
    
const marginFixDecorator = Story => <div style={{ margin: -16 }}><Story /></div>

export { DEFAULT_AVATAR, centerDecorator, focusLayoutDecorator, marginFixDecorator };
