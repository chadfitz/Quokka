import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import quokka from './quokka1.png'
import './NavBar.css';
import SearchBar from './SearchBar';
import ProfileButton from './ProfileButton';
import { HiMenu } from 'react-icons/hi'

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/posts'}>All Posts</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/posts/new'}>Write a Post</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <nav>
      <div className='navbar'>
        <div className='nav-left'>
          <img src={quokka} alt="quokka logo" id="quokka-logo"></img>
          <h1 id="quokka-title">Quokka</h1>
        </div>
          
        <div id="search-box">
          <SearchBar />
        </div>
        
        <div className='nav-right'>
          <div className='profile-settings'>
            {/* <HiMenu id="profile-more" /> */}
            <ProfileButton />
          </div>
        { getLinks() }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;