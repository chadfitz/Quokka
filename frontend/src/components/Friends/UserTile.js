import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../blocks/Button'
import { addFriend, deleteFriend } from '../../store/friends';
import { useHistory } from 'react-router-dom';

const UserTile = ({recipient, backgroundColor}) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const requester = useSelector(state => state.session.user);
  const isFriend = useSelector(state => {
    return state.friends?.includes(recipient._id.toString())
  });

  let data = {
    requester: requester,
    recipient: recipient,
    relation: 2
  };

  useEffect(()=> {
    document.getElementById("friend-container").style.backgroundColor={backgroundColor}
  })

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
    // <div id='friend-container' style={{backgroundColor: backgroundColor, opacity: 0.1}}>
    <div id='friend-container'>
      <div id='friend-username'>{recipient.username}</div>
      <div id='friend-button' onClick={handleProfile}><button>VISIT</button></div>
      <div ><img id='user-profile-image' src={recipient.profileImageUrl}></img></div>
      <div>{recipient.bio}</div>
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

export default UserTile