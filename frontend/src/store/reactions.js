import jwtFetch from './jwt';

// ACTIONS
const RECEIVE_REACTIONS = "reactions/RECEIVE_REACTIONS";
const RECEIVE_REACTION = "reactions/RECEIVE_REACTION";
const REMOVE_REACTION = "reactions/REMOVE_REACTION";

// ACTION CREATORS
export const receiveReactions = (reactions) => ({
  type: RECEIVE_REACTIONS,
  reactions
});

export const receiveReaction = (reaction) => ({
  type: RECEIVE_REACTION,
  reaction
});

export const removeReaction = (reactionId) => ({
  type: REMOVE_REACTION,
  reactionId
});

// EXPRESS ACTION MIDDLEWARE

// -- fetches based on post id

export const fetchReaction = (postId) => async dispatch => {
  let res;
  try {
    res = await jwtFetch(`/api/reactions/${postId}`);
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      console.log("frontend/src/store/replies.js#fetchReactions Reactions not found");
    }
  }

  const reactions = await res.json();
  dispatch(receiveReactions(reactions));
}

export const createReaction = (userId, postId, style) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/reactions/createReaction`,{
      method: 'POST',
      body: JSON.stringify({
        userId,
        postId,
        style
      })
    })
    const reaction = await res.json();
    if (res.ok) {
      dispatch(receiveReaction(reaction))
    }
  } catch {
    console.error("CREATE REACTION FAILED")
  }
}

// wont work -- needs to be refactored for top level reaction id
export const deleteReaction = (reactionId) => async dispatch => {
  try {
    console.log("DELETE THUNK ACTION CREATOR")
    const res = await jwtFetch(`/api/reactions/deleteReaction/${reactionId}`,{
      method: 'DELETE'})
    const newasdf = await res.json();
    if (res.ok) {
      console.log("RESPONSE WAS OKAY")
      dispatch(removeReaction(newasdf))
    }

  } catch {
    console.error("DELETE REACTION FAILED")
  }
}

const initialState = {
  // todo
}

const reactionsReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_REACTIONS:
      return { ...action.reactions };
    case RECEIVE_REACTION:
      return { ...state, ...action.reaction };
    case REMOVE_REACTION:
      newState = { ...state };
      delete newState[action.reactionId];
      return newState;
    default:
      return state;
  }
}

export default reactionsReducer;
