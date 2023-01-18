import './PostsIndex.css'
// import gmaps from './gmaps.png'
import moment from 'moment';
import SinglePinMap from '../GoogleMap/SinglePinMap';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../../store/posts';import { Markup } from 'interweave';
import { FiEdit3 } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import { deletePost } from '../../store/posts';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { useState } from 'react';

function PostsIndexItem ({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const errors = useSelector(state => state.errors.posts)

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deletePost(post._id))
    }

    const handleEdit = e => {
        e.preventDefault();
        history.push(`/posts/${post._id}/edit`);
        // dispatch(updatePost({...post, body: "<p>updated body</p>"}));
    }

  return (
    <div className="post-index-item">
        <div className='post-item-top'>
            <div className="post-index-map">
                {/* <img src={gmaps} alt="google maps location" id="post-google-map" /> */}
                <SinglePinMap id="single-pin-map" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} />
            </div>
            <div className='post-index-middle'>
                <h2>Subject: {post.subject}</h2>
                <h3>Dear {post.recipient},</h3>
                {post.body && <Markup content={post.body} />}
                <h3>From, </h3>
                <h3>{post.writer.username}</h3>
                <div className='post-index-photos'>
                    {post.imageUrls ? <img id="post-index-photo" src={post.imageUrls[0]} alt=""/> :
                "" }
                </div>
            </div>
            <div className='post-index-date'>
                < FiEdit3 />
                <button onClick={handleDelete}>< FiTrash2 /></button>
            </div>
        </div>
        <div className='post-item-bottom'>
            <h4>Post.reactions.count</h4>
            <img className="profile-image-item" src={post.writer.profileImageUrl} alt="profile" id="profile-image-item"/>
            <button>React</button>
            <button onClick={handleDelete}>DELETE</button>
            <button onClick={handleEdit}>EDIT</button>
            <button>Reply</button>
            <h4 id="time-ago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h4>
        </div>
    </div>
  );
}

export default PostsIndexItem;
