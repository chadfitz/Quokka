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
  try {
    const res = await jwtFetch(`/api/friends/${user._id}`);
    if (res.ok) {
      const friends = await res.json();
      // console.log('friends');
      // console.log(friends);
      dispatch(receiveFriends(Object.values(friends)));
    }
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // TODO:
      // dispatch(receiveErrors(resBody.errors))
    }
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
  formData.append("relation", relation);

  try {
    const res = await jwtFetch('/api/friends/', {
      method: 'POST',
      body: formData
    });
    // const friend = await res.json();
    dispatch(receiveFriend(recipient._id));
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


export const acceptFriend = data => async dispatch => {
  const {requester, recipient} = data;

  const formData = new FormData();
  formData.append("requester", requester);
  formData.append("recipient", recipient);
  // formData.append("status", status);

  try {
    const res = await jwtFetch('/api/friends/acceptFriend', {
      method: 'PATCH',
      body: formData
    });
    dispatch(receiveFriend(recipient._id));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 ) {
      // TODO
    }
  }
}


const friendsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_FRIENDS:
      return [ ...state, ...action.friends];
    case RECEIVE_FRIEND:
      return [ ...state, action.friend ];
    case REMOVE_FRIEND:
      const newState = [...state];
      const index = newState.indexOf(action.friendId);
      if (index > -1) { // only splice array when item is found
        newState.splice(index, 1); // 2nd parameter means remove one item only
      }
      // delete state[action.friendId];
      return newState;
    default:
      return state;
  }
}

export default friendsReducer;
