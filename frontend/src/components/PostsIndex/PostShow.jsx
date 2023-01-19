import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../../store/posts';
import moment from 'moment';
import SinglePinMap from '../GoogleMap/SinglePinMap';
import { Markup } from 'interweave';
import { FiEdit3 } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

const PostShow = () => {
  const { postId } = useParams();
  const post = useSelector(store => {
    return Object.values(store.posts.all).find(obj => obj._id === postId);
  })
  console.log(postId);
  console.log(post);

  const dispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector(state => state.errors.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, postId])

  const handleDelete = (e) => {
      e.preventDefault();
      dispatch(deletePost(postId))
  }

  const handleEdit = e => {
      e.preventDefault();
      history.push(`/posts/${postId}/edit`);
  }

  if (!post) return null;

  return (
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
                  <div className='post-index-date-lower'>
                      <div className='post-index-icon' onClick={handleEdit}>< FiEdit3 /></div>
                      <div className='post-index-icon' onClick={handleDelete}>< FiTrash2 /></div>
                  </div>
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
    </div>
  );
}

export default PostShow;