import React, { useReducer } from 'react'
import axios from 'axios';
import HealthContext from './healthContext';
import HealthReducer from './healthReducer';

import {
  SET_HEALTH
} from '../types';

const HealthState = props => {
  const initialState = {
    healthy: true
  };

  const [state, dispatch] = useReducer(HealthReducer, initialState);

  const getHealth = async () => {
    // setLoading();
    try {
      const res = await axios.get(`/health`);
      dispatch({
        type: SET_HEALTH,
        payload: res.data.online
      })
      return res.data.online;
    } catch (error) {
      dispatch({
        type: SET_HEALTH,
        payload: false
      })
      return false;
    }
  }

  return (
    <HealthContext.Provider
      value={{
        healthy: state.healthy,
        getHealth
      }}
    >
      {props.children}
    </HealthContext.Provider>
  );
};

export default HealthState;