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
import { useState } from 'react';
import "./PostIndexItem.css"
import { fetchReaction, fetchReactions } from '../../store/reactions';


const PostShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [reply, replyChange] = useInput('');
  const { postId } = useParams();
  const post = useSelector(store => {
    return Object.values(store.posts.all).find(obj => obj._id === postId);
  })
  const sessionUser = useSelector(state => state.session.user);
  const replies = useSelector(state => Object.values(state.replies));
  const [replyBox, setReplyBox] = useState(false)
  const [showReply, setShowReply] = useState(true)
  const reactions = useSelector(state => Object.values(state.reactions))


  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchReplies(postId));
    dispatch(fetchReaction(postId))
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
    setReplyBox(false)
  }

  const replyToggle = () => {
    replyBox ? setReplyBox(false) : setReplyBox(true)
  }

  const repliesToggle = () => {
    showReply ? setShowReply(false) : setShowReply(true)
  }

  const reactionObject = reactions?.find((reaction) => {
    return reaction.user == sessionUser._id;
  })

  let emotions = reactionObject ? reactionObject.emotions : null

  if (!post) return null;
  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling' id="inner-page-styling">
          <div className='post-show'>
            <div className='post-show-top'>
              <div className="post-index-item" id="post-index-item">
                  <div className='post-item-top'id="post-item-top">
                      <div className="post-index-map" id="post-index-map">
                          <SinglePinMap id="single-pin-map-show" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} key={post._id} />
                      </div>
                      <div className='post-item-middle' id="post-item-middle">
                          <h2 id="postshow-subject">{post.subject}</h2>
                          <h3 className='dear' id="dear">Dear {post.recipient.username},</h3>
                          {post.body && <Markup content={post.body} />}
                          <div className='post-item-photos'>
                            {post.imageUrls ? post.imageUrls.map(image => {
                               return <img id="post-item-photo" src={image} alt=""/>
                               }) :
                               ""}
                          </div>
                          <div className='post-show-styling'>
                            <div className='post-show-from'>
                              <img className="profile-image-item" src={post.writer.profileImageUrl} alt="profile" id="profile-image-item"/>
                              <h3 className='signature' id="signature">From, <br/>{post.writer.username}</h3>
                            </div>
                               {sessionUser?._id === post.writer._id &&
                              <div className='post-index-date-lower'>
                                  <div className='edit-buttons-show' id="edit-buttons-show">
                                    <div className='post-index-icons' id="edit-show" onClick={handleEdit}>< FiEdit3 /></div>
                                    <div className='post-index-icons' id="delete-show" onClick={handleDelete}>< FiTrash2 /></div>
                                  </div>
                                  <div className='running-out-names'>
                                    <h4 id="time-lago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h4>
                                  </div>
                              </div>
                              }
                          </div>
                      </div>
                    
                  </div>
                  <div className='post-item-bottom-container'>
                        <p className='show-toggler'>{post.reactions.length} reactions</p>
                        <button id="react-button">React</button>
                        <button id="repl-button" onClick={replyToggle}>Reply</button>
                        { (Object.values(replies).length) ? <p className="show-toggler" onClick={repliesToggle}>{Object.values(replies).length} Replies</p> :
                        <p className='show-toggler'>{Object.values(replies).length} Replies </p> }                  
                  </div>
                </div>
              </div>
          </div>
          
          { replyBox ?
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
                  type="submit" onClick={handleReply}/>
            </div>
              :
            "" }
          { showReply ?
          <div className='replies-show'>
          {replies.map(reply => {return (
            <ReplyBox key={reply._id} replyId={reply._id}/>
          )})},
          </div>
          :
          "" }
      </div>
    </div>
  );
}

export default PostShow;
