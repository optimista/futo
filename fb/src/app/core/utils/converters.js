import { isarray } from '@futo-ui/utils'
import { Timestamp } from 'firebase/firestore'

const datetime = date => {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date),
        month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date),
        day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  return `${year} / ${month} / ${day}`;
}

const docWId = snapshot => ({ ...snapshot.data(), id: snapshot.id });

const time = date => {
  const curr = new Date();
  if (curr.getYear() !== date.getYear()) return date.toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric" }); // Jun 21, 2019

  const h = Math.floor(Math.abs(curr - date) / 36e5);
  if (23 < h) return date.toLocaleString(undefined, { month: "short", day: "numeric" }); // Jun 21

  const m = Math.floor(Math.abs(curr - date) / 6e4);
  if (59 < m) return h + "h"; // 20h

  const s = Math.floor(Math.abs(curr - date) / 1e3);
  if (59 < s) return m + "m"; // 30m

  if (0 < s) return s + "s";

  return "Now";
}

const timestamp = date => date.getTime();

const timestampToDate = (doc, key = "timestamp") =>
  ({ ...doc, ...(isarray(key) ? key : [key]).reduce((acc, key) => ({ ...acc, [key]: doc[key] ? doc[key].toDate() : new Date() }), {}) });

const wo = (doc, keys) => keys.reduce((doc, key) => { delete doc[key]; return doc; }, doc);

const wTimestamp = (doc, key = "timestamp") => ({ ...doc, [key]: Timestamp.now() });

export { datetime, docWId, time, timestamp, timestampToDate, wTimestamp, wo };
