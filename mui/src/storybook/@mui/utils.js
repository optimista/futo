import { isarray } from '@futo-ui/utils'

const RESERVED_WORDS = ["false"];

const q = obj => isarray(obj) ? obj.map(s => RESERVED_WORDS.indexOf(s) === -1 ? "'"+s+"'" : s) : q([obj]); 

const dialog = { disableAutoFocus: true, disablePortal: true, disableScrollLock: true, hideBackdrop: true, open: true, sx: { position: "relative", zIndex: 0 } };
const radio = (options, def) => ({ control: { type: "radio" }, options, table: { defaultValue: { summary: q(def) }, type: { summary: q(options).join(" | ") } } });
const sx = { control: { type: "object" }, table: { type: { summary: "func | object" } }};

export { dialog, radio, sx };
