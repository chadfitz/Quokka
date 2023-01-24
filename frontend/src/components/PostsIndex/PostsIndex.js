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
    dispatch(fetchFriends(currentUser));
    dispatch(fetchReactions());
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

       // need to get just reactions per post, so must turn obj to array
    // console.log("all reactions", allReactions)


  if (posts.length === 0) return <div>There are no Posts</div>;

  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
          <div className='posts-index-header'>
            <div className='write-cta-wrapper'>
              <p>You haven't written to anyone in awhile. </p>
              <Link to="/posts/new" className='posts-index-compose-link'><button className='secondary-button'>Send a postcard now?</button></Link>
            </div>
          </div>
          <div className='posts-index-filter'>
            <div className='posts-index-filter-bar' >
              <h5 id="filter-by">Filter by: </h5>
              <button className='filter-buttons'>All</button>
              <button className='filter-buttons'>Posts</button>
              <button className='filter-buttons'>Responses</button>
            </div>
          </div>

        {posts.map(post => (
          <PostsIndexItem key={post._id} postId={post._id} />
        ))}
      </div>
    </div>
  );
}

export default PostsIndex;
