import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../../store/posts';
import useInput from '../../hooks/useInput';
import Button from '../../blocks/Button';
import Input from '../../blocks/Input';
import Reactions from './Reactions';
import moment from 'moment';
import SinglePinMap from '../GoogleMap/SinglePinMap';
import { Markup } from 'interweave';
import { FiEdit3 } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import angry from '../../assets/quokka-angry.png';
import button from '../../assets/quokka-button.png';
import happy from '../../assets/quokka-happy.png';
import hungry from '../../assets/quokka-hungry.png';
import laughing from '../../assets/quokka-laughing.png';
import love from '../../assets/quokka-love.png';
import sad from '../../assets/quokka-sad.png';
import sleepy from '../../assets/quokka-sleepy.png'
import { composeReply, fetchReplies } from '../../store/replies';
import ReplyBox from '../Replies/ReplyBox';
import ReplyIndex from '../Replies/ReplyIndex';


const PostShow = () => {
  const [reply, replyChange] = useInput('');
  const { postId } = useParams();
  const post = useSelector(store => {
    return Object.values(store.posts.all).find(obj => obj._id === postId);
  })
  const sessionUser = useSelector(state => state.session.user);
  const replies = useSelector(state => Object.values(state.replies));

  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector(state => state.errors.posts);
//   console.log(post.reactions[0].emotions.length);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchReplies(postId));
  }, [dispatch, postId])

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(postId))
  }

  const handleEdit = e => {
    e.preventDefault();
    history.push(`/posts/${postId}/edit`);
  }

  const handleReply = e => {
    e.preventDefault();
    let replyObject = {
        user: sessionUser._id,
        post: post._id,
        body: reply
    };
    dispatch(composeReply(replyObject));
    document.getElementById('reply-input').innerHTML = ""
  }

//   useEffect(()=>{
//       console.log(emotions)
//       emotions = reactionObject ? reactionObject.emotions : null
//       console.log(emotions)
//     }, [emotions])

    // this needs to be above the reactionObject & emotions, otherwise
    // there's errors on refresh, but then we can't use the useEffect
    if (!post) return null;

    const reactionObject = post.reactions?.find((reaction) => {
        return reaction.user == sessionUser._id;
    })

    let emotions = reactionObject ? reactionObject.emotions : null

    return (
      <div className='whole-page-styling'>
        <div className='inner-page-styling'>
            <div className='post-show'>
                <div className="post-index-item">
                    <div className='post-item-top'>
                        <div className="post-index-map">
                            {/* {loading ? <Loader/> : mapPlaceholder} */}
                            {/* <img src={gmaps} alt="google maps location" id="post-google-map" /> */}
                            <SinglePinMap id="single-pin-map" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} key={post._id} />
                        </div>
                        <div className='post-item-middle'>
                            <h2>{post.subject}</h2>
                            <h3 className='dear'>Dear {post.recipient.username},</h3>
                            {post.body && <Markup content={post.body} />}
                            <div className='post-item-photos'>
                                {post.imageUrls ? <img id="post-item-photo" src={post.imageUrls[0]} alt=""/> :
                            "" }
                            </div>
                            <h3 className='signature'>From, <br/>{post.writer.username}</h3>
                        </div>
                        <div className='post-index-date'>
                            <div>
                                <img className="profile-image-item" src={post.writer.profileImageUrl} alt="profile" id="profile-image-item"/>
                            </div>
                                {sessionUser?._id === post.writer._id &&
                                <div className='post-index-date-lower'>
                                    <div className='post-index-icon' onClick={handleEdit}>< FiEdit3 /></div>
                                    <div className='post-index-icon' onClick={handleDelete}>< FiTrash2 /></div>
                                </div>
                                }
                        </div>
                    </div>
                    <div className='post-item-bottom-container'>
                        <div className='post-item-bottom'>
                                <ul className="reaction-bar">
                                    {emotions?.map(emotion=>{
                                        if (emotion == "like") return <li className='reaction'>
                                                <img src={happy} className='reaction-image'/>
                                            </li>
                                        if (emotion == "remember") return <li className='reaction'>
                                                <img src={hungry} className='reaction-image'/>
                                            </li>
                                        if (emotion == "tom") return <li className='reaction'>
                                                <img src={laughing} className='reaction-image'/>
                                            </li>
                                        if (emotion == "NERD!") return <li className='reaction'>
                                                <img src={love} className='reaction-image'/>
                                            </li>
                                    })}
                                </ul>
                                {/* <button>🤔</button> */}
                                <Reactions user={sessionUser} post={post}></Reactions>
                                <h4 id="time-ago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h4>
                            </div>
                    </div>
                </div>
                {/* <div className='reply-index-container'>
                    <ReplyIndex post={post} />
                </div> */}
            </div>
            <div className='replies-show'>
              <textarea label=""
                id="reply-input"
                className="reply-input"
                value={reply}
                onChange={replyChange}
                wrap="hard"
                rows="2"
              />
              <Button className="reply-btn" label="Reply"
                type="submit" onClick={handleReply}
              />
              {replies.map(reply => {return (
                <ReplyBox key={reply._id} replyId={reply._id} />
              )})}

            </div>
            {/* <div className='replies-show'>
              {replies.map(reply => {return (
                <ReplyBox key={reply._id} replyId={reply._id}/>
              )})},
              <Input label=""
                className="reply-input"
                type="textarea"
                value={reply}
                onChange={replyChange}
              />

              <Button className="reply-btn" label="Reply"
                type="submit" onClick={handleReply}
              />
            </div> */}
        </div>
    </div>
  );
}

export default PostShow;