'use client';

import { useDialog, useModel } from '@futo-ui/hooks'
import { PhotoCamera } from '@mui/icons-material'
import { Badge, Box, Button, Dialog, Grid, Skeleton, Typography } from '@mui/material'
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth'
import { doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { deleteObject } from 'firebase/storage'
import { useRouter } from 'next/navigation' 
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { AspectRatioBox, IconButton, ImageInput } from 'core'
import { createBatch, storage } from 'core/fb'
import { Posts, Profiles, Stories, Usernames } from 'core/fb/colls'
import { Field, Form, Submit, useForm } from 'core/form'
import { ACTIONS } from 'core/i18n'
import { FeedLayout } from 'core/layouts'
import { I, IProvider, l, useLocale } from 'core/utils/i18n'
import { PostDialog, PostFeed, usePostDialog } from 'post'
import { ProfileAvatar, useProfileDialog } from 'profile'
import { AVATAR_IMAGE_TYPES } from 'profile/constants'
import { useAuth, userErrorMessage } from 'user'
import { USER_FIELDS } from 'user/i18n'

const COMMONS = {
  "en": {
    "Edit profile": "Edit profile",
  },
  "es": {
    "Edit profile": "Editar perfil",
  }
}

/**
 * - Integrates [`core/ImageInput`](/docs/core-imageinput--default) within [`core/form/Form`](/docs/core-form-form--default) model. 
 * - Props of the [`core/ImageInput`](/docs/core-imageinput--default) component are also available.
 */
const ImageField = ({ name, ...props }) => {
  const model = useForm(), handleLoad = e => model.handleChange(name)({ target: { value: e.target.result } });
  return <ImageInput name={name} onLoad={handleLoad} {...props} />;
}

ImageField.propTypes = {
  /**
   * The content of the component. 
   */
  children: PropTypes.node,

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
};

const PROFILE_DELETE_DIALOG = {
  "en": {
    "Delete your account": "Delete your Account",
    "Are you sure": "Are you sure you want to delete your account?", //340
    "No recover": "Once you do, you will not be able to ever recover it.",
    "Final decision": <>If that is your <em>final</em> decision, please log in below.</>,
    "Delete everything": "Delete everything"
  },
  "es": {
    "Delete your account": "Eliminar su cuenta",
    "Are you sure": "¿Está seguro de que quiere eliminar su cuenta?", //340
    "No recover": "Una vez que lo haga, no podrá recuperarlo nunca.",
    "Final decision": <>Si esa es su decisión <em>final</em>, inicie sesión a continuación.</>,
    "Delete everything": "Eliminar todo"
  }
}

/**
 * - Confirmation [`@mui/Dialog`](https://mui.com/api/dialog) when user wants to delete their account.
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const ProfileDeleteDialog = ({ user, ...props }) =>
  <IProvider value={PROFILE_DELETE_DIALOG}>
    <Dialog {...props}>
      <Typography paragraph variant="h5"><I k="Delete your account" width={216} /></Typography>
      <Typography gutterBottom><I k="Are you sure" /></Typography>
      <Typography gutterBottom><I k="No recover" /></Typography>
      <Typography gutterBottom><I k="Final decision" /></Typography>
      <Form model={user} actions={<Submit color="error"><I k="Delete everything" width={140} /></Submit>}>
        <Field label={<I dict={USER_FIELDS} k="email" width={80} />} name="email" type="email" autoFocus />
        <Field label={<I dict={USER_FIELDS} k="password" width={80} />} name="password" type="password" />
      </Form>
    </Dialog>
  </IProvider>

ProfileDeleteDialog.propTypes = {
  /**
   * User `@futo-ui/hooks/useModel` model instance / object.
   */
  user: PropTypes.object,
};

// ProfileDialog
const cameraButtonOver = theme => ({ 
  color: theme.palette.secondary.main,
  opacity: 0.5
  // Optional styling for dragover state: uploadButton: { '&.Fui-over': { boxShadow: "inset 0px 0px 3px 0px rgba(0,0,0,0.5)" } }
});

const PROFILE_DIALOG = {
  "en": {
    "Delete account": "Delete account",
    "Change photo": "Change photo",
    "Upload photo": "Upload photo",
    "name": "name",
    "bio": "bio"
  },
  "es": {
    "Delete account": "Eliminar cuenta",
    "Change photo": "Cambiar foto",
    "Upload photo": "Subir foto",
    "name": "nombre",
    "bio": "biografía"
  }
}

/**
 * - Profile [`@mui/Dialog`](https://mui.com/api/dialog) for editing the profile of the user. 
 * - Includes `ProfileDeleteDialog` for deletion of a profile and its functionality.
 * - Integrates drag'n'drop [`core/form/ImageField`](/docs/core-form-imagefield--default) functionality for changing & uploading of the profile photo.
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const ProfileDialog = ({ profile, ...props }) => {
  const auth = useAuth(), locale = useLocale(), router = useRouter(), imageAlt = profile?.displayName || "@" + profile?.username,
        user = useModel({ email: "", password: "" }, { onSubmit: () => {
          reauthenticateWithCredential(getAuth().currentUser, EmailAuthProvider.credential(user.email, user.password)).then(async () => {
            const batch = createBatch();
            batch.delete(doc(Profiles, auth.profile.id));
            batch.delete(doc(Usernames, auth.profile.username));

            const snapshotPosts = await getDocs(query(Posts, where("profileId", "==", auth.uid))),
                  snapshotStories = await getDocs(query(Stories, where("profileId", "==", auth.uid)));

            snapshotStories.forEach(doc => batch.delete(doc.ref)); 
            snapshotPosts.forEach(doc => batch.delete(doc.ref)); 

            return batch.commit()
              .then(() => auth.profile.photoURL ? deleteObject(storage(auth.profile.photoURL)) : Promise.resolve())
              .then(() => getAuth().currentUser.delete())
              .then(() => router.push("/"))
          }).catch(err => user.fail(userErrorMessage(err.code, locale)));
        }}),
        deleteDialog = useDialog(user);

  return (
    <IProvider value={PROFILE_DIALOG}>
      <Dialog maxWidth="sm" {...props}>
        <Typography variant="h5"><I dict={COMMONS} k="Edit profile" width={120} /></Typography>
        <Form model={profile} actionsJustify="space-between" actions={<>
          <Button color="error" onClick={deleteDialog.open} variant="outlined"><I k="Delete account" width={120} /></Button>
          <Submit><I dict={ACTIONS} k="Save" width={60} /></Submit>
        </>}>
          <Grid container sx={{ alignItems: "flex-end", justifyContent: "space-between", pb: 2, pt: 1 }}>
            <Grid item xs={3}>
              <AspectRatioBox>
                <ProfileAvatar alt={imageAlt} src={profile.photoURL} />
                <ImageField accept={AVATAR_IMAGE_TYPES.join(",")} color="secondary" component={IconButton} name="photoURL" sx={t => ({ backgroundColor: t.palette.common.black, left: 0, opacity: 0, position: "absolute", top: 0, transform: "translateZ(0) scale(1, 1)" /*https://github.com/primer/css/issues/574*/, transition: t.transitions.create('opacity', { duration: t.transitions.duration.shorter, easing: t.transitions.easing.easeInOut }), '&:hover': { backgroundColor: "black", ...cameraButtonOver(t) }, '&.Fui-over': cameraButtonOver(t), '&.Fui-over > .MuiIconButton-label > div': { opacity: 1 } })} tooltip={l("Change photo", PROFILE_DIALOG, locale)}>
                  <Box sx={{ border: "3px dashed black", borderRadius: "100%", boxSizing: "content-box", height: "100%", width: "100%", opacity: 0, pointerEvents: "none", left: -6, padding: 3, position: "absolute", top: -6, transition: t => t.transitions.create('opacity', { duration: t.transitions.duration.shorter, easing: t.transitions.easing.easeInOut }),
                  }} />
                  <PhotoCamera />
                </ImageField>
              </AspectRatioBox>
            </Grid>
            <Grid item sx={{ pb: 1 }}>
              <ImageField name="photoURL" variant="outlined"><I k="Upload photo" width={120} /></ImageField>
            </Grid>
          </Grid>
          <Field label={<I k="name" width={60} />} name="displayName" margin="dense" autoFocus />
          <Field label={<I k="bio" width={60} />} name="bio" multiline margin="dense" />
        </Form>
      </Dialog>
      <ProfileDeleteDialog open={deleteDialog.isOpen} onClose={deleteDialog.close} user={user} />
    </IProvider>
  ) 
}

ProfileDialog.propTypes = {
  /**
   * Profile `@futo-ui/hooks/useModel` model instance / object.
   */
  profile: PropTypes.object,
};

const profileAuthorized = (profile, uid) => profile && profile.id === uid;

const PROFILE = {
  "en": {
    "Add post": "Add post"
  },
  "es": {
    "Add post": "Agregar publicación"
  }
}

/**
 * - Profile header that includes [`profile/ProfileAvatar`](/docs/profile-profileavatar--default), information and if logged in - options to edit the profile and add a post. 
 */
const Profile = ({ profileId }) => {
  const auth = useAuth(), [postDialog, post] = usePostDialog(), [profile, setProfile] = useState(null),
        [profileDialog, profileModel] = useProfileDialog(() => profile), imageAlt = profile?.displayName || "@" + profile?.username;
  
  useEffect(() => profileId &&
    onSnapshot(doc(Profiles, profileId), doc => doc.data() && setProfile(doc.data()), () => router.replace("/")), [profileId]);

  return (
    <>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid container item sx={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <Grid item xs={3}>
            <AspectRatioBox>
              <ProfileAvatar alt={imageAlt} ready={Boolean(profile)} src={profile?.photoURL} />
            </AspectRatioBox>
          </Grid>
          { profileAuthorized(profile, auth.uid) && <Grid item sx={{ pb: 1, pt: 2 }}>
            <Badge badgeContent={1} invisible={Boolean(profile?.displayName)}>
              <Button onClick={profileDialog.open} variant="outlined" ><I dict={COMMONS} k="Edit profile" width={90} /></Button>
              <ProfileDialog profile={profileModel} open={profileDialog.isOpen} onClose={profileDialog.close} />
            </Badge>
            <Button onClick={postDialog.open} variant="outlined" sx={{ ml: 2 }}><I dict={PROFILE} k="Add post" width={90} /></Button>
          </Grid> }
        </Grid>
        <Grid item container xs={12}>
          { (!profile || profile.displayName) && <Grid item xs={12}>
            <Typography variant="h5">{ profile ? profile.displayName : <Skeleton width={160} />}</Typography>
          </Grid> }
          <Grid item xs={12}>
            <Typography gutterBottom>{ profile ? "@" + profile.username + " · " + profile.time : <Skeleton width={320} />}</Typography>
          </Grid>
        </Grid>
        { (!profile || profile.bio) && <Grid item xs={12}>
          <Typography gutterBottom>{ profile ? profile.bio : <Skeleton />}</Typography>
        </Grid> }
      </Grid>
      <PostDialog post={post} open={postDialog.isOpen} onClose={postDialog.close} />
    </>
  )
};

Profile.propTypes = {
  /**
   * Determines the profile which we are fetching. If not fetched, stays in loading ([`@mui/Skeleton`](https://mui.com/api/skeleton)) state 
   */
  profileId: PropTypes.string,
};

/**
 * - Shows user's profile with a feed of their posts. If it's own profile, it can be edited. 
 */
const ProfilePage = ({ profileId }) => (
  <FeedLayout>
    <Profile key={"Profile-" + profileId} profileId={profileId} />
    <PostFeed key={"PostFeed-" + profileId} profileId={profileId} />
  </FeedLayout>
)

ProfilePage.propTypes = {
  /**
   * Identifier of the user's profile. 
   */
  profileId: PropTypes.string,
};

export { ProfilePage as default, ImageField, Profile, ProfileDeleteDialog, ProfileDialog };
