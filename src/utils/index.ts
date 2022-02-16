import moment from 'moment-timezone';
import {IInputProps} from 'native-base';
import {Platform} from 'react-native';
import {GroupMemberStatus} from '../screens/Groups/types/GroupInterfaces';
import {theme} from '../theme';

const {ACCEPTED, INVITED, PENDING, BLOCKED, APPROVE_FOLLOWER, REQUESTED} = GroupMemberStatus;

export function getClassNameByRelationship(status: string): IInputProps {
  let style: IInputProps = {};
  switch (status) {
    case ACCEPTED:
    case BLOCKED:
      style = {color: theme.colors.black[1000]};
      break;
    case INVITED:
    case PENDING:
    case APPROVE_FOLLOWER:
      style = {color: theme.colors.red[900]};
      break;
    case REQUESTED:
      style = {color: theme.colors.gray[300]};
      break;
    default:
      break;
  }
  return {
    ...style,
    textAlign: 'right',
    fontSize: 12,
    textTransform: 'capitalize',
  };
}

export function timeDiffCalc(dateFuture: any) {
  const dateNow: any = new Date();
  dateFuture = new Date(dateFuture);

  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = '';
  if (days > 0 && days <= 7) {
    difference = days === 1 ? `${days} day ago` : `${days} days ago`;
    return difference;
  }
  if (days <= 0 && (hours > 0 || minutes >= 0)) {
    if (hours > 0) {
      difference = hours === 1 ? `${hours} hr ago` : `${hours} hrs ago`;
      return difference;
    }
    if (minutes >= 0) {
      difference = minutes === 0 || minutes === 1 ? `Just now` : `${minutes} minutes ago`;
      return difference;
    }
  }
  // return the post created date
  const getCurrentYear =
    dateFuture.getFullYear() !== dateNow.getFullYear() ? dateFuture.getFullYear() : '';
  difference = `${getMonthName(dateFuture.getMonth())}  ${dateFuture.getDate()} ${
    getCurrentYear !== '' ? `, ${getCurrentYear}` : ''
  }`;
  return difference;
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getMonthName = (monthNumber: number) => {
  return monthNames[monthNumber];
};

// const getShortMonthName = function (monthNumber: number) {
//     return getMonthName(monthNumber).substr(0, 3);
// };

const toFixed = (num: any, fixed: number) => {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)[0];
};

export const formatCount = (n: number) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) {
    return `${+toFixed(n / 1e3, 1)}K`;
  }
  if (n >= 1e6 && n < 1e9) {
    return `${+toFixed(n / 1e6, 1)}M`;
  }
  if (n >= 1e9 && n < 1e12) {
    return `${+toFixed(n / 1e9, 1)}B`;
  }
  return null;
};

export const getFormData = (data: any, allowEmptyOrNull = false): FormData => {
  const formData = new FormData();

  Object.keys(data).map(async key => {
    if (!(data[key] == null || data[key].length === 0) || allowEmptyOrNull) {
      formData.append(key, data[key]);
    }
  });

  return formData;
};

function dateOrdinal(dom: number) {
  if (dom === 31 || dom === 21 || dom === 1) return 'st';
  if (dom === 22 || dom === 2) return 'nd';
  if (dom === 23 || dom === 3) return 'rd';
  return 'th';
}
export const dateFormatter = (d: any, page: any) => {
  let c = '';
  if (page === 'EventDetails') {
    const options: any = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'long',
      hourCycle: 'h23',
    };
    const a = new Date(d).toLocaleTimeString('en-US', options);
    const b = a.split(',').map(s => s.trim());
    c = `${b.slice(0, 3).join(', ')}  AT  ${b[b.length - 1].split(' ')[0]} ${b
      .slice(-1)[0]
      .replace(/\s+/, '\x01')
      .split('\x01')
      .slice(-1)[0]
      .split(' ')
      .map(s => s[0])
      .join('')}
      `;
  }
  if (page === 'EventList') {
    const options: any = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'long',
    };
    const a = new Date(d).toLocaleTimeString('en-US', options);
    const b = a.split(',').map(s => s.trim());
    const timeparts = b[b.length - 1].split(' ');
    const timeZone = timeparts.slice(2, timeparts.length);
    const androidTimeZone = Platform.OS === 'android' ? getTimeZone(timeZone[0], d) : '';
    const timePart = `${timeparts[0]}  ${timeparts[1]}  ${
      Platform.OS === 'android' ? androidTimeZone : timeZone.map(s => s[0]).join('')
    }`;
    c = `${b.slice(0, 2).join(', ')}${dateOrdinal(new Date(d).getDate())} at ${timePart}`;
  }
  return c;
};
const getTimeZone = (t: string, d: string) => {
  const timeZone = moment(d).tz(t).format('ha z');
  const zone = timeZone.split(' ');
  return zone[1];
};
export const emojisData = [
  {title: ':-) ,:) ,:] ,=) ', code: 1815},
  {title: ':-( ,:( ,:[ ,=( ', code: 1779},
  {title: ':-d ,:d ,=d ,=D ,:D ,-D ', code: 1750},
  {title: '8-| ,8| ,b-| ,b| ,B-| ,B| ', code: 1763},
  {title: ';-) ,;) ', code: 1758},
  {title: ':-o ,:o ,:-O ,:O ', code: 1795},
  {title: ':-p ,:p ,=p ,-P ,:P ,=P ', code: 1776},
];

export const sqlInjectionTxt = `'\b','\0`;
// '\b,\0,\n,\r,\t,\Z';
export const randomName = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isValidHttpUrl = (webURL: string) => {
  if (webURL.includes('https') || webURL.includes('http')) {
    return webURL;
  }
  return `https://${webURL}`;
};
