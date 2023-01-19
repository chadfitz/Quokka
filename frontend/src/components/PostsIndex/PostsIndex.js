import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostsIndexItem from './PostsIndexItem';
import { Link, NavLink } from 'react-router-dom';
import './PostsIndex.css'

function PostsIndex () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch])

  if (posts.length === 0) return <div>There are no Posts</div>;

  return (
    <div className='post-index-container'>
        <div className='posts-index-header'>
            <h2>You haven't written to RECEPIENT in awhile.</h2>
            <Link to="/posts/new">Send them a poscard now?</Link>
        </div>
        <div className='posts-index-filter'>
            <h5 id="filter-by">Filter by: </h5>
            <button className='filter-buttons'>All</button>
            <button className='filter-buttons'>Posts</button>
            <button className='filter-buttons'>Responses</button>
        </div>
      
      {posts.map(post => (
          // <NavLink exact to={`/posts/${post._id}`}>
            <PostsIndexItem key={post._id} post={post} />
          // </NavLink>
      ))}
    </div>
  );
}

export default PostsIndex;