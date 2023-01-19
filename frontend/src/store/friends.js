import jwtFetch from "./jwt";

import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_FRIENDS = "friends/RECEIVE_FRIENDS";
const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";

const receiveFriends = friends => ({
  friends, type: RECEIVE_FRIENDS
});

const receiveFriend = friend => ({
  friend, type: RECEIVE_FRIEND
});

export const fetchFriends = () => async dispatch => {
  try {
    const res = await jwtFetch('/api/friends');
    const friends = await res.json();
    dispatch(receiveFriends(friends));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // TODO:
      // dispatch(receiveErrors(resBody.errors))
    }
  }
}


export const editFriend = data => async dispatch => {
  const {requester, recipient, status}  = data;

  const formData = new FormData();
  formData.append("requester", requester);
  formData.append("recipient", recipient);
  formData.append("status", status);

  try {
    const res = await jwtFetch('/api/friends/', {
      method: 'PATCH',
      body: formData
    });
    const friend = await res.json();
    dispatch(receiveFriend(friend));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 ) {
      // TODO
    }
  }
}


const friendsReducer = (state = { all: {} }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_FRIENDS:
      return { ...state, all: action.friends};
    case RECEIVE_FRIEND:
      state.all = { ...state.all, ...action.friend };
      return state;
    default:
      return state;
  }
}




