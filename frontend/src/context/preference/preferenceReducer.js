import {
  SET_STARTNEXT_ONSTOP,
  SET_FILTER,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_STARTNEXT_ONSTOP:
      return {
        ...state,
        startnextonstop: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filterbybilleable: true,
        loading: false
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filterbybilleable: false,
        loading: false
      };
    default:
      return state;
  }
}