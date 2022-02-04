import { useDialog, useModel } from '@futo-ui/hooks'
import { pct } from '@futo-ui/utils'
import { PhotoCamera } from '@mui/icons-material'
import { Badge, Box, Button, Dialog, Grid, Skeleton, Typography } from '@mui/material'
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth'
import { doc, getDoc, getDocs, onSnapshot, query, where, writeBatch } from 'firebase/firestore'
import { deleteObject } from 'firebase/storage'
import Head from 'next/head'
import { useRouter } from 'next/router' 
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { IconButton, ImageInput } from 'core'
import { Field, Form, Submit, useForm } from 'core/form'
import { FeedLayout } from 'core/layouts'
import { NAMES } from 'core/locales'
import { db, storage } from 'core/utils'
import { Posts, PostDialog, PostFeed, usePostDialog } from 'post'
import { ProfileAvatar, Profiles, Usernames, useProfileDialog } from 'profile'
import { AVATAR_IMAGE_TYPES } from 'profile/constants'
import { userErrorMessage } from 'user'
import { useAuth } from 'user'

/**
 * - Preserves [`@mui/Box`](https://mui.com/api/box) ratio within given dimensional constraint.
 */
const AspectRatioBox = ({ children, ratio = 1 }) =>
  <Box sx={{ position: "relative" }}> 
    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, '& > *:not([role="tooltip"])': { height: "100%", maxHeight: "none", maxWidth: "none", width: "100%" } }}>
      {children}
    </Box>
    <Box sx={{ paddingBottom: pct(1/ratio) }} />
  </Box>

AspectRatioBox.propTypes = {
  /**
   * The content of the component. 
   */
  children: PropTypes.node,

  /**
   * The width-to-height ratio of the [`@mui/Box`](https://mui.com/api/box).
   * @default 1
   */
  ratio: PropTypes.number,
};

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

/**
 * - Confirmation [`@mui/Dialog`](https://mui.com/api/dialog) when user wants to delete their account.
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const ProfileDeleteDialog = ({ user, ...props }) =>
  <Dialog {...props}>
    <Typography paragraph variant="h5">Delete your Account</Typography>
    <Typography gutterBottom>Are you sure you want to delete your account?</Typography>
    <Typography gutterBottom>Once you do, you will not be able to ever recover it.</Typography>
    <Typography gutterBottom>If that is your <em>final</em> decision, please log in below.</Typography>
    <Form model={user} actions={<Submit color="error">Delete Everything</Submit>}>
      <Field name="email" type="email" autoFocus />
      <Field name="password" type="password" />
    </Form>
  </Dialog>

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

/**
 * - Profile [`@mui/Dialog`](https://mui.com/api/dialog) for editing the profile of the user. 
 * - Includes `ProfileDeleteDialog` for deletion of a profile and its functionality.
 * - Integrates drag'n'drop [`core/form/ImageField`](/docs/core-form-imagefield--default) functionality for changing & uploading of the profile photo.
 * - Props of the [`@mui/Dialog`](https://mui.com/api/dialog) are also available.
 */
const ProfileDialog = ({ profile, ...props }) => {
  const auth = useAuth(),
        router = useRouter(),
        user = useModel({ email: "", password: "" }, { onSubmit: () => {
          reauthenticateWithCredential(getAuth().currentUser, EmailAuthProvider.credential(user.email, user.password)).then(() => {
            getDocs(query(Posts, where("profileUsername", "==", auth.profile.username))).then(snapshot => {
              const batches = [writeBatch(db())]; let i = 0, ops = 2;
              batches[i].delete(doc(Profiles, auth.profile.id));
              batches[i].delete(doc(Usernames, auth.profile.username));

              snapshot.forEach(doc => {
                batches[i].delete(doc.ref); ops++;
                if (ops === 2) { batches.push(writeBatch(db())); i++; ops = 0; }
              }); 

              Promise.all(batches.map(b => b.commit()))
                .then(() => auth.profile.photoURL ? deleteObject(storage(auth.profile.photoURL)) : Promise.resolve())
                .then(() => getAuth().currentUser.delete())
                .then(() => router.push("/"))
                .catch(err => user.fail(userErrorMessage(err)));
            });
          }).catch(err => user.fail(userErrorMessage(err)));
        }}),
        deleteDialog = useDialog(user);

  return (
    <>
      <Dialog maxWidth="sm" {...props}>
        <Typography variant="h5">Edit profile</Typography>
        <Form model={profile} actionsJustify="space-between" actions={<>
          <Button color="error" onClick={deleteDialog.open} variant="outlined">Delete Account</Button>
          <Submit>Save</Submit>
        </>}>
          <Grid container sx={{ alignItems: "flex-end", justifyContent: "space-between", pb: 2, pt: 1 }}>
            <Grid item xs={3}>
              <AspectRatioBox>
                <ProfileAvatar src={profile.photoURL} />
                <ImageField accept={AVATAR_IMAGE_TYPES.join(",")} color="secondary" component={IconButton} name="photoURL" sx={{ backgroundColor: "black", left: 0, opacity: 0, position: "absolute", top: 0, transform: "translateZ(0) scale(1, 1)" /*https://github.com/primer/css/issues/574*/, transition: t => t.transitions.create('opacity', { duration: t.transitions.duration.shorter, easing: t.transitions.easing.easeInOut }), '&:hover': t => ({ backgroundColor: "black", ...cameraButtonOver(t) }), '&.Fui-over': t => cameraButtonOver(t), '&.Fui-over > .MuiIconButton-label > div': { opacity: 1 } }} tooltip="Change photo">
                  <Box sx={{ border: "3px dashed black", borderRadius: "100%", boxSizing: "content-box", height: "100%", width: "100%", opacity: 0, pointerEvents: "none", left: -6, padding: 3, position: "absolute", top: -6, transition: t => t.transitions.create('opacity', { duration: t.transitions.duration.shorter, easing: t.transitions.easing.easeInOut }),
                  }} />
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

ProfileDialog.propTypes = {
  /**
   * Profile `@futo-ui/hooks/useModel` model instance / object.
   */
  profile: PropTypes.object,
};

/**
 * - Profile header that includes [`profile/ProfileAvatar`](/docs/profile-profileavatar--default), information and if logged in - options to edit the profile and add a post. 
 */
const Profile = ({ profileId }) => {
  const auth = useAuth(),
        [postDialog, post] = usePostDialog(),
        [profile, setProfile] = useState(null),
        [profileDialog, profileModel] = useProfileDialog(() => profile);
  
  useEffect(() => profileId &&
    onSnapshot(doc(Profiles, profileId), doc => doc.data() && setProfile(doc.data()), () => router.replace("/")), [profileId]);

  const isMyProfile = auth.isLoggedIn && auth.uid === profile?.id;

  return (
    <>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid container item sx={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <Grid item xs={3}>
            <AspectRatioBox>
              <ProfileAvatar ready={Boolean(profile)} src={profile?.photoURL} />
            </AspectRatioBox>
          </Grid>
          { isMyProfile && <Grid item sx={{ pb: 1 }}>
            <Badge badgeContent={1} invisible={Boolean(profile.displayName)}>
              <Button onClick={profileDialog.open} variant="outlined" >
                Edit profile
              </Button>
            </Badge>
            <Button onClick={postDialog.open} variant="outlined" sx={{ ml: 2 }}>Add post</Button>
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
      { isMyProfile && profileDialog.isOpen && <ProfileDialog profile={profileModel} open={profileDialog.isOpen} onClose={profileDialog.close} /> }
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
 * - Shows user's profile with a feed of their post. If it's own profile, it can be edited. 
 */
const ProfilePage = ({ bio, displayName, photoURL, profileId }) => {
  const router = useRouter(),
        { username } = router.query;

  const name = displayName || username,
        imageAlt = name+"'s profile picture";

  return (
    <>
      <Head>
        <meta property="og:title" content={name} />
        <meta property="og:description" content={bio} />
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={"https://"+NAMES.name+".vercel.app/"+username} />
        <meta property="og:image" content={photoURL} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={"@"+NAMES.name} />
        <meta name="twitter:image:alt" content={imageAlt} />
        <title>{name}</title>
      </Head>
      <FeedLayout>
        <Profile key={"Profile-" + username} profileId={profileId} />
        <PostFeed key={"PostFeed-" + username} profileId={profileId} />
      </FeedLayout>
    </>
  )
}

ProfilePage.propTypes = {
  /**
   * Bio of the user. 
   */
  bio: PropTypes.string,
  
  /**
   * Name of the user. 
   */
  displayName: PropTypes.string,
  
  /**
   * URL to the user's photo. 
   */
  photoURL: PropTypes.string,

  /**
   * Identifier of the user's profile. 
   */
  profileId: PropTypes.string,
};

const getStaticProps = async ({ params }) => {
  const docUsername = await getDoc(doc(Usernames, params.username));

  if (!docUsername.exists()) return { redirect: { destination: '/', permanent: false } };

  const { profileId } = docUsername.data(),
        docProfile = await getDoc(doc(Profiles, profileId)),
        { displayName = null, bio = null, photoURL = null } = docProfile.data();

  return {
    props: { displayName, bio, photoURL, profileId }, // will be passed to the page component as props
    revalidate: 1000
  }
}

const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true 
  }
}

export { ProfilePage as default, AspectRatioBox, ImageField, Profile, ProfileDeleteDialog, ProfileDialog, getStaticPaths, getStaticProps };

/*
 * PURELY CLIENT-SIDE PAGE
 *
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FeedLayout } from 'core/layouts'
import { PostFeed } from 'post'
import { Profile, Usernames } from 'profile'

const ProfilePage = () => {
  const router = useRouter(), { username } = router.query, [profileId, setProfileId] = useState(null);

  useEffect(() => username && Usernames.doc(username).get()
    .then(doc => doc.exists ? setProfileId(doc.data().profileId) : router.replace("/"), () => router.replace("/")), [username]);

  return (
    <FeedLayout>
      <Profile key={"Profile-" + username} profileId={profileId} />
      <PostFeed key={"PostFeed-" + username} profileId={profileId} ready={profileId} />
    </FeedLayout>
  )
}

export default ProfilePage;
*/
