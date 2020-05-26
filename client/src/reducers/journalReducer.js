import {
  GETTING_THE_JOURNAL,
  GET_JOURNAL_SUCCESS,
  GET_JOURNAL_FAIL
} from "../actions/types";

const initialState = {
  journal: null,
  journalLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_THE_JOURNAL:
      return {
        ...state,
        journal: null,
        journalLoading: true
      };
    case GET_JOURNAL_SUCCESS:
      return {
        ...state,
        journal: action.payload,
        journalLoading: false
      };
    case GET_JOURNAL_FAIL:
      return {
        ...state,
        journalLoading: false
      };
    default:
      return state;
  }
}
