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

export const fetchFriends = (user) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/friends/${user._id}`);
    if (res.ok) {
      const friends = await res.json();
      dispatch(receiveFriends(friends));
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
  console.log('in addFriend');
  const formData = new FormData();
  // formData.append("test1", 1)
  // formData.append("test2", "2")
  formData.append("requester", requester._id);
  formData.append("recipient", recipient._id);
  formData.append("relation", relation);

  console.log('formData');
  console.log(Array.from(formData.values()).join(" | "));
  console.log('formData requester, recipient, relation');
  console.log(formData.get("requester"));
  console.log(formData.get("recipient"));
  console.log(formData.get("relation"));

  try {
    const res = await jwtFetch('/api/friends/', {
      method: 'POST',
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // }
    });
    const friend = await res.json();
    dispatch(receiveFriend(recipient._id));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400 ) {
      // TODO
    }

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
    const friend = await res.json();

    dispatch(receiveFriend(friend));
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
    default:
      return state;
  }
}

export default friendsReducer;


