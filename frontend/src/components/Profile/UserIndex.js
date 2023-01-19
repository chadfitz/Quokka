import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/users';
import UserTile from './UserTile';
import './UserIndex.css';

const UserIndex = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const users = useSelector(state => Object.values(state.users));

  console.log('in user index');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  // if (!users) return null;
  console.log('users');
  console.log(users);
  return (
    <div className='user-index'>
      UserIndex
      {users && users.map(user => {return (
        <UserTile key={user._id} user={user}/>
      )})},
      {users.map(user => (
        <UserTile user={user}/>
      ))}
    </div>
  );
};

export default UserIndex;