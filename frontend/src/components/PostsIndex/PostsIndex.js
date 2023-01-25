import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts, fetchUserPosts } from '../../store/posts';
import PostsIndexItem from './PostsIndexItem';
import { Link } from 'react-router-dom';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import './PostsIndex.css';
import { fetchFriends } from '../../store/friends';
import { fetchUsers } from '../../store/users';
import { fetchReactions } from '../../store/reactions';
import { useState } from 'react';


function PostsIndex () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));
  const friends = useSelector(state => state.friends)
  const currentUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => Object.values(state.posts.user))
  const [friendsPost, setFriendsPost] = useState(false)

    useEffect(() => {
    dispatch(fetchUserPosts(currentUser._id));
    return () => dispatch(clearPostErrors());
  }, [currentUser, dispatch]);

  useEffect(()=> {
    dispatch(fetchUsers());
    dispatch(fetchFriends(currentUser));
    dispatch(fetchReactions());
  }, [])

  const friendsFilter = posts.filter(post => { 
    return (post.writer._id === currentUser._id || Object.keys(friends).includes(post.writer._id) )
  })

  const toggleFilter = () => { 
    setFriendsPost(true)
  }

  const toggleallPosts = () => { 
    setFriendsPost(false)
  }

  const friendClass = () => { 
    return friendsPost ? 'filter-buttons selected' : 'filter-buttons'
  }

  const allClass=()=> { 
    return !friendsPost ? 'filter-buttons selected' : 'filter-buttons'
  }

  const findFriend= () => {
    if (!friends.length) return null
    const index = Math.floor(Math.random() * friends.length)
    return friends[index]
  }

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch, posts.length])

       // need to get just reactions per post, so must turn obj to array
    // console.log("all reactions", allReactions)


  if (posts.length === 0) return <div>There are no Posts</div>;

  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'> 
          <div className='posts-index-header'>
            { (Object.values(friends).length) ?
            <div className='write-cta-wrapper'>
              <p>You haven't written to anyone in awhile. </p>
              <Link to="/posts/new" className='posts-index-compose-link'><button className='secondary-button'>Send a postcard now?</button></Link>
            </div> : 
            <div className='write-cta-wrapper'>
              <p>Let's start by adding some friends </p>
              <Link to="/users" className='posts-index-compose-link'><button className='secondary-button'>Add Friend</button></Link>
            </div> }
          </div>
          <div className='posts-index-filter'>
            <div className='posts-index-filter-bar' >
              <h5 id="filter-by">Filter by: </h5>
              <button className={allClass()} onClick={toggleallPosts}>All Posts</button>
              <button className={friendClass()} onClick={toggleFilter}>Friends</button>
            </div>
          </div>
        {friendsPost ? 
        friendsFilter.map(post => (
          <PostsIndexItem key={post._id} postId={post._id} />
        ))
        :
        posts.map(post => (
          <PostsIndexItem key={post._id} postId={post._id} />
        ))
        }
      </div>
    </div>
  );
}

export default PostsIndex;
