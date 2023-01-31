import jwtFetch from "./jwt";

import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_FRIENDS = "friends/RECEIVE_FRIENDS";
const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";
const REMOVE_FRIEND = "friends/REMOVE_FRIEND";

const receiveFriends = friends => ({
  type: RECEIVE_FRIENDS,
  friends
});

const receiveFriend = friend => ({
  type: RECEIVE_FRIEND,
  friend
});

const removeFriend = friendId => ({
  type: REMOVE_FRIEND,
  friendId
});

export const fetchFriends = (user) => async dispatch => {
  let res;
  try {
    res = await jwtFetch(`/api/friends/${user._id}`);

  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // TODO:
      // dispatch(receiveErrors(resBody.errors))
    }
  }
  if (res.ok) {
    const payload = await res.json();

    dispatch(receiveFriends(payload));
  }
}

export const fetchFriend = (userId) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/friends/${userId}`);
    if (res.ok) {
      const friend = await res.json();
      dispatch(receiveFriend(friend));
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // TODO:
      // dispatch(receiveErrors(resBody.errors))
    }
  }
}


export const addFriend = data => async dispatch => {
  const {requester, recipient, relation} = data;
  const formData = new FormData();
  formData.append("requester", requester._id);
  formData.append("recipient", recipient._id);
  // formData.append("relation", relation);

  try {
    const res = await jwtFetch('/api/friends/', {
      method: 'POST',
      body: formData
    });
    // dispatch(receiveFriend(recipient._id));
    const friend = await res.json();
    dispatch(receiveFriend(friend));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 ) {
      // TODO
    }

  }
}

export const deleteFriend = friendId => async dispatch => {
  const res = await jwtFetch(`/api/friends/${friendId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(removeFriend(friendId));
  }
}

/*
export const acceptFriend = data => async dispatch => {
  const {requester, recipient, relation} = data;

  const formData = new FormData();
  formData.append("requester", requester);
  formData.append("recipient", recipient);
  formData.append("relation", relation);

  try {
    const res = await jwtFetch('/api/friends/acceptFriend', {
      method: 'PATCH',
      body: formData
    });
    // dispatch(receiveFriend(recipient._id));
    const friend = await res.json();
    dispatch(receiveFriend(friend));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 ) {
      // TODO
    }
  }
}
*/


const friendsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_FRIENDS:
      return { ...action.friends };
    case RECEIVE_FRIEND:
      // newState = { ...state };
      // newState.friends = { ...state.friends, ...action.friend };
      // delete newState.nonFriends[action.friendId];
      return { ...state, ...action.friend }
    case REMOVE_FRIEND:
      newState = { ...state };
      delete newState[action.friendId];
      return newState;
    default:
      return state;
  }
}

export default friendsReducer;
