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

export const createReaction = (reactorId, postId, newEmotion) => async dispatch => {
  try {
    console.log("THUNK ACTION CREATOR")
    const res = await jwtFetch(`/api/reactions/createReaction/${postId}`,{
      method: 'PATCH',
      body: JSON.stringify({
        reactorId,
        newEmotion
      })
    })
    const reaction = await res.json();
    if (res.ok) {
      console.log("GOOD REACTION RESPONSE:", reaction)
      dispatch(receiveReaction(reaction))
    }
  } catch {
    console.error("CREATE REACTION FAILED")
  }
}

// wont work -- needs to be refactored for top level reaction id
export const deleteReaction = (reactorId, postId, emotionToRemove) => async dispatch => {
  try {
    console.log("THUNK ACTION CREATOR")
    const res = await jwtFetch(`/api/reactions/removeReaction/${postId}`,{
      method: 'PATCH',
      body: JSON.stringify({
        reactorId,
        emotionToRemove
      })
    })
    // broken code
    const reactionId = await res.json();
    if (res.ok) {
      console.log("RESPONSE WAS OKAY")
      dispatch(removeReaction(reactionId))
    }

  } catch {
    console.error("CREATE REACTION FAILED")
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
