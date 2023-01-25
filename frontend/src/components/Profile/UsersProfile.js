import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import PostBox from '../Posts/PostBox';
import PostsIndexItem from '../PostsIndex/PostsIndexItem';
import PostsIndexItem2 from '../PostsIndex/PostsIndexItem2';
import "./Profile.css"

function UserProfile () {
  const { userId } = useParams()
  const user = useSelector(store => { 
    return Object.values(store.users).find(user => user._id === userId )
  })

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => Object.values(state.posts.user))

    

  useEffect(() => {  
    //this should be userId
    dispatch(fetchUserPosts(user._id));
    return () => dispatch(clearPostErrors());
  }, [user, userId, dispatch]);

  if (!user) return null

  if (userPosts.length === 0) {
    return <div>{user?.username} has no Posts</div>;
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
            {console.log('userposts',userPosts[0].location)}
            <div id='all-pins-map-container'>
              <AllPinsMap userPosts={userPosts} zoom={6} center={{lat: userPosts[0].location.coordinates[1], lng: userPosts[0].location.coordinates[0]}}/>
            </div>
            {userPosts.map((post, i) => (
              <>
                <PostsIndexItem postId={post._id}/>
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
