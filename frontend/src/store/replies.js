import jwtFetch from './jwt';

// ACTIONS
const CLEAR_REPLIES = "replies/CLEAR_REPLIES"
const RECEIVE_REPLIES = "replies/RECEIVE_REPLIES";
const RECEIVE_REPLY = "replies/RECEIVE_REPLY";
// const RECEIVE_REPLY = "replies/RECEIVE_REPLY";
const REMOVE_REPLY = "replies/REMOVE_REPLY";

// ACTION CREATORS
export const clearReplies = (_) => ({
  type: CLEAR_REPLIES
})

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
export const fetchReplies = (postId) => async dispatch => {
  console.log('in fetchReplies middleware');
  let res;
  try {
    res = await jwtFetch(`/api/replies/${postId}`);
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
  formData.append("post", post);
  formData.append("user", user);
  formData.append("body", body);

  let res;
  try {
    res = await jwtFetch(`/api/replies/${post}`, {
      method: "POST",
      body: formData
    });

    const reply = await res.json();


    dispatch(receiveReply(reply));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // TODO
      console.log("frontend/src/store/replies.js#composeReply compose reply unsuccessful");
      // dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteReply = replyId => async dispatch => {
  try {
    const res = await jwtFetch(`/api/replies/${replyId}`, {
      method: 'DELETE'
    });
    dispatch(removeReply(replyId));
  } catch (err) {
    // TODO
  }
}

export const updateReply = reply => async dispatch => {
  // TODO - DELETE PRINT
  console.log('in store updateReply');
  // TODO - DELETE PRINT ^^^^^
  const { replyId, body } = reply;
  const formData = new FormData();
  formData.append("body", body);
  console.log('formData');
  console.log(formData);

  let res;
  try {
    res = await jwtFetch(`/api/replies/${replyId}`, {
      method: "PATCH",
      body: formData
    })
    if (res.ok) {
      console.log('store updateReply res ok');
      console.log('res');
      console.log(res);
      const newReply = await res.json();
      console.log('newReply');
      console.log(newReply);
      dispatch(receiveReply(newReply));
    }
  } catch (err) {
    // TODO: UPDATE?
    return err;
  }

}

const repliesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case CLEAR_REPLIES:
      return {};
    case RECEIVE_REPLIES:
      return { ...state, ...action.replies };
    case RECEIVE_REPLY:
      return { ...state, ...action.reply };
    case REMOVE_REPLY:
      newState = { ...state };
      // // newState = state.filter(reply => reply._id !== action.replyId);
      console.log('delete newState[action.replyId]');
      delete newState[action.replyId];
      // console.log('newState');
      // console.log(newState);
      // const index = newState.indexOf(action.replyId);
      // if (index > -1) { // only splice array when item is found
      //   newState.splice(index, 1); // 2nd parameter means remove one item only
      // }
      return newState;
    default:
      return state;
  }
}

export default repliesReducer;
