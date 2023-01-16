import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

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
        />
    </form>
    </div>
  );
}

export default LoginForm;