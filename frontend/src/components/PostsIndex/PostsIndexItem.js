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


// import { useState } from 'react';
import './PostIndexItem.css';
import './PostsIndex.css';
import Reactions from './Reactions';

function PostsIndexItem ({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const errors = useSelector(state => state.errors.posts)
    const sessionUser = useSelector(state => state.session.user)
    const { postId } = useParams()

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deletePost(post._id))
    }
    // useEffect(() => {
    //     dispatch(fetchPosts())
    // }, [dispatch])

    const handleEdit = e => {
        e.preventDefault();
        history.push(`/posts/${post._id}/edit`);
    }

    const handleShow = e => {
        e.preventDefault();
        history.push(`/posts/${post._id}`);
    }

    const reactionObject = post.reactions?.find((reaction) => {
        return reaction.user == sessionUser._id
      })
    const emotions = reactionObject ? reactionObject.emotions : null

    return (
    <div className="post-index-item">
        <div className='post-item-top'>
            <div className="post-index-map">
                {/* {loading ? <Loader/> : mapPlaceholder} */}
                {/* <img src={gmaps} alt="google maps location" id="post-google-map" /> */}
                <SinglePinMap id="single-pin-map" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} key={post._id} />
            </div>

            <div className='post-item-middle'>
                <div className='post-index-date'>
                    <h2 onClick={handleShow} className='post-item-subject'>{post.subject}</h2>
                    <div>
                        <img className="profile-image-item" src={post.writer.profileImageUrl} alt="profile" id="profile-image-item"/>
                    </div>
                </div>
                <div id='post-content'>
                    <p className='dear'>Dear {post.recipient.username},</p>
                    {post.body && <Markup content={post.body} />}
                    <div className='post-item-photos'>
                        {post.imageUrls ? <img id="post-item-photo" src={post.imageUrls[0]} alt=""/> :
                    "" }
                    </div>
                    <p className='signature'>From, <br/>{post.writer.username}</p>
                </div>
            </div>

        </div>
        <div className='post-item-bottom-container'>
            <div className='post-item-bottom'>
            <div className='post-item-bottom'>
                <ul className="reaction-bar">
                    {emotions?.map(emotion=>{
                        if (emotion == "like") return <li>😀</li>
                        if (emotion == "remember") return <li>🥲</li>
                        if (emotion == "tom") return <li>😎</li>
                        if (emotion == "NERD!") return <li>🤓</li>
                    })}
                </ul>
                {/* <button>🤔</button> */}
                <Reactions user={sessionUser} post={post}></Reactions>
                <h4 id="time-ago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h4>
            </div>
        </div>
    </div>
    </div>
  );
}

export default PostsIndexItem;
