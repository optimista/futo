import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'

import { I, IProvider } from 'core/utils/i18n'
import { useAnonymousStoriesCount } from 'story'
 
const SNACKBAR_PENDING_STORIES = {
  "en": {
    "Your stories preserved": c => "Your stor" + (c === 1 ? "y" : "ies") + " will be preserved",
    "You have stories pending": c => "You have " + c + " stor" + (c === 1 ? "y" : "ies") + " pending to be linked to your account. " + (c === 1 ? "It" : "They") + " will be linked after you log in / sign up."
  },
  "es": {
    "Your stories preserved": c => "Tu" + (c === 1 ? "" : "s") + " historia" + (c === 1 ? "" : "s") + " será" + (c === 1 ? "" : "n") + " preservada" + (c === 1 ? "" : "s"),
    "You have stories pending": c => "Hay "+ c + " historia" + (c === 1 ? " " : "s") + " pendiente" + (c === 1 ? "" : "s") + " de vincular a tu cuenta. Se vinculará" + (c === 1 ? "" : "n") + " después de crear / acceder a tu cuenta."
  }
}

/**
 * - [`@mui/Snackbar`](https://mui.com/api/snackbar) that shows notification if your anonymous account has pending stories.
 */
const SnackbarPendingStories = () => {
  const [isOpen, setIsOpen] = useState(false), anonymousStoriesCount = useAnonymousStoriesCount();
  useEffect(() => setIsOpen(Boolean(window.localStorage.getItem("auid"))), []);
 
  return (
    <IProvider value={SNACKBAR_PENDING_STORIES}>
      <Snackbar open={isOpen} sx={{ maxWidth: 440 }}>
        <Alert severity="info" sx={{ width: "calc(100% - 32px)" }} variant="outlined">
          <AlertTitle><I arg={anonymousStoriesCount} k="Your stories preserved" width={220} /></AlertTitle>
          <I arg={anonymousStoriesCount} k="You have stories pending" lines={2} width={330} />
        </Alert>
      </Snackbar>
    </IProvider>
  )
}

export default SnackbarPendingStories;
