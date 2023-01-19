import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../blocks/Button'
import { addFriend, fetchFriends } from '../../store/friends';

const UserTile = ({user}) => {
  const dispatch = useDispatch();
  const requester = useSelector(state => state.session.user);
  const friends = useSelector(state => {
    const filter1 = { requester: requester._id, recipient: user._id }
    const filter2 = { requester: user._id, recipient: requester._id }
    // const direction1 = s


    return state.session.friends;
  });
  let data = {
    requester: requester,
    recipient: user,
    relation: 2
  };

  // useEffect(() => {
  //   dispatch(fetchFriends())
  // }, [dispatch])

  const handleAddFriend = () => {
    console.log('clicked');
    dispatch(addFriend(data));
  }

  return (
    <div>UserTile
      <div>{user.username}</div>
      <Button label="Add Friend"
              onClick={handleAddFriend}/>
    </div>
  )
}

export default UserTile