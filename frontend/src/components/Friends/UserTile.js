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
    return state.friends?.hasOwnProperty(recipient?._id.toString());
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
    dispatch(deleteFriend(recipient._id));
  }

  const handleProfile = e => {
    e.preventDefault()
    history.push(`/profile/${recipient._id}`)
  }

  return (
    // <div id='friend-container' style={{backgroundColor: backgroundColor, opacity: 0.1}}>
    <div id='friend-container'>
      <div id='friend-container-top'>
        <div id='friend-username' onClick={handleProfile}>{recipient.username}</div>

        <div onClick={handleProfile}><img id='user-profile-image' alt="profile" src={recipient.profileImageUrl}></img></div>
      </div>
      {/* <div id='friend-button' onClick={handleProfile}><button>VISIT</button></div> */}
      <div>{recipient.bio}</div>
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

export default UserTile
