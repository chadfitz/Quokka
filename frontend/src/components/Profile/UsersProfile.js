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
    
    dispatch(fetchUserPosts(userId));
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
              <h2 className='profile-header'>All of {user?.username}'s Posts</h2>
              <img src={user?.profileImageUrl} alt="profile-pic"/>
            </div>
            <div id='all-pins-map-container'><AllPinsMap userPosts={userPosts} zoom={6}/></div>
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

// const FindUser = () => { 
//     const { userId } = useParams()
//     const user = useSelector(store => { 
//     return Object.values(store.users).find(user => user._id === userId )
//     })
//   }