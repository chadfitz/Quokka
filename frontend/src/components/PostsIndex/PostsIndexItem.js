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

    return (
    <div className="post-index-item">
        <div className='post-item-top'>
            <div className="post-index-map">
                {/* {loading ? <Loader/> : mapPlaceholder} */}
                {/* <img src={gmaps} alt="google maps location" id="post-google-map" /> */}
                <SinglePinMap id="single-pin-map" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} key={post._id} />
            </div>
            <div className='post-item-middle'>
                <h2 onClick={handleShow} className='post-item-subject'>{post.subject}</h2>
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
                {/* <h4>Post.reactions.count</h4> */}
                {/* <button>React</button> */}
                <h4>:) :( :D :_( -_-</h4>
                <button>Reply</button>
                <h4 id="time-ago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h4>
            </div>
        </div>
    </div>
  );
}

export default PostsIndexItem;
