import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../blocks/Button'
import { addFriend, deleteFriend } from '../../store/friends';

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
    dispatch(deleteFriend(recipient._id));
  }

  const handleProfile = e => {
    e.preventDefault()
    history.push(`/profile/${recipient._id}`)
  }

  return (
    <div id='friend-container-stripped'>
      <div onClick={handleProfile}><img id='user-profile-image' alt="profile" src={recipient.profileImageUrl}></img></div>
      <div id='friend-button'>
        {isFriend
        ? (<Button label="Unfollow"
                    onClick={handleDeleteFriend} />)
        : (<Button label="Follow"
                onClick={handleAddFriend}/>)
        }
      </div>
    </div>
  )
}

export default UserTileStripped
