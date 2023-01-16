import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { CgProfile } from "react-icons/cg"
import { HiMenu } from "react-icons/hi";
import './NavBar.css'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const sessionUser = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/login")
  };

  return (
  <>
    <div className='dropdown'>
      <button id="profile-button" onClick={openMenu}>
        <HiMenu id="profile-more" />
        <CgProfile className="fa-solid fa-user-circle" id="profile-picture"/>
      </button>
      {sessionUser ? 
      <div className="dropdown-menu">
        {showMenu && (
          <ul className="profile-dropdown">
            <li id="profileinfo"><span id="bold">USERNAME:</span> {sessionUser.username}</li>
            <li id="profileinfo"><span id="bold">EMAIL: </span>{sessionUser.email}</li>
            <li>
              <button id="logout" onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
      :
      <div className="dropdown-menu">
        {showMenu && (
          <>  
            <Link to={'/signup'}>Signup</Link>
            <Link to={'/login'}>Login</Link>
          </>
        )}
      </div> }
    </div>

  </>
  );
}

export default ProfileButton;