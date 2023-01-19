import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/users';
import UserTile from './UserTile';
import './UserIndex.css';
import { fetchFriends } from '../../store/friends';

const UserIndex = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.session.friends);
  const users = useSelector(state => Object.values(state.users));

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFriends(currentUser));
  }, [dispatch]);



  // if (!users) return null;
  return (
    <div className='user-index'>
      
      {users && users.map(user => (
        <UserTile key={user._id} user={user}/>
      ))}
      {/* {users.map(user => (
        <UserTile user={user}/>
      ))} */}
    </div>
  );
};

export default UserIndex;
