import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostsIndexItem from './PostsIndexItem';
import { Link } from 'react-router-dom';
import AllPinsMap from '../GoogleMap/AllPinsMap';
import './PostsIndex.css';

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
            <div id='all-pins-map-container'><AllPinsMap userPosts={posts} zoom={8}/></div>
             <h2>You haven't written to RECIPIENT in awhile.</h2>
            <Link to="/posts/new" id="post-index-compose">Send them a postcard now?</Link>
        </div>
        <div className='posts-index-filter'>
            <h5 id="filter-by">Filter by: </h5>
            <button className='filter-buttons'>All</button>
            <button className='filter-buttons'>Posts</button>
            <button className='filter-buttons'>Responses</button>
        </div>

      {posts.map(post => (
        <PostsIndexItem key={post._id} post={post} postId={post._id} />
      ))}
    </div>
  );
}

export default PostsIndex;
