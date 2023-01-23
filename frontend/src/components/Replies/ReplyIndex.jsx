import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ReplyIndex = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();



  return (
    <div className='reply-container'>
      ReplyIndex
      {/* add reply index item here */}
    </div>
  )
}

export default ReplyIndex