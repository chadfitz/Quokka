import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../blocks/Button';
import { deleteReply } from '../../store/replies';
import { FiEdit3 } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import './Reply.css';

const ReplyBox = ({ replyId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const reply = useSelector(store => {
    return Object.values(store.replies).find(obj => obj._id === replyId);
  });

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReply(replyId));
  }

  const handleEdit = (e) => { 
    e.preventDefault()
    console.log("editing")
  }

  if (!reply) return <div></div>;

  return (
    <div className='reply-box'>
      <div className='reply-left'>
        <div className='reply-profile-image'>
          <img src={reply.user.profileImageUrl} alt="reply-profile-image" id="reply-profile-image" />
          <p id="reply-username">{reply.user.username}</p>
        </div>
        <div className='reply-body'>
          {reply.body}
        </div>
      </div>
       {sessionUser?._id === reply.user._id &&
        <div className='reply-edit-delete'>
              <div className='reply-index-icon' onClick={handleEdit}>< FiEdit3 /></div>
              <div className='reply-index-icon' onClick={handleDelete}>< FiTrash2 /></div>
        </div>
          }
      {/* <Button className='reply-delete-btn' label="delete" onClick={handleDelete} /> */}
    </div>
  )
}

export default ReplyBox