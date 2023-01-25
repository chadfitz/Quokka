import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import PostBox from '../Posts/PostBox';
import PostsIndexItem from '../PostsIndex/PostsIndexItem';
import "./Profile.css"

function UserProfile () {
  const { userId } = useParams()
  const user = useSelector(store => {
    console.log(store.users)
    return Object.values(store.users).find(user => user._id === userId )
  })
  console.log("USER")
  console.log(user)
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => Object.values(state.posts.user))


  useEffect(() => {
    dispatch(fetchUserPosts(user._id));
    return () => dispatch(clearPostErrors());
  }, [user, dispatch]);

  if (userPosts.length === 0) {
    return <div>{user.username} has no Posts</div>;
  } else {
    return (
      <div className='whole-page-styling'>
        <div className='inner-page-styling'>
          <div className='profile-container'>
          <div id='welcome-corner'>
              <h1>Welcome to {user.username}'s profile</h1>
              <img src={user.profileImageUrl}/>
            </div>
            <h2>{user.bio}</h2>
            <div id='all-pins-map-container'><AllPinsMap userPosts={userPosts} zoom={6} center={{lat: 38, lng: -122}}/></div>
            {userPosts.map((post, i) => (
              <>
                {/* {console.log(post)} */}
                {/* <PostBox
                  key={post._id}
                  body={post.body}
                /> */}
                <PostsIndexItem postId={post._id}/>
                {/* <Map key={i} postId={i}/> */}
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
