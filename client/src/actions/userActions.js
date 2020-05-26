import axios from "axios";
import {
  GETTING_THE_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GETTING_THE_SUMMARY_AUTHOR,
  GET_SUMMARY_AUTHOR_SUCCESS,
  GET_SUMMARY_AUTHOR_FAIL
} from "./types";

export const getSummaryAuthor = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/users/${id}`,
      dispatch({
        type: GETTING_THE_SUMMARY_AUTHOR
      })
    );

    dispatch({
      type: GET_SUMMARY_AUTHOR_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_SUMMARY_AUTHOR_FAIL
    });
  }
};

export const getUser = username => async dispatch => {
  try {
    const res = await axios.get(
      `/api/users/${username}`,
      dispatch({
        type: GETTING_THE_USER
      })
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAIL
    });
  }
};
