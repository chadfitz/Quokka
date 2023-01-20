import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../blocks/Button'
import { addFriend, deleteFriend } from '../../store/friends';

const UserTile = ({recipient}) => {
  const dispatch = useDispatch();
  const requester = useSelector(state => state.session.user);
  const isFriend = useSelector(state => {
    return state.friends?.includes(recipient._id.toString())
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

  return (
    <div>
      <div>{recipient.username}</div>
      {isFriend
       ? (<Button label="Delete Friend"
                  onClick={handleDeleteFriend} />)
       : (<Button label="Add Friend"
              onClick={handleAddFriend}/>)
      }
    </div>
  )
}

export default UserTile
