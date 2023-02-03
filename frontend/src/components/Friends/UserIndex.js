import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/users';
import UserTile from './UserTile';
import './UserIndex.css';
import { fetchFriends } from '../../store/friends';
import { Link } from 'react-router-dom';

const UserIndex = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const friendsAndUserIds = useSelector(state => Object.keys(state.friends));
  friendsAndUserIds.push(currentUser._id);
  const friends = useSelector(state => Object.values(state.friends));
  const users = useSelector(state => Object.values(state.users));

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchFriends(currentUser));
  }, [dispatch, currentUser]);

  const findStrangers = () => {
    let strangers = [];
    users.forEach(user => {
      if (friendsAndUserIds.indexOf(user._id) < 0) {
        strangers.push(user)
      }
    })
    return strangers;
  }

  // if (!users) return null;
  return (
    <div className='whole-page-styling'>
      <div className='inner-page-styling'>
        <div id="already-friends">
          <div id='friends-welcome-sign'>
            <h1>Following</h1>
          </div>

              {friends && friends.length > 0
              ? <div className='user-index'>
                  {friends.map(user => (
                    <UserTile key={user._id} recipient={user} backgroundColor={user.backgroundColor}/>
                  ))}
                </div>
              : <div className='write-cta-wrapper'>
                  <p>Let's start by following some friends</p>
                </div>
              }

        </div>
        <div id='friends-welcome-sign'>
          <h1>Available Users</h1>
        </div>
        <div className='user-index'>
            {findStrangers()?.map(user => (
              <UserTile key={user._id} recipient={user} backgroundColor={user.backgroundColor}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserIndex;
