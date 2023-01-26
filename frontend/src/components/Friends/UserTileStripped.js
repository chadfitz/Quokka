import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../blocks/Button'
import { addFriend, deleteFriend } from '../../store/friends';
import { useHistory } from 'react-router-dom';

const UserTileStripped = ({recipient, backgroundColor}) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const requester = useSelector(state => state.session.user);
  const isFriend = useSelector(state => {
    return state.friends?.hasOwnProperty(recipient?._id.toString());
  });

  let data = {
    requester: requester,
    recipient: recipient,
    relation: 2
  };


  const handleAddFriend = () => {
    dispatch(addFriend(data));
  }

  const handleDeleteFriend = () => {
    console.log('Delete Friend Clicked');
    dispatch(deleteFriend(recipient._id));
  }

  const handleProfile = e => {
    e.preventDefault()
    history.push(`/profile/${recipient._id}`)
  }

  return (
    <div id='friend-container-stripped'>
      <div onClick={handleProfile}><img id='user-profile-image' src={recipient.profileImageUrl}></img></div>
      <div id='friend-button'>
        {isFriend
        ? (<Button label="Delete Friend"
                    onClick={handleDeleteFriend} />)
        : (<Button label="Add Friend"
                onClick={handleAddFriend}/>)
        }
      </div>
    </div>
  )
}

export default UserTileStripped
