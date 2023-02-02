import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import quokka from './quokka1.png'
import './MainPage.css'




function MainNavBar () {
  const dispatch = useDispatch();
 
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  return (
    <nav>
      <div className='navbar'>


          <div className='nav-left'>
            <Link to="/" className='nav-left'>
              <img src={quokka} alt="quokka logo" id="quokka-logo"></img>
              <h1 id="quokka-title">Quokka</h1>
            </Link>
          </div>

        

          <div className='nav-right'>
            <div className='profile-settings'>
              <Link to="/login" id="loginlink">Login</Link>
              <Link to="/signup" id="signuplink">Signup</Link>
            </div>
          </div>

      </div>
    </nav>
  );
}

export default MainNavBar;