// import gmaps from './gmaps.png'
import moment from 'moment';
import SinglePinMap from '../GoogleMap/SinglePinMap';
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReplies } from '../../store/replies';
import { deletePost } from '../../store/posts';
import { Markup } from 'interweave';
import { FiEdit3, FiTrash2 } from 'react-icons/fi'
import './PostIndexItem.css';
import './PostsIndex.css';

// Need to grab replies from the store. Previous replies overwrite themselves. Need to filter them.

function PostsIndexItem ({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
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

    useEffect(()=>{
        dispatch(fetchReplies(post._id));
    }, [dispatch, post])


    const postReactions = Object.values(allReactions).filter(item => item.postId === post._id)
    const bodyPreview = post.body.slice(0,200)

    const postReplies = replies.filter((reply)=>{
        return reply.post === post._id
    })

    function transform (node, children) {
        if (node.tagName === 'OL' || node.tagName === 'UL') {
            return ;
        } else if (node.tagName !== 'P') {
            return <p>{node.innerText + ' ' }</p>
        }
    }


    return (<>
    <div className="post-index-item">

        <div className="post-content-box">

            <div className="post-index-map">
                <SinglePinMap id="single-pin-map" lat={post.location?.coordinates[1]} lng={post.location?.coordinates[0]} key={'new' + post._id} />
            </div>
            <div className="post-text">
                {sessionUser?._id === post.writer._id &&
                <div className='post-index-author-toolbar'>
                    <div className='post-index-icon edit' onClick={handleEdit}>< FiEdit3 /></div>
                    <div className='post-index-icon' onClick={handleDelete}>< FiTrash2 /></div>
                </div>
                }
                <div className="post-people">
                    <div className="post-person">
                        <div className="post-person-profile-wrapper">
                            <Link to={`/profile/${post.writer._id}`}><img className="post-person-img" src={post.writer.profileImageUrl} alt="profile"/></Link>
                            <Link to={`/profile/${post.recipient._id}`}><img className="post-person-img right" src={post.recipient.profileImageUrl} alt="profile"/></Link>
                        </div>
                        <div className="participants">
                            <p className="participants"><span className="from-or-to">From:</span>{post.writer.username}</p>
                            <p className="participants"><span className="from-or-to">To:</span>{post.recipient.username}</p>
                        </div>

                    </div>

                </div>
                <div className="time-since">
                    <p><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></p>
                </div>
                <div className="post-preview">
                    <a href={`/posts/${post._id}`} className="index-item-post-link">
                        <h1 className="post-title">{post.subject}</h1>
                        <div className="post-content-preview">
                            <Markup content={bodyPreview + "..."}
                                    transform={transform}
                                    noHtml={true}
                                    />

                        </div>
                        <p className="read-more">Read More →</p>
                    </a>
                </div>
            </div>
        </div>
        <div className="post-interactions-wrapper">
            <a href={`/posts/${post._id}`} className="index-item-post-link">
                <div className="post-interactions-box">
                    <p className="post-meta">{postReactions.length} reactions</p>
                    <p className="post-meta">{postReplies.length} replies</p>
                </div>
            </a>
        </div>
    </div>
    </>);
}

export default PostsIndexItem;
