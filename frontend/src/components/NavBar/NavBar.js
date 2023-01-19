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


  return (
    <nav>
      <div className='navbar'>

        <div id="search-box">
          <SearchBar />
        </div>

        <div className='navbar-container'>
          <div className='nav-left'>
            <Link to="/" className='nav-left' id="nav-left">
              <img src={quokka} alt="quokka logo" id="quokka-logo"></img>
              <h1 id="quokka-title">Quokka</h1>
            </Link>
          </div>
          
          <div className='nav-right'>
            <div className='profile-settings'>
              <ProfileButton />
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default NavBar;