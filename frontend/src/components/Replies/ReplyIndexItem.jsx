import React from 'react';
import { useSelector } from 'react-redux';

const ReplyIndexItem = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='reply-container'>
      
    </div>
  )
}

export default ReplyIndexItem