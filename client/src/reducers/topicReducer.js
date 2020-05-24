import {
  GETTING_THE_TOPIC,
  GET_TOPIC_SUCCESS,
  GET_TOPIC_FAIL
} from "../actions/types";

const initialState = {
  topic: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_THE_TOPIC:
      return {
        ...state,
        topic: null,
        loading: true
      };
    case GET_TOPIC_SUCCESS:
      return {
        ...state,
        topic: action.payload,
        loading: false
      };
    case GET_TOPIC_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
