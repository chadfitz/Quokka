import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriend } from '../../store/friends';
import { getCurrentUser } from '../../store/session';

const SingleFriend = ({recipientId}) => {
  const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    // useEffect(() => {
    //     dispatch(fetchFriend)
    // }, [dispatch])




  return (
    // <div id='friend-container'>
    //     <div> Hello</div>
    //   <div id='friend-username'>{recipient.username}</div>
    //   <div><img id='user-profile-image' src={recipient.profileImageUrl}></img></div>
    //   <div>{recipient.bio}</div>
    // </div>
    <div id='single-friend-container'>
      <div id='friend-username'>{sessionUser.username}</div>
      <div><img id='user-profile-image' src={sessionUser.profileImageUrl}></img></div>
      <div>{sessionUser.bio}</div>
    </div>
  )
}

export default SingleFriend
