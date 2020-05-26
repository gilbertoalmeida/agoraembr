import axios from "axios";
import {
  GETTING_THE_JOURNAL,
  GET_JOURNAL_SUCCESS,
  GET_JOURNAL_FAIL
} from "./types";

export const getJournal = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/journals/${id}`,
      dispatch({
        type: GETTING_THE_JOURNAL
      })
    ); //proxi in the package.json in react makes it not necessary to type the full path

    dispatch({
      type: GET_JOURNAL_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_JOURNAL_FAIL
    });
  }
};
