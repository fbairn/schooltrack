import {
  REFORMAT_ENTRIES,
  SET_ENTRIES,
  ADD_ENTRY,
  UPDATE_ENTRY,
  DELETE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_DATE
} from '../types';

import { secondsToTime } from '../../helpers/time';

export default (state, action) => {
  const formattedPayload = [];
  switch (action.type) {
    case SET_ENTRIES:
      action.payload.forEach(element => {
        formattedPayload.push(formatEntry(element));
      });

      return {
        ...state,
        entries: formattedPayload,
        loading: false
      }
    case REFORMAT_ENTRIES:
      state.entries.forEach(element => {
        formattedPayload.push(formatEntry(element));
      });

      return {
        ...state,
        entries: formattedPayload,
        loading: false
      }
    case ADD_ENTRY:
      return {
        ...state,
        entries: [formatEntry(action.payload), ...state.entries],
        loading: false
      };
    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry._id === action.payload._id ? formatEntry(action.payload) : entry
        ),
        loading: false
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter(
          entry => entry._id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: undefined,
        loading: false
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload
      };
    default:
      return state;
  }
}

const formatEntry = (entryData) => {
  const newData = { ...entryData };
  if (newData.running) {
    newData.timespent = getTimeSpent(newData.startTime);
  }
  if (newData.billable) {
    newData.hours = (Math.ceil(newData.timespent / 900) * .25).toFixed(2);
  } else {
    newData.hours = '0.00';
  }
  newData.time = secondsToTime(newData.timespent);
  return newData;
}

const getTimeSpent = (startTime) => {
  const millis = Date.now() - startTime;
  return Math.floor(millis / 1000);
}