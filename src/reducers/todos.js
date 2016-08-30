import { FETCH_TODOS } from '../actions/index';

const INITIAL_STATE = {all:[], todo:null};

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_TODOS:
      return { ...state, all:action.payload.data}
    default:
      return state;
  }
}
