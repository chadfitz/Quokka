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
import { fetchReplies } from '../../store/replies';

function PostsIndexItem ({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const errors = useSelector(state => state.errors.posts);
    const sessionUser = useSelector(state => state.session.user);
    const allReactions = useSelector(state => state.reactions)
    const replies = useSelector(state => Object.values(state.replies));

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

    const handleProfile = e => {
        e.preventDefault()
        history.push(`/profile/${post.writer._id}`)
  }

    const reactionObject = post.reactions?.find((reaction) => {
        return reaction.user == sessionUser._id
      })

    const postReactions = Object.entries(allReactions).filter(item => item[1].postId == post._id)

    const sessionUserReactions = postReactions.filter(item => item[1].userId == sessionUser._id)

    const bodyPreview = post.body.slice(0,200)
    console.log(bodyPreview)

    return (<>
    <div className="post-index-item">

        <div className="post-content-box">

            <div className="post-index-map">
                <SinglePinMap id="single-pin-map" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} key={'new' + post._id} />
            </div>
            <div className="post-text">
                <div className='post-index-author-toolbar'>
                    <div className='post-index-icon edit' onClick={handleEdit}>< FiEdit3 /></div>
                    <div className='post-index-icon' onClick={handleDelete}>< FiTrash2 /></div>
                </div>
                <div className="post-people">
                    <div className="post-person">
                        <div className="post-person-profile-wrapper">
                            <img className="post-person-img" src={post.writer.profileImageUrl} alt="profile"/>
                            <img className="post-person-img right" src={post.writer.profileImageUrl} alt="profile"/>
                        </div>
                        <div className="participants">
                            <p className="participants"><span className="from-or-to">From:</span>{post.recipient.username}</p>
                            <p className="participants"><span className="from-or-to">To:</span>{post.writer.username}</p>
                        </div>

                    </div>

                </div>
                <div className="time-since">
                    <p><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></p>
                </div>
                <div className="post-preview">
                    <a href={`posts/${post._id}`} className="index-item-post-link">
                        <h1 className="post-title">{post.subject}</h1>
                        <Markup content={bodyPreview + "..."} noHtml="true"/>
                        <p className="read-more">Read More →</p>
                    </a>
                </div>
            </div>
        </div>
        <div className="post-interactions-wrapper">
            <a href={`posts/${post._id}`} className="index-item-post-link">
                <div className="post-interactions-box">
                    <p className="post-meta">{postReactions.length} reactions</p>
                    <p className="post-meta">{replies.length} replies</p>
                </div>
            </a>
        </div>
    </div>
    </>);
}

export default PostsIndexItem;
