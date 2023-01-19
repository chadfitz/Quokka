import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_USERS = "users/RECEIVE_USERS";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const fetchUsers = () => async dispatch => {
  try {
    const res = await jwtFetch('/api/users');
    const users = await res.json();
    dispatch(receiveUsers(users));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) { /* TODO */ }
  }
};

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USERS:
      return { ...action.users}
    default:
      return state;
  }
}

export default usersReducer;