import { base64 } from '@futo-ui/utils'
import { ImageOutlined } from '@material-ui/icons'
import { v4 } from 'uuid'

import { IconButton } from 'core'
import { firebase } from 'core/utils'
import { useAutosave, useDispatch, useState } from 'story/context'

const MIME_TYPES = ["image/gif", "image/jpeg", "image/png", "image/webp"];

const ImageButton = () => {
  const autosave = useAutosave(), dispatch = useDispatch(), state = useState();

  const handleChange = e => {
    const file = e.target.files[0];
    if (file && 0 < MIME_TYPES.filter(s => file.type.match(s)).length) {
      const reader = new FileReader();
      reader.onload = e => {
        const { key } = state.caret;
        dispatch([{ type: "NODE_IMAGE", key, value: e.target.result }, { type: "VIEW_SHOW", keys: [key] }, { type: "CARET_BLUR" }, { type: "CARET_FOLD" }, { type: "VIEW_PRESENT_TRIGGER", key }]);

        if (base64(e.target.result, MIME_TYPES)) {
          const ref = firebase.storage().ref("stories/"+state.story.id+"/nodes/"+key).child(v4()), upload = ref.putString(e.target.result, "data_url");
          upload.on("state_changed",
            () => {}, // TODO: snapshot => console.log(snapshot.bytesTransferred / snapshot.totalBytes),
            () => {}, // TODO: handle err => {}
            () => upload.snapshot.ref.getDownloadURL().then(downloadURL => {
              dispatch({ type: "NODE_EDIT", key, value: downloadURL });
              autosave.dispatch({ type: "TRIGGER" });
            })
          );
        }
      } 
      reader.readAsDataURL(file);
    }
  }

  return (
    <IconButton htmlFor="image-file" component="label">
      <input accept={MIME_TYPES.join(",")} hidden id="image-file" onChange={handleChange} type="file" />
      <ImageOutlined />
    </IconButton>
  )
}

export default ImageButton;
