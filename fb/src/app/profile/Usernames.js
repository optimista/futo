import { firebase } from 'core/utils'

const Usernames = firebase.firestore().collection('usernames');

export default Usernames;
