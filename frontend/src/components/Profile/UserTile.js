import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../blocks/Button'
import { addFriend, fetchFriends } from '../../store/friends';

const UserTile = ({user}) => {
  const dispatch = useDispatch();
  const requester = useSelector(state => state.session.user);
  const isFriend = useSelector(state => {
    return state.friends?.includes(user._id.toString())
  });
  // const friends = useSelector(state => state.session.friends);

  let data = {
    requester: requester,
    recipient: user,
    relation: 2
  };

  const handleAddFriend = () => {
    dispatch(addFriend(data));
  }

  return (
    <div>
      <div>{user.username}</div>
      {isFriend
       ? <div>Friends!</div>
       : (<Button label="Add Friend"
              onClick={handleAddFriend}/>)
      }
    </div>
  )
}

export default UserTile
