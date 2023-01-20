import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import PostBox from '../Posts/PostBox';
import PostsIndexItem from '../PostsIndex/PostsIndexItem';
import "./Profile.css"

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => Object.values(state.posts.user))
  useEffect(() => {
    dispatch(fetchUserPosts(currentUser._id));
    return () => dispatch(clearPostErrors());
  }, [currentUser, dispatch]);

  if (userPosts.length === 0) {
    return <div>{currentUser.username} has no Posts</div>;
  } else {
    return (
      <div className='whole-page-styling'>
        <div className='inner-page-styling'>
          <div className='profile-container'>
            <h2 className='profile-header'>All of {currentUser.username}'s Posts</h2>
            <div id='all-pins-map-container'><AllPinsMap userPosts={userPosts} zoom={6}/></div>
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

export default Profile;
