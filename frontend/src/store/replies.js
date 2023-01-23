import { bindActionCreators } from 'redux';
import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

// ACTIONS
const RECEIVE_REPLIES = "replies/RECEIVE_REPLIES";
const RECEIVE_REPLY = "replies/RECEIVE_REPLY";
const REMOVE_REPLY = "replies/REMOVE_REPLY";

// ACTION CREATORS
export const receiveReplies = (replies) => ({
  type: RECEIVE_REPLIES,
  replies
});

export const receiveReply = (reply) => ({
  type: RECEIVE_REPLY,
  reply
});

export const removeReply = (replyId) => ({
  type: REMOVE_REPLY,
  replyId
});

// EXPRESS ACTION MIDDLEWARE
export const fetchReplies = () => async dispatch => {
  let res;
  try {
    res = await jwtFetch('/api/replies');
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // TODO
      console.log("frontend/src/store/replies.js#fetchReplies Replies not found");
      // dispatch(receiveErrors(resBody.errors));
    }
  }

  const replies = await res.json();
  dispatch(receiveReplies(replies));
}

export const composeReply = data => async dispatch => {
  const {user, post, body} = data;
  const formData = new FormData();
  formData.append("user",user);
  formData.append("post",post);
  formData.append("body",body);

  let res;
  try {
    res = await jwtFetch('/api/replies', {
      method: "POST",
      body: formData
    });
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // TODO
      console.log("frontend/src/store/replies.js#composeReply compose reply unsuccessful");
      // dispatch(receiveErrors(resBody.errors));
    }
  }
}

const repliesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REPLIES:
      return { ...action.replies };
    case RECEIVE_REPLY:
      return { ...state, ...action.reply };
    case REMOVE_REPLY:
      return state.filter(reply => reply._id !== action.replyId);
    default:
      return state;
  }
}

export default repliesReducer;