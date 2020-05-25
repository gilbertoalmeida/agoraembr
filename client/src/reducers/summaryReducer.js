import {
  GETTING_THE_SUMMARY,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_FAIL
} from "../actions/types";

const initialState = {
  summary: null,
  summaryLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_THE_SUMMARY:
      return {
        ...state,
        summary: null,
        summaryLoading: true
      };
    case GET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.payload,
        summaryLoading: false
      };
    case GET_SUMMARY_FAIL:
      return {
        ...state,
        summaryLoading: false
      };
    default:
      return state;
  }
}
