const autosaveReducer = (autosave = { notification: false, pending: false, trigger: false }, action) => {
  switch(action.type) {
    case "autosave-notification-hide":
      return { ...autosave, notification: false }
    case "autosave-notification-show":
      return { ...autosave, notification: true }
    case "autosave-success":
      return { ...autosave, pending: false }
    case "autosave-trigger":
      return { ...autosave, pending: true, trigger: !autosave.trigger }
    default: 
      return autosave;
  }
}

export default autosaveReducer;
