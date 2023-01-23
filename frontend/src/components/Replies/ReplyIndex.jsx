import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReplies } from '../../store/replies';

const ReplyIndex = ({ post }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const replies = useSelector(store => {
    return Object.values(store.replies).find(obj => obj._id === post._id)
  })

  useEffect(()=>{
    dispatch(fetchReplies());
  }, [dispatch])

  return (
    <>
      ReplyIndex
      {replies.map(reply => )}
    </>
  )
}

export default ReplyIndex