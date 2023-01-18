import './PostsIndex.css'
// import gmaps from './gmaps.png'
import moment from 'moment';
import SinglePinMap from '../GoogleMap/SinglePinMap';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, updatePost } from '../../store/posts';
// import { useState } from 'react';

function PostsIndexItem ({ post }) {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors.posts)

    // const [edit, setEdit] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        console.log("IN P.I.I. HANDLE DELETE -- ID:")
        console.log(post._id)
        dispatch(deletePost(post._id))
    }

    const handleEdit = e => {
        e.preventDefault();
        // dispatch(updatePost({
        //     _id: post._id,
        //     writer: post.writer,
        //     recipient: post.recipient,
        //     location: post.location,
        //     subject: post.subject,
        //     body: "updated body",
        // }))
        // dispatch(updatePost({...post, body: "updated body"}));
        // console.log(post);
        // console.log(post._id)
    }

  return (
    <div className="post-index-item">
        <div className='post-item-top'>
            <div className="post-index-map">
                {/* <img src={gmaps} alt="google maps location" id="post-google-map" /> */}
                <SinglePinMap id="single-pin-map" lat={post.location.coordinates[1]} lng={post.location.coordinates[0]} />
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
            <button onClick={handleDelete}>DELETE</button>
            {/* <button onClick={()=>setEdit(true)}>EDIT</button> */}
            <button onClick={handleEdit}>EDIT</button>
            <button>Reply</button>
            <h4>post.replies.count</h4>
        </div>
        {/* {edit && <PostsEditForm post={post} setEdit={setEdit} />} */}
    </div>
  );
}

export default PostsIndexItem;
