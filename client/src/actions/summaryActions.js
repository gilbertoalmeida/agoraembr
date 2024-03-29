import axios from "axios";
import {
  GETTING_THE_SUMMARY,
  GET_SUMMARY_SUCCESS,
  GET_SUMMARY_FAIL
} from "./types";

export const getSummary = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/summaries/${id}`,
      dispatch({
        type: GETTING_THE_SUMMARY
      })
    ); //proxi in the package.json in react makes it not necessary to type the full path

    dispatch({
      type: GET_SUMMARY_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_SUMMARY_FAIL
    });
  }
};
