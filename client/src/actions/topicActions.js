import axios from "axios";
import { GETTING_THE_TOPIC, GET_TOPIC_SUCCESS, GET_TOPIC_FAIL } from "./types";

export const getTopic = id => async dispatch => {
  try {
    const res = await axios.get(
      `/api/topics/${id}`,
      dispatch({
        type: GETTING_THE_TOPIC
      })
    ); //proxi in the package.json in react makes it not necessary to type the full path

    dispatch({
      type: GET_TOPIC_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_TOPIC_FAIL
    });
  }
};
