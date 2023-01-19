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

  const handleSignup = (e) => { 
    e.preventDefault();
    history.push("/signup")
  }

  const handleLogin = (e) => { 
    e.preventDefault();
    history.push("/login")
  }


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
            <li id="profileinfo"><Link to={'/posts'} id="profile-links">All Posts</Link></li>
            <li id="profileinfo"><Link to={'/profile'} id="profile-links">Profile</Link></li>
            <li id="profileinfo"><Link to={'/posts/new'} id="profile-links">Write a Post</Link></li>
            <li>
              <button id="logout-dropdown" onClick={logout}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
      :
      <div className="dropdown-menu">
        {showMenu && (
          <div className="profile-dropdown">
            <div className="must-login">
             <h3 >Must have an account to see posts</h3>
            </div>  
            <button id="logout-dropdown" onClick={handleSignup}>Signup</button>
            <button id="logout-dropdown" onClick={handleLogin}>Login</button>
          </div>
        )}
      </div> }
    </div>

  </>
  );
}

export default ProfileButton;