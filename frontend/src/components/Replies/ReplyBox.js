import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../blocks/Button';
import { deleteReply } from '../../store/replies';
import { FiEdit3 } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import './Reply.css';
import moment from 'moment';
import { useState } from 'react';
import useInput from '../../hooks/useInput';

const ReplyBox = ({ replyId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [edit, setEdit] = useState(false)
  const [replyChange, setReplyChange] = useInput('');

  const reply = useSelector(store => {
    return Object.values(store.replies).find(obj => obj._id === replyId);
  });

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReply(replyId));
  }

  const toggleEdit = (e) => { 
    edit ? setEdit(false) : setEdit(true)
  }

  if (!reply) return <div></div>;

  return (
    <div className='reply-container'>
      <div className='reply-box'>
      <div className='reply-left'>
        <div className='reply-profile-image'>
          <img src={reply.user.profileImageUrl} alt="reply-profile-image" id="reply-profile-image" />
          <p id="reply-username">{reply.user.username}</p>
        </div>
        <div className='reply-body2'>
          {reply.body}
        </div>
      </div>
       {sessionUser?._id === reply.user._id &&
      <div className='reply-right'>
        <div className='reply-edit-delete'>
            <div className='reply-index-icon' onClick={toggleEdit}>< FiEdit3 /></div>
            <div className='reply-index-icon' onClick={handleDelete}>< FiTrash2 /></div>
        </div>
        <div className='reply-time-ago'>

        </div>
      </div>
          }
      </div>
      <div className='reply-edit-box'>
        { edit ? 
              <div className='replies-show'>
                  <textarea label=""
                    id="reply-input"
                    className="reply-input"
                    value={reply.body}
                    onChange={setReplyChange}
                    wrap="hard"
                    rows="2"
                  />
                  <Button className="reply-btn" label="Reply"
                    type="submit" />
              </div>
               : 
              "" }
      </div>
    </div>
  )
}

export default ReplyBox