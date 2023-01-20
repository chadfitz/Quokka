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
  const friends = useSelector(state => state.friends);
  const users = useSelector(state => Object.values(state.users));

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFriends(currentUser));
  }, [dispatch]);

  const findFriends = () => {
    let friendGroup = []
    users.map(user => {
      if (friends.includes(user._id)) {
        friendGroup.push(user)
      }
    })
    return friendGroup
  }

  const findStrangers = () => {
    let strangers = []
    users.map(user => {
      if (friends.indexOf(user._id) < 0) {
        strangers.push(user)
      }
    })
    return strangers
  }


  // if (!users) return null;
  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
        <div id="already-friends">
          <div id='friends-welcome-sign'>
            <h1>Friends</h1>
          </div>
            <div className='user-index'>
              {findFriends().map(user => (
                <UserTile key={user._id} recipient={user} backgroundColor={user.backgroundColor}/>
              ))}
            </div>
        </div>
        <div id='friends-welcome-sign'>
          <h1>Available Friends</h1>
        </div>
        <div className='user-index'>
            {findStrangers().map(user => (
              <UserTile key={user._id} recipient={user} backgroundColor={user.backgroundColor}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserIndex;
