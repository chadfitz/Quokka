import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Posts from './components/Posts/Posts';
import Profile from './components/Profile/Profile';
import PostCompose from './components/Posts/PostCompose';
import { getCurrentUser } from './store/session';
import MainPageSignup from './components/MainPage/MainPageSignup';
import PostsIndex from './components/PostsIndex/PostsIndex';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={MainPage} />
        <AuthRoute exact path="/signup" component={MainPageSignup} />

        <ProtectedRoute exact path="/posts" component={PostsIndex} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/posts/new" component={PostCompose} />
        <ProtectedRoute exact path="/posts/:postId/edit" component={PostCompose} />
      </Switch>
    </>
  );
}

export default App;