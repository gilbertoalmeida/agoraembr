import {
  GETTING_THE_SUMMARY_AUTHOR,
  GET_SUMMARY_AUTHOR_SUCCESS,
  GET_SUMMARY_AUTHOR_FAIL
} from "../actions/types";

const initialState = {
  loadedUser: null,
  summaryAuthor: null,
  userLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_THE_SUMMARY_AUTHOR:
      return {
        ...state,
        summaryAuthor: null,
        userLoading: true
      };
    case GET_SUMMARY_AUTHOR_SUCCESS:
      return {
        ...state,
        summaryAuthor: action.payload,
        userLoading: false
      };
    case GET_SUMMARY_AUTHOR_FAIL:
      return {
        ...state,
        summaryAuthor: null,
        userLoading: false
      };
    default:
      return state;
  }
}
