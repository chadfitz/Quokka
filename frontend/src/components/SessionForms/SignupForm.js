import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, login, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState(null);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const updateFile = e => setImage(e.target.files[0]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }
    
    return e => setState(e.currentTarget.value);
  }

  const usernameSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      image,
      password
    };
    dispatch(signup(user)); 
  }

   const demoLogin = e => { 
    e.preventDefault()
    return dispatch(login({email:'demo-user@appacademy.io', password:'starwars'}))
    .then(()=> history.push('/posts'))
  }

  return (
    <div className='session-form-container'>
    <form className="session-form" onSubmit={usernameSubmit}>
      <h2>Sign Up Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
          id='login-input'
        />
      </label>
      <div className="errors">{errors?.username}</div>
      <label>
        <input type="text"
          value={username}
          onChange={update('username')}
          placeholder="Username"
          id='login-input'
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
          id='login-input'
        />
      </label>
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <label>
        <input type="password"
          value={password2}
          onChange={update('password2')}
          placeholder="Confirm Password"
          id='login-input'
        />
      </label>
      <label>
        <h3 id="profile-image-input">Profile image</h3>
        <input 
         type="file"
         accept=".jpg, .jpeg, .png" 
         onChange={updateFile}
         id="login-input" />
      </label>
      <input
        type="submit"
        value="Sign Up"
        disabled={!email || !username || !password || password !== password2}
        id="login-submit"
      />
       <input
        type="submit"
        value="Demo User"
        id="signup-submit-two"
        onClick={demoLogin}
        />
    </form>
    </div>
  );
}

export default SignupForm;