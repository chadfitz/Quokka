import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, fetchPosts } from '../../store/posts';
import PostBox from './PostBox';

function Posts () {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts.all));

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch])

  if (posts.length === 0) return <div>There are no Posts</div>;
  if (!posts) return <div>There are no posts</div>
  return (
    <>
      <h2>All Posts</h2>
      {posts.map(post => (
        <PostBox key={post._id} body={post.body} username={post.writer.username} id={post._id} post={post} />
      ))}
    </>
  );
}

export default Posts;
