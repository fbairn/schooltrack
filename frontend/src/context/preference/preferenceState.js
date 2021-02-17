import React, { useReducer } from 'react'
import PreferenceReducer from './preferenceReducer';
import PrefenceContext from './preferenceContext';

import {
  SET_STARTNEXT_ONSTOP,
  SET_FILTER,
  CLEAR_FILTER,
} from '../types';

const PreferenceState = props => {
  const initialState = {
    startnextonstop: true,
    filterbybilleable: false,
  };

  const [state, dispatch] = useReducer(PreferenceReducer, initialState);

  const setStartNextOnStop = async (entry) => {
    dispatch({
      type: SET_STARTNEXT_ONSTOP,
      payload: entry
    })
  }

  const setFilter = async () => {
    dispatch({
      type: SET_FILTER
    })
  }

  const clearFilter = async () => {
    dispatch({
      type: CLEAR_FILTER
    })
  }

  return (
    <PrefenceContext.Provider
      value={{
        startnextonstop: state.startnextonstop,
        filterbybilleable: state.filterbybilleable,
        setStartNextOnStop,
        setFilter,
        clearFilter
      }}
    >
      {props.children}
    </PrefenceContext.Provider>
  );
};

export default PreferenceState;