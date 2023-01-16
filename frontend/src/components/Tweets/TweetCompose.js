import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTweetErrors, composeTweet } from '../../store/tweets';
import TweetBox from './TweetBox';

function TweetCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const newTweet = useSelector(state => state.tweets.new);
  const errors = useSelector(state => state.errors.tweets);

  useEffect(() => {
    return () => dispatch(clearTweetErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composeTweet({ text })); 
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <form className="composeTweet" onSubmit={handleSubmit}>
        <input 
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your tweet..."
        />
        <div className="errors">{errors && errors.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <TweetBox text={newTweet?.text} />
    </>
  )
}

export default TweetCompose;