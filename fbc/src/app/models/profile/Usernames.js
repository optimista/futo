import { firebase } from 'utils'

const Usernames = firebase.firestore().collection('usernames');

export default Usernames;
