import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, clearPostErrors } from '../../store/posts';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import { fetchFriends } from '../../store/friends';
import PostsIndexItem from '../PostsIndex/PostsIndexItem';
import "./Profile.css"
import SingleFriend from '../Friends/SingleFriend';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => Object.values(state.posts.user))
  const userFriends = useSelector(state => Object.values(state.friends));

  useEffect(() => {
    dispatch(fetchUserPosts(currentUser._id));
    dispatch(fetchFriends(currentUser));
    return () => dispatch(clearPostErrors());
  }, [currentUser, dispatch]);

  const handleFriendClick = () => {
    let x = document.getElementById("all-friends-container");
    if(x.style.display === "none"){
      x.style.display = "grid";
      x.style.gridTemplateColumns = "auto auto auto"
      x.style.rowGap = "50px"
      x.style.columnGap = "10px"
    } else {
      x.style.display = "none";
    }
  }


  if(!userPosts) return null;
  if(!userFriends) return null;
  if(!currentUser) return null;

  if (userPosts.length === 0) {
    return <div className="no-posts">{currentUser.username} has no Posts</div>;
  } else {
    return (
      <div className='whole-page-styling'>
        <div className='inner-page-styling'>
          <div className='profile-container'>
            <div id='welcome-corner'>
              <h1>Welcome, {currentUser.username}</h1>

            </div>
            <img id="welcome-corner-img" alt="user profile" src={currentUser.profileImageUrl}/>
            <h2>Bio</h2>
            <h3 id="currentuser-bio">{currentUser.bio}</h3>
            <h2 id='friend-click-button' onClick={handleFriendClick}>All your friends</h2>
            <div id="all-friends-container">
                {userFriends.map((friend, i) => (
                  <div id="single-friend">
                    {/* {friend} */}
                    <SingleFriend friend={friend} key={friend.uniqueId} />
                    {/* <UserTile recipient={friend}/> */}
                  </div>
                 ))}
            </div>
            <h2>All your posts</h2>
            <div id='all-pins-map-container'>
              <AllPinsMap userPosts={userPosts} zoom={8} center={{lat: userPosts[0].location.coordinates[1], lng: userPosts[0].location.coordinates[0]}}/>
            </div>
            {userPosts.map((post, i) => (
              <>
                <PostsIndexItem post={post} key={post.uniqueId}/>
              </>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
