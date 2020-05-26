import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import summaryReducer from "./summaryReducer";
import topicReducer from "./topicReducer";
import journalReducer from "./journalReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import { localizeReducer } from "react-localize-redux";

export default combineReducers({
  localize: localizeReducer,
  article: articleReducer,
  summary: summaryReducer,
  topic: topicReducer,
  journal: journalReducer,
  comment: commentReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
});
