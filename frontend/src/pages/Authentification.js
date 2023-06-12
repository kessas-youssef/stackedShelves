import { useEffect, useState, useContext } from 'react';
import library_background_ireland from '../img/library-background-ireland.jpg';
import '../style/authentification.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import WhyRead from '../components/whyRead';
import axios from "axios"
import Context from '../components/app_context';
import LoadingLayer from '../components/loadingLayer';


// ---------------- Start of Component ---------------------------------
const Authentification = () => {

  const location = useLocation();
  const isLoginLogic = location.pathname === '/auth' || location.pathname === '/auth/login' ? true : false
  // States
  const [isLogin, setIsLogin] = useState(isLoginLogic);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validatedPass, setValidatedPass] = useState('');
  const [isValidPass, setIsValidPass] = useState((password === validatedPass) && (password.length > 0) ? true : false);


  const ctx = useContext(Context);

  const navigate = useNavigate();

  const [allowClick, setAllowClick] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    ctx.setNotifHandler({ text: 'Please Hold on ...', status: true }, false);
    setIsLoading(true);
    const res = await axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: `https://stackedshelves.onrender.com/${isLogin ? 'login' : 'signin'}`
    })
    if (res.data.status) {
      ctx.login(res.data.userData);
      navigate('/profile');
    }
    ctx.setNotifHandler({ text: res.data.message, status: res.data.status })
    setIsLoading(false);
  };

  useEffect(() => {
    if (ctx.isLogin) {
      navigate('/profile'); // Redirect to profile page if logged in
    }
    setAllowClick((isValidPass || isLogin) && /\S+@\S+\.\S+/.test(username) && !isLoading);
    setIsValidPass((password === validatedPass) && (password.length > 0) ? true : false)
  }, [ctx.isLogin, isLoading, isLogin, isValidPass, navigate, password, username, validatedPass]);

  // --------------------------- JSX ------------------------------------

  return (
    <>
      <img className='authBackgroundImg' src={library_background_ireland} alt='library background Ireland' />
      <section className={'auth'}>
        <h1 className='auth__title'>{isLogin ? 'Log In' : 'Sign In'}</h1>
        <form method='POST'>
          <div className={'auth__control'}>
            <label htmlFor='username'>Your Username: </label>
            <input type='text' id='username' placeholder='Please use an Email' required onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className={'auth__control'}>
            <label htmlFor='password'>Your Password: </label>
            <input type='password' id='password' placeholder='Please enter your password' required onChange={(e) => setPassword(e.target.value)} />
          </div>

          {
            !isLogin
            &&
            <div className={'auth__control'}>
              <label htmlFor='validatePassword'>Validate your Password: </label>
              <input type='password' id='validatePassword' placeholder='Please confirm your password' required onChange={(e) => setValidatedPass(e.target.value)} />
            </div>
          }
          <button className='auth__submitBtn' type='submit' style={{ opacity: `${allowClick ? '1' : '.3'}` }} disabled={!allowClick} onClick={onSubmitHandler} >{isLogin ? 'Login' : 'Create Account'}</button>

          <Link
            to={`${isLogin ? 'signin' : 'login'}`}
            type='button'
            className={'auth__toggle'}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Link>
        </form>
      </section>
      <WhyRead />
      {
        isLoading
        &&
        <LoadingLayer />
      }
    </>
  );
};

export default Authentification;