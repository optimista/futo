import { useDialog, useModel } from '@futo-ui/hooks'
import { Badge, Button, Dialog, Grid, Skeleton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { PhotoCamera } from '@material-ui/icons'
import { useRouter } from 'next/router' 
import { useEffect, useState } from 'react'

import { useAuth } from 'auth'
import { AspectRatioBox, Avatar, IconButton } from 'core'
import { Field, Form, ImageField, Submit } from 'core/form'
import { Posts, PostDialog, usePostDialog } from 'models/post'
import { Profiles, Usernames, useProfileDialog } from 'models/profile'
import { firebase, firebaseError } from 'utils'

// ProfileDeleteDialog
const ProfileDeleteDialog = ({ onClose, user, ...props }) =>
  <Dialog onClose={onClose} {...props}>
    <Typography paragraph variant="h5">Delete your Account</Typography>
    <Typography gutterBottom>Are you sure you want to delete your account?</Typography>
    <Typography gutterBottom>Once you do, you will not be able to ever recover it.</Typography>
    <Typography gutterBottom>If that is your <em>final</em> decision, please log in below.</Typography>
    <Form model={user} actions={<Submit color="error">Delete Everything</Submit>}>
      <Field name="email" type="email" autoFocus />
      <Field name="password" type="password" />
    </Form>
  </Dialog>

// ProfileDialog
const cameraButtonOver = theme => ({ 
  color: theme.palette.secondary.main,
  opacity: 0.5
});

const useStyles = makeStyles(theme => ({
  cameraButton: {
    backgroundColor: "black",
    left: 0, 
    opacity: 0,
    position: "absolute",
    top: 0,
    transform: "translateZ(0) scale(1, 1)", // https://github.com/primer/css/issues/574
    transition: theme.transitions.create('opacity', { duration: theme.transitions.duration.shorter, easing: theme.transitions.easing.easeInOut }),
    '&:hover': { backgroundColor: "black", ...cameraButtonOver(theme) },
    '&.Fui-over': cameraButtonOver(theme), 
    '&.Fui-over > .MuiIconButton-label > div': { opacity: 1 } // cameraButtonBorder
  },
  cameraButtonBorder: {
    border: "3px dashed black",
    borderRadius: "100%",
    boxSizing: "content-box",
    height: "100%",
    width: "100%",
    opacity: 0,
    pointerEvents: "none",
    left: -6,
    padding: 3,
    position: "absolute",
    top: -6,
    transition: theme.transitions.create('opacity', { duration: theme.transitions.duration.shorter, easing: theme.transitions.easing.easeInOut }),
  },
  // Optional styling for dragover state: uploadButton: { '&.Fui-over': { boxShadow: "inset 0px 0px 3px 0px rgba(0,0,0,0.5)" } }
}));

const ProfileDialog = ({ profile, onClose, ...props }) => {
  const auth = useAuth(),
        classes = useStyles(),
        router = useRouter(),
        user = useModel({ email: "", password: "" }, { onSubmit: () => {
          firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, user.password)).then(() => {
            Posts.where("profileUsername", "==", auth.profile.username).get().then(snapshot => {
              const batches = [firebase.firestore().batch()]; let i = 0, ops = 2;
              batches[i].delete(Profiles.doc(auth.profile.id));
              batches[i].delete(Usernames.doc(auth.profile.username));

              snapshot.forEach(doc => {
                batches[i].delete(doc.ref); ops++;
                if (ops === 500) { batches.push(firebase.firestore().batch()); i++; ops = 0; }
              }); 

              Promise.all(batches.map(b => b.commit()))
                .then(() => auth.profile.photoURL ? firebase.storage().refFromURL(auth.profile.photoURL).delete() : Promise.resolve())
                .then(() => firebase.auth().currentUser.delete())
                .then(() => router.push("/"))
                .catch(err => user.fail(firebaseError(err)));
            });
          }).catch(err => user.fail(firebaseError(err)));
        }}),
        deleteDialog = useDialog(user);

  return (
    <>
      <Dialog maxWidth="sm" onClose={onClose} {...props}>
        <Typography variant="h5">Edit profile</Typography>
        <Form model={profile} actionsJustify="space-between" actions={<>
          <Button color="error" onClick={deleteDialog.open} variant="outlined">Delete Account</Button>
          <Submit>Save</Submit>
        </>}>
          <Grid container sx={{ alignItems: "flex-end", justifyContent: "space-between", pb: 2, pt: 1 }}>
            <Grid item xs={3}>
              <AspectRatioBox>
                <Avatar src={profile.photoURL} />
                <ImageField className={classes.cameraButton} color="secondary" component={IconButton} name="photoURL" tooltip="Change photo">
                  <div className={classes.cameraButtonBorder} />
                  <PhotoCamera />
                </ImageField>
              </AspectRatioBox>
            </Grid>
            <Grid item sx={{ pb: 1 }}>
              <ImageField name="photoURL" variant="outlined">Upload Photo</ImageField>
            </Grid>
          </Grid>
          <Field name="displayName" label="Name" margin="dense" autoFocus />
          <Field name="bio" multiline margin="dense" />
        </Form>
      </Dialog>
      <ProfileDeleteDialog open={deleteDialog.isOpen} onClose={deleteDialog.close} user={user} />
    </>
  ) 
}

// Profile
const Profile = ({ profileId }) => {
  const auth = useAuth(),
        [postDialog, post] = usePostDialog(),
        [profile, setProfile] = useState(null),
        [profileDialog, profileModel] = useProfileDialog(() => profile);
  
  useEffect(() => profileId &&
    Profiles.doc(profileId).onSnapshot(doc => doc.data() && setProfile(doc.data()), () => router.replace("/")), [profileId]);

  const loading = profile === null,
        isMyProfile = auth.isLoggedIn && auth.uid === profile?.id;
 
  return (
    <>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid container item sx={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <Grid item xs={3}>
            <AspectRatioBox>
              <Avatar skeleton={loading} src={profile?.photoURL} />
            </AspectRatioBox>
          </Grid>
          { isMyProfile && <Grid item sx={{ pb: 1 }}>
            <Badge badgeContent={1} color="error" invisible={Boolean(profile.displayName)}>
              <Button onClick={profileDialog.open} variant="outlined" >
                Edit profile
              </Button>
            </Badge>
            <Button onClick={postDialog.open} variant="outlined" sx={{ ml: 2 }}>Add post</Button>
          </Grid> }
        </Grid>
        <Grid item container xs={12}>
          { (loading || profile.displayName) && <Grid item xs={12}>
            { !loading ? <Typography variant="h5">{profile.displayName}</Typography> : <Skeleton height={36} /> }
          </Grid> }
          <Grid item xs={12}>
            { !loading ? <Typography gutterBottom>{"@" + profile.username + " · " + profile.time}</Typography> : <Skeleton height={30} /> }
          </Grid>
        </Grid>
        { (loading || profile.bio) && <Grid item xs={12}>
          { !loading ? <Typography gutterBottom>{profile.bio}</Typography> : <Skeleton height={24} /> }
        </Grid> }
      </Grid>
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} />
      { isMyProfile && profileDialog.isOpen && <ProfileDialog profile={profileModel} open={profileDialog.isOpen} onClose={profileDialog.close} /> }
    </>
  )
};

export default Profile;
