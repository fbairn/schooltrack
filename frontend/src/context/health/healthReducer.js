import {
  SET_HEALTH
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_HEALTH:
      return {
        ...state,
        healthy: action.payload
      }
    default:
      return state;
  }
}