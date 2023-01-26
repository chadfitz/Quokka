import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import PostEdit from './components/Posts/PostsEdit';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import PostCompose from './components/Posts/PostCompose';
import { getCurrentUser } from './store/session';
import MainPageSignup from './components/MainPage/MainPageSignup';
import PostsIndex from './components/PostsIndex/PostsIndex';
import UserIndex from './components/Friends/UserIndex';
import PostShow from './components/PostsIndex/PostShow';
import Sidebar from './components/Sidebar/Sidebar';
import UserProfile from './components/Profile/UsersProfile';
import ResetScroll from './blocks/ResetScroll';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <ResetScroll />
      {sessionUser && (
        <>
          <NavBar />
          <Sidebar />
        </>
      )}
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={MainPage} />
        <AuthRoute exact path="/signup" component={MainPageSignup} />

        <ProtectedRoute exact path="/users" component={UserIndex} />
        <ProtectedRoute exact path="/posts" component={PostsIndex} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/profile/:userId" component={UserProfile}/>
        <ProtectedRoute exact path="/posts/new" component={PostCompose} />
        <ProtectedRoute exact path="/posts/:postId/edit" component={PostEdit} />
        <ProtectedRoute exact path="/posts/:postId" component={PostShow} />
      </Switch>
    </>
  );
}

export default App;
