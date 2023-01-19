import './PostsIndex.css'
// import gmaps from './gmaps.png'
import moment from 'moment';
import SinglePinMap from '../GoogleMap/SinglePinMap';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import { Markup } from 'interweave';
import { FiEdit3 } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import { useEffect, useState } from 'react';
import Loader from '../GoogleMap/Loader';
import { useHistory } from 'react-router-dom';

// import { useState } from 'react';

function PostsIndexItem ({ post }) {
    // const [loading, setLoading] = useState(false);
    // let mapPlaceholder;
    // useEffect(()=> {
    //     setLoading(true);
    //     mapPlaceholder = <SinglePinMap id="single-pin-map" lat={post.location.coordinates[1]} lng={post.location.coordinates[0]} key={post._id} />
    //     setLoading(false);
    // },[])
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
            <div className='post-index-middle'>
                <h2 onClick={handleShow}>Subject: {post.subject}</h2>
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
                <div className='post-index-icon' onClick={handleEdit}>< FiEdit3 /></div>
                <div className='post-index-icon' onClick={handleDelete}>< FiTrash2 /></div>
            </div>
        </div>
        <div className='post-item-bottom'>
            <h4>Post.reactions.count</h4>
            <img className="profile-image-item" src={post.writer.profileImageUrl} alt="profile" id="profile-image-item"/>
            <button>React</button>
            <button>Reply</button>
            <h4 id="time-ago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h4>
        </div>
    </div>
  );
}

export default PostsIndexItem;
