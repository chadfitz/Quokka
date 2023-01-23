import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../blocks/Button';
import { deleteReply } from '../../store/replies';
import './Reply.css';

const ReplyBox = ({ replyId }) => {
  const dispatch = useDispatch();

  const reply = useSelector(store => {
    return Object.values(store.replies).find(obj => obj._id === replyId);
  });

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReply(replyId));
  }

  if (!reply) return <div></div>;

  return (
    <div className='reply-box'>
      <div className='reply-body'>{reply.body}</div>
      <Button className='reply-delete-btn' label="delete" onClick={handleDelete} />
    </div>
  )
}

export default ReplyBox