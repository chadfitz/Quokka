import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const REMOVE_POST = "posts/REMOVE_POST";
const RECEIVE_USER_POSTS = "posts/RECEIVE_USER_POSTS";
const RECEIVE_NEW_POST = "posts/RECEIVE_NEW_POST";
const RECEIVE_POST_ERRORS = "posts/RECEIVE_POST_ERRORS";
const CLEAR_POST_ERRORS = "posts/CLEAR_POST_ERRORS";

const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

const removePost = postId => ({
  type: REMOVE_POST,
  postId
});

const receiveUserPosts = posts => ({
  type: RECEIVE_USER_POSTS,
  posts
});

const receiveNewPost = post => ({
  type: RECEIVE_NEW_POST,
  post
});

const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors
});

export const clearPostErrors = errors => ({
    type: CLEAR_POST_ERRORS,
    errors
});

export const fetchPosts = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/posts');
    const posts = await res.json();
    dispatch(receivePosts(posts));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserPosts = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/posts/user/${id}`);
    const posts = await res.json();
    dispatch(receiveUserPosts(posts));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composePost = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const post = await res.json();
    dispatch(receiveNewPost(post));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


export const deletePost = postId => async dispatch => {
  try {
    const res = await jwtFetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    })
    dispatch(removePost(postId))
  } catch(err) {
    const resBody = await err.json();
    return dispatch(receiveErrors(resBody.errors));
  }
  // todo error handling
}

const nullErrors = null;

export const postErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_POST_ERRORS:
      return action.errors;
    case RECEIVE_NEW_POST:
      // TODO: confirm this is wanted behavior
      return { ...state, ...action.error };
    case CLEAR_POST_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const postsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POSTS:
      return { ...state, all: action.posts, new: undefined};
    case RECEIVE_USER_POSTS:
      return { ...state, user: action.posts, new: undefined};
    case RECEIVE_NEW_POST:
      return { ...state, new: action.post};
    case REMOVE_POST:
      return {
        ...state,
        all: state.all.filter((post) => post._id !== action.postId)
      }
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default postsReducer;
