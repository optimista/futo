import { empty } from '@futo-ui/utils'

const maxLength = l => str => str.length <= l; 
const minLength = l => str => l <= str.length; 
const presence = str => !empty(str);

export { maxLength, minLength, presence }
