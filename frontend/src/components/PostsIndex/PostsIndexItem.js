import './PostsIndex.css'
import gmaps from './gmaps.png'
import moment from 'moment'


function PostsIndexItem ({ post }) {
  return (
    <div className="post-index-item">
        <div className='post-item-top'>
            <div className="post-index-map">
                <img src={gmaps} alt="google maps location" id="post-google-map" />
            </div>
            <div className='post-index-middle'>
                <h2>Subject: {post.subject}</h2>
                <h3>Dear {post.recipient},</h3>
                <h3>{post.body}</h3>
                <h3>From, </h3>
                <h3>{post.writer.username}</h3>
            </div>
            <div className='post-index-date'>
                <h6 id="time-ago"><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></h6>
            </div>
        </div>
        <div className='post-item-bottom'>
            <h4>Post.reactions.count</h4>
            <button>React</button>
            <button>Reply</button>
            <h4>post.replies.count</h4>
        </div>
    </div>
  );
}

export default PostsIndexItem;