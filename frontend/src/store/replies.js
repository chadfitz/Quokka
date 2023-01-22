import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

// GENERAL
const RECEIVE_REPLIES = "replies/RECEIVE_REPLIES";
const RECEIVE_REPLY = "replies/RECEIVE_REPLY";
const RECEIVE_USER_REPLIES = "replies/RECEIVE_USER_REPLIES";
const RECEIVE_NEW_REPLY = "replies/RECEIVE_NEW_REPLY";

const REMOVE_REPLY = "replies/REMOVE_REPLY"
const RECEIVE_REPLY_ERRORS = "replies/RECEIVE_REPLY_ERRORS";
const CLEAR_REPLY_ERRORS = "replies/CLEAR_REPLY_ERRORS";

// ACTION CREATORS
const receiveReplies = replies => ({
  type: RECEIVE_REPLIES,
  replies
});

const receiveReply = reply => ({
  type: RECEIVE_REPLY,
  reply
})

const removeReply = replyId => ({
  type: REMOVE_REPLY,
  replyId
});

// const receiveUserReplies = replies => ({
//   type: RECEIVE_USER_REPLIES,
//   replies
// });

const receiveNewReply = reply => ({
  type: RECEIVE_NEW_REPLY,
  reply
});

const receiveErrors = errors => {
  return ({type: RECEIVE_REPLY_ERRORS, errors})
};

export const clearReplyErrors = errors => ({
    type: CLEAR_REPLY_ERRORS,
    errors
});

// MIDDLEWARE ACTION CREATORS (Express?)
export const fetchReplies = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/replies');
    const replies = await res.json();
    dispatch(receiveReplies(replies));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchReply = (replyId) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/replies/${replyId}`);
    const reply = await res.json();
    dispatch(receiveReply(reply));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
}

// export const fetchUserReplies = id => async dispatch => {
//   try {
//     const res = await jwtFetch(`/api/replies/user/${id}`);
//     const replies = await res.json();
//     dispatch(receiveUserReplies(replies));
//   } catch(err) {
//     const resBody = await err.json();
//     if (resBody.statusCode === 400) {
//       return dispatch(receiveErrors(resBody.errors));
//     }
//   }
// };

export const composeReply = data => async dispatch => {
  const { images, subject, writer, body, location, recipient} = data
  const formData = new FormData();
  formData.append("body", body);
  formData.append("location", JSON.stringify(location));
  formData.append("recipient", recipient._id);
  formData.append("subject", subject);
  formData.append("writer", writer);

  Array.from(images).forEach(image => formData.append("images", image));
  try {
    const res = await jwtFetch('/api/replies/', {
      method: 'REPLY',
      body: formData
    });
    const reply = await res.json();
    dispatch(receiveNewReply(reply));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const updateReply = (reply) => async (dispatch) => {
  // console.log("updateReply's reply", reply)
  const { images, subject, writer, body, location, recipient} = reply
  const formData = new FormData();
  formData.append("body", body);
  formData.append("location", JSON.stringify(location));
  formData.append("recipient", recipient._id);
  formData.append("subject", subject);
  formData.append("writer", writer);

  Array.from(images).forEach(image => formData.append("images", image));
  try {
    const res = await jwtFetch(`/api/replies/${reply._id}`, {
      method: 'PATCH',
      body: formData
    })
    if (res.ok) {
      const newReply = await res.json();
      dispatch(receiveNewReply(newReply));
    }
  } catch(err) {
    const resBody = await err.json();
    return dispatch(receiveErrors(resBody.errors));
  }
}

export const deleteReply = replyId => async dispatch => {
  try {
    const res = await jwtFetch(`/api/replies/${replyId}`, {
      method: 'DELETE'
    })
    dispatch(removeReply(replyId))
  } catch(err) {
    const resBody = await err.json();
    return dispatch(receiveErrors(resBody.errors));
  }
  // todo error handling
}


// reactions

// export const createReaction = (reactorId, replyId, newEmotion) => async dispatch => {
//   try {
//     console.log("THUNK ACTION CREATOR")
//     const res = await jwtFetch(`/api/replies/createReaction/${replyId}`,{
//       method: 'PATCH',
//       body: JSON.stringify({
//         reactorId,
//         newEmotion
//       })
//     })
//     const updatedReply = await res.json();
//     if (res.ok) {
//       console.log("RESPONSE WAS OKAY")
//       dispatch(receiveNewReply(updatedReply))
//     }

//   } catch {
//     console.error("CREATE REACTION FAILED")
//   }
// }


// copy pasta code. don't assume it works
// export const removeReaction = (reactorId, replyId, emotionToRemove) => async dispatch => {
//   try {
//     console.log("THUNK ACTION CREATOR")
//     const res = await jwtFetch(`/api/replies/removeReaction/${replyId}`,{
//       method: 'PATCH',
//       body: JSON.stringify({
//         reactorId,
//         emotionToRemove
//       })
//     })
//     const updatedReply = await res.json();
//     if (res.ok) {
//       console.log("RESPONSE WAS OKAY")
//       dispatch(receiveNewReply(updatedReply))
//     }

//   } catch {
//     console.error("CREATE REACTION FAILED")
//   }
// }

const nullErrors = null;

export const replyErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_REPLY_ERRORS:
      return action.errors;
    case RECEIVE_NEW_REPLY:
      // TODO: confirm this is wanted behavior
      return { ...state, ...action.error };
    case CLEAR_REPLY_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const repliesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_REPLIES:
      return { ...state, all: action.replies, new: undefined};
    case RECEIVE_REPLY:
      return {...state, all: action.reply};
    // case RECEIVE_USER_REPLIES:
    //   return { ...state, user: action.replies, new: undefined};
    case RECEIVE_NEW_REPLY:
      return { ...state, new: action.reply};
    case REMOVE_REPLY:
      return { ...state,
        all: state.all.filter((reply) => reply._id !== action.replyId)
      };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default repliesReducer;
