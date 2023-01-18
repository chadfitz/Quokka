import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../blocks/Button';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostBox from './PostBox';
import { deletePost } from '../../store/posts'

function Posts () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch])

  if (posts.length === 0) return <div>There are no Posts</div>;


  return (
    <>
      <h2>All Posts</h2>
      {posts.map(post => (
        <PostBox key={post.id} postId={post._id} posty={post} />
      ))}


    </>
  );
}

export default Posts;
