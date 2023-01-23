import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts, fetchUserPosts } from '../../store/posts';
import PostsIndexItem from './PostsIndexItem';
import { Link } from 'react-router-dom';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import './PostsIndex.css';
import { fetchFriends } from '../../store/friends';
import { fetchUsers } from '../../store/users';


function PostsIndex () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));
  const friends = useSelector(state => state.friends)
  const currentUser = useSelector(state => state.session.user);
  const userPosts = useSelector(state => Object.values(state.posts.user))
  
    useEffect(() => {
    dispatch(fetchUserPosts(currentUser._id));
    return () => dispatch(clearPostErrors());
  }, [currentUser, dispatch]);

  useEffect(()=> { 
    dispatch(fetchUsers());
    dispatch(fetchFriends(currentUser))
  }, [])

  const findFriend= () => {
    
    if (!friends.length) return null 
    const index = Math.floor(Math.random() * friends.length)
    return friends[index]
  }

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch, posts.length])

  if (posts.length === 0) return <div>There are no Posts</div>;

  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
          <div className='posts-index-header'>
              <div id='all-pins-map-container'><AllPinsMap userPosts={posts} zoom={8}/></div>
              <h2>You haven't written to {findFriend()} in awhile. </h2>
              <Link to="/posts/new" className='posts-index-compose-link'><button>Send a postcard now?</button></Link>
          </div>
          <div className='posts-index-filter'>
              <h5 id="filter-by">Filter by: </h5>
              <button className='filter-buttons'>All</button>
              <button className='filter-buttons'>Posts</button>
              <button className='filter-buttons'>Responses</button>
          </div>

        {posts.map(post => (
          <PostsIndexItem key={post._id} postId={post._id} />
        ))}
      </div>
    </div>
  );
}

export default PostsIndex;
