import React, { useReducer } from 'react'
import axios from 'axios';
import EntryContext from './entryContext';
import EntryReducer from './entryReducer';

import {
  REFORMAT_ENTRIES,
  SET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  UPDATE_ENTRY,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_DATE
} from '../types';

const EntryState = props => {
  const initialState = {
    entries: [],
    current: {},
    loading: false,
    date: new Date(Date.now()),
  };

  const [state, dispatch] = useReducer(EntryReducer, initialState);

  const getTimeEntries = async (fromCache, viewDate) => {

    // setLoading();
    var timeEntries = state.entries;
    viewDate = viewDate ? viewDate : state.date;
    if (!fromCache) {
      const res = await axios.get(`/api/v1/tasks/${formatDate(viewDate)}`);
      timeEntries = res.data;

      const formatedEntries = [];
      timeEntries.forEach(element => {
        formatedEntries.unshift(element);
      });

      dispatch({
        type: SET_ENTRIES,
        payload: formatedEntries
      })
    } else {
      dispatch({
        type: REFORMAT_ENTRIES
      })
    }


  }

  const addTimeEntry = async (entry) => {
    console.log(JSON.stringify(entry));
    // setLoading();

    const newEntry = await axios.post(`/api/v1/tasks`, entry);

    dispatch({
      type: ADD_ENTRY,
      payload: newEntry.data
    })

    return newEntry.data;
  }

  const updateTimeEntry = async (entry) => {
    console.log('Update' + JSON.stringify(entry));
    // setLoading();

    await axios.post(`/api/v1/tasks/` + entry._id, { ...entry, _id: undefined });

    dispatch({
      type: UPDATE_ENTRY,
      payload: entry
    })
  }

  const deleteTimeEntry = async (entry) => {
    console.log('Delete' + JSON.stringify(entry));
    // setLoading();

    await axios.delete(`/api/v1/tasks/` + entry._id, { ...entry });

    dispatch({
      type: DELETE_ENTRY,
      payload: entry._id
    })
  }

  const setCurrent = async (entry) => {
    dispatch({
      type: SET_CURRENT,
      payload: entry
    })
  }

  const clearCurrent = async (entry) => {
    dispatch({
      type: CLEAR_CURRENT
    })
  }

  const setDate = (newDate) => {
    dispatch({
      type: SET_DATE,
      payload: newDate
    })
  }

  //Private

  const formatDate = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();


    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day}`;
  }
  return (
    <EntryContext.Provider
      value={{
        entries: state.entries,
        current: state.current,
        loading: state.loading,
        date: state.date,
        getTimeEntries,
        createTimeEntry: addTimeEntry,
        updateTimeEntry,
        deleteTimeEntry,
        setCurrent,
        clearCurrent,
        setDate
      }}
    >
      {props.children}
    </EntryContext.Provider>
  );
};

export default EntryState;