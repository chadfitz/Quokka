import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import { fetchUsers } from '../../store/users';
import UserTileStripped from '../Friends/UserTileStripped';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import PostsIndexItem2 from '../PostsIndex/PostsIndexItem2';
import "./Profile.css"

function UserProfile () {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(store => {
    return Object.values(store.users).find(user => user._id === userId )
  })

  const userPosts = useSelector(state => Object.values(state.posts.user))
  console.log(userPosts)
  console.log(user)


  useEffect(() => {
    //this should be userId
    dispatch(fetchUsers());
    dispatch(fetchUserPosts(userId));
    return () => dispatch(clearPostErrors());
  }, [userId, dispatch]);

  if (!user) return null;

  if (userPosts.length === 0) {
    return <div className="no-posts">{user?.username} has no Posts</div>;
  } else {
    return (
      <div className='whole-page-styling'>
        {/* {console.log('user',user)} */}
        <div className='inner-page-styling'>
          <div className='profile-container'>
            <div id='welcome-corner'>
              <h1>Welcome to {user?.username}'s profile</h1>
              <UserTileStripped recipient={user}/>
            </div>
            <h2>{user?.bio}</h2>

            {console.log('userposts',userPosts[0].location)}
            <div id='all-pins-map-container'>
              <AllPinsMap userPosts={userPosts} zoom={6} center={{lat: userPosts[0].location.coordinates[1], lng: userPosts[0].location.coordinates[0]}}/>
            </div>
            {userPosts.map((post, i) => (
              <>
                <PostsIndexItem2 post={post} key={post._id}/>
              </>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile;