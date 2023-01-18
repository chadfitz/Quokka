import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { login, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  const handleClick = () =>  { 
    history.push("/signup")
  }

  const demoLogin = e => { 
    e.preventDefault()
    return dispatch(login({email:'demo-user@appacademy.io', password:'starwars'}))
    .then(()=> history.push('/posts'))
  }

  return (
    <div className="session-form-container">
    <form className="session-form" onSubmit={handleSubmit}>
      <div className="errors">{errors?.email}</div>
      <label>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
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
      <input
        type="submit"
        value="Log In"
        disabled={!email || !password}
        id='login-submit'
      />
      <a id="forgot">Forgot password?</a>
      <input
        type="submit"
        value="Create new account"
        id="signup-submit"
        onClick={handleClick}
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

export default LoginForm;