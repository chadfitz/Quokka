import React from 'react'
import { useSelector } from 'react-redux';
import Button from '../../blocks/Button'

const UserTile = ({user}) => {
  const requestor = useSelector(state => state.session.user);
  const recipient = user;

  const addFriend = (e) => {
    e.preventDefault();
    console.log('clicked');

  }

  console.log('user');
  console.log(user);

  return (
    <div>UserTile
      <div>{recipient.email}</div>
      <Button label="Add Friend"
              onClick={addFriend}/>
    </div>
  )
}

export default UserTile