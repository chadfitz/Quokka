// import gmaps from './gmaps.png'
import moment from 'moment';
import SinglePinMap from '../GoogleMap/SinglePinMap';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from '../../store/posts';
import { Markup } from 'interweave';
import { FiEdit3 } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import { useEffect, useState } from 'react';
import Loader from '../GoogleMap/Loader';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import angry from '../../assets/quokka-angry.png';
import button from '../../assets/quokka-button.png';
import happy from '../../assets/quokka-happy.png';
import hungry from '../../assets/quokka-hungry.png';
import laughing from '../../assets/quokka-laughing.png';
import love from '../../assets/quokka-love.png';
import sad from '../../assets/quokka-sad.png';
import sleepy from '../../assets/quokka-sleepy.png';
// import { useState } from 'react';
import './PostIndexItem.css';
import './PostsIndex.css';
import Reactions from './Reactions';

function PostsIndexItem ({ postId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const errors = useSelector(state => state.errors.posts);
    const sessionUser = useSelector(state => state.session.user);
    const allReactions = useSelector(state => state.reactions)
    const post = useSelector(store => {
        return Object.values(store.posts.all).find(obj => obj._id === postId);
    });

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deletePost(postId))
    }

    const handleEdit = e => {
        e.preventDefault();
        history.push(`/posts/${postId}/edit`);
    }

    const handleShow = e => {
        e.preventDefault();
        history.push(`/posts/${postId}`);
    }

    const handleProfile = e => {
        e.preventDefault()
        history.push(`/profile/${post.writer._id}`)
  }

    const reactionObject = post.reactions?.find((reaction) => {
        return reaction.user == sessionUser._id
      })

    //    // the next few lines of code should stay in the post index item, but are going here for testing
    // const sessionUserReactions = Object.entries(allReactions).filter(item=>(item[1].postId == postId && item[1].userId == sessionUser._id))

    const postReactions = Object.entries(allReactions).filter(item => item[1].postId == postId)

    const sessionUserReactions = postReactions.filter(item => item[1].userId == sessionUser._id)


    return (
    <div className="post-index-item">
        <div className='post-item-top'>
            <div className="post-index-map">
                <SinglePinMap id="single-pin-map" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} key={post._id} />
            </div>
            <div className='post-item-middle'>
                {/* {console.log('post', post)} */}

                <h2 onClick={handleShow} className='post-item-subject'>{post.subject}</h2>
                <h3 className='dear'>Dear {post.recipient.username},</h3>
                {post.body && <Markup content={post.body} />}
                <div className='post-item-photos'>
                    {post.imageUrls ? post.imageUrls.map(image => {
                        return <img id="post-item-photo" src={image} alt=""/>
                    }) :
                    ""}
                </div>
                <h3 className='signature'>From, <br/>{post.writer.username}</h3>
            </div>
            <div className='post-index-date'>
                <div id="to-profile-page" onClick={handleProfile}>
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
                <p>{postReactions.length} reactions</p>
                <ul className="reaction-bar">
                    {sessionUserReactions?.map(emotion=>{
                        if (emotion[1].style === "like") return <li className='reaction'>
                                <img src={happy} className='reaction-image'/>
                            </li>
                        if (emotion[1].style == "remember") return <li className='reaction'>
                                <img src={hungry} className='reaction-image'/>
                            </li>
                        if (emotion[1].style == "tom") return <li className='reaction'>
                                <img src={laughing} className='reaction-image'/>
                            </li>
                        if (emotion[1].style == "NERD!") return <li className='reaction'>
                                <img src={love} className='reaction-image'/>
                            </li>
                    })}
                </ul>
                <Reactions user={sessionUser} post={post} postId={post._id} sessionUserReactions={sessionUserReactions}></Reactions>
                <h4 id="time-ago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h4>
            </div>
        </div>
    </div>
  );
}

export default PostsIndexItem;
