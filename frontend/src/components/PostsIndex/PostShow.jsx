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
import "./PostShow.css"
import { fetchReaction, fetchReactions } from '../../store/reactions';
import { Link } from 'react-router-dom';
// import Reactions from './Reactions';

// 1. Get dropdown to appear
  // get dropdown to appear and dissapear on click
// 2. Get reactions made for a post to appear with counts
// 3. h

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
  const [showReactions, setShowReactions] = useState(false);
  const reactions = useSelector(state => Object.values(state.reactions))


  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchReplies(postId));
    dispatch(fetchReaction(postId))
  }, [dispatch, postId])

  const toggleReactions = () => {
    console.log('showReactions', showReactions)
    // if (showReactions) return;
    setShowReactions(!showReactions);
    console.log('showReactions', showReactions)
  };

  const closeReactions = () => {
    setShowReactions(false);
  };

  // useEffect(() => {
  //   console.log("show reactions", showReactions)
  //   if (!showReactions) return;

  //   document.addEventListener('click', closeReactions);
  //   return () => document.removeEventListener("click", closeReactions);
  // }, [showReactions]);

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
    replyChange("")
  }

  const replyToggle = () => {
    replyBox ? setReplyBox(false) : setReplyBox(true)
  }

  const repliesToggle = () => {
    showReply ? setShowReply(false) : setShowReply(true)
  }

  // need session user reaction

  // converting key val pairs of object to array of arrays,
  // filtering for matches based on user id,
  // then passing to Reactions component below
  const sessionUserReactions = Object.values(reactions).filter((entry)=>{
    console.log('entry', entry)
    return (entry.postId == postId) && (entry.userId == sessionUser._id )
  })

  if (!post) return null;

  // create a new reaction object with summary data, including types, and if user has reacted

  const formattedReactions = Object.values(reactions).reduce((acc, cv) => {
    if (acc[cv.style]) {
      return {...acc, [cv.style]: acc[cv.style] + 1}
    } else {
      return {...acc, [cv.style]: 1}
    }
  }, {})

  console.log('formatted reactions', formattedReactions)



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
                               <Link to={`/profile/${post.writer._id}`}><img className="profile-image-item" src={post.writer.profileImageUrl} alt="profile" id="profile-image-item"/></Link>
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
                    <div className="reaction-count-wrapper">
                      <p className='show-toggler' onClick={toggleReactions}>
                        {reactions.length} reactions
                      </p>
                      { showReactions &&
                      (<div className='reaction-box' onClick={toggleReactions}>
                        <ul className="reaction-list">
                          {Object.entries(formattedReactions).map(reaction => {
                            console.log('reaction in mapping', reaction)
                            if (reaction[0] == "happy") {
                              return (<li key="a" className='reaction'>
                                        <img src={happy} className='reaction-image'/>
                                        {reaction[1]} {reaction[0]}s
                                    </li>)}
                            if (reaction[0] == "hungry") {
                              return (<li key="b" className='reaction'>
                                        <img src={hungry} className='reaction-image'/>
                                        {reaction[1]} {reaction[0]}s
                                      </li>)
                            }
                            if (reaction[0] == "laughing") {
                              return (<li key="c" className='reaction'>
                                        <img src={laughing} className='reaction-image'/>
                                        {reaction[1]} {reaction[0]}s
                                      </li>)
                            }
                            if (reaction[0] == "love") {
                              return (<li key="d" className='reaction'>
                                        <img src={love} className='reaction-image'/>
                                        {reaction[1]} {reaction[0]}s
                                      </li>)
                            }})}
                        </ul>
                      </div>)
                      }
                    </div>
                    <Reactions postId={postId} sessionUserReactions={sessionUserReactions} user={sessionUser}></Reactions>
                    <button id="repl-button" onClick={replyToggle}>Reply</button>
                    { (Object.values(replies).length) ? <p className="show-toggler" onClick={repliesToggle}>{Object.values(replies).length} Replies</p> :
                      <p className='show-toggler'>{Object.values(replies).length} Replies </p> }
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
                <Button className="reply-btn" id="reply-btn" label="Reply"
                  type="submit" onClick={handleReply}/>
            </div>
              :
            "" }
             { showReply ?
          <div className='replies-showy'>
          {replies.map(reply => {return (
            <ReplyBox key={reply._id} replyId={reply._id}/>
          )})}
          </div>
          :
          "" }
                </div>
              </div>
          </div>



                </div>
              </div>
  );
}

export default PostShow;
