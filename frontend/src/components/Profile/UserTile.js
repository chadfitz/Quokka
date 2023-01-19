import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../blocks/Button'
import { addFriend } from '../../store/friends';

const UserTile = ({user}) => {
  const dispatch = useDispatch();
  const requester = useSelector(state => state.session.user);
  let data = {
    requester: requester._id,
    recipient: user._id
  };


  const handleAddFriend = () => {
    console.log('clicked');
    dispatch(addFriend(data));
  }

  console.log('user');
  console.log(user);

  return (
    <div>UserTile
      <div>{user.username}</div>
      <Button label="Add Friend"
              onClick={handleAddFriend}/>
    </div>
  )
}

export default UserTile