import { firebase } from 'core/utils'

const storage = ref => firebase.storage().ref(ref);

export default storage;
