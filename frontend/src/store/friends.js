import jwtFetch from "./jwt";

import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_FRIENDS = "friends/RECEIVE_FRIENDS";
const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";

const receiveFriends = friends => ({
  type: RECEIVE_FRIENDS,
  friends
});

const receiveFriend = friend => ({
  type: RECEIVE_FRIEND,
  friend
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


export const addFriend = data => async dispatch => {
  console.log('in addFriend');

  console.log('data');
  console.log(data);
  const {requester, recipient}  = data;

  console.log('requester');
  console.log(requester);
  console.log('recipient');
  console.log(recipient);

  const formData = new FormData();
  formData.append("requester", JSON.stringify(requester));
  formData.append("recipient", recipient);
  console.log(48);
  formData.append("relation", 2);
  console.log(50);

  console.log('formData');
  console.log(Array.from(formData.values()).join(" | "));

  try {
    console.log(56);
    const res = await jwtFetch('/api/friends/', {
      method: 'POST',
      body: formData
    });
    console.log(60);
    const friend = await res.json();
    console.log('friend');
    console.log(friend);
    return dispatch(receiveFriend(friend));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 ) {
      // TODO
    }

  }
}
export const acceptFriend = data => async dispatch => {
  const {requester, recipient}  = data;
  console.log('data');
  console.log(data);

  const formData = new FormData();
  formData.append("requester", requester);
  formData.append("recipient", recipient);
  // formData.append("status", status);

  try {
    const res = await jwtFetch('/api/friends/acceptFriend', {
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
    console.log('acceptFriend (store) error');
    console.log(resBody);
  }
}


const friendsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_FRIENDS:
      return { ...state, ...action.friends};
    case RECEIVE_FRIEND:
      // state.all = { ...state.all, ...action.friend };
      return { ...state, ...action.friend };
      // return state;
    default:
      return state;
  }
}

export default friendsReducer;


