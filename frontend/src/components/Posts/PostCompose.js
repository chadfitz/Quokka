import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPostErrors, composePost } from '../../store/posts';
import PostBox from './PostBox';

function PostCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const newPost = useSelector(state => state.posts.new);
  const errors = useSelector(state => state.errors.posts);

  useEffect(() => {
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composePost({ text })); 
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <form className="composePost" onSubmit={handleSubmit}>
        <input 
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your post..."
        />
        <div className="errors">{errors && errors.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <PostBox text={newPost?.text} />
    </>
  )
}

export default PostCompose;